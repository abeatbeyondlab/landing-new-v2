import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting tag reassignment...');

  // 1. Ensure Tags Exist
  const tagsToEnsure = [
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Cloud', slug: 'cloud' },
    { name: 'Infrastructure', slug: 'infrastructure' },
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Business', slug: 'business' },
    { name: 'AI', slug: 'ai' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Project Management', slug: 'project-management' },
    { name: 'Engineering', slug: 'engineering' },
    { name: 'Open Source', slug: 'open-source' },
    { name: 'Performance', slug: 'performance' },
    { name: 'Tools', slug: 'tools' },
    // Existing: SQL, Database, Tutorial, Beginners Guide
  ];

  for (const t of tagsToEnsure) {
    await prisma.tag.upsert({
      where: { slug: t.slug },
      update: {},
      create: t
    });
  }
  console.log('Tags ensured.');

  // 2. Define Mappings (Post ID -> List of Tag Slugs)
  const Tag = {
    SQL: 'sql',
    DB: 'database',
    TUTORIAL: 'tutorial',
    BEGINNER: 'beginners-guide',
    CYBER: 'cybersecurity',
    CLOUD: 'cloud',
    INFRA: 'infrastructure',
    STRATEGY: 'strategy',
    BIZ: 'business',
    AI: 'ai',
    SEO: 'seo',
    PM: 'project-management',
    ENG: 'engineering',
    OPEN_SOURCE: 'open-source',
    PERF: 'performance',
    TOOLS: 'tools'
  };

  const mapping: Record<number, string[]> = {
    4: [Tag.SQL, Tag.DB, Tag.PERF, Tag.TUTORIAL], // Tuning SQL
    5: [Tag.SQL, Tag.DB, Tag.STRATEGY], // NoSQL vs Relational (Not tutorial)
    6: [Tag.CYBER, Tag.TOOLS], // Passwords/Cryptgeon (Not tutorial)
    7: [Tag.CLOUD, Tag.INFRA, Tag.STRATEGY, Tag.OPEN_SOURCE], // VMware vs OpenStack (Not tutorial)
    8: [Tag.SQL, Tag.DB, Tag.TUTORIAL, Tag.BEGINNER], // SQL Base
    22: [Tag.OPEN_SOURCE, Tag.STRATEGY, Tag.BIZ], // Open Source Strategy
    33: [Tag.AI, Tag.SEO, Tag.TUTORIAL], // llms.txt
    36: [Tag.PM, Tag.STRATEGY, Tag.BIZ], // Estimating Costs
    38: [Tag.AI, Tag.STRATEGY, Tag.BIZ], // AI Agents Revolution
    39: [Tag.AI, Tag.ENG, Tag.TUTORIAL], // Designing AI Agent
    40: [Tag.AI, Tag.ENG, Tag.TUTORIAL], // Designing AI Agent (Practical)
  };

  // 3. Apply Mappings
  for (const [idStr, tagSlugs] of Object.entries(mapping)) {
    const postId = parseInt(idStr);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
        console.warn(`Post ${postId} not found, skipping.`);
        continue;
    }

    console.log(`Updating Post ${postId}: ${post.title.substring(0, 30)}...`);
    
    // Get tag IDs
    const tags = await prisma.tag.findMany({
        where: { slug: { in: tagSlugs } }
    });

    // Verify found tags matches requested
    if (tags.length !== tagSlugs.length) {
        console.warn(`  Warning: Some tags not found for post ${postId}. Found ${tags.length}/${tagSlugs.length}`);
    }

    // Clear existing connections
    await prisma.post_tag.deleteMany({
        where: { post_id: postId }
    });

    // Create new connections
    for (const tag of tags) {
        await prisma.post_tag.create({
            data: {
                post_id: postId,
                tag_id: tag.id
            }
        });
    }
    console.log(`  Assigned: ${tags.map(t => t.name).join(', ')}`);
  }

  console.log('Reassignment completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
