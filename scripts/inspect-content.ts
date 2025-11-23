import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- CONTENT INSPECTION ---\n');

  // 1. Tags
  console.log('TAS (%d):', await prisma.tag.count());
  const tags = await prisma.tag.findMany({
    include: {
      _count: { select: { post_tag: true } }
    },
    orderBy: { name: 'asc' }
  });
  console.table(tags.map(t => ({
    ID: t.id,
    Name: t.name,
    Slug: t.slug,
    'Usage Count': t._count.post_tag,
    'Updated': t.updated_at?.toISOString().split('T')[0]
  })));

  // 2. Posts
  console.log('\nPOSTS (%d):', await prisma.post.count());
  const posts = await prisma.post.findMany({
    include: {
      post_tag: { include: { tag: true } }
    },
    orderBy: { date: 'desc' }
  });

  posts.forEach(p => {
    console.log(`\n[ID: ${p.id}] ${p.title}`);
    console.log(`  Slug: ${p.slug}`);
    console.log(`  State: ${p.state === 1 ? 'PUBLISHED' : 'DRAFT'} (${p.state})`);
    console.log(`  Date: ${p.date}`);
    console.log(`  Tags: ${p.post_tag.map(pt => pt.tag.name).join(', ') || '(No tags)'}`);
    console.log(`  Updated: ${p.updated_at?.toISOString()}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
