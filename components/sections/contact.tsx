'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/components/providers/language-provider';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase-client';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, 
  Github, Linkedin, Facebook, Instagram, Twitter, Youtube, Globe,
  LucideIcon 
} from 'lucide-react';

// خريطة الأيقونات للروابط الاجتماعية
const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  send: Send,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
  phone: Phone,
  messagecircle: MessageCircle,
  mappin: MapPin,
  clock: Clock,
};

// خريطة الأيقونات لمعلومات الاتصال
const contactIconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  messagecircle: MessageCircle,
  send: Send,
  mappin: MapPin,
  clock: Clock,
};

// Schema للتحقق من صحة النموذج
const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

interface ContactInfo {
  id: string;
  icon: string;
  label_en: string;
  label_ar: string;
  value_en: string;
  value_ar: string;
  href: string;
  sort_order: number;
  visible: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
  visible: boolean;
}

export function Contact() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب بيانات الاتصال من Supabase
  useEffect(() => {
    loadContactData();
  }, []);

  async function loadContactData() {
    setLoading(true);
    try {
      // جلب معلومات الاتصال
      const { data: contactData, error: contactError } = await supabase
        .from('contact_info')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      if (contactError) {
        console.error('Error loading contact info:', contactError);
      } else if (contactData) {
        setContactInfo(contactData);
      }

      // جلب الروابط الاجتماعية
      const { data: socialData, error: socialError } = await supabase
        .from('social_links')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      if (socialError) {
        console.error('Error loading social links:', socialError);
      } else if (socialData) {
        setSocialLinks(socialData);
      }
    } catch (error) {
      console.error('Error loading contact data:', error);
    } finally {
      setLoading(false);
    }
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from('messages').insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      
      if (error) {
        setSubmitError(true);
        return;
      }
      
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(true);
    }
  };

  // الحصول على النص حسب اللغة
  const getLabel = (item: ContactInfo) => {
    return lang === 'ar' ? item.label_ar : item.label_en;
  };

  const getValue = (item: ContactInfo) => {
    return lang === 'ar' ? item.value_ar : item.value_en;
  };

  // الحصول على أيقونة الاتصال
  const getContactIcon = (iconName: string) => {
    const Icon = contactIconMap[iconName?.toLowerCase()] || Mail;
    return Icon;
  };

  // الحصول على أيقونة الاجتماعية
  const getSocialIcon = (iconName: string) => {
    const Icon = socialIconMap[iconName?.toLowerCase()] || Globe;
    return Icon;
  };

  if (loading) {
    return (
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6" />
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 bg-muted rounded-xl" />
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-muted rounded-xl" />
                ))}
                <div className="h-32 bg-muted rounded-xl" />
                <div className="h-12 bg-muted rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info - معلومات الاتصال من قاعدة البيانات */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold mb-6">{t.contact.info}</h3>
              
              {contactInfo.length === 0 ? (
                <p className="text-muted-foreground text-sm">No contact information available.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((info) => {
                    const Icon = getContactIcon(info.icon);
                    return (
                      <a
                        key={info.id}
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-xl p-3 hover:bg-muted/40 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-muted-foreground mb-0.5">{getLabel(info)}</div>
                          <div className="text-sm font-medium truncate">{getValue(info)}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Social Links - من قاعدة البيانات */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {socialLinks.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No social links available.</p>
                  ) : (
                    socialLinks.map((social) => {
                      const Icon = getSocialIcon(social.icon);
                      return (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platform}
                          className="h-10 w-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form - نموذج الاتصال */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h3 className="font-display text-xl font-bold mb-6">{t.contact.formTitle}</h3>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 p-3 mb-4 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t.contact.success}
              </motion.div>
            )}
            
            {submitError && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 text-destructive p-3 mb-4 text-sm font-medium">
                {t.contact.error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  {...register('name')}
                  placeholder={t.contact.name}
                  className="h-12 rounded-xl"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder={t.contact.email}
                  className="h-12 rounded-xl"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Input
                  {...register('subject')}
                  placeholder={t.contact.subject}
                  className="h-12 rounded-xl"
                />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <Textarea
                  {...register('message')}
                  placeholder={t.contact.message}
                  rows={5}
                  className="rounded-xl resize-none"
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl shadow-lg shadow-primary/25"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {t.contact.sending}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4 rtl:rotate-180" />
                    {t.contact.send}
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}