import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ChatwootWidget from '@/components/ChatwootWidget';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Leonardo Trejos | Full-Stack Developer & Cybersecurity Analyst',
  description: 'Especializado en desarrollo full-stack, ciberseguridad y arquitectura AWS. Construyendo soluciones seguras, escalables y de alto rendimiento.',
  keywords: ['Full-Stack Developer', 'Cybersecurity', 'AWS', 'Django', 'Next.js', 'React', 'Security'],
  authors: [{ name: 'Leonardo Trejos' }],
  openGraph: {
    title: 'Leonardo Trejos | Full-Stack Developer & Cybersecurity Analyst',
    description: 'Especializado en desarrollo full-stack, ciberseguridad y arquitectura AWS.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}> 
      <body>
        {children}
        <ChatwootWidget />
      </body>
    </html>
  );
}