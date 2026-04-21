'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <>
      {/* Section: Nossa História (Dark Strip) */}
      <section className="py-24 md:py-40 bg-dark-gradient text-white relative overflow-hidden" id="sobre">
        <div className="absolute inset-0 bg-glow opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px] font-bold uppercase tracking-widest mb-10">
              Nossa História
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
              <div className="space-y-10">
                <h2 className="text-white text-balance leading-[1.1] text-left">
                  Transformando a contabilidade em <br className="hidden md:block" /> inteligência de negócio.
                </h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl text-white/90 leading-relaxed font-light text-balance"
                >
                  A Officia Contabil nasceu para simplificar a contabilidade e transformar a burocracia em estratégia de crescimento. Acreditamos que o sucesso de uma empresa depende de uma base sólida, organizada e totalmente transparente.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-10"
              >
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                  <img 
                    src="/análise-estratégica.jpg?v=2"
                    alt="Análise de Dados e Inteligência Contábil"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                </div>

                <div className="space-y-6">
                  <p className="text-base md:text-lg text-white/50 leading-relaxed font-light">
                    Nossa missão é ser o braço direito do empreendedor, oferecendo inteligência financeira que vai além dos números, com foco no crescimento sustentável e na segurança do seu negócio.
                  </p>
                  <div className="h-px w-20 bg-secondary/30" />
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary/80 font-bold">
                    Compromisso com a Excelência
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
