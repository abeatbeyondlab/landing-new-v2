import { notFound } from 'next/navigation';
// Le importazioni di Chakra UI e ReactMarkdown sono state spostate nel componente PostDetail.
import PostDetail from '@/components/blog/components/PostDetail'; // Assumendo che @ sia configurato per src
import { getPostBySlug, getPostsForStaticParams } from '@/data/db'; // Importazioni centralizzate

interface PostPageProps {
  params: Promise<{ 
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Genera i parametri statici per ogni post al momento della build
export async function generateStaticParams() {
  // Utilizza la funzione da db.ts che restituisce solo gli slug
  const postsSlugs = await getPostsForStaticParams();
  return postsSlugs.map((post) => ({
    slug: post.slug,
  }));
}

// Genera i metadati dinamici per la pagina (titolo, descrizione)
export async function generateMetadata({ params: paramsPromise }: PostPageProps) {
  const params = await paramsPromise; // Attendi la risoluzione dei parametri
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Articolo non trovato',
    };
  }

  const baseUrl = 'https://abeatbeyond.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  // Definisci un'immagine di fallback se post.image_slug è vuoto o non disponibile
  const defaultOgImage = `${baseUrl}/sections/1.webp`; 
  const imageUrl = post.image_slug ? `${baseUrl}${post.image_slug}` : defaultOgImage;

  return {
    metadataBase: new URL(baseUrl), // Aggiunge metadataBase per risolvere correttamente gli URL assoluti
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: 'article', // Tipo specifico per articoli di blog
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
      siteName: 'A Beat Beyond', // Il nome del tuo sito
    },
    twitter: {
      card: 'summary_large_image', // Tipo di card per Twitter
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@morandalex', // Il tuo handle Twitter
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug);
   if (!post) {
    notFound(); 
  }

  return <PostDetail post={post} slug={slug} />;
}
