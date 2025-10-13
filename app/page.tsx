'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code2, Database, Shield, Cloud, Terminal, Cpu,
  Lock, Server, Globe, Zap, GitBranch, Container
} from 'lucide-react';
import { MatrixBackground } from '@/components/matrix-background';
import { TypingEffect } from '@/components/typing-effect';
import { SkillCard } from '@/components/skill-card';
import { Button } from '@/components/ui/button';

const skills = {
  frontend: [
    {
      icon: Code2,
      name: 'React & Next.js',
      description: 'Advanced frontend development with the React ecosystem, Server Components, and the App Router.'
    },
    {
      icon: Terminal,
      name: 'TypeScript',
      description: 'Type-safe development using advanced TypeScript patterns and best practices.'
    },
    {
      icon: Zap,
      name: 'Modern UI/UX',
      description: 'Responsive design with Tailwind CSS, Framer Motion, and modern component libraries.'
    }
  ],
  backend: [
    {
      icon: Server,
      name: 'Django & DRF',
      description: 'Building RESTful APIs with Django Rest Framework and Python.'
    },
    {
      icon: Database,
      name: 'PostgreSQL & Databases',
      description: 'Database design, optimization, and management with both SQL and NoSQL solutions.'
    },
    {
      icon: Container,
      name: 'Docker & DevOps',
      description: 'Containerization, CI/CD pipelines, and implementing Infrastructure as Code (IaC).'
    }
  ],
  security: [
    {
      icon: Shield,
      name: 'Cybersecurity',
      description: 'Penetration testing, vulnerability assessments, and secure architecture design.'
    },
    {
      icon: Cloud,
      name: 'AWS',
      description: 'Cloud architecture with core AWS services: Lambda, EC2, S3, RDS, and more.'
    },
    {
      icon: Lock,
      name: 'Security Best Practices',
      description: 'Applying OWASP Top 10, secure coding principles, authentication, and authorization.'
    }
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <MatrixBackground />

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="space-y-8"
          >
            <TypingEffect
              lines={[
                '[Starting secure connection...]',
                '[Authentication successful.]',
                '',
                "Hey, I'm Leonardo Trejos. Welcome to my corner of the web."
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Full-Stack Developer
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-light">
                Cybersecurity Analyst | AWS Architect
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Specializing in building secure, scalable, and high-performance solutions. I combine full-stack development with expertise in cybersecurity and cloud architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 3.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {/* ✅ Botón Verde (primary) */}
              <Link href="/projects">
                <Button 
                  size="lg" 
                  className="font-bold px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  <GitBranch className="mr-2 h-6 w-6" />
                  View Projects
                </Button>
              </Link>

              {/* ✅ Botón Azul (secondary) */}
              <Link href="#skills">
                <Button
                  size="lg"
                  className="font-bold px-8 py-3 text-lg bg-secondary text-primary-foreground hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/50 transition-all duration-300"
                >
                  <Cpu className="mr-2 h-6 w-6" />
                  My Skills
                </Button>
              </Link>

              {/* ✅ Botón Rojo (destructive) */}
              <Link href="/contact">
                <Button
                  size="lg"
                  className="font-bold px-8 py-3 text-lg bg-destructive text-primary-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/50 transition-all duration-300"
                >
                  <Globe className="mr-2 h-6 w-6" />
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Tech Stack
            </h2>
            <p className="text-xl text-muted-foreground">
              The tools and technologies I use to build exceptional solutions.
            </p>
          </motion.div>

          <div className="space-y-16">
            <div className="glassmorphism rounded-xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center">
                <Code2 className="mr-3 h-8 w-8" />
                Frontend Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.frontend.map((skill, index) => (
                  <SkillCard key={skill.name} {...skill} index={index} />
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-xl p-8">
              <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center">
                <Server className="mr-3 h-8 w-8" />
                Backend & Databases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.backend.map((skill, index) => (
                  <SkillCard key={skill.name} {...skill} index={index} />
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-xl p-8">
              <h3 className="text-2xl font-bold text-destructive mb-8 flex items-center">
                <Shield className="mr-3 h-8 w-8" />
                Cybersecurity & Cloud (AWS)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.security.map((skill, index) => (
                  <SkillCard key={skill.name} {...skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA (Call to Action) SECTION --- */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-xl p-12 text-center space-y-6 border-2 border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="text-destructive">Ready</span>{' '}
               to build something{' '}
              <span className="text-primary">secure</span> and{' '}
              <span className="text-secondary">scalable</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's work together to bring your next project to life.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg px-8 py-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50"
              >
                <Lock className="mr-2 h-6 w-6" />
                Start a Conversation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}