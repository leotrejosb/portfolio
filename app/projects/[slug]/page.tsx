// app/projects/[slug]/page.tsx

import { ProjectDetailClient } from '@/components/project-detail-client';
import { notFound } from 'next/navigation';

// 1. Define el tipo de dato TAL CUAL VIENE DE LA API (snake_case)
//    Similar a 'ApiCompetition' en tu otro archivo.
interface ApiProject {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  demo_url: string | null;
  github_url: string | null;
}

// 2. Define las props para la página con 'params' como Promise
//    Exactamente como en tu archivo de competencias.
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// --- FUNCIONES PARA OBTENER DATOS DE LA API DE DJANGO ---

/**
 * Obtiene la lista completa de proyectos para generar las páginas estáticas.
 */
async function getAllProjects(): Promise<ApiProject[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    console.error('Error: La variable de entorno NEXT_PUBLIC_API_BASE_URL no está configurada.');
    return [];
  }

  try {
    const res = await fetch(`${apiBaseUrl}/projects/`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Error al obtener proyectos: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    // Soporta respuestas paginadas (con 'results') y no paginadas.
    return data.results || data;
  } catch (error) {
    console.error('No se pudo conectar con la API para obtener los proyectos.', error);
    return [];
  }
}

/**
 * Obtiene los datos de un único proyecto a partir de su slug.
 * Usamos el endpoint de detalle que es más eficiente.
 */
async function getProject(slug: string): Promise<ApiProject | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    console.error('Error: La variable de entorno NEXT_PUBLIC_API_BASE_URL no está configurada.');
    return null;
  }
  
  try {
    // Usamos el endpoint de detalle `/api/projects/{slug}/`
    const res = await fetch(`${apiBaseUrl}/projects/${slug}/`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`Error al obtener el proyecto (${slug}): ${res.statusText}`);
      }
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`No se pudo conectar con la API para obtener el proyecto (${slug}).`, error);
    return null;
  }
}

// 3. FUNCIÓN PARA TRANSFORMAR LOS DATOS (MAPPER)
/**
 * Convierte los datos de la API (snake_case) al formato que esperan los
 * componentes de cliente (camelCase) y ajusta los tipos.
 */
function mapApiToClient(apiProject: ApiProject) {
  return {
    id: String(apiProject.id), // Convierte a string
    title: apiProject.title,
    slug: apiProject.slug,
    shortDescription: apiProject.short_description,
    fullDescription: apiProject.full_description,
    challenge: apiProject.challenge,
    solution: apiProject.solution,
    results: apiProject.results,
    technologies: apiProject.technologies,
    image: apiProject.image,
    demoUrl: apiProject.demo_url,
    githubUrl: apiProject.github_url,
  };
}

/**
 * Genera las rutas estáticas en el momento de la construcción (build)
 * llamando a la API para obtener todos los slugs de los proyectos.
 */
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 4. COMPONENTE DE LA PÁGINA (SERVIDOR)
export default async function ProjectDetailPage({ params }: PageProps) {
  // Resuelve la promesa para obtener el slug
  const { slug } = await params;
  const apiProject = await getProject(slug);

  // Si el proyecto no se encuentra en la API, muestra la página 404.
  if (!apiProject) {
    notFound();
  }

  // Transforma los datos al formato correcto antes de pasarlos al componente cliente.
  const project = mapApiToClient(apiProject);

  return <ProjectDetailClient project={project} />;
}