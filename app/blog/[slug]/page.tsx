'use client';

import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Hero from '@/components/Hero'; // We might need a simpler nav for blog pages
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = siteConfig.blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Nav for Blog */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full glass-dark">
          <Link href="/" className="text-white font-bold text-xl tracking-tighter">
            OFFICIA<span className="text-secondary">.</span>
          </Link>
          <Link href="/#blog" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Voltar ao Blog
          </Link>
        </div>
      </nav>

      <article className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/#blog"
              className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-[11px] mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Blog
            </Link>
            
            <div className="flex items-center gap-4 text-[13px] text-text-muted font-medium uppercase tracking-wider mb-6">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-primary">{post.category}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
              {post.title}
            </h1>

            {post.image && (
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border border-slate-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center justify-between py-8 border-y border-slate-100 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  HR
                </div>
                <div>
                  <p className="font-bold text-primary">Escrito por {post.author}</p>
                  <p className="text-sm text-text-muted">Especialista em Gestão Contábil</p>
                </div>
              </div>
              <button className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors">
                <Share2 className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div 
              className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </motion.div>
        </div>
      </article>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Gostou deste conteúdo?</h3>
          <p className="text-slate-600 mb-10">Assine nossa newsletter e receba insights estratégicos diretamente no seu e-mail.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors">
              Assinar
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
