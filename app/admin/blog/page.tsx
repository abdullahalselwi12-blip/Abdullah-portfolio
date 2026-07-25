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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  content_en: string;
  content_ar: string;
  category: string;
  tags: string[];
  image_url: string;
  published: boolean;
  published_at: string;
}

const categories = ['security', 'ai', 'web', 'research'];
const empty: Partial<BlogPost> = {
  title_en: '', title_ar: '', excerpt_en: '', excerpt_ar: '', content_en: '', content_ar: '',
  category: 'research', tags: [], image_url: '', published: true, published_at: new Date().toISOString().split('T')[0],
};

export default function AdminBlogPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<BlogPost>({
    table: 'blog_posts', label: 'Blog post', orderBy: 'published_at', ascending: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>(empty);
  const [tagsInput, setTagsInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setTagsInput(''); setDialogOpen(true); };
  const openEdit = (item: BlogPost) => { setEditing(item); setForm(item); setTagsInput((item.tags ?? []).join(', ')); setDialogOpen(true); };
  const handleSave = async () => {
    const values = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) };
    if (editing) return update(editing.id, values);
    return create(values);
  };

  return (
    <div>
      <AdminPageHeader title="Blog" description="Manage your blog posts" icon={FileText}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Post</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.title_en} subtitle={item.title_ar} imageUrl={item.image_url} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            >
              <p className="text-xs text-muted-foreground mt-1 capitalize">{item.category} · {item.published_at}</p>
            </EntityCard>
          ))}
        </EntityGrid>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Post' : 'New Post'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title (English)"><Input value={form.title_en ?? ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></Field>
          <Field label="Title (Arabic)"><Input value={form.title_ar ?? ''} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Excerpt (English)"><Textarea value={form.excerpt_en ?? ''} onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })} rows={2} /></Field>
          <Field label="Excerpt (Arabic)"><Textarea value={form.excerpt_ar ?? ''} onChange={(e) => setForm({ ...form, excerpt_ar: e.target.value })} rows={2} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Content (English - Markdown)"><Textarea value={form.content_en ?? ''} onChange={(e) => setForm({ ...form, content_en: e.target.value })} rows={6} /></Field>
          <Field label="Content (Arabic - Markdown)"><Textarea value={form.content_ar ?? ''} onChange={(e) => setForm({ ...form, content_ar: e.target.value })} rows={6} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <Select value={form.category ?? 'research'} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Image URL"><Input value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Tags (comma-separated)"><Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} /></Field>
          <Field label="Publish Date"><Input type="date" value={form.published_at ?? ''} onChange={(e) => setForm({ ...form, published_at: e.target.value })} /></Field>
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
