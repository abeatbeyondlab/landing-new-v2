import { Blog } from '@/components/blog';
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
      title: 'Tag Non Trovato',
    };
  }

  return {
    title: `${tag.name} - Blog A Beat Beyond`,
    description: `Leggi tutti gli articoli, le guide e gli approfondimenti relativi a ${tag.name} sul blog di A Beat Beyond.`,
    openGraph: {
      title: `${tag.name} - Blog A Beat Beyond`,
      description: `Scopri i nostri contenuti su ${tag.name} e rimani aggiornato sulle ultime novità.`,
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
    const { posts: p, total } = await getPosts({ page, limit, search, tagSlug: slug });
    posts = p;
    totalPages = Math.ceil(total / limit);
  } catch (error) {
    console.error(`Error fetching posts for tag ${slug}:`, error);
  }
  
  const title = `Tag: ${tag.name}`;
  const subtitle = `Articoli relativi a "${tag.name}"`;

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
