'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Search, ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase-client';

interface BlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  category: string;
  date: string;
  image_url: string;
  published: boolean;
  sort_order: number;
}

export function Blog() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  async function loadBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  }

  const categories = [
    { key: 'all', label: t.blog.categories.all },
    { key: 'security', label: t.blog.categories.security },
    { key: 'ai', label: t.blog.categories.ai },
    { key: 'web', label: t.blog.categories.web },
    { key: 'research', label: t.blog.categories.research },
  ];

  const filtered = posts.filter((post) => {
    const title = lang === 'ar' ? post.title_ar : post.title_en;
    const excerpt = lang === 'ar' ? post.excerpt_ar : post.excerpt_en;
    const matchCat = category === 'all' || post.category === category;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) ||
      excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    }).format(new Date(date));

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.blog.title} subtitle={t.blog.subtitle} />

        {/* Search + filters */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full rounded-full glass ps-10 pe-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                  category === cat.key
                    ? 'bg-primary text-primary-foreground'
                    : 'glass hover:bg-muted/60'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${post.image_url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span className="absolute top-3 start-3 rounded-full glass px-3 py-1 text-xs font-medium capitalize">
                    {t.blog.categories[post.category as keyof typeof t.blog.categories] ?? post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors">
                    {lang === 'ar' ? post.title_ar : post.title_en}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {lang === 'ar' ? post.excerpt_ar : post.excerpt_en}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t.blog.readMore}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No articles found.</p>
        )}
      </div>
    </section>
  );
}