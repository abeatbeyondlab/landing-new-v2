import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

async function main() {
  console.log('Starting backfill...');

  // 1. Update Post 'updated_at'
  const posts = await prisma.post.findMany({
    where: { updated_at: null }
  });
  console.log(`Found ${posts.length} posts to update updated_at.`);
  
  for (const post of posts) {
    await prisma.post.update({
      where: { id: post.id },
      data: { 
        updated_at: new Date() // Or use created_at if available, but it's also new
      }
    });
  }
  console.log('Posts updated.');

  // 2. Update Tag 'slug', 'updated_at'
  const tags = await prisma.tag.findMany({
    where: { 
      OR: [
        { slug: null },
        { updated_at: null }
      ]
    }
  });
  console.log(`Found ${tags.length} tags to update.`);

  for (const tag of tags) {
    const slug = tag.slug || slugify(tag.name);
    console.log(`Tag: ${tag.name} -> Slug: ${slug}`);
    
    await prisma.tag.update({
      where: { id: tag.id },
      data: {
        slug: slug,
        updated_at: new Date()
      }
    });
  }
  console.log('Tags updated.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
