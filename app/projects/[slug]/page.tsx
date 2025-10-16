// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { Project } from '@/lib/projects-data'; 
import { notFound } from 'next/navigation';

// Define un tipo explícito para las props de la página.
type PageProps = {
  params: {
    slug: string;
  };
};

// Fetches all project slugs to pre-build pages at build time.
export async function generateStaticParams() {
  // TODO: Replace with your live API endpoint URL
  const res = await fetch('http://127.0.0.1:8000/api/projects/');
  
  // Es una buena práctica manejar el caso en que el fetch falle durante la compilación.
  if (!res.ok) {
    return [];
  }

  const projects: Project[] = await res.json();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Fetches the data for a single project.
async function getProject(slug: string): Promise<Project | null> {
  // TODO: Replace with your live API endpoint URL
  const res = await fetch(`http://127.0.0.1:8000/api/projects/${slug}/`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// El componente de la página ahora usa el tipo 'PageProps' que definimos.
export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}