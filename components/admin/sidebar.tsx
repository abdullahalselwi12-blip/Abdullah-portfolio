'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, FolderKanban, Cpu, Award, Briefcase, Images,
  FileText, Star, Wrench, Settings, Mail, LogOut, Menu, X,
  ExternalLink, Globe, Shield, ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Cpu },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/social', label: 'Social Links', icon: Globe },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center shadow-lg shadow-primary/30">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-display font-bold text-sm">Admin Panel</div>
          <div className="text-xs text-muted-foreground">Portfolio CMS</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </Link>
        <div className="px-3 py-2 text-xs text-muted-foreground truncate">
          {user?.email}
        </div>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 start-4 z-50 lg:hidden glass rounded-xl p-2"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 w-72 glass-strong border-e border-border flex flex-col transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 end-4 z-10"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-e border-border bg-muted/30 h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
