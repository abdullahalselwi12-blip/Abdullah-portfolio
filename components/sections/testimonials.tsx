'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { useLanguage } from '@/components/providers/language-provider';
import { supabase } from '@/lib/supabase-client';

interface Testimonial {
  id: string;
  quote_en: string;
  quote_ar: string;
  author: string;
  role_en: string;
  role_ar: string;
  avatar_url: string;
  published: boolean;
  sort_order: number;
}

export function Testimonials() {
const { lang, t } = useLanguage();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setTestimonials(data || []);
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeader
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item, i) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 relative"
            >

              <Quote className="absolute top-6 end-6 h-10 w-10 text-primary/20" />

              <p className="text-base leading-relaxed mb-6">

                "
                {lang === 'ar'
                  ? item.quote_ar
                  : item.quote_en}
                "

              </p>

              <div className="flex items-center gap-3">

                <img
                  src={item.avatar_url}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <div className="font-semibold">
                    {item.author}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {lang === 'ar'
                      ? item.role_ar
                      : item.role_en}
                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}