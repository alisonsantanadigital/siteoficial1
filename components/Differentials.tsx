'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/site-config';

export default function Differentials() {
  return (
    <section className="py-20 md:py-40 bg-slate-50" id="diferenciais">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 text-secondary/70 text-[11px] font-bold uppercase tracking-widest mb-6"
          >
            Nossos Diferenciais
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            Por que escolher a {siteConfig.name}?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-base"
          >
            Diferenciais que nos tornam o parceiro ideal para sua empresa alcançar novos patamares.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-premium transition-all duration-500 border border-black/5 group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="mb-4 text-[20px]">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
