'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Download, Mail, ChevronDown, Sparkles, Shield, Brain, Code, Terminal } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import Image from 'next/image';

interface HeroData {
  id: string;
  subtitle_en: string;
  subtitle_ar: string;
  greeting_en: string;
  greeting_ar: string;
  avatar_url: string;
  cv_url: string;
  roles: string[];
  published: boolean;
}

const floatingIcons = [
  { Icon: Shield, delay: 0, x: '8%', y: '20%' },
  { Icon: Brain, delay: 0.5, x: '85%', y: '15%' },
  { Icon: Code, delay: 1, x: '15%', y: '75%' },
  { Icon: Terminal, delay: 1.5, x: '88%', y: '70%' },
];

const DEFAULT_AVATAR = '/photo_2026-07-24_23-19-26.jpg';

// الأسماء الثابتة - لن تتغير من قاعدة البيانات
const STATIC_NAMES = {
  en: {
    firstName: 'Abdullah Dia\'a',
    lastName: 'Hassan Sief Al-Selwi',
  },
  ar: {
    firstName: 'عبدالله ضياء',
    lastName: 'حسن سيف الصلوي',
  },
};

export function Hero() {
  const { t, lang } = useLanguage();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    loadHeroData();
  }, []);

  async function loadHeroData() {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error loading hero data:', error);
      return;
    }

    if (data) {
      setHeroData(data);
    }
  }

  const roles = heroData?.roles || ['Developer', 'Designer', 'Creator'];

  useEffect(() => {
    if (!roles.length) return;
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx, roles]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // استخدام الأسماء الثابتة من الكود
  const firstName = lang === 'ar' ? STATIC_NAMES.ar.firstName : STATIC_NAMES.en.firstName;
  const lastName = lang === 'ar' ? STATIC_NAMES.ar.lastName : STATIC_NAMES.en.lastName;
  
  // باقي البيانات من قاعدة البيانات (اختيارية)
  const subtitle = heroData ? (lang === 'ar' ? heroData.subtitle_ar : heroData.subtitle_en) : t.hero.subtitle;
  const greeting = heroData ? (lang === 'ar' ? heroData.greeting_ar : heroData.greeting_en) : t.hero.greeting;
  const avatarUrl = heroData?.avatar_url || DEFAULT_AVATAR;
  const cvUrl = heroData?.cv_url || '#';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-chart-4/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-chart-2/15 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block text-primary/20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="h-12 w-12" strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-chart-4 opacity-20 blur-2xl animate-pulse" />
          
          {/* Decorative rings */}
          <div className="absolute -inset-2 rounded-full border-2 border-primary/20 animate-spin-slow" />
          <div className="absolute -inset-4 rounded-full border border-primary/10 animate-spin-slower" />
          
          {/* Image container */}
          <div className="relative h-full w-full rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl bg-muted">
            {!imageError ? (
              <Image
                src={avatarUrl}
                alt={firstName}
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                className={`
                  object-cover 
                  object-center 
                  transition-opacity 
                  duration-500 
                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  objectPosition: 'center center',
                }}
                onLoadingComplete={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority
                quality={100}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-chart-4/20 flex items-center justify-center text-4xl font-bold text-primary/50">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}
            
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-4/10 animate-pulse" />
            )}
          </div>

          {/* Online status */}
          <div className="absolute bottom-2 end-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-green-500 ring-2 ring-background z-10">
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium">{greeting}</span>
        </motion.div>

        {/* Name - سطرين: الأول الاسم الأول، الثاني الاسم الأخير */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="gradient-text">{firstName}</span>
          <br />
          <span className="text-foreground">{lastName}</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 h-10 flex items-center justify-center"
        >
          <span className="text-lg sm:text-2xl font-medium text-muted-foreground typing-cursor">
            {displayed}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollTo('contact')}
            className="group rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            <Mail className="me-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            {t.hero.contactMe}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open(cvUrl, '_blank')}
            className="group rounded-full px-8 h-12 text-base glass hover:glass-strong"
          >
            <Download className="me-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            {t.hero.downloadCv}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}