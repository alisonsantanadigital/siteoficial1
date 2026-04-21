'use client';

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function GoogleMap() {
  // Encoded address for the map URL
  const encodedAddress = encodeURIComponent(siteConfig.contact.address);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <section className="bg-white py-0 overflow-hidden">
      <div className="relative w-full h-[450px] group">
        {/* Floating Address Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute top-10 left-4 md:left-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-premium border border-slate-100 max-w-sm hidden sm:block"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-glow">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-primary font-bold text-lg mb-1">Nossa Unidade</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {siteConfig.contact.address} <br />
                São Paulo - SP
              </p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
              >
                Como Chegar →
              </a>
            </div>
          </div>
        </motion.div>

        {/* The Map */}
        <iframe
          title="Localização OFFICIA Contábil"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(1.0)' }}
          src={mapUrl}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
