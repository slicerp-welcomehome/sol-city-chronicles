import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type LoreEvent = Tables<'lore_events'>;
export type Resident = Pick<Tables<'profiles'>, 'id' | 'display_name' | 'username'>;

export function useTimeline() {
  const queryClient = useQueryClient();
  const events = useQuery({
    queryKey: ['lore-events'],
    queryFn: async () => {
      const rows: LoreEvent[] = [];
      for (let offset = 0; ; offset += 1000) {
        const { data, error } = await supabase.from('lore_events').select('*')
          .order('lore_date', { ascending: false }).order('id').range(offset, offset + 999);
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) break;
      }
      return rows;
    },
  });
  const residents = useQuery({
    queryKey: ['timeline-residents'],
    queryFn: async () => {
      const rows: Resident[] = [];
      for (let offset = 0; ; offset += 1000) {
        const { data, error } = await supabase.from('profiles').select('id, display_name, username')
          .order('id').range(offset, offset + 999);
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) break;
      }
      return rows;
    },
  });
  return { events, residents, refresh: () => queryClient.invalidateQueries({ queryKey: ['lore-events'] }) };
}