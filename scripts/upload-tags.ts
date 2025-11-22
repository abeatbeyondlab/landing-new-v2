import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const BLOGPOST_DIR = path.join(process.cwd(), 'blogpost');
const TAGS_FILE = path.join(BLOGPOST_DIR, 'tags.json');

async function main() {
  console.log('--- Uploading Tags from JSON ---\n');

  if (!fs.existsSync(TAGS_FILE)) {
    console.error(`Error: Tags file not found at ${TAGS_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(TAGS_FILE, 'utf-8');
  let tags;
  try {
    tags = JSON.parse(rawData);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    process.exit(1);
  }

  if (!Array.isArray(tags)) {
    console.error('Error: JSON content must be an array of tags.');
    process.exit(1);
  }

  console.log(`Processing ${tags.length} tags...`);

  for (const tag of tags) {
    if (!tag.id) {
        // Create new tag if no ID (though usually syncing implies IDs match)
        // If simply adding new tags, checks slug uniqueness
        console.log(`Creating/Updating Tag [Name: ${tag.name}] (No ID provided in JSON)`);
        await prisma.tag.upsert({
            where: { slug: tag.slug },
            update: { name: tag.name },
            create: { 
                name: tag.name,
                slug: tag.slug
            }
        });
    } else {
        // Update existing by ID
        // Note: ID update might fail if ID doesn't exist. Upsert by ID not supported directly in SQLite sometimes?
        // Actually prisma.upsert requires where clause on unique field. 
        // ID is unique.
        
        // We really want to "Sync".
        // Use upsert on 'id' if possible, or 'slug'.
        // If ID is key, we upsert on ID.
        
        await prisma.tag.upsert({
            where: { id: tag.id },
            update: {
                name: tag.name,
                slug: tag.slug,
                updated_at: new Date()
            },
            create: {
                id: tag.id, // Explicit ID assignment
                name: tag.name,
                slug: tag.slug
            }
        });
        console.log(`Synced Tag [ID: ${tag.id}] ${tag.slug}`);
    }
  }

  console.log('\nTags upload completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
