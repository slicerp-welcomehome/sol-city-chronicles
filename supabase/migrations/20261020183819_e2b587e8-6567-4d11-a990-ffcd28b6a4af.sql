CREATE TABLE public.lore_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 story text NOT NULL,
 lore_date date NOT NULL,
 location text,
 tagged_resident_ids uuid[] NOT NULL DEFAULT '{}'::uuid[],
 author_id uuid NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lore_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lore_events TO authenticated;
GRANT ALL ON public.lore_events TO service_role;
ALTER TABLE public.lore_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can read lore events" ON public.lore_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can add lore events" ON public.lore_events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role) AND author_id = auth.uid());
CREATE POLICY "Admins can edit lore events" ON public.lore_events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can remove lore events" ON public.lore_events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX lore_events_date_idx ON public.lore_events (lore_date DESC, id);
CREATE INDEX lore_events_residents_idx ON public.lore_events USING gin (tagged_resident_ids);
CREATE FUNCTION public.validate_lore_event() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 NEW.title := btrim(NEW.title);
 NEW.story := btrim(NEW.story);
 IF NEW.title = '' OR NEW.story = '' THEN
  RAISE EXCEPTION 'A title and story are required';
 END IF;
 IF EXISTS (SELECT 1 FROM unnest(NEW.tagged_resident_ids) AS tagged(id) WHERE tagged.id IS NULL OR NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = tagged.id)) THEN
  RAISE EXCEPTION 'Tagged residents must have a community profile';
 END IF;
 IF TG_OP = 'UPDATE' AND NEW.author_id IS DISTINCT FROM OLD.author_id THEN
  RAISE EXCEPTION 'The original author cannot be changed';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER validate_lore_event_before_save BEFORE INSERT OR UPDATE ON public.lore_events FOR EACH ROW EXECUTE FUNCTION public.validate_lore_event();
CREATE TRIGGER update_lore_events_updated_at BEFORE UPDATE ON public.lore_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();