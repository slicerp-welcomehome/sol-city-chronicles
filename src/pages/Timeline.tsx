import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Archive, ArrowDownWideNarrow, ArrowUpWideNarrow, MapPin, Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTimeline, type LoreEvent } from '@/hooks/useTimeline';
import { canManageTimeline, matchesTimeline, residentName } from '@/lib/timeline';
import { supabase } from '@/integrations/supabase/client';
import { TimelineEditor } from '@/components/TimelineEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function Timeline() {
  const { userRole } = useAuth();
  const isAdmin = canManageTimeline(userRole);
  const { events, residents, refresh } = useTimeline();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');
  const [resident, setResident] = useState('all');
  const [oldestFirst, setOldestFirst] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<LoreEvent | null>(null);
  const [removing, setRemoving] = useState<LoreEvent | null>(null);
  const [deleting, setDeleting] = useState(false);
  const rows = events.data ?? [];
  const people = useMemo(() => [...(residents.data ?? [])].sort((a, b) => residentName(a).localeCompare(residentName(b))), [residents.data]);
  const names = new Map(people.map(p => [p.id, residentName(p)]));
  const years = [...new Set(rows.map(e => e.lore_date.slice(0, 4)))].sort().reverse();
  const filtered = rows.filter(e => matchesTimeline(e, search, year, resident));
  const visible = oldestFirst ? [...filtered].reverse() : filtered;

  async function remove() {
    if (!removing || !isAdmin || deleting) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from('lore_events').delete().eq('id', removing.id).select('id').single();
      if (error) throw error;
      await refresh();
      setRemoving(null);
      toast({ title: 'Lore event removed' });
    } catch {
      toast({ title: 'Event could not be removed', description: 'Check your connection and admin access, then try again.', variant: 'destructive' });
    } finally { setDeleting(false); }
  }

  return <div className="space-y-8">
    <header className="border-b-2 border-primary pb-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-accent mb-3"><Archive className="h-4 w-4" /> Sol City Community Archives</div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="font-newspaper text-4xl font-bold text-primary">The Timeline</h1><p className="mt-3 text-muted-foreground italic">The people, moments, and stories that make Sol City.</p></div>
        {isAdmin && <Button onClick={() => { setEditing(null); setEditorOpen(true); }}><Plus /> Add lore event</Button>}
      </div>
    </header>

    <section aria-label="Timeline filters" className="flex flex-wrap gap-3 border-b border-border pb-5">
      <div className="relative flex-1 min-w-[180px]"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" aria-label="Search community lore" placeholder="Search the archives…" value={search} onChange={e => setSearch(e.target.value)} /></div>
      <Select value={year} onValueChange={setYear}><SelectTrigger aria-label="Filter by year" className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All years</SelectItem>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select>
      <Select value={resident} onValueChange={setResident}><SelectTrigger aria-label="Filter by resident" className="w-52 max-w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All residents</SelectItem>{people.map(p => <SelectItem key={p.id} value={p.id}>{residentName(p)}</SelectItem>)}</SelectContent></Select>
      <Button variant="outline" onClick={() => setOldestFirst(!oldestFirst)}>{oldestFirst ? <ArrowUpWideNarrow /> : <ArrowDownWideNarrow />}{oldestFirst ? 'Oldest first' : 'Newest first'}</Button>
    </section>

    {events.isPending ? <p role="status" className="py-12 text-center text-muted-foreground">Opening the archives…</p> : events.isError ?
      <div className="py-12 text-center space-y-4"><p role="alert" className="text-destructive">The timeline could not be loaded.</p><Button variant="outline" onClick={() => events.refetch()}>Try again</Button></div> :
      !visible.length ? <div className="py-16 text-center border-y border-border"><Archive className="h-10 w-10 mx-auto text-accent mb-4" /><h2 className="font-newspaper text-2xl text-primary">{rows.length ? 'No matching chapters' : 'The first chapter is yet to be written'}</h2><p className="text-muted-foreground mt-3">{rows.length ? 'No lore events match this selection.' : 'The community archives are waiting for their first entry.'}</p>{rows.length > 0 && <Button variant="link" onClick={() => { setSearch(''); setYear('all'); setResident('all'); }}>Clear filters</Button>}</div> :
      <section aria-label="Community lore timeline" className="max-w-4xl mx-auto">
        <p className="text-xs uppercase text-muted-foreground mb-6">{visible.length} {visible.length === 1 ? 'entry' : 'entries'} in the archives</p>
        <ol className="relative border-l-2 border-primary/25 ml-2 sm:ml-32">
          {visible.map((event, index) => <li key={event.id} className="relative pl-6 sm:pl-10 pb-10" id={`lore-${event.id}`}>
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
            {(index === 0 || visible[index - 1]?.lore_date.slice(0, 4) !== event.lore_date.slice(0, 4)) && <p className="sm:absolute sm:-left-32 sm:top-0 font-newspaper text-2xl font-bold text-primary mb-4">{event.lore_date.slice(0, 4)}</p>}
            <article className="border-b border-border pb-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3"><time dateTime={event.lore_date} className="text-sm font-semibold text-accent">{format(parseISO(event.lore_date), 'MMMM d, yyyy')}</time>{isAdmin && <div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={`Edit ${event.title}`} title="Edit event" onClick={() => { setEditing(event); setEditorOpen(true); }}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Remove ${event.title}`} title="Remove event" onClick={() => setRemoving(event)}><Trash2 className="text-destructive" /></Button></div>}</div>
              <h2 className="font-newspaper text-2xl font-bold text-primary break-words">{event.title}</h2>
              {event.location && <p className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /><span className="break-words min-w-0">{event.location}</span></p>}
              <p className="whitespace-pre-wrap break-words leading-relaxed">{event.story}</p>
              {!!event.tagged_resident_ids.length && <div className="flex flex-wrap items-center gap-2 pt-2"><Users className="w-4 h-4 text-muted-foreground" aria-label="Tagged residents" />{event.tagged_resident_ids.map(id => <Button key={id} size="sm" variant="link" className="h-auto py-1 px-1 whitespace-normal text-left break-words max-w-full" onClick={() => setResident(id)}>{names.get(id) ?? 'Former resident'}</Button>)}</div>}
            </article>
          </li>)}
        </ol>
      </section>}
    {residents.isError && <p className="text-sm text-muted-foreground">Resident names are temporarily unavailable.</p>}
    {isAdmin && <TimelineEditor open={editorOpen} onOpenChange={setEditorOpen} event={editing} residents={people} residentsFailed={residents.isError} onSaved={refresh} />}
    <AlertDialog open={!!removing} onOpenChange={open => { if (!open && !deleting) setRemoving(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Remove this lore event?</AlertDialogTitle><AlertDialogDescription>“{removing?.title}” will be permanently removed from the community archives.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel><AlertDialogAction disabled={deleting} onClick={e => { e.preventDefault(); remove(); }}>{deleting ? 'Removing…' : 'Remove event'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}