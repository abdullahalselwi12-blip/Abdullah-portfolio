'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { AdminPageHeader } from '@/components/admin/page-header';
import { Field } from '@/components/admin/entity-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Loader2, Save, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileData {
  id?: string;
  name: string;
  title_en: string;
  title_ar: string;
  bio_en: string[];
  bio_ar: string[];
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  greeting_en: string;
  greeting_ar: string;
  avatar_url: string;
  resume_url: string;
  roles: string[];
  published: boolean;
}

interface ContactData {
  id?: string;
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  location_en: string;
  location_ar: string;
  working_hours_en: string;
  working_hours_ar: string;
}

interface SiteSettingsData {
  id?: string;
  site_title: string;
  meta_description: string;
  seo_keywords: string[];
  footer_text_en: string;
  footer_text_ar: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Profile State
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    title_en: '',
    title_ar: '',
    bio_en: [],
    bio_ar: [],
    hero_subtitle_en: '',
    hero_subtitle_ar: '',
    greeting_en: '',
    greeting_ar: '',
    avatar_url: '',
    resume_url: '',
    roles: [],
    published: true,
  });
  const [bioEnText, setBioEnText] = useState('');
  const [bioArText, setBioArText] = useState('');
  const [rolesText, setRolesText] = useState('');

  // Contact State
  const [contact, setContact] = useState<ContactData>({
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    location_en: '',
    location_ar: '',
    working_hours_en: '',
    working_hours_ar: '',
  });

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>({
    site_title: '',
    meta_description: '',
    seo_keywords: [],
    footer_text_en: '',
    footer_text_ar: '',
  });
  const [keywordsText, setKeywordsText] = useState('');

  // جلب البيانات
  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      // جلب بيانات الملف الشخصي
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();

      if (profileError) {
        console.error('Error loading profile:', profileError);
      } else if (profileData) {
        setProfile(profileData as ProfileData);
        setBioEnText((profileData as ProfileData).bio_en?.join('\n') ?? '');
        setBioArText((profileData as ProfileData).bio_ar?.join('\n') ?? '');
        setRolesText((profileData as ProfileData).roles?.join(', ') ?? '');
      }

      // جلب بيانات الاتصال من contact_info
      const { data: contactData, error: contactError } = await supabase
        .from('contact_info')
        .select('*')
        .maybeSingle();

      if (contactError) {
        console.error('Error loading contact:', contactError);
      } else if (contactData) {
        setContact(contactData as ContactData);
      }

      // جلب إعدادات الموقع
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle();

      if (settingsError) {
        console.error('Error loading settings:', settingsError);
      } else if (settingsData) {
        setSiteSettings(settingsData as SiteSettingsData);
        setKeywordsText((settingsData as SiteSettingsData).seo_keywords?.join(', ') ?? '');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }

  // حفظ الملف الشخصي
  const saveProfile = async () => {
    setSavingProfile(true);
    setSuccessMessage(null);
    try {
      const profileData = {
        ...profile,
        bio_en: bioEnText.split('\n').map((s) => s.trim()).filter(Boolean),
        bio_ar: bioArText.split('\n').map((s) => s.trim()).filter(Boolean),
        roles: rolesText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const { error } = await supabase
        .from('profile')
        .upsert(profileData, { onConflict: 'id' });

      if (error) {
        toast.error('Failed to save profile: ' + error.message);
      } else {
        setProfile(profileData);
        toast.success('Profile saved successfully!');
        setSuccessMessage('Profile updated');
      }
    } catch (error) {
      toast.error('Error saving profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // حفظ معلومات الاتصال
  const saveContact = async () => {
    setSavingContact(true);
    setSuccessMessage(null);
    try {
      const { error } = await supabase
        .from('contact_info')
        .upsert(contact, { onConflict: 'id' });

      if (error) {
        toast.error('Failed to save contact info: ' + error.message);
      } else {
        toast.success('Contact info saved successfully!');
        setSuccessMessage('Contact updated');
      }
    } catch (error) {
      toast.error('Error saving contact info');
    } finally {
      setSavingContact(false);
    }
  };

  // حفظ إعدادات الموقع
  const saveSettings = async () => {
    setSavingSettings(true);
    setSuccessMessage(null);
    try {
      const settingsData = {
        ...siteSettings,
        seo_keywords: keywordsText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const { error } = await supabase
        .from('site_settings')
        .upsert(settingsData, { onConflict: 'id' });

      if (error) {
        toast.error('Failed to save settings: ' + error.message);
      } else {
        setSiteSettings(settingsData);
        toast.success('Site settings saved successfully!');
        setSuccessMessage('Settings updated');
      }
    } catch (error) {
      toast.error('Error saving settings');
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader 
        title="Settings" 
        description="Manage your profile, contact info, and site settings" 
        icon={Settings} 
      />

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 p-3 text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Profile
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name">
                <Input 
                  value={profile.name} 
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Avatar URL">
                <Input 
                  value={profile.avatar_url} 
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} 
                  placeholder="https://example.com/avatar.jpg"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title (English)">
                <Input 
                  value={profile.title_en} 
                  onChange={(e) => setProfile({ ...profile, title_en: e.target.value })} 
                  placeholder="e.g., Full Stack Developer"
                />
              </Field>
              <Field label="Title (Arabic)">
                <Input 
                  value={profile.title_ar} 
                  onChange={(e) => setProfile({ ...profile, title_ar: e.target.value })} 
                  placeholder="مطور ويب متكامل"
                  dir="rtl"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Greeting (English)">
                <Input 
                  value={profile.greeting_en} 
                  onChange={(e) => setProfile({ ...profile, greeting_en: e.target.value })} 
                  placeholder="e.g., Hello! I'm"
                />
              </Field>
              <Field label="Greeting (Arabic)">
                <Input 
                  value={profile.greeting_ar} 
                  onChange={(e) => setProfile({ ...profile, greeting_ar: e.target.value })} 
                  placeholder="مرحباً! أنا"
                  dir="rtl"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Hero Subtitle (English)">
                <Input 
                  value={profile.hero_subtitle_en} 
                  onChange={(e) => setProfile({ ...profile, hero_subtitle_en: e.target.value })} 
                  placeholder="Short subtitle for hero section"
                />
              </Field>
              <Field label="Hero Subtitle (Arabic)">
                <Input 
                  value={profile.hero_subtitle_ar} 
                  onChange={(e) => setProfile({ ...profile, hero_subtitle_ar: e.target.value })} 
                  placeholder="عنوان فرعي للقسم الرئيسي"
                  dir="rtl"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Roles (comma-separated)">
                <Input 
                  value={rolesText} 
                  onChange={(e) => setRolesText(e.target.value)} 
                  placeholder="Developer, Designer, Creator"
                />
              </Field>
              <Field label="Resume URL">
                <Input 
                  value={profile.resume_url} 
                  onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })} 
                  placeholder="https://example.com/resume.pdf"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Bio (English) — one paragraph per line">
                <Textarea 
                  value={bioEnText} 
                  onChange={(e) => setBioEnText(e.target.value)} 
                  rows={5}
                  placeholder="Write your bio in English..."
                />
              </Field>
              <Field label="Bio (Arabic) — one paragraph per line">
                <Textarea 
                  value={bioArText} 
                  onChange={(e) => setBioArText(e.target.value)} 
                  rows={5}
                  placeholder="اكتب سيرتك الذاتية بالعربية..."
                  dir="rtl"
                />
              </Field>
            </div>

            <Button onClick={saveProfile} disabled={savingProfile} className="gap-2">
              {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
              Save Profile
            </Button>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email">
                <Input 
                  value={contact.email} 
                  onChange={(e) => setContact({ ...contact, email: e.target.value })} 
                  placeholder="your@email.com"
                  type="email"
                />
              </Field>
              <Field label="Phone">
                <Input 
                  value={contact.phone} 
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })} 
                  placeholder="+967 700 000 000"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="WhatsApp">
                <Input 
                  value={contact.whatsapp} 
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} 
                  placeholder="+967 700 000 000"
                />
              </Field>
              <Field label="Telegram">
                <Input 
                  value={contact.telegram} 
                  onChange={(e) => setContact({ ...contact, telegram: e.target.value })} 
                  placeholder="@username"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Location (English)">
                <Input 
                  value={contact.location_en} 
                  onChange={(e) => setContact({ ...contact, location_en: e.target.value })} 
                  placeholder="Sana'a, Yemen"
                />
              </Field>
              <Field label="Location (Arabic)">
                <Input 
                  value={contact.location_ar} 
                  onChange={(e) => setContact({ ...contact, location_ar: e.target.value })} 
                  placeholder="صنعاء، اليمن"
                  dir="rtl"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Working Hours (English)">
                <Input 
                  value={contact.working_hours_en} 
                  onChange={(e) => setContact({ ...contact, working_hours_en: e.target.value })} 
                  placeholder="Sat — Thu, 9:00 — 18:00"
                />
              </Field>
              <Field label="Working Hours (Arabic)">
                <Input 
                  value={contact.working_hours_ar} 
                  onChange={(e) => setContact({ ...contact, working_hours_ar: e.target.value })} 
                  placeholder="السبت - الخميس، 9:00 - 18:00"
                  dir="rtl"
                />
              </Field>
            </div>

            <Button onClick={saveContact} disabled={savingContact} className="gap-2">
              {savingContact ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
              Save Contact Info
            </Button>
          </div>
        </div>

        {/* Site Settings Section */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Site Settings
          </h2>
          <div className="space-y-4">
            <Field label="Site Title">
              <Input 
                value={siteSettings.site_title} 
                onChange={(e) => setSiteSettings({ ...siteSettings, site_title: e.target.value })} 
                placeholder="My Portfolio"
              />
            </Field>

            <Field label="Meta Description">
              <Textarea 
                value={siteSettings.meta_description} 
                onChange={(e) => setSiteSettings({ ...siteSettings, meta_description: e.target.value })} 
                rows={2}
                placeholder="Description for SEO"
              />
            </Field>

            <Field label="SEO Keywords (comma-separated)">
              <Input 
                value={keywordsText} 
                onChange={(e) => setKeywordsText(e.target.value)} 
                placeholder="portfolio, developer, yemen"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Footer Text (English)">
                <Input 
                  value={siteSettings.footer_text_en} 
                  onChange={(e) => setSiteSettings({ ...siteSettings, footer_text_en: e.target.value })} 
                  placeholder="All rights reserved"
                />
              </Field>
              <Field label="Footer Text (Arabic)">
                <Input 
                  value={siteSettings.footer_text_ar} 
                  onChange={(e) => setSiteSettings({ ...siteSettings, footer_text_ar: e.target.value })} 
                  placeholder="جميع الحقوق محفوظة"
                  dir="rtl"
                />
              </Field>
            </div>

            <Button onClick={saveSettings} disabled={savingSettings} className="gap-2">
              {savingSettings ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}