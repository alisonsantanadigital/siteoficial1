'use client';

import { ArrowRight, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className="bg-dark-gradient text-white py-28 md:py-48">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
          <div className="lg:col-span-1">
            <div className="mb-10">
              <img 
                src="/logo-oficial.png?v=2" 
                alt="OFFICIA ROCHA ASSESSORIA" 
                className="h-28 md:h-56 w-auto object-contain mix-blend-screen filter brightness-0 invert" 
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-10 font-light text-[15px] md:text-base">
              Inteligência financeira e contabilidade estratégica para empresas que buscam alta performance e crescimento sustentável.
            </p>
            <div className="flex gap-5">
              <a 
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all duration-500 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={siteConfig.contact.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all duration-500 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-10">Serviços</h4>
            <ul className="space-y-5">
              {siteConfig.services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <a href="#servicos" className="text-slate-400 hover:text-secondary transition-all duration-300 text-[14px] md:text-base font-light hover:ml-2">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-10">Contato</h4>
            <ul className="space-y-6 text-slate-400">
              <li className="flex items-start gap-4">
                <span className="text-secondary mt-1">📍</span>
                <span className="text-[14px] md:text-[15px] font-light leading-relaxed">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-secondary">📧</span>
                <span className="text-[14px] md:text-[15px] font-light">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-secondary">📱</span>
                <span className="text-[14px] md:text-[15px] font-light">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-secondary">⏰</span>
                <span className="text-[14px] md:text-[15px] font-light">{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-10">Newsletter</h4>
            <p className="text-slate-400 text-[14px] font-light mb-8 leading-relaxed">Receba insights estratégicos diretamente no seu e-mail.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-secondary/10 w-full text-sm font-light transition-all"
              />
              <button className="bg-secondary hover:bg-white hover:text-primary text-white p-4 rounded-2xl transition-all duration-500 shadow-glow">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[12px] md:text-[13px] font-light">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-10 text-[12px] md:text-[13px] text-slate-600 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
