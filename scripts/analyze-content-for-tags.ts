import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Article Analysis for Tagging ---\n');

  const posts = await prisma.post.findMany({
    include: {
      post_tag: { include: { tag: true } }
    },
    orderBy: { id: 'asc' }
  });

  posts.forEach(p => {
    console.log(`[ID: ${p.id}] ${p.title}`);
    console.log(`  Tags: ${p.post_tag.map(pt => pt.tag.name).join(', ') || '(None)'}`);
    console.log(`  Desc: ${p.description || '(No description)'}`);
    console.log('-----------------------------------');
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
