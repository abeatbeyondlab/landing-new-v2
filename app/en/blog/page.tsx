import { Blog } from '../components/blog';
import { getAllTags, getPosts, Post, Tag } from '@/data/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - A Beat Beyond | Insights Digital Transformation & Tech',
  description: 'Explore our guides, tutorials, and insights on Digital Transformation, Cloud, Cybersecurity, AI, and IT Strategy to grow your business.',
  openGraph: {
    title: 'Blog - A Beat Beyond | Insights Digital Transformation & Tech',
    description: 'Explore our guides, tutorials, and insights on Digital Transformation, Cloud, Cybersecurity, AI, and IT Strategy to grow your business.',
    type: 'website',
    locale: 'en_US',
  }
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const limit = 6;

  let posts: Post[] = [];
  let tags: Tag[] = [];
  let totalPages = 1;

  try {
    const { posts: p, total } = await getPosts({ page, limit, search, locale: 'en' });
    posts = p;
    totalPages = Math.ceil(total / limit);
    tags = await getAllTags();
  } catch (error) {
    console.error("Error in BlogPage:", error);
  }
  
  return (
    <Blog 
      posts={posts} 
      tags={tags} 
      currentPage={page}
      totalPages={totalPages}
    />
  );
}