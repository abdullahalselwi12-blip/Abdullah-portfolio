'use client';

import { motion } from 'framer-motion';
import { Pencil, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntityCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  published?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePublished?: () => void;
  children?: React.ReactNode;
}

export function EntityCard({ title, subtitle, imageUrl, published = true, onEdit, onDelete, onTogglePublished, children }: EntityCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'group glass rounded-xl p-4 flex items-start gap-4 transition-opacity',
        !published && 'opacity-50'
      )}
    >
      {imageUrl && (
        <div
          className="h-14 w-14 rounded-lg bg-cover bg-center shrink-0 bg-muted"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm truncate">{title}</h3>
          {!published && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">Draft</span>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
        {children}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onTogglePublished && (
          <button
            onClick={onTogglePublished}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary"
            title={published ? 'Unpublish' : 'Publish'}
          >
            {published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface EntityGridProps {
  children: React.ReactNode;
}

export function EntityGrid({ children }: EntityGridProps) {
  return (
    <div className="grid gap-3">{children}</div>
  );
}
