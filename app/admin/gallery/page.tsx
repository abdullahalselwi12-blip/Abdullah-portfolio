'use client';

import { useState } from 'react';
import { useEntityManager } from '@/components/admin/use-entity-manager';
import { AdminPageHeader } from '@/components/admin/page-header';
import { EntityDialog, Field, ConfirmDialog } from '@/components/admin/entity-dialog';
import { EntityCard, EntityGrid } from '@/components/admin/entity-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Images, Loader2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption_en: string;
  caption_ar: string;
  sort_order: number;
  published: boolean;
}

const categories = ['projects', 'certificates', 'events'];
const empty: Partial<GalleryItem> = { image_url: '', category: 'projects', caption_en: '', caption_ar: '', sort_order: 0, published: true };

export default function AdminGalleryPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<GalleryItem>({
    table: 'gallery_items', label: 'Gallery item', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm(item); setDialogOpen(true); };
  const handleSave = async () => editing ? update(editing.id, form) : create(form);

  return (
    <div>
      <AdminPageHeader title="Gallery" description="Manage your photo gallery" icon={Images}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Photo</Button>}
      />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden glass">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image_url})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-white text-xs font-medium capitalize mb-2">{item.category}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30"><Plus className="h-3.5 w-3.5 rotate-45" /></button>
                  <button onClick={() => togglePublished(item.id, !item.published)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30">
                    <span className="text-xs">{item.published ? 'Hide' : 'Show'}</span>
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg bg-red-500/40 text-white hover:bg-red-500/60"><Plus className="h-3.5 w-3.5 rotate-45" /></button>
                </div>
              </div>
              {!item.published && <div className="absolute top-2 end-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">Hidden</div>}
            </div>
          ))}
        </div>
      )}
      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Photo' : 'New Photo'} onSave={handleSave}>
        <Field label="Image URL"><Input value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></Field>
        <Field label="Category">
          <Select value={form.category ?? 'projects'} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Caption (English)"><Input value={form.caption_en ?? ''} onChange={(e) => setForm({ ...form, caption_en: e.target.value })} /></Field>
          <Field label="Caption (Arabic)"><Input value={form.caption_ar ?? ''} onChange={(e) => setForm({ ...form, caption_ar: e.target.value })} dir="rtl" /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Sort Order"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></Field>
          <div className="flex items-center gap-2 pt-7">
            <Switch checked={form.published ?? true} onCheckedChange={(v) => setForm({ ...form, published: v })} />
            <span className="text-sm">Published</span>
          </div>
        </div>
      </EntityDialog>
      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} />
    </div>
  );
}
