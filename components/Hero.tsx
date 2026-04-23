'use client';

import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowRight, Menu, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/site-config';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Serviços', href: '#servicos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-gradient">
      {/* Navigation Bar */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-4 transition-all duration-700 ${scrolled ? 'py-3' : 'py-8'}`}
      >
        <motion.div 
          layout
          className={`mx-auto flex items-center justify-between transition-all duration-700 ${
            scrolled 
              ? 'max-w-6xl px-8 py-3 glass-dark rounded-full shadow-2xl scale-95' 
              : 'max-w-7xl px-6 md:px-10 py-4 rounded-full bg-transparent'
          } ${isMobileMenuOpen ? 'glass-dark rounded-[2rem]' : ''}`}
        >
          <motion.a 
            layout
            href="#" 
            className="flex items-center transition-all duration-700"
          >
            <img 
              src="/logo-oficial.png?v=2" 
              alt="OFFICIA ROCHA ASSESSORIA" 
              className={`w-auto object-contain mix-blend-screen filter brightness-0 invert transition-all duration-700 ${
                scrolled ? 'h-12 md:h-16' : 'h-32 md:h-48'
              }`} 
            />
          </motion.a>
          
          <nav className={`hidden lg:flex items-center transition-all duration-700 ${scrolled ? 'gap-8 text-[12px]' : 'gap-10 text-[13px]'} text-white/70 font-medium tracking-tight`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href="/portal-cliente" 
              target="_blank"
              className={`flex items-center gap-2 rounded-full font-bold uppercase tracking-widest text-white bg-secondary hover:bg-white hover:text-primary transition-all duration-500 shadow-glow ${
                scrolled ? 'px-4 md:px-6 py-2 text-[10px] md:text-[11px]' : 'px-6 md:px-8 py-2.5 md:py-3 text-[11px] md:text-[13px]'
              }`}
            >
              <span className="hidden lg:inline">Acesso ao</span> Portal <span className="hidden sm:inline">do Cliente</span>
            </a>

            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-4 glass-dark rounded-[2.5rem] p-10 lg:hidden z-50 border border-white/10 shadow-2xl"
            >
              <nav className="flex flex-col gap-8 text-center">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-white/70 text-xl font-light hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background with subtle glow and zoom */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center zoom-bg opacity-50 transition-opacity duration-1000"
          style={{ backgroundImage: "url('/escritório-do-herói.png?v=2')" }}
        />
        <div className="absolute inset-0 bg-hero-overlay z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow opacity-40 blur-[120px] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.div 
          className="space-y-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[13px] font-medium tracking-wide mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Especialistas em Gestão de Alta Performance
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-light text-white tracking-[-0.04em] leading-[1.1] text-balance text-shadow-premium"
            >
              Gestão inteligente que <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-white bg-[length:200%_auto] animate-shimmer drop-shadow-sm">fortalece o seu negócio</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.p 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
                }
              }}
              className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] text-slate-300 font-light max-w-2xl mx-auto leading-relaxed text-balance tracking-tight opacity-90"
            >
              Contabilidade de alta performance para empresas que <br className="hidden md:block" /> 
              não aceitam nada menos que a excelência estratégica.
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
              }
            }}
            className="space-y-6"
          >
            <div className="text-white/90 text-lg md:text-2xl font-light">
              Honorários Mensais a partir de <span className="font-bold text-secondary">R$ 250,00</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[12px] md:text-[13px] text-white/60 font-medium tracking-widest uppercase">
              {['Humanizado', 'Ágil', 'Sem Burocracia'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-400 text-sm md:text-base font-light italic max-w-xl mx-auto opacity-70">
              Ideal para quem quer crescer com segurança e organização desde o início
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
              }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <a 
              href={`${siteConfig.whatsapp.link}?text=${encodeURIComponent(siteConfig.whatsapp.defaultMessage || '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secondary hover:bg-white hover:text-primary text-white px-10 py-5 rounded-full text-[15px] font-bold uppercase tracking-widest transition-all duration-500 shadow-glow group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-fast" />
              <span className="relative z-10 flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Fale com um Especialista
              </span>
            </a>

            <a 
              href="#servicos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-[15px] font-semibold tracking-wide transition-colors group"
            >
              Conheça nossas soluções
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
