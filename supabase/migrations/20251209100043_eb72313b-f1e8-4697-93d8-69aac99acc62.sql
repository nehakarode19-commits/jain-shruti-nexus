-- DEMO MODE: Allow any authenticated user to manage content
-- This is for demo purposes only - re-enable strict RLS for production

-- Gallery: Allow authenticated users to insert/update/delete
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

-- Books: Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert books" 
ON public.books 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update books" 
ON public.books 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete books" 
ON public.books 
FOR DELETE 
TO authenticated
USING (true);

-- Articles: Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert articles" 
ON public.articles 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" 
ON public.articles 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete articles" 
ON public.articles 
FOR DELETE 
TO authenticated
USING (true);

-- Blogs: Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert blogs" 
ON public.blogs 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs" 
ON public.blogs 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete blogs" 
ON public.blogs 
FOR DELETE 
TO authenticated
USING (true);

-- Events: Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert events" 
ON public.events 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update events" 
ON public.events 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete events" 
ON public.events 
FOR DELETE 
TO authenticated
USING (true);

-- Guruvani: Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert guruvani" 
ON public.guruvani 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update guruvani" 
ON public.guruvani 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete guruvani" 
ON public.guruvani 
FOR DELETE 
TO authenticated
USING (true);

-- Also allow authenticated users to SELECT all content (not just published) for admin views
CREATE POLICY "Authenticated users can read all gallery" 
ON public.gallery 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read all books" 
ON public.books 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read all articles" 
ON public.articles 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read all blogs" 
ON public.blogs 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read all events" 
ON public.events 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read all guruvani" 
ON public.guruvani 
FOR SELECT 
TO authenticated
USING (true);