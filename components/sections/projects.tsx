'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Github, ExternalLink, Images } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image_url: string;
  tech: string[];
  github_url: string;
  demo_url: string;
  gallery_url: string;
  published: boolean;
  sort_order: number;
}

export function Projects() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data || []);
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-3 end-3 rounded-full glass px-3 py-1 text-xs font-medium">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold mb-2 leading-snug">
                  {lang === 'ar' ? project.title_ar : project.title_en}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {lang === 'ar' ? project.description_ar : project.description_en}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <a
                    href={project.github_url || 'https://github.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    {t.projects.viewCode}
                  </a>
                  <span className="text-border">·</span>
                  <a
                    href={project.demo_url || '#'}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t.projects.liveDemo}
                  </a>
                  <span className="text-border">·</span>
                  <a
                    href={project.gallery_url || '#gallery'}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Images className="h-4 w-4" />
                    {t.projects.gallery}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}