import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { LoreEvent, Resident } from '@/hooks/useTimeline';
import { canManageTimeline, residentName } from '@/lib/timeline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: LoreEvent | null;
  residents: Resident[];
  residentsFailed: boolean;
  onSaved: () => Promise<unknown>;
}

export function TimelineEditor({ open, onOpenChange, event, residents, residentsFailed, onSaved }: Props) {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setTitle(event?.title ?? '');
    setDate(event?.lore_date ?? '');
    setLocation(event?.location ?? '');
    setStory(event?.story ?? '');
    setTags(event?.tagged_resident_ids ?? []);
    setSearch('');
    setError('');
  }, [open, event]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!user || !canManageTimeline(userRole) || saving) return;
    if (!title.trim() || !story.trim() || !date) {
      setError('Please enter a title, lore date, and story.');
      return;
    }
    setSaving(true);
    setError('');
    const values = { title: title.trim(), lore_date: date, location: location.trim() || null, story: story.trim(), tagged_resident_ids: tags };
    try {
      const result = event
        ? await supabase.from('lore_events').update(values).eq('id', event.id).select('id').single()
        : await supabase.from('lore_events').insert({ ...values, author_id: user.id }).select('id').single();
      if (result.error) throw result.error;
      await onSaved();
      toast({ title: event ? 'Lore event updated' : 'Lore event added' });
      onOpenChange(false);
    } catch {
      setError('The event could not be saved. Check your connection and admin access, then try again.');
    } finally {
      setSaving(false);
    }
  }

  return <Dialog open={open} onOpenChange={(value) => { if (!saving) onOpenChange(value); }}>
    <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="font-newspaper">{event ? 'Edit lore event' : 'Add lore event'}</DialogTitle>
        <DialogDescription>Sol City Community Archives</DialogDescription>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-2"><Label htmlFor="lore-title">Title *</Label><Input id="lore-title" required value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="lore-date">Lore date *</Label><Input id="lore-date" type="date" required value={date} onChange={e => setDate(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="lore-location">Location</Label><Input id="lore-location" value={location} onChange={e => setLocation(e.target.value)} /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="lore-story">Story *</Label><Textarea id="lore-story" required rows={7} value={story} onChange={e => setStory(e.target.value)} /></div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium mb-2">Tagged residents · {tags.length} selected</legend>
          <Input aria-label="Search residents to tag" placeholder="Search residents…" value={search} onChange={e => setSearch(e.target.value)} />
          {residentsFailed ? <p className="text-sm text-destructive">Resident names could not be loaded. Existing tags will be preserved.</p> :
            <div className="max-h-40 overflow-y-auto border rounded p-3 space-y-3">
              {residents.filter(p => residentName(p).toLowerCase().includes(search.toLowerCase())).map(p =>
                <Label key={p.id} className="flex items-center gap-3 cursor-pointer leading-normal">
                  <Checkbox checked={tags.includes(p.id)} onCheckedChange={checked => setTags(current => checked === true ? [...current, p.id] : current.filter(id => id !== p.id))} />
                  <span className="break-words min-w-0">{residentName(p)}</span>
                </Label>)}
              {!residents.length && <p className="text-sm text-muted-foreground">No residents registered yet.</p>}
              {!!residents.length && !residents.some(p => residentName(p).toLowerCase().includes(search.toLowerCase())) && <p className="text-sm text-muted-foreground">No matching residents.</p>}
            </div>}
        </fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit" disabled={saving || !canManageTimeline(userRole)}>{saving ? <Loader2 className="animate-spin" /> : <Save />} {saving ? 'Saving…' : 'Save event'}</Button></div>
      </form>
    </DialogContent>
  </Dialog>;
}