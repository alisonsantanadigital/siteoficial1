'use client';

import { motion } from 'motion/react';

interface SectionDividerProps {
  variant: 'light' | 'dark';
  className?: string;
}

export default function SectionDivider({ variant, className = "" }: SectionDividerProps) {
  const isLight = variant === 'light';
  
  // Specs from user:
  // Light divider: #F5F7FA (bg-[#F5F7FA])
  // Dark divider: #0B1F3A (bg-[#0B1F3A])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`w-full h-12 md:h-20 relative overflow-hidden ${isLight ? 'bg-[#F5F7FA]' : 'bg-[#0B1F3A]'} ${className}`}
    >
      {/* Subtle depth enhancements as requested */}
      <div className={`absolute inset-0 pointer-events-none ${
        isLight 
          ? 'bg-gradient-to-b from-black/[0.03] to-transparent' 
          : 'bg-gradient-to-b from-white/[0.02] to-transparent'
      }`} />
      
      {/* Soft blur edge for smooth transition */}
      <div className={`absolute top-0 left-0 w-full h-4 ${isLight ? 'bg-gradient-to-b from-black/[0.05]' : 'bg-gradient-to-b from-white/[0.02]'} to-transparent`} />
      <div className={`absolute bottom-0 left-0 w-full h-4 ${isLight ? 'bg-gradient-to-t from-black/[0.05]' : 'bg-gradient-to-t from-white/[0.02]'} to-transparent`} />
      
      {/* Decorative center accent */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center opacity-30">
        <div className={`w-24 md:w-48 h-px ${isLight ? 'bg-primary/20' : 'bg-secondary/40'}`} />
        <div className={`w-1.5 h-1.5 rounded-full rotate-45 border ${isLight ? 'border-primary/40' : 'border-secondary/60'} mx-4 md:mx-8`} />
        <div className={`w-24 md:w-48 h-px ${isLight ? 'bg-primary/20' : 'bg-secondary/40'}`} />
      </div>

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
