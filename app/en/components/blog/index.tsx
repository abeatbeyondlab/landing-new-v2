'use client'
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdSearch } from "react-icons/md";
import { Header } from '../Header';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer), {
  loading: () => <div className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-sm"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></div>
});

interface Tag {
  name: string;
  slug: string;
}

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags: Tag[];
  image_slug?: string;
}

interface BlogProps {
  posts: Post[];
  title?: string;
  subtitle?: string;
  tags?: Tag[];
  showBackLink?: boolean;
  totalPages: number;
  currentPage: number;
}

export const Blog = ({ 
  posts, 
  title, 
  subtitle, 
  tags, 
  showBackLink = false,
  totalPages,
  currentPage 
}: BlogProps) => {
  const t = useTranslations('blog');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const displayTitle = title || t('title');
  const displaySubtitle = subtitle || t('subtitle');

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = () => {
    if (searchTerm.length > 0 && searchTerm.length < 3) {
      return;
    }
    
    const params = new URLSearchParams(searchParams);
    if (searchTerm.length >= 3) {
        params.set('q', searchTerm);
    } else {
        params.delete('q');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const default_blog_image_slug = "1.webp"; 

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col w-full">
      <Header />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center mx-auto pb-20">
        
        {showBackLink && (
          <div className="w-full max-w-3xl mx-auto mt-32 mb-4 px-4 md:px-0">
            <NextLink 
              href="/en/blog" 
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors gap-2"
            >
              <MdOutlineNavigateBefore className="text-xl" /> {t('backToBlog')}
            </NextLink>
          </div>
        )}

        <h1 className={`text-4xl font-display font-bold text-center mb-2 text-white ${!showBackLink ? 'mt-32' : ''}`}>
          {displayTitle}
        </h1>
        <p className="text-lg text-center mb-8 text-slate-300">
          {displaySubtitle}
        </p>
      
        <div className="w-full md:max-w-md my-3 relative">
            <input
            type="text"
            className="w-full px-4 py-2 pr-10 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
                aria-label="Search"
            >
                <MdSearch className="w-6 h-6" />
            </button>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mb-8">
            {tags.map((tag) => (
              <NextLink
                key={tag.slug}
                href={`/en/blog/tag/${tag.slug}`}
                className="px-3 py-1 text-sm text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-blue-500/20 hover:text-blue-200 hover:border-blue-500/30 transition-all"
              >
                #{tag.name}
              </NextLink>
            ))}
          </div>
        )}
      
        {posts.length === 0 ? (
          <p className="text-slate-400">{t('noPosts')}</p>
        ) : (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col md:flex-row bg-white/5 border border-white/10 shadow-lg rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 ease-in-out backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-full md:w-64 h-48 md:h-auto flex justify-center items-center bg-black/20">
                  <img
                    className="object-cover w-full h-full md:w-full md:h-auto opacity-90 hover:opacity-100 transition-opacity"
                    src={(post?.image_slug ?? default_blog_image_slug)}
                    alt={`Image for ${post.title}`}
                  />
                </div>

                <div className="flex-1 p-4 md:p-6 flex flex-col items-start">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <NextLink 
                          key={tag.slug}
                          href={`/en/blog/tag/${tag.slug}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-500/20 text-blue-200 border border-blue-500/20 hover:bg-blue-500/30 transition-colors"
                        >
                          {tag.name}
                        </NextLink>
                      ))}
                    </div>
                  )}

                  <h2 className="text-2xl font-display font-bold mb-1 text-white">
                    <NextLink href={`/en/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                      {post.title}
                    </NextLink>
                  </h2>

                  <p className="text-xs text-slate-400 mb-2">
                    {t('by')} {post.author} {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <p className="text-sm text-slate-300 mb-3 line-clamp-3">
                    {post.description}
                  </p>

                  <NextLink 
                    href={`/en/blog/${post.slug}`}
                    className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    {t('readRead')} <MdOutlineNavigateNext className="text-lg" />
                  </NextLink>
                </div>
              </article>
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
              aria-label="Previous"
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdOutlineNavigateBefore className="w-6 h-6" />
            </button>

            <span className="text-slate-300">
              {t('pageOf', { current: currentPage, total: totalPages })}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              aria-label="Next"
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