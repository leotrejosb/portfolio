import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Importa la fuente Inter

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'], // ✅ Asegúrate de cargar todos los pesos que usarás
  variable: '--font-sans', // Asigna a la variable CSS
});

export const metadata: Metadata = {
  title: 'Tu Nombre | Full-Stack Developer & Cybersecurity Analyst',
  description: 'Especializado en desarrollo full-stack, ciberseguridad y arquitectura AWS. Construyendo soluciones seguras, escalables y de alto rendimiento.',
  keywords: ['Full-Stack Developer', 'Cybersecurity', 'AWS', 'Django', 'Next.js', 'React', 'Security'],
  authors: [{ name: 'Tu Nombre' }],
  openGraph: {
    title: 'Tu Nombre | Full-Stack Developer & Cybersecurity Analyst',
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
    // ✅ Aplica la clase 'dark' y la variable de la fuente Inter
    <html lang="es" className="dark ${inter.variable}"> 
      <body>{children}</body>
    </html>
  );
}