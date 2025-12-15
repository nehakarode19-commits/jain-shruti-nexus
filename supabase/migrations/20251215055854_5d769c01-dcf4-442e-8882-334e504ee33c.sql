-- Create social media settings table
CREATE TABLE public.social_media_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  url TEXT,
  is_enabled BOOLEAN DEFAULT true,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_media_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read social media settings
CREATE POLICY "Anyone can read social media settings"
ON public.social_media_settings
FOR SELECT
USING (true);

-- Only admins can modify social media settings
CREATE POLICY "Admins can manage social media settings"
ON public.social_media_settings
FOR ALL
USING (is_admin(auth.uid()));

-- Insert default social media platforms
INSERT INTO public.social_media_settings (platform, url, icon_name, display_order) VALUES
  ('facebook', 'https://facebook.com', 'Facebook', 1),
  ('twitter', 'https://twitter.com', 'Twitter', 2),
  ('instagram', 'https://instagram.com', 'Instagram', 3),
  ('youtube', 'https://youtube.com', 'Youtube', 4),
  ('linkedin', 'https://linkedin.com', 'Linkedin', 5);

-- Create trigger for updated_at
CREATE TRIGGER update_social_media_settings_updated_at
BEFORE UPDATE ON public.social_media_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();