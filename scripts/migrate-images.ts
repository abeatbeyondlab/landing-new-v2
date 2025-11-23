import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLOG_IMG_DIR = path.join(PUBLIC_DIR, 'images', 'blog');

if (!fs.existsSync(BLOG_IMG_DIR)) {
  fs.mkdirSync(BLOG_IMG_DIR, { recursive: true });
}

const BASE_URL = 'https://abeatbeyond.com';

async function downloadImage(url: string, filename: string): Promise<string | null> {
  let fullUrl = url;
  
  if (url.startsWith('/')) {
    fullUrl = `${BASE_URL}${url}`;
  } else if (!url.startsWith('http')) {
    // Assume relative path without leading slash? Or external without protocol?
    // Skip invalid or unknown formats
    return null;
  }

  try {
    console.log(`Downloading: ${fullUrl}`);
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch ${fullUrl}: ${response.statusText}`);
      return null;
    }

    // Determine extension if easier from content-type or url
    // We'll reuse extension from url
    let ext = path.extname(new URL(fullUrl).pathname);
    if (!ext) ext = '.jpg'; // Default fallback

    // Clean filename
    const cleanFilename = filename.replace(/[^a-z0-9\-]/gi, '-') + ext;
    const localPath = path.join(BLOG_IMG_DIR, cleanFilename);

    // Write file
    if (!response.body) return null;
    // @ts-ignore
    await pipeline(response.body, createWriteStream(localPath));

    return `/images/blog/${cleanFilename}`;
  } catch (error) {
    console.error(`Error downloading ${fullUrl}:`, error);
    return null;
  }
}

async function main() {
  console.log('Starting image migration...');
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    console.log(`Processing post: ${post.title}`);
    let needsUpdate = false;
    const updateData: any = {};

    // 1. Handle image_slug
    if (post.image_slug) {
        const newPath = await downloadImage(post.image_slug, `${post.slug}-cover`);
        if (newPath && newPath !== post.image_slug) {
            console.log(`Updating image_slug: ${post.image_slug} -> ${newPath}`);
            updateData.image_slug = newPath;
            needsUpdate = true;
        }
    }

    // 2. Handle content images
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    let newContent = post.content;
    let match;
    let contentModified = false;

    // We need to gather all replacements first because replace with async is tricky
    const replacements: {original: string, newUrl: string}[] = [];

    // Reset regex
    imgRegex.lastIndex = 0;
    while ((match = imgRegex.exec(post.content)) !== null) {
        const [fullMatch, alt, url] = match;
        // Generate unique name for content images
        const imgName = `${post.slug}-content-${replacements.length + 1}`;
        
        const newUrl = await downloadImage(url, imgName);
        if (newUrl && newUrl !== url) {
            replacements.push({ original: fullMatch, newUrl: `![${alt}](${newUrl})` });
        }
    }

    for (const rep of replacements) {
        newContent = newContent.replace(rep.original, rep.newUrl);
        contentModified = true;
    }

    if (contentModified) {
        console.log('Updating content images...');
        updateData.content = newContent;
        needsUpdate = true;
    }

    if (needsUpdate) {
        await prisma.post.update({
            where: { id: post.id },
            data: updateData
        });
        console.log('Post updated.');
    }
  }
  
  console.log('Migration finished.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
