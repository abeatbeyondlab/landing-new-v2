import { Blog } from '@/components/blog';
import { getAllTags, getPosts, Post, Tag } from '@/data/db'; // Importazioni centralizzate
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - A Beat Beyond | Insight Digital Transformation & Tech',
  description: 'Esplora le nostre guide, tutorial e approfondimenti su Digital Transformation, Cloud, Cybersecurity, AI e Strategia IT per far crescere la tua azienda.',
  openGraph: {
    title: 'Blog - A Beat Beyond | Insight Digital Transformation & Tech',
    description: 'Esplora le nostre guide, tutorial e approfondimenti su Digital Transformation, Cloud, Cybersecurity, AI e Strategia IT per far crescere la tua azienda.',
    type: 'website',
  }
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Questo diventa un Server Component che carica e passa i dati
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const limit = 6;

  let posts: Post[] = [];
  let tags: Tag[] = [];
  let totalPages = 1;

  try {
    // Utilizza la funzione importata da db.ts
    const { posts: p, total } = await getPosts({ page, limit, search });
    posts = p;
    totalPages = Math.ceil(total / limit);
    tags = await getAllTags();
  } catch (error) {
    // La gestione dell'errore qui potrebbe mostrare un messaggio specifico nella UI
    // invece di far fallire l'intera pagina, se preferito.
    // Per ora, l'errore lanciato da getSortedPosts farà fallire il rendering.
    console.error("Error in BlogPage:", error);
  }
  
  // Il componente Blog dovrà accettare una prop 'posts' e 'tags'
  return (
    <Blog 
      posts={posts} 
      tags={tags} 
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
