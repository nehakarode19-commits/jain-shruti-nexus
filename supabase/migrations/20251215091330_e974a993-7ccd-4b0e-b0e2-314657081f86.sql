-- Add category column to gallery table for the 4 divisions
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS category_division TEXT DEFAULT 'gurudev';

-- Create live_telecasts table
CREATE TABLE public.live_telecasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  stream_url TEXT,
  thumbnail_url TEXT,
  source_type TEXT NOT NULL DEFAULT 'mjrc' CHECK (source_type IN ('mjrc', 'outside')),
  event_date TIMESTAMP WITH TIME ZONE,
  is_live BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.live_telecasts ENABLE ROW LEVEL SECURITY;

-- Public can view published telecasts
CREATE POLICY "Anyone can view published telecasts" 
ON public.live_telecasts 
FOR SELECT 
USING (is_published = true);

-- Admins can manage telecasts
CREATE POLICY "Admins can manage telecasts" 
ON public.live_telecasts 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_live_telecasts_updated_at
BEFORE UPDATE ON public.live_telecasts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();