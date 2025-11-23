import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting auto-tagging process...');

  const posts = await prisma.post.findMany();
  const tags = await prisma.tag.findMany();

  console.log(`Found ${posts.length} posts and ${tags.length} tags.`);

  const tagRules: Record<string, string[]> = {
    'sql': ['sql', 'query', 'select', 'join'],
    'database': ['database', 'db', 'data', 'sql', 'nosql', 'relazionale'],
    'tutorial': ['tutorial', 'guida', 'come', 'how to'],
    'beginners-guide': ['principiante', 'beginner', 'introduzione', 'basi', 'start'],
    'cybersecurity' : ['cybersecurity', 'sicurezza', 'password', 'protezione'],
    'cloud': ['cloud', 'vmware', 'openstack', 'aws', 'azure']
  };

  let assignedCount = 0;

  for (const post of posts) {
    const textToScan = (post.title + ' ' + (post.description || '')).toLowerCase();
    
    for (const tag of tags) {
      const keywords = tagRules[tag.slug] || [tag.name.toLowerCase()];
      
      const isMatch = keywords.some(keyword => textToScan.includes(keyword));

      if (isMatch) {
         // Check if already assigned
         const exists = await prisma.post_tag.findUnique({
            where: {
                post_id_tag_id: {
                    post_id: post.id,
                    tag_id: tag.id
                }
            }
         });

         if (!exists) {
            await prisma.post_tag.create({
                data: {
                    post_id: post.id,
                    tag_id: tag.id
                }
            });
            console.log(`Assigned tag [${tag.name}] to post "${post.title}"`);
            assignedCount++;
         }
      }
    }
  }

  console.log(`\nProcess completed. Assigned ${assignedCount} new tag connections.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
