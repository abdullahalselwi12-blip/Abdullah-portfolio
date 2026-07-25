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
import { Plus, Wrench, Loader2 } from 'lucide-react';

interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  sort_order: number;
  published: boolean;
}

const empty: Partial<Service> = { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Code', sort_order: 0, published: true };

export default function AdminServicesPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Service>({
    table: 'services', label: 'Service', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: Service) => { setEditing(item); setForm(item); setDialogOpen(true); };
  const handleSave = async () => editing ? update(editing.id, form) : create(form);

  return (
    <div>
      <AdminPageHeader title="Services" description="Manage your services" icon={Wrench}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Service</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.title_en} subtitle={item.title_ar} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            />
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Service' : 'New Service'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title (English)"><Input value={form.title_en ?? ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></Field>
          <Field label="Title (Arabic)"><Input value={form.title_ar ?? ''} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Description (English)"><Textarea value={form.description_en ?? ''} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} /></Field>
          <Field label="Description (Arabic)"><Textarea value={form.description_ar ?? ''} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} rows={3} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Icon (Lucide name)"><Input value={form.icon ?? ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Code, Shield, Brain..." /></Field>
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
