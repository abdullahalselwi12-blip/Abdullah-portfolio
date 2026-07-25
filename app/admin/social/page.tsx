'use client';

import { useState } from 'react';
import { useEntityManager } from '@/components/admin/use-entity-manager';
import { AdminPageHeader } from '@/components/admin/page-header';
import { EntityDialog, Field, ConfirmDialog } from '@/components/admin/entity-dialog';
import { EntityCard, EntityGrid } from '@/components/admin/entity-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Globe, Loader2 } from 'lucide-react';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
  visible: boolean;
}

const empty: Partial<SocialLink> = { platform: '', url: '', icon: 'Globe', sort_order: 0, visible: true };

export default function AdminSocialPage() {
  const { items, loading, create, update, remove } = useEntityManager<SocialLink & { published?: boolean }>({
    table: 'social_links', label: 'Social link', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [form, setForm] = useState<Partial<SocialLink>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: SocialLink) => { setEditing(item); setForm(item); setDialogOpen(true); };
  const handleSave = async () => editing ? update(editing.id, form) : create(form);

  return (
    <div>
      <AdminPageHeader title="Social Links" description="Manage your social media links" icon={Globe}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Link</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.platform} subtitle={item.url} published={item.visible}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => update(item.id, { visible: !item.visible } as Partial<SocialLink & { published?: boolean }>)}
            />
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Link' : 'New Link'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Platform"><Input value={form.platform ?? ''} onChange={(e) => setForm({ ...form, platform: e.target.value })} placeholder="GitHub, LinkedIn..." /></Field>
          <Field label="URL"><Input value={form.url ?? ''} onChange={(e) => setForm({ ...form, url: e.target.value })} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Icon (Lucide name)"><Input value={form.icon ?? ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Github, Linkedin..." /></Field>
          <Field label="Sort Order"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></Field>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.visible ?? true} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
          <span className="text-sm">Visible</span>
        </div>
      </EntityDialog>
      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} />
    </div>
  );
}
