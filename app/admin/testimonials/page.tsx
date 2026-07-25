'use client';

import { useState } from 'react';
import { useEntityManager } from '@/components/admin/use-entity-manager';
import { AdminPageHeader } from '@/components/admin/page-header';
import { EntityDialog, Field, ConfirmDialog } from '@/components/admin/entity-dialog';
import { EntityCard, EntityGrid } from '@/components/admin/entity-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Star, Loader2 } from 'lucide-react';

interface Testimonial {
  id: string;
  quote_en: string;
  quote_ar: string;
  author: string;
  role_en: string;
  role_ar: string;
  avatar_url: string;
  sort_order: number;
  published: boolean;
}

const empty: Partial<Testimonial> = { quote_en: '', quote_ar: '', author: '', role_en: '', role_ar: '', avatar_url: '', sort_order: 0, published: true };

export default function AdminTestimonialsPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Testimonial>({
    table: 'testimonials', label: 'Testimonial', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: Testimonial) => { setEditing(item); setForm(item); setDialogOpen(true); };
  const handleSave = async () => editing ? update(editing.id, form) : create(form);

  return (
    <div>
      <AdminPageHeader title="Testimonials" description="Manage testimonials" icon={Star}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Testimonial</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.author} subtitle={item.role_en} imageUrl={item.avatar_url} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            >
              <p className="text-xs text-muted-foreground mt-1 truncate">&ldquo;{item.quote_en}&rdquo;</p>
            </EntityCard>
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Testimonial' : 'New Testimonial'} onSave={handleSave}>
        <Field label="Author"><Input value={form.author ?? ''} onChange={(e) => setForm({ ...form, author: e.target.value })} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role (English)"><Input value={form.role_en ?? ''} onChange={(e) => setForm({ ...form, role_en: e.target.value })} /></Field>
          <Field label="Role (Arabic)"><Input value={form.role_ar ?? ''} onChange={(e) => setForm({ ...form, role_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <Field label="Quote (English)"><Textarea value={form.quote_en ?? ''} onChange={(e) => setForm({ ...form, quote_en: e.target.value })} rows={3} /></Field>
        <Field label="Quote (Arabic)"><Textarea value={form.quote_ar ?? ''} onChange={(e) => setForm({ ...form, quote_ar: e.target.value })} rows={3} dir="rtl" /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Avatar URL"><Input value={form.avatar_url ?? ''} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} /></Field>
          <Field label="Sort Order"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></Field>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.published ?? true} onCheckedChange={(v) => setForm({ ...form, published: v })} />
          <span className="text-sm">Published</span>
        </div>
      </EntityDialog>
      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} />
    </div>
  );
}
