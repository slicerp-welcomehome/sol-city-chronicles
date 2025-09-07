-- Add RLS policies for news_posts table
CREATE POLICY "Everyone can view published news posts" 
ON public.news_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins and moderators can view all news posts" 
ON public.news_posts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can create news posts" 
ON public.news_posts 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can update news posts" 
ON public.news_posts 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins can delete news posts" 
ON public.news_posts 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));