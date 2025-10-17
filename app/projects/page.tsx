'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Rocket, LoaderCircle } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { MatrixBackground } from '@/components/matrix-background';

// 1. Define el tipo de dato que viene de la API (snake_case)
interface ApiProject {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  image: string;
  technologies: string[];
  demo_url?: string | null;
  github_url?: string | null;
}

// 2. Define el tipo de dato que espera tu componente ProjectCard (camelCase)
interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
}

// 3. Función para transformar los datos
function mapApiToClient(apiProject: ApiProject): Project {
  return {
    id: String(apiProject.id),
    title: apiProject.title,
    slug: apiProject.slug,
    shortDescription: apiProject.short_description,
    image: apiProject.image,
    technologies: apiProject.technologies,
    demoUrl: apiProject.demo_url,
    githubUrl: apiProject.github_url,
  };
}

export default function ProjectsPage() {
  // ✅ Estados para guardar los proyectos, el estado de carga y los errores
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// ✅ Efecto para cargar datos desde la API cuando el componente se monta
useEffect(() => {
  async function fetchProjects() {
    setIsLoading(true);
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      setError('La URL de la API no está configurada.');
      setIsLoading(false);
      return;
    }

    try {
      // Usamos el mismo patrón que tu otro proyecto.
      // Si tu .env es ".../api/v1", esta ruta es la correcta.
      const res = await fetch(`${apiBaseUrl}/projects/`);
      
      if (!res.ok) {
        // Lanzamos un error más detallado para facilitar la depuración
        throw new Error(`Error ${res.status}: No se pudieron cargar los proyectos.`);
      }

      const data = await res.json();
      
      // ✅ Usamos la lógica MÁS SEGURA de tu otro proyecto para manejar la respuesta
      const apiProjects: ApiProject[] = Array.isArray(data?.results) 
        ? data.results 
        : Array.isArray(data) 
        ? data 
        : [];
      
      // Transforma cada proyecto y actualiza el estado
      setProjects(apiProjects.map(mapApiToClient));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  }

  fetchProjects();
}, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <main className="min-h-screen relative">
      <MatrixBackground />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Encabezado de la página (código sin cambios) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-green-400 transition-colors mb-8">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center gap-3">
              <Rocket className="w-12 h-12 text-red-400" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                The Innovation Lab
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xl text-gray-400 max-w-3xl">
              Projects that combine security, scalability, and performance. Each solution is designed to solve complex problems with modern technologies.
            </motion.p>
          </div>
        </motion.div>

        {/* ✅ Contenido dinámico: muestra estado de carga, error o la lista de proyectos */}
        {isLoading && (
          <div className="flex justify-center items-center h-64 text-green-400">
            <LoaderCircle className="animate-spin h-12 w-12 mr-4" />
            <span className="text-2xl">Cargando proyectos...</span>
          </div>
        )}
        {error && (
          <div className="text-center h-64 text-red-400 bg-red-900/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Sección final de contacto (código sin cambios) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glassmorphism rounded-xl p-8 inline-block">
            <p className="text-xl text-gray-300 mb-4">Have a project in mind?</p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-black font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/50">
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}