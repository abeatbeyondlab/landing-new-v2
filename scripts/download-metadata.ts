import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const BLOGPOST_DIR = path.join(process.cwd(), 'blogpost');

async function main() {
  console.log('--- Downloading Post Metadata to JSON ---\n');

  // 1. Ensure directory exists
  if (!fs.existsSync(BLOGPOST_DIR)) {
    console.log(`Creating directory: ${BLOGPOST_DIR}`);
    fs.mkdirSync(BLOGPOST_DIR, { recursive: true });
  }

  // 2. Fetch posts with relationships
  const posts = await prisma.post.findMany({
    include: {
      post_tag: {
        include: {
          tag: true
        }
      }
    },
    orderBy: { id: 'asc' }
  });

  console.log(`Found ${posts.length} posts.`);

  for (const post of posts) {
    const filename = `${post.id}.json`;
    const filePath = path.join(BLOGPOST_DIR, filename);

    // Transform data for clearer inspection if needed, 
    // specifically flattening tags might be nice, but raw DB structure is also good.
    // I will output the full object as Prisma returns it to show "what is in sqlite".
    
    // Clone object to avoid mutation issues if reusing
    const postData: any = { ...post };
    
    // Remove content (handled by markdown script)
    delete postData.content;

    // Remove updated_at as requested
    delete postData.updated_at;
    
    // Simplify tags structure
    if (postData.post_tag && Array.isArray(postData.post_tag)) {
        postData.post_tag = postData.post_tag.map((pt: any) => ({
            tag: {
                id: pt.tag.id,
                name: pt.tag.name,
                slug: pt.tag.slug
            }
        }));
    }

    const data = JSON.stringify(postData, null, 2);

    console.log(`Writing: ${filename}`);
    fs.writeFileSync(filePath, data);
  }

  console.log('\nMetadata download completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
