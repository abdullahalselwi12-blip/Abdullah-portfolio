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
import { Plus, FolderKanban, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image_url: string;
  github_url: string;
  live_url: string;
  tech: string[];
  category: string;
  sort_order: number;
  published: boolean;
}

const empty: Partial<Project> = {
  title_en: '', title_ar: '', description_en: '', description_ar: '',
  image_url: '', github_url: '', live_url: '', tech: [], category: '', sort_order: 0, published: true,
};

export default function AdminProjectsPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Project>({
    table: 'projects', label: 'Project', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>(empty);
  const [techInput, setTechInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setTechInput(''); setDialogOpen(true); };
  const openEdit = (item: Project) => {
    setEditing(item);
    setForm(item);
    setTechInput((item.tech ?? []).join(', '));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const values = { ...form, tech: techInput.split(',').map((t) => t.trim()).filter(Boolean) };
    if (editing) return update(editing.id, values);
    return create(values);
  };

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio projects"
        icon={FolderKanban}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Project</Button>}
      />

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
          No projects yet. Click "Add Project" to create one.
        </div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard
              key={item.id}
              title={item.title_en}
              subtitle={item.title_ar}
              imageUrl={item.image_url}
              published={item.published}
              onEdit={() => openEdit(item)}
              onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            >
              <div className="flex flex-wrap gap-1 mt-2">
                {(item.tech ?? []).slice(0, 4).map((t) => (
                  <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </EntityCard>
          ))}
        </EntityGrid>
      )}

      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Project' : 'New Project'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title (English)"><Input value={form.title_en ?? ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></Field>
          <Field label="Title (Arabic)"><Input value={form.title_ar ?? ''} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <Field label="Description (English)"><Textarea value={form.description_en ?? ''} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} /></Field>
        <Field label="Description (Arabic)"><Textarea value={form.description_ar ?? ''} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} rows={3} dir="rtl" /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Image URL"><Input value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></Field>
          <Field label="Category"><Input value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="AI, Web, Security..." /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="GitHub URL"><Input value={form.github_url ?? ''} onChange={(e) => setForm({ ...form, github_url: e.target.value })} /></Field>
          <Field label="Live Demo URL"><Input value={form.live_url ?? ''} onChange={(e) => setForm({ ...form, live_url: e.target.value })} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Technologies (comma-separated)"><Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Python, React, ..." /></Field>
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
