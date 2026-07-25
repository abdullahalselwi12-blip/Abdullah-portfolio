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
import { Plus, Briefcase, Loader2 } from 'lucide-react';

interface Experience {
  id: string;
  role_en: string;
  role_ar: string;
  company_en: string;
  company_ar: string;
  period: string;
  responsibilities_en: string[];
  responsibilities_ar: string[];
  sort_order: number;
  published: boolean;
}

const empty: Partial<Experience> = {
  role_en: '', role_ar: '', company_en: '', company_ar: '', period: '',
  responsibilities_en: [], responsibilities_ar: [], sort_order: 0, published: true,
};

export default function AdminExperiencePage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Experience>({
    table: 'experience', label: 'Experience', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Partial<Experience>>(empty);
  const [respEn, setRespEn] = useState('');
  const [respAr, setRespAr] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setRespEn(''); setRespAr(''); setDialogOpen(true); };
  const openEdit = (item: Experience) => {
    setEditing(item); setForm(item);
    setRespEn((item.responsibilities_en ?? []).join('\n'));
    setRespAr((item.responsibilities_ar ?? []).join('\n'));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const values = {
      ...form,
      responsibilities_en: respEn.split('\n').map((s) => s.trim()).filter(Boolean),
      responsibilities_ar: respAr.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    if (editing) return update(editing.id, values);
    return create(values);
  };

  return (
    <div>
      <AdminPageHeader title="Experience" description="Manage your work experience" icon={Briefcase}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Experience</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.role_en} subtitle={item.company_en} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            >
              <p className="text-xs text-muted-foreground mt-1">{(item.responsibilities_en ?? []).length} responsibilities · {item.period}</p>
            </EntityCard>
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Experience' : 'New Experience'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role (English)"><Input value={form.role_en ?? ''} onChange={(e) => setForm({ ...form, role_en: e.target.value })} /></Field>
          <Field label="Role (Arabic)"><Input value={form.role_ar ?? ''} onChange={(e) => setForm({ ...form, role_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Company (English)"><Input value={form.company_en ?? ''} onChange={(e) => setForm({ ...form, company_en: e.target.value })} /></Field>
          <Field label="Company (Arabic)"><Input value={form.company_ar ?? ''} onChange={(e) => setForm({ ...form, company_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Period"><Input value={form.period ?? ''} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2022 — Present" /></Field>
          <Field label="Sort Order"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></Field>
        </div>
        <Field label="Responsibilities (English) — one per line"><Textarea value={respEn} onChange={(e) => setRespEn(e.target.value)} rows={4} /></Field>
        <Field label="Responsibilities (Arabic) — one per line"><Textarea value={respAr} onChange={(e) => setRespAr(e.target.value)} rows={4} dir="rtl" /></Field>
        <div className="flex items-center gap-2">
          <Switch checked={form.published ?? true} onCheckedChange={(v) => setForm({ ...form, published: v })} />
          <span className="text-sm">Published</span>
        </div>
      </EntityDialog>
      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} />
    </div>
  );
}
