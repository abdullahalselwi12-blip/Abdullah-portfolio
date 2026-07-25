'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase-client';

type Category = 'projects' | 'certificates' | 'events';

interface GalleryItem {
  id: string;
  src: string;
  category: Category;
  sort_order: number;
}

export function Gallery() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  async function loadGalleryItems() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setGalleryItems(data || []);
  }

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const categories = [
    { key: 'all' as const, label: t.gallery.categories.all },
    { key: 'projects' as const, label: t.gallery.categories.projects },
    { key: 'certificates' as const, label: t.gallery.categories.certificates },
    { key: 'events' as const, label: t.gallery.categories.events },
  ];

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImage = useCallback(() => {
    setLightbox((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  }, [filtered.length]);
  const prevImage = useCallback(() => {
    setLightbox((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, nextImage, prevImage]);

  if (galleryItems.length === 0) return null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.gallery.title} subtitle={t.gallery.subtitle} />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                filter === cat.key
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'glass hover:bg-muted/60'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox(i)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl cursor-pointer',
                  i % 5 === 0 ? 'row-span-2 aspect-[1/2]' : 'aspect-square'
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 start-3 text-white text-xs font-medium capitalize opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 end-6 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute start-4 sm:start-8 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img
              key={filtered[lightbox].id}
              src={filtered[lightbox].src}
              alt=""
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute end-4 sm:end-8 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}