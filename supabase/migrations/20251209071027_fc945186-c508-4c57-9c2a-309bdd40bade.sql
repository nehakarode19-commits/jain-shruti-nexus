-- Drop existing restrictive policies and create permissive ones for public reading
-- This allows the demo to work without authentication issues

-- BOOKS: Allow anyone to read published books
DROP POLICY IF EXISTS "Anyone can view published books" ON public.books;
DROP POLICY IF EXISTS "Admins can view all books" ON public.books;
DROP POLICY IF EXISTS "Admins can manage books" ON public.books;

CREATE POLICY "Public can read published books" ON public.books FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can do everything on books" ON public.books FOR ALL USING (is_admin(auth.uid()));

-- GURUVANI: Allow anyone to read published unrestricted guruvani
DROP POLICY IF EXISTS "Anyone can view published unrestricted guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Admins can view all guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Admins can manage guruvani" ON public.guruvani;

CREATE POLICY "Public can read published guruvani" ON public.guruvani FOR SELECT USING ((is_published = true) AND (is_restricted = false));
CREATE POLICY "Authenticated users can read restricted guruvani" ON public.guruvani FOR SELECT USING ((is_published = true) AND (auth.uid() IS NOT NULL));
CREATE POLICY "Admins can do everything on guruvani" ON public.guruvani FOR ALL USING (is_admin(auth.uid()));

-- ARTICLES: Allow anyone to read published articles
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can view all articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON public.articles;

CREATE POLICY "Public can read published articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can do everything on articles" ON public.articles FOR ALL USING (is_admin(auth.uid()));

-- BLOGS: Allow anyone to read published blogs
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can manage blogs" ON public.blogs;

CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can do everything on blogs" ON public.blogs FOR ALL USING (is_admin(auth.uid()));

-- EVENTS: Allow anyone to read published events
DROP POLICY IF EXISTS "Anyone can view published events" ON public.events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

CREATE POLICY "Public can read published events" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can do everything on events" ON public.events FOR ALL USING (is_admin(auth.uid()));

-- GALLERY: Allow anyone to read published gallery
DROP POLICY IF EXISTS "Anyone can view published gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admins can view all gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admins can manage gallery" ON public.gallery;

CREATE POLICY "Public can read published gallery" ON public.gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can do everything on gallery" ON public.gallery FOR ALL USING (is_admin(auth.uid()));