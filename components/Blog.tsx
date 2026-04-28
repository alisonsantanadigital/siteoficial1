'use client';

import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

export default function Blog() {
  return (
    <section className="py-32 md:py-52 bg-slate-950 relative overflow-hidden" id="blog">
      {/* Decorative background elements for dark theme */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle texture/grid for sophistication */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-32 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[12px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Inteligência & Conteúdo Estratégico
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl text-white font-bold tracking-tight leading-[1.1]"
            >
              Nossos Insights: <br className="hidden md:block" />
              <span className="text-secondary italic font-light">Estratégias</span> para o amanhã
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed"
            >
              Antecipamos tendências e simplificamos a legislação para que você foque no que realmente importa: o crescimento do seu negócio.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center gap-4 bg-white/5 hover:bg-white text-white hover:text-primary border border-white/10 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[13px] transition-all duration-500 shadow-sm hover:shadow-glow group"
            >
              Ver todos os insights
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {siteConfig.blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl group-hover:shadow-glow transition-all duration-700 bg-slate-900/50 border border-white/5 p-1.5">
                  <div className="w-full h-full rounded-[2.1rem] overflow-hidden relative">
                    {post.image && (
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-1.5 rounded-lg bg-secondary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 space-y-6">
                  <div className="flex items-center gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-secondary transition-colors duration-500 leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 line-clamp-2 leading-relaxed text-[15px] md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-6 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary font-bold text-[10px] border border-white/10 group-hover:border-secondary/50 transition-colors">
                        OFF
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-200 uppercase tracking-wider">{post.author}</span>
                        <span className="text-[10px] text-slate-500 font-medium">Contabilidade de Elite</span>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom Highlight Area - Deepened Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-32 md:mt-48 relative"
        >
          <div className="absolute inset-0 bg-secondary/5 rounded-[3rem] blur-3xl -z-10" />
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/[0.05] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
            {/* Pattern/Shape decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">
                Próximos Passos
              </div>
              <h4 className="text-3xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                Leve sua empresa para o <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">próximo nível</span> agora.
              </h4>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                Nossa assessoria vai além da conformidade. Entregamos inteligência estratégica para decisões de alta performance.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-12 py-5 bg-secondary hover:bg-white text-white hover:text-primary rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all duration-500 shadow-xl hover:shadow-secondary/20"
                >
                  Consultoria Gratuita
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Smooth transition gradient at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
