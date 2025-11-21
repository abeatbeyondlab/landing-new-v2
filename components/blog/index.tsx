'use client'
import { useState } from 'react';
import NextLink from 'next/link';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  image_slug?: string;
}

interface BlogProps {
  posts: Post[];
}

export const Blog = ({ posts }: BlogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 3;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const default_blog_image_slug = "1.webp"; 

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col items-center w-full">
      <Header />
      {/* Background Elements matched from Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <h1 className="text-4xl font-display font-bold text-center mb-2 text-white mt-32">
          Blog
        </h1>
        <p className="text-lg text-center mb-8 text-slate-300">
          Leggi gli ultimi post!!
        </p>
      
        <input
          type="text"
          className="w-full md:max-w-md my-3 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all"
          placeholder="Cerca per titolo o descrizione..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      
        {filteredPosts.length === 0 ? (
          <p className="text-slate-400">Nessun articolo trovato.</p>
        ) : (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            {currentPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col md:flex-row bg-white/5 border border-white/10 shadow-lg rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 ease-in-out backdrop-blur-sm"
              >
                {/* Immagine */}
                <div className="flex-shrink-0 w-full md:w-64 h-48 md:h-auto flex justify-center items-center bg-black/20">
                  <img
                    className="object-cover w-full h-full md:w-full md:h-auto opacity-90 hover:opacity-100 transition-opacity"
                    src={(post?.image_slug ?? default_blog_image_slug)}
                    alt={`Immagine per ${post.title}`}
                  />
                </div>

                {/* Contenuto */}
                <div className="flex-1 p-4 md:p-6 flex flex-col items-start">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-500/20 text-blue-200 border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Titolo */}
                  <h2 className="text-2xl font-display font-bold mb-1 text-white">
                    <NextLink href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                      {post.title}
                    </NextLink>
                  </h2>

                  {/* Autore e Data */}
                  <p className="text-xs text-slate-400 mb-2">
                    Di {post.author} {new Date(post.date).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} - 5 minuti
                  </p>

                  {/* Descrizione */}
                  <p className="text-sm text-slate-300 mb-3 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Link Leggi */}
                  <NextLink 
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    Leggi &gt;
                  </NextLink>
                </div>
              </article>
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 p-4">
            <button
              onClick={handlePrevPage} 
              disabled={currentPage === 1} 
              aria-label="Precedente"
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdOutlineNavigateBefore className="w-6 h-6" />
            </button>

            <span className="text-slate-300">
              Pagina {currentPage} di {totalPages}
            </span>

            <button
              onClick={handleNextPage} 
              disabled={currentPage === totalPages} 
              aria-label="Successivo"
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdOutlineNavigateNext className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
