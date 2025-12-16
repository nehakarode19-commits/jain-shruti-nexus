-- Create scholar publications table
CREATE TABLE public.scholar_publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'Research Paper',
  sub_category TEXT,
  keywords TEXT[],
  cover_image TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_published BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scholar_publications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published publications"
ON public.scholar_publications
FOR SELECT
USING (is_published = true);

CREATE POLICY "Scholars can view their own publications"
ON public.scholar_publications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Scholars can create their own publications"
ON public.scholar_publications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Scholars can update their own publications"
ON public.scholar_publications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Scholars can delete their own publications"
ON public.scholar_publications
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can do everything on publications"
ON public.scholar_publications
FOR ALL
USING (is_admin(auth.uid()));

-- Create publication reviews table
CREATE TABLE public.publication_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID NOT NULL REFERENCES public.scholar_publications(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.publication_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.publication_reviews
FOR SELECT
USING (is_approved = true);

CREATE POLICY "Reviewers can view their own reviews"
ON public.publication_reviews
FOR SELECT
USING (auth.uid() = reviewer_id);

CREATE POLICY "Authenticated users can create reviews"
ON public.publication_reviews
FOR INSERT
WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Reviewers can update their own reviews"
ON public.publication_reviews
FOR UPDATE
USING (auth.uid() = reviewer_id);

CREATE POLICY "Admins can manage all reviews"
ON public.publication_reviews
FOR ALL
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_scholar_publications_updated_at
BEFORE UPDATE ON public.scholar_publications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();