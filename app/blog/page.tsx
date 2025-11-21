import { Blog } from '@/components/blog';
import { getSortedPosts, Post } from '@/data/db'; // Importazioni centralizzate

// Questo diventa un Server Component che carica e passa i dati
export default async function BlogPage() {
  let sortedPosts: Post[] = [];
  try {
    // Utilizza la funzione importata da db.ts
    sortedPosts = await getSortedPosts();
  } catch (error) {
    // La gestione dell'errore qui potrebbe mostrare un messaggio specifico nella UI
    // invece di far fallire l'intera pagina, se preferito.
    // Per ora, l'errore lanciato da getSortedPosts farà fallire il rendering.
    console.error("Error in BlogPage:", error);
  }
  
  // Il componente Blog dovrà accettare una prop 'posts'
  return <Blog 
  
  posts={sortedPosts} />;
}
