import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OFFICIA ROCHA ASSESSORIA | Inteligência Financeira e Contabilidade de Alta Performance',
  description: 'Transformamos burocracia em inteligência estratégica. Contabilidade premium para empresas que buscam crescimento sólido e segurança fiscal absoluta.',
  keywords: ['contabilidade premium', 'inteligência financeira', 'gestão contábil', 'planejamento tributário', 'Officia Contabil'],
  authors: [{ name: 'Officia Contabil' }],
  openGraph: {
    title: 'Officia Contabil | Inteligência Financeira Premium',
    description: 'Gestão contábil de alta performance para empresas que buscam o próximo nível.',
    url: 'https://officia.contabil',
    siteName: 'Officia Contabil',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Officia Contabil | Inteligência Financeira',
    description: 'Transformamos burocracia em estratégia com precisão absoluta.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-primary selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
