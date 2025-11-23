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
  console.log('--- Create New Post ---\n');

  const title = await ask('Enter Post Title: ');
  const slugInput = await ask('Enter Slug (optional, default: auto-generated): ');
  
  const finalSlug = slugInput.trim() || `new-post-${Date.now()}`;

  const post = await prisma.post.create({
    data: {
      title: title,
      slug: finalSlug,
      content: `# ${title}\n\nDraft content.`,
      state: 0, // Draft
      description: "Draft description"
    }
  });

  console.log(`\n✅ Created Post Successfully!`);
  console.log(`ID: ${post.id}`);
  console.log(`Title: ${post.title}`);
  console.log(`Slug: ${post.slug}`);
  console.log(`\nNext steps:`);
  console.log(`1. Run 'make post-download' (or just create blogpost/${post.id}.md and blogpost/${post.id}.json manually)`);
  console.log(`2. Edit the files.`);
  console.log(`3. Run 'make post-update ID=${post.id}' and 'make post-update-metadata ID=${post.id}'`);
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
