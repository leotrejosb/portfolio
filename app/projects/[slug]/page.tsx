// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { Project } from '@/lib/projects-data'; 
import { notFound } from 'next/navigation';

// --- DATOS DE PRUEBA ---
// En un proyecto real, esto estaría en otro archivo, ej: /lib/mock-data.ts
const mockProjects: Project[] = [
  { 
    id: 1, 
    title: 'Mi Primer Proyecto', 
    slug: 'mi-primer-proyecto', 
    description: 'Esta es la descripción de mi primer proyecto increíble.',
    // ...otras propiedades de tu tipo Project
  },
  { 
    id: 2, 
    title: 'Otro Proyecto Genial', 
    slug: 'otro-proyecto-genial', 
    description: 'Este es aún mejor que el primero.',
    // ...otras propiedades de tu tipo Project
  },
];
// --- FIN DE DATOS DE PRUEBA ---

type PageProps = {
  params: { slug: string };
};

// Ahora esta función lee los datos locales, no una API.
export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Esta función busca el proyecto en nuestro array local.
async function getProject(slug: string): Promise<Project | null> {
  // Usamos .find() para buscar en el array de prueba.
  const project = mockProjects.find((p) => p.slug === slug);
  return project || null;
}

// El resto de tu componente no cambia.
export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}