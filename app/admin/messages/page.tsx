'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { AdminPageHeader } from '@/components/admin/page-header';
import { ConfirmDialog } from '@/components/admin/entity-dialog';
import { Mail, MailOpen, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    setMessages((data as Message[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (msg: Message) => {
    setSelected(msg);
    if (!msg.is_read) {
      await supabase.from('messages').update({ is_read: true }).eq('id', msg.id);
      fetchMessages();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('messages').delete().eq('id', deleteId);
    if (selected?.id === deleteId) setSelected(null);
    fetchMessages();
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <AdminPageHeader title="Messages" description={`${unreadCount} unread of ${messages.length} total`} icon={Mail} />
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No messages yet.</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markRead(msg)}
                className={cn(
                  'w-full text-start glass rounded-xl p-4 flex items-start gap-3 transition-all hover:shadow-md',
                  selected?.id === msg.id && 'ring-2 ring-primary',
                  !msg.is_read && 'bg-primary/5'
                )}
              >
                <div className={cn(
                  'h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0',
                  msg.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                )}>
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{msg.name}</span>
                    {!msg.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{msg.subject || 'No subject'}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{new Date(msg.created_at).toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="glass rounded-2xl p-6 sticky top-4 h-fit">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">{selected.subject || 'No subject'}</h3>
                  <button onClick={() => setDeleteId(selected.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div><span className="text-muted-foreground">From:</span> <span className="font-medium">{selected.name}</span></div>
                  <div><span className="text-muted-foreground">Email:</span> <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
                  <div><span className="text-muted-foreground">Date:</span> {new Date(selected.created_at).toLocaleString()}</div>
                  <div className="pt-4 border-t border-border">
                    <p className="whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                  </div>
                </div>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <MailOpen className="h-4 w-4" /> Reply via email
                </a>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                Select a message to read
              </div>
            )}
          </div>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={handleDelete} title="Delete message?" description="This message will be permanently deleted." />
    </div>
  );
}
