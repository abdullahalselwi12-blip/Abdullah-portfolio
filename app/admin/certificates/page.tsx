'use client';

import { useState } from 'react';
import { useEntityManager } from '@/components/admin/use-entity-manager';
import { AdminPageHeader } from '@/components/admin/page-header';
import { EntityDialog, Field, ConfirmDialog } from '@/components/admin/entity-dialog';
import { EntityCard, EntityGrid } from '@/components/admin/entity-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Award, Loader2 } from 'lucide-react';

interface Certificate {
  id: string;
  name_en: string;
  name_ar: string;
  issuer: string;
  issue_date: string;
  image_url: string;
  sort_order: number;
  published: boolean;
}

const empty: Partial<Certificate> = { name_en: '', name_ar: '', issuer: '', issue_date: '', image_url: '', sort_order: 0, published: true };

export default function AdminCertificatesPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Certificate>({
    table: 'certificates', label: 'Certificate', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState<Partial<Certificate>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: Certificate) => { setEditing(item); setForm(item); setDialogOpen(true); };
  const handleSave = async () => editing ? update(editing.id, form) : create(form);

  return (
    <div>
      <AdminPageHeader title="Certificates" description="Manage your certificates" icon={Award}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Certificate</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.name_en} subtitle={item.name_ar} imageUrl={item.image_url} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            />
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Certificate' : 'New Certificate'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name (English)"><Input value={form.name_en ?? ''} onChange={(e) => setForm({ ...form, name_en: e.target.value })} /></Field>
          <Field label="Name (Arabic)"><Input value={form.name_ar ?? ''} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Issuer"><Input value={form.issuer ?? ''} onChange={(e) => setForm({ ...form, issuer: e.target.value })} /></Field>
          <Field label="Issue Date"><Input value={form.issue_date ?? ''} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} placeholder="2024" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Image URL"><Input value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></Field>
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
