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
    <section className="py-20 md:py-40 bg-white" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[12px] font-bold uppercase tracking-widest mb-6">
              Contato
            </div>
            <h2 className="mb-8 text-balance">
              {siteConfig.contact.title}
            </h2>
            <p className="text-lg mb-12 text-balance">
              {siteConfig.contact.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-text-muted mb-1">E-mail</p>
                  <p className="text-lg font-semibold">{siteConfig.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-text-muted mb-1">Telefone</p>
                  <p className="text-lg font-semibold">{siteConfig.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-text-muted mb-1">Localização</p>
                  <p className="text-lg font-semibold">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-premium"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mensagem Enviada!</h3>
                <p className="text-slate-600 mb-8">Obrigado pelo contato. Nossa equipe retornará em breve.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-bold uppercase tracking-widest text-sm hover:text-secondary transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-widest text-text-muted ml-1">Nome</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-widest text-text-muted ml-1">E-mail</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-widest text-text-muted ml-1">Empresa</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-widest text-text-muted ml-1">Mensagem</label>
                  <textarea 
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar seu negócio hoje?"
                    className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-2xl text-[15px] font-bold uppercase tracking-widest transition-all duration-500 shadow-lg hover:shadow-secondary/20 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      {siteConfig.contact.buttonText}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
