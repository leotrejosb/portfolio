'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';
import { projects } from '@/lib/projects-data';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { MatrixBackground } from '@/components/matrix-background';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative">
      <MatrixBackground />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-green-400 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Rocket className="w-12 h-12 text-red-400" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                The Innovation Lab

              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-3xl"
            >
              Projects that combine security, scalability, and performance. Each solution is designed to solve complex problems with modern technologies.
            </motion.p>
          </div>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glassmorphism rounded-xl p-8 inline-block">
            <p className="text-xl text-gray-300 mb-4">
              Have a project in mind?
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-black font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/50"
              >
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}