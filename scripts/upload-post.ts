import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
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
  console.log('--- Upload Post Content from Markdown ---\n');

  let postIdStr = process.argv[2];
  
  if (!postIdStr) {
    postIdStr = await ask('Enter Post ID to upload: ');
  }

  const postId = parseInt(postIdStr);
  if (isNaN(postId)) {
    console.error('Error: Invalid ID');
    process.exit(1);
  }

  // Find the file starting with this ID
  if (!fs.existsSync(BLOGPOST_DIR)) {
    console.error(`Error: Directory ${BLOGPOST_DIR} does not exist.`);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOGPOST_DIR);
  const file = files.find(f => f.startsWith(`${postId}.`));

  if (!file) {
    console.error(`Error: No file found for Post ID ${postId} in ${BLOGPOST_DIR}`);
    process.exit(1);
  }

  const filePath = path.join(BLOGPOST_DIR, file);
  console.log(`Reading file: ${file}`);
  
  const newContent = fs.readFileSync(filePath, 'utf-8');

  // Check if post exists
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    console.error(`Error: Post ID ${postId} not found in database.`);
    process.exit(1);
  }

  console.log(`Updating Post: "${post.title}"`);
  
  await prisma.post.update({
    where: { id: postId },
    data: {
      content: newContent,
      updated_at: new Date()
    }
  });

  console.log('Update completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
