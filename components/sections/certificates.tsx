'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Award, Shield, FileText, Mail, Megaphone, Sparkles, Users, GraduationCap, Archive, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const certIcons: LucideIcon[] = [
  Award, Shield, FileText, Mail, Megaphone, Sparkles, Users, GraduationCap, Archive, UserCheck,
];

const certColors = [
  'from-primary to-chart-2',
  'from-chart-4 to-primary',
  'from-chart-2 to-chart-3',
  'from-chart-5 to-chart-4',
  'from-primary to-chart-4',
  'from-chart-3 to-primary',
  'from-chart-4 to-chart-5',
  'from-chart-2 to-primary',
  'from-primary to-chart-5',
  'from-chart-5 to-chart-2',
];

export function Certificates() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.certificates.title} subtitle={t.certificates.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {t.certificates.items.map((cert, i) => {
            const Icon = certIcons[i % certIcons.length];
            const color = certColors[i % certColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-2xl p-6 overflow-hidden"
              >
                {/* Glow */}
                <div className={`absolute -top-12 -end-12 h-32 w-32 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />

                <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-display font-bold text-base leading-snug mb-2 min-h-[3rem]">
                  {cert}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Award className="h-3 w-3 text-primary" />
                  <span className="font-medium">Certified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
