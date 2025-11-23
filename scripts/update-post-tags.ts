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
  console.log('--- POST TAG MANAGER ---\n');

  // 1. Select Post
  const posts = await prisma.post.findMany({ select: { id: true, title: true } });
  posts.forEach(p => console.log(`[${p.id}] ${p.title}`));
  
  const postIdStr = await ask('\nEnter Post ID to modify: ');
  const postId = parseInt(postIdStr);
  if (isNaN(postId)) throw new Error('Invalid ID');
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { post_tag: { include: { tag: true } } }
  });
  
  if (!post) throw new Error('Post not found');
  console.log(`\nSelected: "${post.title}"`);
  console.log(`Current Tags: ${post.post_tag.map(pt => pt.tag.name).join(', ') || 'None'}`);

  // 2. Select Action
  const action = await ask('\nAction? (add/remove): ');
  
  // 3. Select Tag
  const tags = await prisma.tag.findMany();
  console.log('\nAvailable Tags:');
  tags.forEach(t => console.log(`[${t.slug}] ${t.name}`));
  
  const tagSlug = await ask('\nEnter Tag Slug: ');
  const tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
  
  if (!tag) throw new Error('Tag not found (Tip: create it in DB if missing)');

  if (action === 'add') {
    // Check if exists
    const exists = post.post_tag.find(pt => pt.tag_id === tag.id);
    if (exists) {
      console.log('Tag already linked.');
    } else {
      await prisma.post_tag.create({
        data: {
          post_id: post.id,
          tag_id: tag.id
        }
      });
      console.log('Tag added successfully!');
    }
  } else if (action === 'remove') {
    await prisma.post_tag.deleteMany({
      where: {
        post_id: post.id,
        tag_id: tag.id
      }
    });
    console.log('Tag removed successfully!');
  } else {
    console.log('Invalid action');
  }
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
