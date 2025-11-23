import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const BLOGPOST_DIR = path.join(process.cwd(), 'blogpost');
const TAGS_FILE = path.join(BLOGPOST_DIR, 'tags.json');

async function main() {
  console.log('--- Downloading Tags to JSON ---\n');

  if (!fs.existsSync(BLOGPOST_DIR)) {
    fs.mkdirSync(BLOGPOST_DIR, { recursive: true });
  }

  const tags = await prisma.tag.findMany({
    orderBy: { id: 'asc' }
  });

  console.log(`Found ${tags.length} tags.`);

  // Transform: Remove updated_at/created_at if desired, or keep minimal
  // Requested format in previous steps was: { id, name, slug }
  const simplifiedTags = tags.map(t => ({
    id: t.id,
    name: t.name,
    slug: t.slug
  }));

  const data = JSON.stringify(simplifiedTags, null, 2);

  console.log(`Writing to: ${TAGS_FILE}`);
  fs.writeFileSync(TAGS_FILE, data);

  console.log('\nTags download completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
