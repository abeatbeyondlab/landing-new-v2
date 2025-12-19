import { PrismaClient } from '../app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
const adapter = new PrismaBunSqlite({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const BLOGPOST_DIR = path.join(process.cwd(), 'blogpost');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('--- Upload Post Metadata from JSON ---\n');

  let postIdStr = process.argv[2];
  
  if (!postIdStr) {
    postIdStr = await ask('Enter Post ID to upload metadata for: ');
  }

  const postId = parseInt(postIdStr);
  if (isNaN(postId)) {
    console.error('Error: Invalid ID');
    process.exit(1);
  }

  const filePath = path.join(BLOGPOST_DIR, `${postId}.json`);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: Metadata file not found at ${filePath}`);
    process.exit(1);
  }

  console.log(`Reading file: ${filePath}`);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  let jsonData;
  try {
    jsonData = JSON.parse(rawData);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    process.exit(1);
  }

  // Check if post exists
  const existingPost = await prisma.post.findUnique({ where: { id: postId } });
  if (!existingPost) {
    console.error(`Error: Post ID ${postId} not found in database.`);
    process.exit(1);
  }

  // Extract fields to update
  // We deliberately exclude 'content' to avoid overwriting markdown edits if using separate workflows,
  // and exclude 'id', 'created_at', 'updated_at'.
  // We also exclude 'post_tag' (relations) as that requires different logic (connect/disconnect).
  const updateData: any = {
    slug: jsonData.slug,
    title: jsonData.title,
    description: jsonData.description,
    date: jsonData.date,
    author: jsonData.author,
    image_slug: jsonData.image_slug,
    state: jsonData.state,
    locale: jsonData.locale
  };

  // Remove undefined keys if they weren't in JSON
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  console.log(`Updating Post ${postId} metadata...`);
  console.log('New values:', updateData);
  
  // Handle Tags if present in JSON
  // Strategy: Replace all associations
  if (jsonData.post_tag && Array.isArray(jsonData.post_tag)) {
    // Extract tag IDs from structure: [{ tag: { id: 1 } }, { tag: { id: 2 } }]
    const targetTagIds = jsonData.post_tag
        .map((pt: any) => pt.tag?.id)
        .filter((id: any) => id !== undefined);
    
    // We transactionally delete existing and create new
    // But prisma update can do this with 'deleteMany' (for join table) and 'create'
    // However, post_tag is an explicit model. 
    // To replace, we can use deleteMany on post_tag for this post, then create.
    
    // NOTE: We cannot easily do this inside the same `prisma.post.update` 
    // because `post_tag` is a relation.
    // We will do it in a transaction or separate steps.
    
    console.log(`Syncing tags: ${targetTagIds.join(', ')}`);
    
    // 1. Delete existing connections
    await prisma.post_tag.deleteMany({
        where: { post_id: postId }
    });

    // 2. Create new connections
    // We iterate because createMany is not supported on SQLite in some prisma versions 
    // or to ensure safe execution
    for (const tid of targetTagIds) {
        await prisma.post_tag.create({
            data: {
                post_id: postId,
                tag_id: tid
            }
        });
    }
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      ...updateData,
      updated_at: new Date()
    }
  });

  console.log('Metadata update completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => {
    rl.close();
    prisma.$disconnect();
  });
