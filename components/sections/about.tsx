'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Shield, Brain, Wifi, Code, Network, Cloud, Terminal, Search, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Brain,
  Wifi,
  Code,
  Network,
  Cloud,
  Terminal,
  Search,
  BookOpen,
};

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {t.about.bio.map((paragraph, i) => (
              <p key={i} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {t.about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-4 text-center"
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-xl font-bold mb-6">{t.about.interestsTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.about.interests.map((interest, i) => {
                const Icon = iconMap[interest.icon] ?? Code;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-xl p-4 flex items-center gap-3 group cursor-default"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{interest.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
