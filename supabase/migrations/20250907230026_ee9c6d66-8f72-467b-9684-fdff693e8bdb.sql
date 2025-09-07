-- Add business_owner to the app_role enum
ALTER TYPE public.app_role ADD VALUE 'business_owner';

-- Update RLS policies for businesses table to allow business owners to edit their own businesses
-- First, drop existing policies
DROP POLICY IF EXISTS "Business owners can update their business" ON public.businesses;
DROP POLICY IF EXISTS "Everyone can view businesses" ON public.businesses;

-- Create new policies
CREATE POLICY "Everyone can view businesses" 
ON public.businesses 
FOR SELECT 
USING (true);

CREATE POLICY "Business owners can update their business" 
ON public.businesses 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Business owners can insert their business" 
ON public.businesses 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

-- Only admins can update featured status
CREATE POLICY "Only admins can update featured status" 
ON public.businesses 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));