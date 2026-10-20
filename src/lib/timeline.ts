export interface TimelineFilter {
  title: string;
  story: string;
  location: string | null;
  lore_date: string;
  tagged_resident_ids: string[];
}

export const canManageTimeline = (role: string | null) => role === 'admin';

export function matchesTimeline(event: TimelineFilter, search: string, year: string, resident: string) {
  const text = `${event.title} ${event.story} ${event.location ?? ''}`.toLowerCase();
  return text.includes(search.trim().toLowerCase()) &&
    (year === 'all' || event.lore_date.slice(0, 4) === year) &&
    (resident === 'all' || event.tagged_resident_ids.includes(resident));
}

export const residentName = (profile: { display_name: string | null; username: string | null }) =>
  profile.display_name || profile.username || 'Unnamed resident';