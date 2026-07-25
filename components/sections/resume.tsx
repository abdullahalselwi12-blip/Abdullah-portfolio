'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Download, Eye, GraduationCap, Briefcase, Award, Cpu } from 'lucide-react';

export function Resume() {
  const { t } = useLanguage();

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.resume.title} subtitle={t.resume.subtitle} />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-primary/25">
            <Download className="me-2 h-4 w-4" />
            {t.resume.download}
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 glass">
            <Eye className="me-2 h-4 w-4" />
            {t.resume.preview}
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">{t.resume.education}</h3>
            </div>
            <div className="ps-4 border-s-2 border-primary/30">
              <h4 className="font-semibold">{t.resume.degree}</h4>
              <p className="text-sm text-muted-foreground mt-1">{t.resume.university}</p>
              <p className="text-xs text-primary mt-2 font-mono">{t.resume.duration}</p>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">{t.resume.experience}</h3>
            </div>
            <div className="ps-4 border-s-2 border-primary/30">
              <h4 className="font-semibold">{t.experience.role}</h4>
              <p className="text-sm text-muted-foreground mt-1">{t.experience.company}</p>
            </div>
          </motion.div>

          {/* Skills summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">{t.resume.skills}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TypeScript', 'React', 'Next.js', 'Kali Linux', 'Nmap', 'Burp Suite', 'Wireshark', 'Git', 'Linux'].map((s) => (
                <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certificates summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">{t.resume.certificates}</h3>
            </div>
            <ul className="space-y-2">
              {t.certificates.items.slice(0, 6).map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
