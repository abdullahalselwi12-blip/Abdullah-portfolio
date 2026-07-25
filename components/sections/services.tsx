'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Code, Shield, Brain, Terminal, Network, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code, Shield, Brain, Terminal, Network, Search,
};

const gradients = [
  'from-primary to-chart-2',
  'from-chart-4 to-chart-5',
  'from-chart-2 to-chart-3',
  'from-chart-5 to-primary',
  'from-chart-3 to-chart-4',
  'from-primary to-chart-4',
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code;
            const gradient = gradients[i % gradients.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass rounded-2xl p-8 relative overflow-hidden"
              >
                <div className={`absolute -top-16 -end-16 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-5`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
