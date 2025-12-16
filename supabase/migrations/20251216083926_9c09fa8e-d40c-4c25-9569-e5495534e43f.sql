-- Fix live_telecasts RLS policies
DROP POLICY IF EXISTS "Admins can manage telecasts" ON public.live_telecasts;
DROP POLICY IF EXISTS "Anyone can view published telecasts" ON public.live_telecasts;

CREATE POLICY "Anyone can view published telecasts" 
ON public.live_telecasts 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authenticated users can read all telecasts" 
ON public.live_telecasts 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert telecasts" 
ON public.live_telecasts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update telecasts" 
ON public.live_telecasts 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete telecasts" 
ON public.live_telecasts 
FOR DELETE 
TO authenticated
USING (true);

-- Fix articles RLS policies
DROP POLICY IF EXISTS "Admins can do everything on articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can delete articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can read published articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can update articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON public.articles;

CREATE POLICY "Anyone can read published articles" 
ON public.articles FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all articles" 
ON public.articles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert articles" 
ON public.articles FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" 
ON public.articles FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete articles" 
ON public.articles FOR DELETE TO authenticated USING (true);

-- Fix blogs RLS policies
DROP POLICY IF EXISTS "Admins can do everything on blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can delete blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can read all blogs" ON public.blogs;

CREATE POLICY "Anyone can read published blogs" 
ON public.blogs FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all blogs" 
ON public.blogs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert blogs" 
ON public.blogs FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs" 
ON public.blogs FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete blogs" 
ON public.blogs FOR DELETE TO authenticated USING (true);

-- Fix books RLS policies
DROP POLICY IF EXISTS "Admins can do everything on books" ON public.books;
DROP POLICY IF EXISTS "Anyone can delete books" ON public.books;
DROP POLICY IF EXISTS "Anyone can insert books" ON public.books;
DROP POLICY IF EXISTS "Anyone can read published books" ON public.books;
DROP POLICY IF EXISTS "Anyone can update books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can read all books" ON public.books;

CREATE POLICY "Anyone can read published books" 
ON public.books FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all books" 
ON public.books FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert books" 
ON public.books FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update books" 
ON public.books FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete books" 
ON public.books FOR DELETE TO authenticated USING (true);

-- Fix emagazines RLS policies
DROP POLICY IF EXISTS "Admins can do everything on emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Anyone can delete emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Anyone can insert emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Anyone can read published emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Anyone can update emagazines" ON public.emagazines;
DROP POLICY IF EXISTS "Authenticated users can read all emagazines" ON public.emagazines;

CREATE POLICY "Anyone can read published emagazines" 
ON public.emagazines FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all emagazines" 
ON public.emagazines FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert emagazines" 
ON public.emagazines FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update emagazines" 
ON public.emagazines FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete emagazines" 
ON public.emagazines FOR DELETE TO authenticated USING (true);

-- Fix events RLS policies
DROP POLICY IF EXISTS "Admins can do everything on events" ON public.events;
DROP POLICY IF EXISTS "Anyone can delete events" ON public.events;
DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;
DROP POLICY IF EXISTS "Anyone can read published events" ON public.events;
DROP POLICY IF EXISTS "Anyone can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can read all events" ON public.events;

CREATE POLICY "Anyone can read published events" 
ON public.events FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all events" 
ON public.events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert events" 
ON public.events FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update events" 
ON public.events FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete events" 
ON public.events FOR DELETE TO authenticated USING (true);

-- Fix guruvani RLS policies
DROP POLICY IF EXISTS "Admins can do everything on guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Anyone can delete guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Anyone can insert guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Anyone can read published non-restricted guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Anyone can update guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can read all guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can read restricted guruvani" ON public.guruvani;

CREATE POLICY "Anyone can read published non-restricted guruvani" 
ON public.guruvani FOR SELECT USING ((is_published = true) AND (is_restricted = false));

CREATE POLICY "Authenticated users can read restricted guruvani" 
ON public.guruvani FOR SELECT TO authenticated USING ((is_published = true) AND (auth.uid() IS NOT NULL));

CREATE POLICY "Authenticated users can read all guruvani" 
ON public.guruvani FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert guruvani" 
ON public.guruvani FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update guruvani" 
ON public.guruvani FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete guruvani" 
ON public.guruvani FOR DELETE TO authenticated USING (true);