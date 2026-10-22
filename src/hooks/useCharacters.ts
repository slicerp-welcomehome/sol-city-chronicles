import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Citizen = Tables<'characters'>;

export function useCharacters(userId: string) {
  const client = useQueryClient();
  const characters = useQuery({
    queryKey: ['characters', userId],
    queryFn: async () => {
      const { data, error } = await supabase.from('characters').select('*').eq('user_id', userId).order('created_at');
      if (error) throw error;
      return data;
    },
  });
  const refresh = () => client.invalidateQueries({ queryKey: ['characters', userId] });
  return { characters, refresh };
}