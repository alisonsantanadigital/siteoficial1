'use client';

import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Testimonials() {
  return (
    <section className="py-28 md:py-48 bg-dark-gradient text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-glow opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            Feedback do Google Maps
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[56px] text-white font-light tracking-tight mb-8 leading-tight"
          >
            Excelência Comprovada por <br className="hidden md:block" /> <span className="font-semibold text-secondary">Nossos Clientes</span>
          </motion.h2>
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-white/50 text-[13px] md:text-[14px] font-medium tracking-wide uppercase px-4 py-1 bg-white/5 rounded-full">4.9/5 estrelas no Google Maps</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {siteConfig.testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] relative group border border-white/5 hover:border-white/10 transition-all duration-700 h-full flex flex-col cursor-default"
            >
              <div className="flex gap-1 text-yellow-500 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current opacity-80" />
                ))}
              </div>
              <Quote className="absolute top-10 right-10 w-12 h-12 text-white/5 group-hover:text-secondary/20 transition-colors duration-700" />
              <p className="text-[17px] md:text-[18px] font-light italic mb-12 leading-relaxed text-white/90 relative z-10 flex-grow tracking-tight">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl border border-secondary/20 shadow-glow">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-white text-base md:text-lg tracking-tight">{t.name}</p>
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</div>
                  </div>
                  <p className="text-[11px] md:text-[12px] text-white/40 font-medium uppercase tracking-[0.15em]">{t.company}</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                <span className="text-[10px] md:text-[11px] text-white/20 uppercase tracking-[0.2em] font-bold">Verificado no Google Maps</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
