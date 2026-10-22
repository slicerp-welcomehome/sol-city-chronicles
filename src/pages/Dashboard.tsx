import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, MapPin, Plus, Users, BookUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardGuard } from '@/components/DashboardGuard';
import { CitizenEditor } from '@/components/CitizenEditor';
import { useCharacters } from '@/hooks/useCharacters';
import { citizenInitials } from '@/lib/dashboard';

function ResidentDashboard({ userId }: { userId: string }) {
  const { characters, refresh } = useCharacters(userId);
  const [adding, setAdding] = useState(false);
  const rows = characters.data ?? [];
  return <div className="space-y-8">
    <header className="border-b-2 border-primary pb-6"><p className="flex items-center gap-2 text-xs uppercase font-semibold text-accent mb-3"><BookUser className="h-4 w-4" /> Sol City resident portal</p><h1 className="font-newspaper text-4xl font-bold text-primary">Dashboard</h1><p className="text-muted-foreground mt-3 italic">Welcome home. Every life has a story.</p></header>
    <section aria-labelledby="citizens-heading"><div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div><h2 id="citizens-heading" className="font-newspaper text-2xl font-bold text-primary">Your citizens</h2>{characters.isSuccess && <p className="mt-1 text-sm text-muted-foreground">{rows.length} {rows.length === 1 ? 'citizen' : 'citizens'} in your household</p>}</div><Button onClick={() => setAdding(true)}><Plus /> New citizen</Button></div>
      {characters.isPending ? <p role="status" className="py-12 text-muted-foreground">Loading your citizens…</p> : characters.isError ? <div className="py-12 space-y-3"><p role="alert" className="text-destructive">Your citizens could not be loaded.</p><Button variant="outline" onClick={() => characters.refetch()}>Try again</Button></div> : !rows.length ?
        <div className="text-center border-y border-border py-16"><Users className="h-12 w-12 text-accent mx-auto mb-4" /><h3 className="font-newspaper text-2xl text-primary">A new story begins</h3><p className="text-muted-foreground mt-3 mb-6">You don’t have any citizens yet.</p><Button variant="outline" onClick={() => setAdding(true)}><Plus /> Add your first citizen</Button></div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{rows.map(citizen => <Link key={citizen.id} to={`/dashboard/citizens/${citizen.id}`} aria-label={`Open ${citizen.name}`} className="group block min-w-0 rounded border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <div className="flex items-start justify-between gap-4"><span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-newspaper text-2xl font-bold" aria-hidden="true">{citizenInitials(citizen.name)}</span><ArrowRight className="h-5 w-5 text-accent" /></div>
          <h3 className="mt-5 font-newspaper text-xl font-bold text-primary break-words">{citizen.name}</h3><p className="text-xs uppercase text-muted-foreground mt-1 mb-4">Citizen of Sol City</p>
          <p className="flex items-start gap-2 text-sm"><Briefcase className="h-4 w-4 shrink-0 mt-0.5 text-accent" /><span className="break-words min-w-0">{citizen.occupation || 'Occupation not recorded'}</span></p><p className="flex items-start gap-2 text-sm mt-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-accent" /><span className="break-words min-w-0">{citizen.neighborhood || 'Neighborhood not recorded'}</span></p>
        </Link>)}</div>}
    </section>
    {adding && <CitizenEditor userId={userId} onClose={() => setAdding(false)} onSaved={async () => { await refresh(); }} />}
  </div>;
}

export default function Dashboard() { return <DashboardGuard>{userId => <ResidentDashboard key={userId} userId={userId} />}</DashboardGuard>; }