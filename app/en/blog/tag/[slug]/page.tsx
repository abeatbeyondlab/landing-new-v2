import { Blog } from '../../../components/blog';
import { getPosts, getTagBySlug, getTagsForStaticParams, Post } from '@/data/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const tags = await getTagsForStaticParams();
  return tags;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `${tag.name} - A Beat Beyond Blog`,
    description: `Read all articles, guides and insights related to ${tag.name} on the A Beat Beyond blog.`,
    openGraph: {
      title: `${tag.name} - A Beat Beyond Blog`,
      description: `Discover our content about ${tag.name} and stay updated on the latest news.`,
      locale: 'en_US',
    },
  };
}

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  const tag = await getTagBySlug(slug);
  if (!tag) {
    notFound();
  }

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const search = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined;
  const limit = 6;

  let posts: Post[] = [];
  let totalPages = 1;

  try {
    const { posts: p, total } = await getPosts({ page, limit, search, tagSlug: slug, locale: 'en' });
    posts = p;
    totalPages = Math.ceil(total / limit);
  } catch (error) {
    console.error(`Error fetching posts for tag ${slug}:`, error);
  }
  
  const title = `Tag: ${tag.name}`;
  const subtitle = `Articles related to "${tag.name}"`;

  return (
    <Blog 
      posts={posts} 
      title={title} 
      subtitle={subtitle} 
      showBackLink={true}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
