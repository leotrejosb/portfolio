// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { notFound } from 'next/navigation';
import { Project } from '@/lib/projects-data';

// ❌ ELIMINA esta definición local - está causando conflicto
// NO definas el tipo aquí, usa el importado

// --- DATOS DE PRUEBA ACTUALIZADOS ---
const mockProjects: Project[] = [
  { 
    id: '1', // ✅ Cambiado a string
    title: 'Mi Primer Proyecto Asombroso', 
    slug: 'mi-primer-proyecto-asombroso', 
    shortDescription: 'Una aplicación web de vanguardia para resolver un problema complejo.',
    fullDescription: 'Esta descripción completa detalla el propósito, la audiencia y las características clave del proyecto, ofreciendo una visión profunda de su funcionamiento interno y sus objetivos.',
    challenge: 'El principal desafío fue integrar múltiples APIs de terceros manteniendo un rendimiento óptimo y una experiencia de usuario fluida y sin interrupciones.',
    solution: 'Implementamos una arquitectura basada en microservicios y utilizamos técnicas de almacenamiento en caché del lado del servidor para reducir la latencia y mejorar los tiempos de carga.',
    image: 'https://via.placeholder.com/800x400',
    technologies: ['React', 'Next.js', 'TypeScript', 'Docker'],
    demoUrl: '#',
    githubUrl: '#',
    results: [
      'Mejora del 40% en el rendimiento general',
      'Reducción de latencia en un 60%',
      'Experiencia de usuario optimizada',
      'Integración exitosa de múltiples APIs'
    ],
  },
  { 
    id: '2', // ✅ Cambiado a string
    title: 'Otro Proyecto Innovador', 
    slug: 'otro-proyecto-innovador', 
    shortDescription: 'Explorando nuevas fronteras en el desarrollo web con un enfoque en rendimiento.',
    fullDescription: 'Descripción completa del proyecto innovador que demuestra las capacidades avanzadas de desarrollo web moderno utilizando las últimas tecnologías y mejores prácticas de la industria.',
    challenge: 'El reto era crear una interfaz altamente interactiva sin sacrificar velocidad ni accesibilidad.',
    solution: 'La solución fue usar SvelteKit por su compilación eficiente y mínima sobrecarga en el cliente, combinado con optimizaciones de rendering.',
    image: 'https://via.placeholder.com/800x400',
    technologies: ['SvelteKit', 'Tailwind CSS', 'Vercel', 'TypeScript'],
    demoUrl: '#',
    githubUrl: '#',
    results: [
      'Interfaz ultra-rápida con tiempos de carga <1s',
      'Experiencia fluida en todos los dispositivos',
      'Puntuación perfecta en Lighthouse',
      'Accesibilidad AAA cumplida'
    ],
  },
  {
    id: '3', // ✅ Cambiado a string
    title: 'Aplicación de Gestión de Tareas',
    slug: 'aplicacion-gestion-tareas',
    shortDescription: 'Una potente aplicación para organizar tus tareas y mejorar tu productividad.',
    fullDescription: 'Aplicación completa de gestión de tareas que permite a los usuarios organizar su trabajo de manera eficiente, con sincronización en tiempo real y colaboración en equipo.',
    challenge: 'El desafío consistía en sincronizar datos en tiempo real entre múltiples dispositivos de forma segura y mantener la consistencia de datos.',
    solution: 'Se utilizó una base de datos PostgreSQL con WebSockets para notificaciones push instantáneas y un sistema de resolución de conflictos optimista.',
    image: 'https://via.placeholder.com/800x400',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'WebSockets', 'Redis'],
    demoUrl: '#',
    githubUrl: '#',
    results: [
      'Sincronización en tiempo real <100ms',
      'Seguridad mejorada con encriptación end-to-end',
      '99.9% de uptime',
      'Más de 10,000 usuarios activos'
    ],
  }
];
// --- FIN DE DATOS DE PRUEBA ---

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProject(slug: string): Promise<Project | null> {
  const project = mockProjects.find((p) => p.slug === slug);
  return project || null;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}