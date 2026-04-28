'use client';

import { motion } from 'motion/react';

interface SectionDividerProps {
  variant: 'light' | 'dark' | 'premium';
  className?: string;
}

export default function SectionDivider({ variant, className = "" }: SectionDividerProps) {
  const isLight = variant === 'light';
  const isPremium = variant === 'premium';
  
  // Specs from user:
  // Light divider: #F5F7FA (bg-[#F5F7FA])
  // Dark divider: #0B1F3A (bg-[#0B1F3A])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`w-full relative overflow-hidden ${
        isLight ? 'h-12 md:h-20 bg-[#F5F7FA]' : 
        isPremium ? 'h-32 bg-dark-gradient' :
        'h-12 md:h-20 bg-[#0B1F3A]'
      } ${className}`}
    >
      {/* Subtle depth enhancements */}
      {!isPremium && (
        <div className={`absolute inset-0 pointer-events-none ${
          isLight 
            ? 'bg-gradient-to-b from-black/[0.03] to-transparent' 
            : 'bg-gradient-to-b from-white/[0.02] to-transparent'
        }`} />
      )}
      
      {/* Premium Specific Elements */}
      {isPremium && (
        <>
          <div className="absolute inset-0 bg-glow opacity-5" />
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 blur-xl rounded-full" />
              
              <div className="flex items-center gap-6 md:gap-12 relative z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="h-px bg-gradient-to-r from-transparent to-secondary/60 hidden md:block" 
                />
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-glow" />
                  <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-secondary/40 to-transparent mt-2" />
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="h-px bg-gradient-to-l from-transparent to-secondary/60 hidden md:block" 
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Standard center accent for light/dark */}
      {!isPremium && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center opacity-30">
          <div className={`w-24 md:w-48 h-px ${isLight ? 'bg-primary/20' : 'bg-secondary/40'}`} />
          <div className={`w-1.5 h-1.5 rounded-full rotate-45 border ${isLight ? 'border-primary/40' : 'border-secondary/60'} mx-4 md:mx-8`} />
          <div className={`w-24 md:w-48 h-px ${isLight ? 'bg-primary/20' : 'bg-secondary/40'}`} />
        </div>
      )}

      {/* Subtle ambient light for dark variant */}
      {!isLight && (
        <>
          <div className="absolute top-0 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </>
      )}
    </motion.div>
  );
}
