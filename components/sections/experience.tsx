'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Briefcase, Check, Calendar, Building2 } from 'lucide-react';

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.experience.title} subtitle={t.experience.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute start-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="relative glass rounded-2xl p-6 sm:p-8 ms-16">
            {/* Node */}
            <div className="absolute -start-12 top-8 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold">{t.experience.role}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Calendar className="h-3 w-3" />
                {t.experience.period}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">{t.experience.company}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {t.experience.responsibilities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl bg-muted/40 p-3"
                >
                  <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
