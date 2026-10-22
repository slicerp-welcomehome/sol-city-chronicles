CREATE TABLE public.characters (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
 occupation text NOT NULL DEFAULT '' CHECK (char_length(occupation) <= 120),
 neighborhood text NOT NULL DEFAULT '' CHECK (char_length(neighborhood) <= 120),
 biography text NOT NULL DEFAULT '' CHECK (char_length(biography) <= 5000),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.characters TO authenticated;
GRANT ALL ON public.characters TO service_role;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own characters" ON public.characters FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own characters" ON public.characters FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit their own characters" ON public.characters FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own characters" ON public.characters FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX characters_user_id_idx ON public.characters(user_id);
CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON public.characters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();