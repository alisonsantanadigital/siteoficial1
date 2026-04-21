'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="flex justify-center mb-12">
          <img 
            src="/logo-oficial.png?v=2" 
            alt="OFFICIA ROCHA ASSESSORIA" 
            className="h-32 md:h-48 w-auto object-contain mix-blend-screen filter brightness-0 invert" 
          />
        </div>

        <div className="glass-dark border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[13px] font-bold uppercase tracking-widest mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Área Exclusiva
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              Em Construção
            </h1>
            
            <p className="text-slate-400 text-lg font-light max-w-md mx-auto leading-relaxed">
              Estamos preparando um portal moderno e seguro para facilitar a gestão do seu negócio. Volte em breve.
            </p>

            <div className="pt-8">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-all text-sm font-medium tracking-wide group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Voltar para o site principal
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold relative z-10">
        &copy; {new Date().getFullYear()} OFFICIA ROCHA ASSESSORIA
      </div>
    </div>
  );
}
