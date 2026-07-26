'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { ArrowUp, Github, Linkedin, Send, Facebook, Instagram, Twitter, Youtube, Globe, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import Image from 'next/image';

// خريطة لتحويل أسماء الأيقونات من قاعدة البيانات إلى مكونات Lucide
const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  send: Send,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
};

const quickLinks = [
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'skills', key: 'skills' },
  { id: 'resume', key: 'resume' },
  { id: 'blog', key: 'blog' },
  { id: 'contact', key: 'contact' },
] as const;

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
  visible: boolean;
}

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [socials, setSocials] = useState<SocialLink[]>([]);

  // جلب بيانات الروابط الاجتماعية من Supabase
  useEffect(() => {
    loadSocialLinks();
  }, []);

  async function loadSocialLinks() {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('visible', true)
      .order('sort_order');

    if (!error && data) {
      setSocials(data);
    }
  }

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative pt-20 pb-8 border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-lg shadow-primary/30">
                <Image
                  src="/icon.png"
                  alt="Abdullah Dia'a"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <span className="font-display font-bold text-lg">
                Abdullah<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              {t.footer.about}
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => {
                const IconComponent = iconMap[social.icon?.toLowerCase()] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold mb-4">{t.footer.newsletter}</h4>
            <p className="text-sm text-muted-foreground mb-4">{t.footer.newsletterDesc}</p>
            <form onSubmit={subscribe} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  required
                  className="w-full rounded-xl glass ps-10 pe-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button type="submit" size="sm" className="rounded-xl">
                {subscribed ? 'Subscribed!' : t.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()} Abdullah Dia&apos;a Hassan Sief Al-Selwi. {t.footer.rights}
          </p>
          <p className="text-xs text-muted-foreground">{t.footer.madeWith}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group rounded-full"
          >
            <span className="me-1.5">{t.footer.backToTop}</span>
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </footer>
  );
}