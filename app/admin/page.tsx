'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';
import { AdminPageHeader } from '@/components/admin/page-header';
import { 
  FolderKanban, Cpu, Award, FileText, Mail, Star, Image as ImageIcon, 
  Wrench, Briefcase, Globe, ArrowRight, Eye, EyeOff, TrendingUp, 
  Calendar, Loader2, MessageSquare, Users, 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  href: string;
  color: string;
}

interface PageView {
  id: string;
  page: string;
  count: number;
  last_updated: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    try {
      // جلب إحصائيات المحتوى
      const tables = [
        { table: 'projects', label: 'Projects', icon: FolderKanban, href: '/admin/projects', color: 'from-primary to-chart-2' },
        { table: 'skills', label: 'Skills', icon: Cpu, href: '/admin/skills', color: 'from-chart-2 to-chart-3' },
        { table: 'certificates', label: 'Certificates', icon: Award, href: '/admin/certificates', color: 'from-chart-3 to-chart-4' },
        { table: 'experience', label: 'Experience', icon: Briefcase, href: '/admin/experience', color: 'from-chart-4 to-chart-5' },
        { table: 'gallery_items', label: 'Gallery', icon: ImageIcon, href: '/admin/gallery', color: 'from-chart-5 to-primary' },
        { table: 'blog_posts', label: 'Blog Posts', icon: FileText, href: '/admin/blog', color: 'from-primary to-chart-4' },
        { table: 'testimonials', label: 'Testimonials', icon: Star, href: '/admin/testimonials', color: 'from-chart-2 to-chart-5' },
        { table: 'services', label: 'Services', icon: Wrench, href: '/admin/services', color: 'from-chart-4 to-chart-2' },
        { table: 'messages', label: 'Messages', icon: Mail, href: '/admin/messages', color: 'from-chart-5 to-chart-3' },
        { table: 'social_links', label: 'Social Links', icon: Globe, href: '/admin/social', color: 'from-primary to-chart-3' },
      ];

      const results = await Promise.all(
        tables.map(async (t) => {
          const { count } = await supabase.from(t.table).select('*', { count: 'exact', head: true });
          return { label: t.label, value: count ?? 0, icon: t.icon, href: t.href, color: t.color } as Stat;
        })
      );
      setStats(results);

      // جلب الرسائل الأخيرة
      const { data: msgs } = await supabase
        .from('messages')
        .select('id, name, email, subject, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentMessages(msgs ?? []);

      // جلب إحصائيات الزيارات
      const { data: viewsData, error: viewsError } = await supabase
        .from('page_views')
        .select('*')
        .order('last_updated', { ascending: false });

      if (!viewsError && viewsData) {
        setPageViews(viewsData);
        const total = viewsData.reduce((sum: number, item: PageView) => sum + item.count, 0);
        setTotalViews(total);

        // حساب زيارات اليوم
        const today = new Date().toISOString().split('T')[0];
        const todayViewsSum = viewsData
          .filter((item: PageView) => item.last_updated?.startsWith(today))
          .reduce((sum: number, item: PageView) => sum + item.count, 0);
        setTodayViews(todayViewsSum);

        // حساب الزوار الفريدين (عدد الصفحات المختلفة)
        setUniqueVisitors(viewsData.length);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  // إحصائيات الزيارات
  const viewStats = [
    { 
      label: 'Total Views', 
      value: totalViews, 
      icon: Eye, 
      color: 'bg-primary/10 text-primary',
      description: 'All time page views'
    },
    { 
      label: 'Today\'s Views', 
      value: todayViews, 
      icon: TrendingUp, 
      color: 'bg-green-500/10 text-green-500',
      description: 'Views today'
    },
    { 
      label: 'Pages Tracked', 
      value: uniqueVisitors, 
      icon: Calendar, 
      color: 'bg-purple-500/10 text-purple-500',
      description: 'Unique pages'
    },
    { 
      label: 'Messages', 
      value: stats.find(s => s.label === 'Messages')?.value || 0, 
      icon: MessageSquare, 
      color: 'bg-orange-500/10 text-orange-500',
      description: 'Total messages'
    },
  ];

  return (
    <div>
      <AdminPageHeader 
        title="Dashboard" 
        description="Overview of your portfolio content and analytics" 
        icon={Eye} 
      />

      {/* إحصائيات الزيارات */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {viewStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">
                  {loading ? '—' : stat.value.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.description}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* تفاصيل زيارات الصفحات */}
      {pageViews.length > 0 && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Page Views
            <span className="text-xs text-muted-foreground font-normal ml-2">
              ({pageViews.length} pages tracked)
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {pageViews.slice(0, 8).map((page) => (
              <div 
                key={page.id} 
                className="flex items-center justify-between p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
              >
                <span className="text-xs font-medium capitalize truncate">
                  {page.page.replace(/-/g, ' ')}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {page.count}
                </span>
              </div>
            ))}
          </div>
          {pageViews.length > 8 && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              +{pageViews.length - 8} more pages
            </p>
          )}
        </div>
      )}

      {/* Stats grid - المحتوى */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={stat.href}>
              <div className="glass rounded-2xl p-5 hover:shadow-lg transition-shadow group cursor-pointer">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md mb-3`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-display text-2xl font-bold">
                  {loading ? '—' : stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent messages */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Recent Messages
          </h2>
          <Link href="/admin/messages" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div 
                key={msg.id} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {msg.name} — {msg.subject || 'No subject'}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{msg.email}</div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}