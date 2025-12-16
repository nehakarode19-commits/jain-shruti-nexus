-- Fix gallery table INSERT policy to allow public access
DROP POLICY IF EXISTS "Authenticated users can insert gallery" ON public.gallery;
CREATE POLICY "Anyone can insert gallery" 
ON public.gallery FOR INSERT 
TO public
WITH CHECK (true);

-- Also fix UPDATE and DELETE for gallery
DROP POLICY IF EXISTS "Authenticated users can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON public.gallery;

CREATE POLICY "Anyone can update gallery" 
ON public.gallery FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete gallery" 
ON public.gallery FOR DELETE 
TO public
USING (true);

-- Fix all other admin tables INSERT/UPDATE/DELETE policies

-- live_telecasts
DROP POLICY IF EXISTS "Authenticated users can insert telecasts" ON public.live_telecasts;
DROP POLICY IF EXISTS "Authenticated users can update telecasts" ON public.live_telecasts;
DROP POLICY IF EXISTS "Authenticated users can delete telecasts" ON public.live_telecasts;

CREATE POLICY "Anyone can insert telecasts" 
ON public.live_telecasts FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update telecasts" 
ON public.live_telecasts FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete telecasts" 
ON public.live_telecasts FOR DELETE 
TO public
USING (true);

-- books
DROP POLICY IF EXISTS "Authenticated users can insert books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can update books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can delete books" ON public.books;

CREATE POLICY "Anyone can insert books" 
ON public.books FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update books" 
ON public.books FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete books" 
ON public.books FOR DELETE 
TO public
USING (true);

-- events
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

CREATE POLICY "Anyone can insert events" 
ON public.events FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update events" 
ON public.events FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete events" 
ON public.events FOR DELETE 
TO public
USING (true);

-- articles
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.articles;

CREATE POLICY "Anyone can insert articles" 
ON public.articles FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
ON public.articles FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete articles" 
ON public.articles FOR DELETE 
TO public
USING (true);

-- blogs
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON public.blogs;

CREATE POLICY "Anyone can insert blogs" 
ON public.blogs FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update blogs" 
ON public.blogs FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete blogs" 
ON public.blogs FOR DELETE 
TO public
USING (true);

-- guruvani
DROP POLICY IF EXISTS "Authenticated users can insert guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can update guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can delete guruvani" ON public.guruvani;

CREATE POLICY "Anyone can insert guruvani" 
ON public.guruvani FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update guruvani" 
ON public.guruvani FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete guruvani" 
ON public.guruvani FOR DELETE 
TO public
USING (true);

-- emagazines
DROP POLICY IF EXISTS "Authenticated users can insert emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Authenticated users can update emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Authenticated users can delete emagazines" ON public.emagazines;

CREATE POLICY "Anyone can insert emagazines" 
ON public.emagazines FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update emagazines" 
ON public.emagazines FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete emagazines" 
ON public.emagazines FOR DELETE 
TO public
USING (true);