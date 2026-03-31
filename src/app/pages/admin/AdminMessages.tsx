import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Archive, Reply, Trash2, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { messagesApi } from '../../services/api';

interface Msg {
  id: number;
  from: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  archived: boolean;
  thread?: { from: string; text: string; time: string; isAdmin?: boolean }[];
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Msg | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = useCallback((q?: string, archived?: boolean) => {
    messagesApi.getAll({ search: q, archived })
      .then(data => { setMessages(data.messages); setUnreadCount(data.unreadCount); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchMessages('', showArchived); }, [fetchMessages, showArchived]);
  useEffect(() => { const t = setTimeout(() => fetchMessages(search, showArchived), 300); return () => clearTimeout(t); }, [search, showArchived, fetchMessages]);

  const handleSelect = async (msg: Msg) => {
    setSelected(msg);
    setReplyText('');
    if (msg.unread) {
      try {
        const data = await messagesApi.markRead(msg.id);
        setMessages(prev => prev.map(m => m.id === msg.id ? data.message : m));
        setSelected(data.message);
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) { console.error(err); }
    }
  };

  const handleArchive = async (id: number) => {
    try { await messagesApi.archive(id); fetchMessages(search, showArchived); if (selected?.id === id) setSelected(null); } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    try { await messagesApi.delete(id); fetchMessages(search, showArchived); if (selected?.id === id) setSelected(null); } catch (err) { console.error(err); }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selected) return;
    setReplying(true);
    try {
      const data = await messagesApi.reply(selected.id, replyText);
      setSelected(data.message);
      setMessages(prev => prev.map(m => m.id === selected.id ? data.message : m));
      setReplyText('');
    } catch (err) { console.error(err); } finally { setReplying(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={32} className="text-[#3b82f6] animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Messages</h1>
          <p className="text-white/40 text-sm mt-1">{unreadCount > 0 ? `${unreadCount} non lus` : 'Tous lus'}</p>
        </div>
        <button onClick={() => { setShowArchived(!showArchived); setSelected(null); }} className={`px-4 py-2.5 rounded-xl text-sm transition-all border ${showArchived ? 'bg-[#1e5aad]/20 border-[#3b82f6]/30 text-[#60a5fa]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}>
          <Archive size={16} className="inline mr-2" />{showArchived ? 'Boîte de réception' : 'Archives'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ height: 'calc(100vh - 240px)', minHeight: '500px' }}>
        <div className="lg:col-span-2 flex flex-col bg-[#060f1e] border border-white/8 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12"><MessageSquare size={32} className="text-white/10 mb-3" /><p className="text-white/30 text-sm">Aucun message</p></div>
            ) : messages.map(msg => (
              <button key={msg.id} onClick={() => handleSelect(msg)} className={`w-full text-left p-4 border-b border-white/[0.04] hover:bg-white/[0.04] transition-all ${selected?.id === msg.id ? 'bg-[#1e5aad]/10 border-l-2 border-l-[#3b82f6]' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs shrink-0 ${msg.unread ? 'bg-gradient-to-br from-[#1e5aad] to-[#3b82f6]' : 'bg-white/10'}`} style={{ fontWeight: 700 }}>{msg.from[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm truncate" style={{ fontWeight: msg.unread ? 600 : 400 }}>{msg.from}</p>
                      <p className="text-white/30 text-xs shrink-0 ml-2">{msg.time}</p>
                    </div>
                    <p className="text-white/70 text-xs truncate mt-0.5" style={{ fontWeight: msg.unread ? 500 : 400 }}>{msg.subject}</p>
                    <p className="text-white/35 text-xs truncate mt-0.5">{msg.preview}</p>
                  </div>
                  {msg.unread && <div className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0 mt-1" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-[#060f1e] border border-white/8 rounded-2xl flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                <div className="p-5 border-b border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white" style={{ fontWeight: 600 }}>{selected.subject}</h3>
                      <p className="text-white/40 text-sm mt-0.5">{selected.from} · {selected.email}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleArchive(selected.id)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Archiver"><Archive size={16} /></button>
                      <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Supprimer"><Trash2 size={16} /></button>
                      <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all lg:hidden"><X size={16} /></button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {(selected.thread || []).map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.isAdmin ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0 ${msg.isAdmin ? 'bg-gradient-to-br from-[#1e5aad] to-[#3b82f6]' : 'bg-white/10'}`} style={{ fontWeight: 700 }}>
                        {msg.isAdmin ? 'J' : msg.from[0]}
                      </div>
                      <div className={`max-w-[80%] flex flex-col gap-1 ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm ${msg.isAdmin ? 'bg-gradient-to-br from-[#1e5aad]/40 to-[#3b82f6]/20 border border-[#3b82f6]/20 text-white' : 'bg-white/[0.06] border border-white/10 text-white/80'}`}>{msg.text}</div>
                        <p className="text-white/25 text-xs px-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/5">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center text-white text-xs shrink-0" style={{ fontWeight: 700 }}>J</div>
                    <div className="flex-1 relative">
                      <textarea value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleReply(); }} placeholder="Répondre... (envoie un email au client)" rows={2} className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm resize-none" />
                      <button onClick={handleReply} disabled={!replyText.trim() || replying} className="absolute right-3 bottom-3 p-1.5 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white disabled:opacity-40 transition-all hover:from-[#2563eb] hover:to-[#60a5fa]">
                        {replying ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4"><Reply size={28} className="text-white/15" /></div>
                <p className="text-white/30">Sélectionnez un message</p>
                <p className="text-white/15 text-sm mt-1">pour afficher la conversation</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
