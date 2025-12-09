-- Drop existing restrictive public read policies and recreate as permissive
DROP POLICY IF EXISTS "Public can read published books" ON public.books;
DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
DROP POLICY IF EXISTS "Public can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public can read published events" ON public.events;
DROP POLICY IF EXISTS "Public can read published gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public can read published guruvani" ON public.guruvani;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Anyone can read published books" 
ON public.books 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can read published articles" 
ON public.articles 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can read published blogs" 
ON public.blogs 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can read published events" 
ON public.events 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can read published gallery" 
ON public.gallery 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can read published non-restricted guruvani" 
ON public.guruvani 
FOR SELECT 
USING ((is_published = true) AND (is_restricted = false));