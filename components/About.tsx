'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <>
      {/* Section: Nossa História (Dark Strip) */}
      <section className="py-28 md:py-48 bg-dark-gradient text-white relative overflow-hidden" id="sobre">
        <div className="absolute inset-0 bg-glow opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-12">
              Nossa História
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
              <div className="space-y-8 md:space-y-12">
                <h2 className="text-[32px] md:text-[56px] text-white text-balance leading-[1.1] text-left font-light tracking-tight">
                  Transformando a contabilidade em <br className="hidden md:block" /> <span className="font-semibold text-secondary">inteligência de negócio.</span>
                </h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[17px] md:text-[21px] text-white/90 leading-relaxed font-light text-balance tracking-tight"
                >
                  A Officia Contabil nasceu para simplificar a contabilidade e transformar a burocracia em estratégia de crescimento. Acreditamos que o sucesso de uma empresa depende de uma base sólida, organizada e totalmente transparente.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-12 md:space-y-16"
              >
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                  <Image 
                    src="/análise-estratégica.jpg?v=2"
                    alt="Análise de Dados e Inteligência Contábil"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                </div>

                <div className="space-y-8">
                  <p className="text-[16px] md:text-[18px] text-white/50 leading-relaxed font-light">
                    Nossa missão é ser o braço direito do empreendedor, oferecendo inteligência financeira que vai além dos números, com foco no crescimento sustentável e na segurança do seu negócio.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="h-px w-16 bg-secondary/40" />
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-secondary font-bold">
                      Compromisso com a Excelência
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
