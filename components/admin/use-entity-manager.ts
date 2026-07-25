'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

export interface EntityConfig {
  table: string;
  label: string;
  orderBy?: string;
  ascending?: boolean;
}

export function useEntityManager<T extends { id: string }>(config: EntityConfig) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(config.table)
      .select('*')
      .order(config.orderBy ?? 'sort_order', { ascending: config.ascending ?? true });

    if (error) {
      setError(error.message);
    } else {
      setItems((data as T[]) ?? []);
    }
    setLoading(false);
  }, [config.table, config.orderBy, config.ascending]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const create = useCallback(async (values: Partial<T>): Promise<boolean> => {
    const { error } = await supabase.from(config.table).insert(values);
    if (error) {
      toast.error(`Failed to create ${config.label}: ${error.message}`);
      return false;
    }
    toast.success(`${config.label} created successfully`);
    await fetchItems();
    return true;
  }, [config.table, config.label, fetchItems]);

  const update = useCallback(async (id: string, values: Partial<T>): Promise<boolean> => {
    const { error } = await supabase.from(config.table).update(values).eq('id', id);
    if (error) {
      toast.error(`Failed to update ${config.label}: ${error.message}`);
      return false;
    }
    toast.success(`${config.label} updated successfully`);
    await fetchItems();
    return true;
  }, [config.table, config.label, fetchItems]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase.from(config.table).delete().eq('id', id);
    if (error) {
      toast.error(`Failed to delete ${config.label}: ${error.message}`);
      return false;
    }
    toast.success(`${config.label} deleted`);
    await fetchItems();
    return true;
  }, [config.table, config.label, fetchItems]);

  const togglePublished = useCallback(async (id: string, published: boolean): Promise<boolean> => {
    return update(id, { published } as unknown as Partial<T>);
  }, [update]);

  return { items, loading, error, create, update, remove, togglePublished, refetch: fetchItems };
}
