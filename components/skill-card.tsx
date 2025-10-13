'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  index: number;
}

export function SkillCard({ icon: Icon, name, description, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-green-400 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-blue-500/0 group-hover:from-green-400/10 group-hover:to-blue-500/10 rounded-lg transition-all duration-300" />

      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors">
          <Icon className="w-8 h-8 text-green-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
