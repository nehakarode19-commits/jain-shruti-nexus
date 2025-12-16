-- Drop existing restrictive RLS policies on gallery table
DROP POLICY IF EXISTS "Admins can do everything on gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anyone can delete gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anyone can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anyone can read published gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anyone can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can read all gallery" ON public.gallery;

-- Create new PERMISSIVE policies for gallery table
CREATE POLICY "Anyone can read published gallery" 
ON public.gallery 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authenticated users can read all gallery" 
ON public.gallery 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert gallery" 
ON public.gallery 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery" 
ON public.gallery 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete gallery" 
ON public.gallery 
FOR DELETE 
TO authenticated
USING (true);