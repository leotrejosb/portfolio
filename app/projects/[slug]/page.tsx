// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { Project } from '@/lib/projects-data'; // Use your existing TypeScript interface
import { notFound } from 'next/navigation';

// --- Step 1: Fetch all project slugs for static generation ---
export async function generateStaticParams() {
  // Fetch the list of all projects from your API
  const res = await fetch('http://127.0.0.1:8000/api/projects/');
  const projects: Project[] = await res.json();

  // Return an array of objects, where each object has a 'slug' property
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// --- Step 2: Fetch data for a single project ---
async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(`http://127.0.0.1:8000/api/projects/${slug}/`);

  // If the project doesn't exist, the API might return a 404
  if (!res.ok) {
    return null;
  }

  return res.json();
}

// --- Step 3: The Page Component ---
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Fetch the specific project data using the slug
  const project = await getProject(params.slug);

  // If the project is not found, show the 404 page
  if (!project) {
    notFound();
  }

  // Pass the fetched project data to your client component
  return <ProjectDetailClient project={project} />;
}