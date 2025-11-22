import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLOG_IMG_DIR = path.join(PUBLIC_DIR, 'images', 'blog');

// Helper to recursively find files
function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

async function main() {
  console.log('Starting WebP conversion...');

  // 1. Find images
  if (!fs.existsSync(BLOG_IMG_DIR)) {
    console.log('Blog image directory not found.');
    return;
  }
  
  const files = getFiles(BLOG_IMG_DIR);
  const imageFiles = files.filter(f => /\.(jpe?g|png)$/i.test(f));
  
  console.log(`Found ${imageFiles.length} images to convert.`);

  const conversionMap: Record<string, string> = {}; // oldPath -> newPath

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const dir = path.dirname(file);
    const newPath = path.join(dir, `${basename}.webp`);

    try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(newPath);
        
        console.log(`Converted: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, newPath)}`);
        
        // Map relative paths (as stored in DB)
        // DB paths assume start from /images/blog...
        // But getFiles returns absolute paths.
        // We need to match what's in the DB.
        
        // Assuming standard public path mapping
        const relOld = '/images/blog/' + path.relative(BLOG_IMG_DIR, file);
        const relNew = '/images/blog/' + path.relative(BLOG_IMG_DIR, newPath);
        
        conversionMap[relOld] = relNew;

        // Optional: Delete original
        fs.unlinkSync(file); 
    } catch (err) {
        console.error(`Error converting ${file}:`, err);
    }
  }

  // 2. Update Database
  console.log('Updating database references...');
  
  // Update Post.image_slug and Post.content
  const posts = await prisma.post.findMany();
  
  for (const post of posts) {
    let needsUpdate = false;
    const updateData: any = {};

    // image_slug
    if (post.image_slug && conversionMap[post.image_slug]) {
        console.log(`Updating image_slug for post "${post.title}": ${post.image_slug} -> ${conversionMap[post.image_slug]}`);
        updateData.image_slug = conversionMap[post.image_slug];
        needsUpdate = true;
    }

    // content
    let newContent = post.content;
    let contentChanged = false;
    
    // Simple replaceAll for keys
    for (const [oldPath, newPath] of Object.entries(conversionMap)) {
        if (newContent.includes(oldPath)) {
            // Use replaceAll or global regex
            // Escape special chars for regex? simpler to use split/join
            newContent = newContent.split(oldPath).join(newPath); 
            contentChanged = true;
        }
    }

    if (contentChanged) {
        console.log(`Updating content for post "${post.title}"`);
        updateData.content = newContent;
        needsUpdate = true;
    }

    if (needsUpdate) {
        await prisma.post.update({
            where: { id: post.id },
            data: updateData
        });
    }
  }

  console.log('Conversion and DB update completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
