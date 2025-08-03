-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  street_number TEXT,
  street_name TEXT,
  neighborhood TEXT,
  zipcode TEXT,
  interiors JSONB DEFAULT '{}', -- For details like bedrooms, bathrooms, etc.
  tags TEXT[] DEFAULT '{}', -- Array of strings for features
  picture_urls TEXT[] DEFAULT '{}', -- Array of image URLs
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies for property access
CREATE POLICY "Everyone can view properties" 
ON public.properties 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage properties" 
ON public.properties 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();