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

function sanitizeFilename(name: string): string {
  // Remove invalid characters for file systems
  return name.replace(/[/\\?%*:|"<>]/g, '-');
}

async function main() {
  console.log('--- Downloading Posts to Markdown ---\n');

  // 1. Ensure directory exists
  if (!fs.existsSync(BLOGPOST_DIR)) {
    console.log(`Creating directory: ${BLOGPOST_DIR}`);
    fs.mkdirSync(BLOGPOST_DIR, { recursive: true });
  }

  // 2. Fetch posts
  const posts = await prisma.post.findMany({
    orderBy: { id: 'asc' }
  });

  console.log(`Found ${posts.length} posts.`);

  for (const post of posts) {
    const safeTitle = sanitizeFilename(post.title);
    const filename = `${post.id}.${safeTitle}.md`;
    const filePath = path.join(BLOGPOST_DIR, filename);

    console.log(`Writing: ${filename}`);
    fs.writeFileSync(filePath, post.content);
  }

  console.log('\nDownload completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
