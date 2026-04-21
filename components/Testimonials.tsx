'use client';

import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-40 bg-dark-gradient text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-glow opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[12px] font-bold uppercase tracking-widest mb-6"
          >
            Feedback do Google Maps
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white mb-6"
          >
            Excelência Comprovada por Nossos Clientes
          </motion.h2>
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-white/80 text-sm font-medium ml-2">4.9/5 estrelas no Google Maps</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] relative group border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <Quote className="absolute top-8 right-10 w-12 h-12 text-white/5 group-hover:text-secondary/20 transition-colors duration-500" />
              <p className="text-lg italic mb-10 leading-relaxed text-white/90 relative z-10">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl border border-secondary/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px]">✓</div>
                  </div>
                  <p className="text-[13px] text-white/50 font-medium uppercase tracking-wider">{t.company}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
                <span className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Verificado no Google Maps</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
