'use client';

import { ArrowRight, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className="bg-dark-gradient text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="mb-8">
              <img 
                src="/logo-oficial.png?v=2" 
                alt="OFFICIA ROCHA ASSESSORIA" 
                className="h-40 md:h-56 w-auto object-contain mix-blend-screen filter brightness-0 invert" 
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Inteligência financeira e contabilidade estratégica para empresas que buscam alta performance e crescimento sustentável.
            </p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={siteConfig.contact.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[13px] mb-8">Serviços</h4>
            <ul className="space-y-4">
              {siteConfig.services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <a href="#servicos" className="text-slate-400 hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[13px] mb-8">Contato</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-secondary">📍</span>
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">📧</span>
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">📱</span>
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">⏰</span>
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[13px] mb-8">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6">Receba insights estratégicos diretamente no seu e-mail.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/20 w-full text-sm"
              />
              <button className="bg-secondary hover:bg-secondary/80 text-white p-3 rounded-xl transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
