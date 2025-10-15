'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Check, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatrixBackground } from '@/components/matrix-background';
import { Project } from '@/lib/projects-data';

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <main className="min-h-screen relative">
      <MatrixBackground />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/projects">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-green-400 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400">
              {project.shortDescription}
            </p>
          </div>

          <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button
                size="lg"
                className="bg-green-400 hover:bg-green-500 text-black font-bold transition-all duration-300"
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-600/10"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View Code
                </a>
              </Button>
            )}
          </div>

          <div className="glassmorphism rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                <Code2 className="mr-3 h-6 w-6" />
                Project Overview
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">The Challenge</h3>
                <p className="text-gray-400 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">The Solution</h3>
                <p className="text-gray-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Results</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glassmorphism rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-500 mb-6">
              Architecture & Tech Stack
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                This project was built using a modern and robust tech stack:
              </p>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-gray-800 text-green-400 border border-green-400/30 text-base px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-xl p-12 text-center space-y-6 border-2 border-green-400/20"
          >
            <h2 className="text-3xl font-bold text-white">
              Interested in a similar project?
            </h2>
            <p className="text-xl text-gray-300">
              Let&apos;s talk about how I can help build your next solution.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-black font-bold text-lg px-8 py-6 transition-all duration-300"
              >
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}