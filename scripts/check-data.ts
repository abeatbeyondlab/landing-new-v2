import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const tags = await prisma.tag.findMany();
  console.log('Tags count:', tags.length);
  console.log('Tags:', JSON.stringify(tags, null, 2));
  
  const posts = await prisma.post.findMany({
    take: 5,
    include: {
      post_tag: {
        include: {
          tag: true
        }
      }
    }
  });
  console.log('Posts count:', await prisma.post.count());
  console.log('Sample posts:', JSON.stringify(posts, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
