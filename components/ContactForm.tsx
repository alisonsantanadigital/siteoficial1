'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = 'leads';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      // Prepare WhatsApp Message
      const whatsappMessage = `*Novo Contato do Site OFFICIA*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*E-mail:* ${formData.email}\n` +
        `*Empresa:* ${formData.company || 'Não informada'}\n` +
        `*Mensagem:* ${formData.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/5511955907718?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-28 md:py-48 bg-white" id="contato">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-10">
              Contato
            </div>
            <h2 className="text-[32px] md:text-[56px] font-light tracking-tight leading-tight mb-10 text-balance">
              {siteConfig.contact.title}
            </h2>
            <p className="text-[17px] md:text-[20px] mb-16 text-balance text-slate-500 font-light leading-relaxed">
              {siteConfig.contact.description}
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 group-hover:shadow-glow transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
                  <Mail className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">E-mail</p>
                  <p className="text-[18px] md:text-[20px] font-medium text-primary tracking-tight">{siteConfig.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 group-hover:shadow-glow transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
                  <Phone className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">Telefone</p>
                  <p className="text-[18px] md:text-[20px] font-medium text-primary tracking-tight">{siteConfig.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 group-hover:shadow-glow transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
                  <MapPin className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">Localização</p>
                  <p className="text-[18px] md:text-[20px] font-medium text-primary leading-snug tracking-tight">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-50 p-8 md:p-16 rounded-[3rem] border border-black/5 shadow-premium mt-8 lg:mt-0"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-10 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-light tracking-tight mb-4">Mensagem Enviada!</h3>
                <p className="text-slate-500 mb-10 font-light max-w-sm">Obrigado pelo contato. Nossa equipe de especialistas retornará em breve.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-bold uppercase tracking-[0.2em] text-[11px] hover:text-secondary transition-all hover:tracking-[0.3em]"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Nome</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full bg-white border border-black/[0.08] rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all placeholder:text-slate-300 font-light"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">E-mail</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full bg-white border border-black/[0.08] rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all placeholder:text-slate-300 font-light"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Empresa</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    className="w-full bg-white border border-black/[0.08] rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all placeholder:text-slate-300 font-light"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Mensagem</label>
                  <textarea 
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar seu negócio hoje?"
                    className="w-full bg-white border border-black/[0.08] rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all placeholder:text-slate-300 font-light resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-white py-6 rounded-2xl text-[14px] font-bold uppercase tracking-[0.2em] transition-all duration-700 shadow-lg hover:shadow-secondary/20 group flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      {siteConfig.contact.buttonText}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
