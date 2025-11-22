import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

// Initialize Prisma
const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Query Playground ---');

  // 1. Fetch all posts with tags
  console.log('\n1. Fetching all posts with tags:');
  const posts = await prisma.post.findMany({
    include: {
      post_tag: {
        include: {
          tag: true
        }
      }
    }
  });
  
  posts.forEach(post => {
    const tags = post.post_tag.map(pt => pt.tag.name).join(', ');
    console.log(`- [${post.id}] ${post.title} (Tags: ${tags || 'None'})`);
  });

  // 2. Count posts by tag
  console.log('\n2. Tag Usage Stats:');
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { post_tag: true }
      }
    }
  });

  tags.forEach(tag => {
    console.log(`- ${tag.name}: ${tag._count.post_tag} posts`);
  });

  // 3. Find posts by specific tag (example 'SQL')
  const searchTag = 'SQL';
  console.log(`\n3. Posts tagged with '${searchTag}':`);
  const taggedPosts = await prisma.post.findMany({
    where: {
      post_tag: {
        some: {
          tag: {
            name: searchTag
          }
        }
      }
    }
  });
  
  taggedPosts.forEach(p => console.log(`- ${p.title}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
