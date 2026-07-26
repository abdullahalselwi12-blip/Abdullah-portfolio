'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Sun, Moon, Menu, X, Languages, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'experience', key: 'experience' },
  { id: 'certificates', key: 'certificates' },
  { id: 'projects', key: 'projects' },
  { id: 'gallery', key: 'gallery' },
  { id: 'resume', key: 'resume' },
  { id: 'services', key: 'services' },
  { id: 'testimonials', key: 'testimonials' },
  { id: 'blog', key: 'blog' },
  { id: 'contact', key: 'contact' },
] as const;

export function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    const order = ['light', 'dark', 'system'] as const;
    const current = theme ?? 'dark';
    const idx = order.indexOf(current as (typeof order)[number]);
    setTheme(order[(idx + 1) % order.length]);
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'system' ? Monitor : Moon;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500',
            scrolled ? 'glass-strong shadow-lg shadow-black/5' : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-lg shadow-primary/30">
              <Image
                src="/icon.png"
                alt="Abdullah Dia'a"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-primary/20" />
            </div>
            <span className="hidden sm:block font-display font-bold text-lg tracking-tight">
              Abdullah<span className="text-primary">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeSection === link.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.nav[link.key]}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              className="rounded-xl h-9 w-9 relative overflow-hidden"
              aria-label="Toggle language"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-bold"
                >
                  {lang === 'en' ? 'AR' : 'EN'}
                </motion.span>
              </AnimatePresence>
            </Button>

            {/* Theme */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="rounded-xl h-9 w-9"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThemeIcon className="h-4 w-4" />
                  </motion.span>
                </AnimatePresence>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-[300px] sm:w-[360px] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-bold text-lg">
                      Abdullah<span className="text-primary">.</span>
                    </span>
                  </div>
                  <nav className="flex flex-col gap-1 overflow-y-auto">
                    {navLinks.map((link, i) => (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => scrollTo(link.id)}
                        className={cn(
                          'text-start px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                          activeSection === link.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {t.nav[link.key]}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}