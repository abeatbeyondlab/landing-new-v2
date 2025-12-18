import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function duplicatePosts() {
  console.log('Fetching Italian posts...');
  
  const posts = await prisma.post.findMany({
    where: {
      locale: 'it'
    },
    include: {
      post_tag: true
    }
  });

  console.log(`Found ${posts.length} posts to duplicate.`);

  for (const post of posts) {
    const enSlug = `${post.slug}-en`;
    
    const existing = await prisma.post.findUnique({
      where: { slug: enSlug }
    });

    if (existing) {
      console.log(`Skipping ${enSlug}, already exists.`);
      continue;
    }

    console.log(`Creating English version for: ${post.title}`);

    const newPost = await prisma.post.create({
      data: {
        slug: enSlug,
        title: `(EN) ${post.title}`,
        description: post.description,
        content: post.content,
        date: post.date,
        author: post.author,
        image_slug: post.image_slug,
        state: post.state,
        locale: 'en',
        post_tag: {
          create: post.post_tag.map((pt: any) => ({
            tag: {
              connect: { id: pt.tag_id }
            }
          }))
        }
      }
    });
    
    console.log(`Created ${newPost.slug}`);
  }

  console.log('Duplication complete.');
}

duplicatePosts()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });