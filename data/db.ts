import { PrismaClient } from '../app/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

// Use a global variable to prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
  prismaInstance = globalForPrisma.prisma;
} else {
  const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
  const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`,
  });
  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Define your interfaces in a shared location
export interface Post {
  id?: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  image_slug: string;
}

export async function getPostsForStaticParams(): Promise<Pick<Post, 'slug'>[]> {
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch slugs for generateStaticParams:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const postFromDb = await prisma.post.findFirst({
      where: {
        slug: slug, // Removed state restriction to match original query logic which had it but better to be explicit
        state: 1
      },
      include: {
        post_tag: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!postFromDb) {
      return undefined;
    }

    return {
      id: postFromDb.id,
      slug: postFromDb.slug,
      title: postFromDb.title,
      description: postFromDb.description || '',
      date: postFromDb.date || '',
      author: postFromDb.author || '',
      content: postFromDb.content,
      tags: postFromDb.post_tag.map((pt) => pt.tag.name),
      image_slug: postFromDb.image_slug || '',
    };
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug} from database:`, error);
    // In a real application, you might want to handle this more gracefully
    throw new Error('Database query failed');
  }
}

export async function getSortedPosts(): Promise<Post[]> {
  try {
    const postsFromDb = await prisma.post.findMany({
      where: {
        state: 1,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        post_tag: {
          include: {
            tag: true,
          },
        },
      },
    });

    return postsFromDb.map((postFromDb) => ({
      id: postFromDb.id,
      slug: postFromDb.slug,
      title: postFromDb.title,
      description: postFromDb.description || '',
      date: postFromDb.date || '',
      author: postFromDb.author || '',
      content: postFromDb.content,
      tags: postFromDb.post_tag.map((pt) => pt.tag.name),
      image_slug: postFromDb.image_slug || '',
    }));
  } catch (error) {
    console.error('Failed to fetch sorted posts from database:', error);
    throw new Error('Database query failed for sorted posts');
  }
}
