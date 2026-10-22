REVOKE ALL ON public.characters FROM anon;
REVOKE ALL ON public.characters FROM PUBLIC;
ALTER TABLE public.characters DROP CONSTRAINT characters_user_id_fkey;
ALTER TABLE public.characters ADD CONSTRAINT characters_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;