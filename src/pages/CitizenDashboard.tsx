import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, BookUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardGuard } from '@/components/DashboardGuard';
import { CitizenEditor } from '@/components/CitizenEditor';
import { useCharacters } from '@/hooks/useCharacters';
import { citizenInitials } from '@/lib/dashboard';

function CitizenRecord({ userId }: { userId: string }) {
  const { id } = useParams();
  const { characters, refresh } = useCharacters(userId);
  const [editing, setEditing] = useState(false);
  const citizen = characters.data?.find(row => row.id === id);
  const back = <Button variant="link" asChild className="px-0"><Link to="/dashboard"><ArrowLeft /> All citizens</Link></Button>;
  if (characters.isPending) return <p role="status" className="py-16">Opening citizen record…</p>;
  if (characters.isError) return <div className="space-y-4">{back}<p role="alert">This citizen record could not be loaded.</p><Button onClick={() => characters.refetch()}>Try again</Button></div>;
  if (!citizen) return <div className="space-y-4">{back}<h1 className="font-newspaper text-3xl text-primary">Citizen record unavailable</h1><p className="text-muted-foreground">This citizen does not exist or isn’t part of your household.</p></div>;
  return <div className="space-y-8">{back}
    <header className="border-b-2 border-primary pb-6"><p className="flex items-center gap-2 text-xs uppercase font-semibold text-accent mb-5"><BookUser className="h-4 w-4" /> Citizen record</p><div className="flex flex-wrap items-center gap-5"><span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-newspaper text-3xl font-bold" aria-hidden="true">{citizenInitials(citizen.name)}</span><div className="flex-1 min-w-0"><h1 className="font-newspaper text-3xl sm:text-4xl font-bold text-primary break-words">{citizen.name}</h1><p className="mt-3 text-muted-foreground">Citizen of Sol City</p></div><Button variant="outline" onClick={() => setEditing(true)}><Pencil /> Edit citizen</Button></div></header>
    <div className="grid md:grid-cols-[1fr_2fr] gap-8"><section aria-labelledby="details-heading"><h2 id="details-heading" className="font-newspaper text-2xl font-bold text-primary mb-5">Citizen information</h2><dl className="space-y-5"><div><dt className="text-xs uppercase font-semibold text-muted-foreground">Occupation</dt><dd className="mt-2 break-words">{citizen.occupation || 'Not recorded'}</dd></div><div><dt className="text-xs uppercase font-semibold text-muted-foreground">Neighborhood</dt><dd className="mt-2 break-words">{citizen.neighborhood || 'Not recorded'}</dd></div></dl></section><section aria-labelledby="story-heading" className="md:border-l border-border md:pl-8"><h2 id="story-heading" className="font-newspaper text-2xl font-bold text-primary mb-5">Their story</h2><p className="whitespace-pre-wrap break-words leading-relaxed">{citizen.biography || 'This chapter is yet to be written.'}</p></section></div>
    {editing && <CitizenEditor userId={userId} citizen={citizen} onClose={() => setEditing(false)} onSaved={async () => { await refresh(); }} />}
  </div>;
}

export default function CitizenDashboard() { return <DashboardGuard>{userId => <CitizenRecord key={userId} userId={userId} />}</DashboardGuard>; }