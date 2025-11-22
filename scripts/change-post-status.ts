import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import readline from 'readline';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
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
  console.log('--- Change Post Status ---\n');

  let postIdStr = process.argv[2];
  let newStateStr = process.argv[3];

  if (!postIdStr) {
    postIdStr = await ask('Enter Post ID: ');
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

  console.log(`Selected Post: [${post.id}] ${post.title} (Current State: ${post.state})`);
  console.log('States: 0 = Draft, 1 = Published');

  if (!newStateStr) {
    newStateStr = await ask('Enter new state (0 or 1): ');
  }

  const newState = parseInt(newStateStr);
  if (isNaN(newState) || (newState !== 0 && newState !== 1)) {
    console.error('Invalid state. Must be 0 or 1.');
    process.exit(1);
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      state: newState,
      updated_at: new Date()
    }
  });

  console.log(`Post status updated to ${newState === 1 ? 'Published' : 'Draft'}.`);
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
