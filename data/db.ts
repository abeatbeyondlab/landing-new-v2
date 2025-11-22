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

export interface Tag {
  name: string;
  slug: string;
}

// Define your interfaces in a shared location
export interface Post {
  id?: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags: Tag[];
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

export async function getTagsForStaticParams(): Promise<{ slug: string }[]> {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        slug: true
      }
    });
    return tags;
  } catch (error) {
     console.error("Failed to fetch tags for static params", error);
     return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const postFromDb = await prisma.post.findFirst({
      where: {
        slug: slug,
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
      tags: postFromDb.post_tag.map((pt) => ({ name: pt.tag.name, slug: pt.tag.slug })),
      image_slug: postFromDb.image_slug || '',
    };
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug} from database:`, error);
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
      tags: postFromDb.post_tag.map((pt) => ({ name: pt.tag.name, slug: pt.tag.slug })),
      image_slug: postFromDb.image_slug || '',
    }));
  } catch (error) {
    console.error('Failed to fetch sorted posts from database:', error);
    throw new Error('Database query failed for sorted posts');
  }
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  try {
    const postsFromDb = await prisma.post.findMany({
      where: {
        state: 1,
        post_tag: {
          some: {
            tag: {
              slug: tagSlug
            }
          }
        }
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
      tags: postFromDb.post_tag.map((pt) => ({ name: pt.tag.name, slug: pt.tag.slug })),
      image_slug: postFromDb.image_slug || '',
    }));
  } catch (error) {
    console.error(`Failed to fetch posts for tag ${tagSlug}:`, error);
    throw new Error('Database query failed for posts by tag');
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return tags.map(t => ({ name: t.name, slug: t.slug }));
  } catch (error) {
    console.error("Failed to fetch all tags:", error);
    return [];
  }
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const tag = await prisma.tag.findUnique({
      where: { slug }
    });
    return tag ? { name: tag.name, slug: tag.slug } : null;
  } catch (error) {
    console.error(`Failed to fetch tag by slug ${slug}:`, error);
    return null;
  }
}

export async function getPosts({
  page = 1,
  limit = 6,
  search,
  tagSlug
}: {
  page?: number;
  limit?: number;
  search?: string;
  tagSlug?: string;
}): Promise<{ posts: Post[]; total: number }> {
  try {
    const skip = (page - 1) * limit;
    
    const where: any = {
      state: 1,
    };

    if (tagSlug) {
      where.post_tag = {
        some: {
          tag: {
            slug: tagSlug
          }
        }
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } }, // Case insensitive usually default in SQLite?
        { description: { contains: search } }
      ];
    }

    const [postsFromDb, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        include: {
          post_tag: {
            include: { tag: true }
          }
        }
      }),
      prisma.post.count({ where })
    ]);

    const posts = postsFromDb.map((postFromDb) => ({
      id: postFromDb.id,
      slug: postFromDb.slug,
      title: postFromDb.title,
      description: postFromDb.description || '',
      date: postFromDb.date || '',
      author: postFromDb.author || '',
      content: postFromDb.content,
      tags: postFromDb.post_tag.map((pt) => ({ name: pt.tag.name, slug: pt.tag.slug })),
      image_slug: postFromDb.image_slug || '',
    }));

    return { posts, total };

  } catch (error) {
    console.error("Failed to fetch paginated posts:", error);
    return { posts: [], total: 0 };
  }
}
