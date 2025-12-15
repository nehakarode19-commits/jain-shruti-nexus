-- Create emagazines table for Jambu Jyoti eMagazine
CREATE TABLE public.emagazines (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    volume TEXT,
    issue_date DATE,
    year INTEGER NOT NULL,
    cover_image TEXT,
    pdf_url TEXT NOT NULL,
    description TEXT,
    is_published BOOLEAN DEFAULT false,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.emagazines ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published emagazines" 
ON public.emagazines 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authenticated users can read all emagazines" 
ON public.emagazines 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can do everything on emagazines" 
ON public.emagazines 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can insert emagazines" 
ON public.emagazines 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update emagazines" 
ON public.emagazines 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete emagazines" 
ON public.emagazines 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_emagazines_updated_at
BEFORE UPDATE ON public.emagazines
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();