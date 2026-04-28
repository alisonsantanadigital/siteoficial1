'use client';

import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function BlogListing() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-dark-gradient py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar para o site
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px] font-bold uppercase tracking-widest mb-6">
              Inteligência & Conteúdo
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Blog <span className="text-secondary">OFFICIA</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light">
              Artigos, guias e insights estratégicos para impulsionar a gestão do seu negócio em 2026.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {siteConfig.blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 bg-slate-200 shadow-lg">
                    {post.image && (
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-primary text-[11px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[12px] text-slate-500 font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl text-primary group-hover:text-secondary transition-colors duration-300 leading-tight font-bold">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary font-bold text-xs">
                        HR
                      </div>
                      <span className="text-[13px] font-semibold text-primary">Por {post.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
