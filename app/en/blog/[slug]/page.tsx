import { notFound } from 'next/navigation';
import PostDetail from '../../components/blog/components/PostDetail';
import { getPostBySlug, getPostsForStaticParams } from '@/data/db';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ 
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const postsSlugs = await getPostsForStaticParams('en');
  return postsSlugs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: paramsPromise }: PostPageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const post = await getPostBySlug(params.slug, 'en');
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const baseUrl = 'https://abeatbeyond.com';
  const postUrl = `${baseUrl}/en/blog/${post.slug}`;
  const defaultOgImage = `${baseUrl}/sections/1.webp`; 
  const imageUrl = post.image_slug ? `${baseUrl}${post.image_slug}` : defaultOgImage;

  return {
    metadataBase: new URL(baseUrl),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
      siteName: 'A Beat Beyond',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@morandalex',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'en');
   if (!post) {
    notFound(); 
  }

  return <PostDetail post={post} slug={slug} />;
}