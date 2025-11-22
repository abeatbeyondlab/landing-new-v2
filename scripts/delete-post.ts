import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const BLOGPOST_DIR = path.join(process.cwd(), 'blogpost');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('--- Delete Post ---\n');

  let postIdStr = process.argv[2];
  if (!postIdStr) {
    postIdStr = await ask('Enter Post ID to delete: ');
  }
  
  const postId = parseInt(postIdStr);
  if (isNaN(postId)) {
    console.error('Invalid ID');
    process.exit(1);
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    console.error('Post not found.');
    process.exit(1);
  }

  console.log(`\nSelected Post: [${post.id}] ${post.title}`);
  
  // Confirmation
  const confirm = await ask('Are you sure you want to delete this post? This cannot be undone. (yes/no): ');
  if (confirm.toLowerCase() !== 'yes') {
    console.log('Operation cancelled.');
    return;
  }

  // Delete from DB
  await prisma.post.delete({ where: { id: postId } });
  console.log('Post deleted from database.');

  // Delete local files (Content and Metadata)
  if (fs.existsSync(BLOGPOST_DIR)) {
    const files = fs.readdirSync(BLOGPOST_DIR);

    // Filter files starting with ID. (e.g. 5.Title.md, 5.json)
    const targetFiles = files.filter(f => f.startsWith(`${postId}.`));

    if (targetFiles.length > 0) {
        console.log(`Found ${targetFiles.length} local file(s). Deleting...`);
        targetFiles.forEach(file => {
            const filePath = path.join(BLOGPOST_DIR, file);
            try {
                fs.unlinkSync(filePath);
                console.log(`Deleted: ${file}`);
            } catch (err) {
                console.error(`Error deleting ${file}:`, err);
            }
        });
    } else {
        console.log('No local files found for this post.');
    }
  }

}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
