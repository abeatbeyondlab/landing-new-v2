import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import readline from 'readline';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('--- POST META UPDATER ---\n');

  // 1. Select Post
  const posts = await prisma.post.findMany({ select: { id: true, title: true, slug: true, state: true } });
  posts.forEach(p => console.log(`[${p.id}] ${p.title} (Slug: ${p.slug}, State: ${p.state})`));
  
  const postIdStr = await ask('\nEnter Post ID to modify: ');
  const postId = parseInt(postIdStr);
  if (isNaN(postId)) throw new Error('Invalid ID');
  
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');

  console.log(`\nSelected: ${post.title}`);
  console.log('Fields available to update: title, slug, state, description, date');
  
  const field = await ask('Field to update: ');

  if (!['title', 'slug', 'state', 'description', 'date'].includes(field)) {
    throw new Error('Invalid field');
  }

  const currentValue = (post as any)[field];
  console.log(`Current Value: ${currentValue}`);
  
  let newValue: any = await ask('New Value: ');

  // Type conversion
  if (field === 'state') {
    newValue = parseInt(newValue);
    if (isNaN(newValue)) throw new Error('State must be a number (0 or 1)');
  }

  // Confirmation
  const confirm = await ask(`Update ${field} to "${newValue}"? (y/n): `);
  if (confirm.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    return;
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      [field]: newValue,
      updated_at: new Date()
    }
  });

  console.log('Updated successfully!');
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
