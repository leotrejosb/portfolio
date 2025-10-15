// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { Project } from '@/lib/projects-data'; 
import { notFound } from 'next/navigation';

// ✅ Correctly define the props interface
interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const res = await fetch('http://127.0.0.1:8000/api/projects/');
  const projects: Project[] = await res.json();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(`http://127.0.0.1:8000/api/projects/${slug}/`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// ✅ Apply the correct type to the component's props
export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}