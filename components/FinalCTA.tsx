'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-40 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary p-8 md:p-24 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden group shadow-premium border border-white/5"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/30 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-white mb-10 leading-tight text-balance">
              {siteConfig.finalCTA.title}
            </h2>
            <p className="text-white/60 text-lg mb-12 text-balance">
              Junte-se a centenas de empresas que já transformaram sua realidade financeira com nossa inteligência contábil.
            </p>
            
            <a 
              href={`${siteConfig.whatsapp.link}?text=${encodeURIComponent(siteConfig.whatsapp.defaultMessage || '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-secondary hover:bg-white hover:text-primary text-white px-12 py-6 rounded-2xl text-[15px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl hover:shadow-secondary/20 group/btn"
            >
              <MessageCircle className="w-8 h-8 group-hover/btn:scale-110 transition-transform duration-500" />
              {siteConfig.finalCTA.buttonText}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
