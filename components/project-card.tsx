'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ✅ Define el tipo 'Project' aquí.
// Esta es la estructura que el componente espera recibir (en camelCase).
interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  demoUrl?: string | null; // Se usa '?' para indicar que puede no estar presente
  githubUrl?: string | null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // El resto del componente no necesita cambios.
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-green-400 transition-all duration-300"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:border-green-400 hover:text-green-400 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="border-gray-700 text-gray-300">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Link href={`/projects/${project.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-green-400 text-green-400 hover:bg-green-400/10 transition-all duration-300"
            >
              View Details
            </Button>
          </Link>

          {project.demoUrl && (
            <Button
              variant="outline"
              size="icon"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              asChild
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button
              variant="outline"
              size="icon"
              className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}