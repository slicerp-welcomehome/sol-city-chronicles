import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Citizen } from '@/hooks/useCharacters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function CitizenEditor({ userId, citizen, onClose, onSaved }: { userId: string; citizen?: Citizen; onClose: () => void; onSaved: (id: string) => Promise<void> }) {
  const [name, setName] = useState(citizen?.name ?? '');
  const [occupation, setOccupation] = useState(citizen?.occupation ?? '');
  const [neighborhood, setNeighborhood] = useState(citizen?.neighborhood ?? '');
  const [biography, setBiography] = useState(citizen?.biography ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !name.trim()) return;
    setSaving(true); setError('');
    const fields = { name: name.trim(), occupation: occupation.trim(), neighborhood: neighborhood.trim(), biography: biography.trim() };
    try {
      const result = citizen
        ? await supabase.from('characters').update(fields).eq('id', citizen.id).eq('user_id', userId).select('id').single()
        : await supabase.from('characters').insert({ ...fields, user_id: userId }).select('id').single();
      if (result.error) throw result.error;
      await onSaved(result.data.id);
      onClose();
    } catch { setError('Your citizen could not be saved. Please try again.'); }
    finally { setSaving(false); }
  }
  return <Dialog open onOpenChange={open => { if (!open && !saving) onClose(); }}><DialogContent className="max-h-[90dvh] overflow-y-auto"><DialogHeader><DialogTitle className="font-newspaper text-primary">{citizen ? 'Edit citizen' : 'New citizen'}</DialogTitle><DialogDescription>Sol City resident record</DialogDescription></DialogHeader>
    <form onSubmit={save} className="space-y-4">
      <div className="space-y-2"><Label htmlFor="citizen-name">Citizen name</Label><Input id="citizen-name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="citizen-occupation">Occupation</Label><Input id="citizen-occupation" maxLength={120} value={occupation} onChange={e => setOccupation(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="citizen-neighborhood">Neighborhood</Label><Input id="citizen-neighborhood" maxLength={120} value={neighborhood} onChange={e => setNeighborhood(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="citizen-biography">Biography</Label><Textarea id="citizen-biography" rows={5} maxLength={5000} value={biography} onChange={e => setBiography(e.target.value)} /></div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={onClose}>Cancel</Button><Button disabled={saving || !name.trim()}>{saving ? 'Saving…' : 'Save citizen'}</Button></div>
    </form>
  </DialogContent></Dialog>;
}