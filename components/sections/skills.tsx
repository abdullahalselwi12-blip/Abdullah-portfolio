'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import {
  Code2, Github, Terminal, Shield, Network, Cpu, Globe, FileCode,
  Layers, GitBranch, Bug, Radar, Activity, Mail, Megaphone,
  MessageSquare, Users, Lightbulb, Search, Database, Keyboard, BookOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  category: string;
  sort_order: number;
}

interface SkillGroup {
  key: string;
  skills: Skill[];
}

// خريطة لتحويل أسماء الأيقونات من قاعدة البيانات إلى مكونات Lucide
const iconMap: Record<string, LucideIcon> = {
  code2: Code2,
  github: Github,
  terminal: Terminal,
  shield: Shield,
  network: Network,
  cpu: Cpu,
  globe: Globe,
  filecode: FileCode,
  layers: Layers,
  gitbranch: GitBranch,
  bug: Bug,
  radar: Radar,
  activity: Activity,
  mail: Mail,
  megaphone: Megaphone,
  messagesquare: MessageSquare,
  users: Users,
  lightbulb: Lightbulb,
  search: Search,
  database: Database,
  keyboard: Keyboard,
  bookopen: BookOpen,
};

// تعريف الفئات الممكنة
const categoryKeys = ['programming', 'web', 'security', 'tools', 'soft', 'office'];

export function Skills() {
  const { t } = useLanguage();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      // تجميع المهارات حسب الفئة
      const groups: SkillGroup[] = [];
      categoryKeys.forEach((key) => {
        const skills = data.filter((skill) => skill.category === key);
        if (skills.length > 0) {
          groups.push({
            key: key,
            skills: skills,
          });
        }
      });
      setSkillGroups(groups);
    }
  }

  if (skillGroups.length === 0) return null;

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-lg font-bold mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.skills.categories[group.key as keyof typeof t.skills.categories]}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => {
                  const IconComponent = iconMap[skill.icon?.toLowerCase()] || Code2;
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: si * 0.05, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-chart-4"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}