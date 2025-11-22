import { Blog } from '@/components/blog';
import { getPostsByTag, getTagBySlug, getTagsForStaticParams, Post } from '@/data/db';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const tags = await getTagsForStaticParams();
  return tags;
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const tag = await getTagBySlug(slug);
  if (!tag) {
    notFound();
  }

  let filteredPosts: Post[] = [];
  try {
    filteredPosts = await getPostsByTag(slug);
  } catch (error) {
    console.error(`Error fetching posts for tag ${slug}:`, error);
  }
  
  // Capitalize tag name or use as is (it comes from DB which has proper casing usually)
  const title = `Tag: ${tag.name}`;
  const subtitle = `Articoli relativi a "${tag.name}"`;

  return <Blog posts={filteredPosts} title={title} subtitle={subtitle} />;
}
