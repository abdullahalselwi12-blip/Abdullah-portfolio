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
import { Plus, Cpu, Loader2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
  sort_order: number;
  published: boolean;
}

const categories = ['programming', 'web', 'security', 'tools', 'soft', 'office'];
const empty: Partial<Skill> = { name: '', category: 'programming', icon: 'Code', level: 80, sort_order: 0, published: true };

export default function AdminSkillsPage() {
  const { items, loading, create, update, remove, togglePublished } = useEntityManager<Skill>({
    table: 'skills', label: 'Skill', orderBy: 'sort_order',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Partial<Skill>>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (item: Skill) => { setEditing(item); setForm(item); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) return update(editing.id, form);
    return create(form);
  };

  return (
    <div>
      <AdminPageHeader title="Skills" description="Manage your skills" icon={Cpu}
        action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Skill</Button>}
      />

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <EntityGrid>
          {items.map((item) => (
            <EntityCard key={item.id} title={item.name} subtitle={item.category} published={item.published}
              onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)}
              onTogglePublished={() => togglePublished(item.id, !item.published)}
            >
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden max-w-32">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-chart-4" style={{ width: `${item.level}%` }} />
                </div>
                <span className="text-xs text-muted-foreground font-mono">{item.level}%</span>
              </div>
            </EntityCard>
          ))}
        </EntityGrid>
      )}

      <EntityDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? 'Edit Skill' : 'New Skill'} onSave={handleSave}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name"><Input value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Category">
            <Select value={form.category ?? 'programming'} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Icon (Lucide name)"><Input value={form.icon ?? ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Code, Shield, Terminal..." /></Field>
          <Field label="Level (0-100)"><Input type="number" min={0} max={100} value={form.level ?? 80} onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) || 0 })} /></Field>
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
