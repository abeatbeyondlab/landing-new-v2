'use client';

import ReactMarkdown from 'react-markdown';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const customRenderers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code({ inline, className, children, ...rest }: any) {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match ? match[1] : undefined;

    if (inline || !lang) {
      return (
        <code className="bg-white/10 rounded px-1 py-0.5 text-sm font-mono text-blue-300">
          {children}
        </code>
      );
    }

    return (
      <div className="rounded-md overflow-hidden my-4 text-sm border border-white/10">
        <SyntaxHighlighter
          showInlineLineNumbers={true}
          language={lang}
          PreTag="div"
          style={materialOceanic}
          customStyle={{ margin: 0, fontSize: "0.8rem" }}
          {...rest}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
};

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
  image_slug: string;
}

interface PostDetailProps {
  post: Post;
  slug: string;
}

const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col w-full">
      <Header />
      {/* Background Elements (Simplified from Hero) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full p-5 sm:p-8">
        <div className="w-full max-w-4xl mt-20 flex flex-col items-start">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-slate-400 mb-6 space-x-2">
            <NextLink href="/" className="hover:text-blue-400 transition-colors">
              Home
            </NextLink>
            <FaArrowRight className="w-3 h-3" />
            <NextLink href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </NextLink>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white text-left mb-4 break-words w-full">
            {post.title}
          </h1>

          {/* Meta */}
          <p className="text-sm sm:text-base text-slate-400 text-left mb-4">
            Pubblicato il <b>{new Date(post.date).toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</b> da <b>{post.author}</b>
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <NextLink 
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-500/20 text-blue-200 border border-blue-500/20 hover:bg-blue-500/30 transition-colors"
                >
                  {tag.name}
                </NextLink>
              ))}
            </div>
          )}

          {/* Image */}
          {post.image_slug && (
            <div className="w-full flex justify-center mb-10">
              <img
                src={post.image_slug}
                alt={`Immagine per ${post.title}`}
                className="w-full max-w-3xl h-auto rounded-xl shadow-2xl border border-white/5 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <article className="prose prose-lg prose-invert max-w-none w-full prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <ReactMarkdown
              components={customRenderers}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;
