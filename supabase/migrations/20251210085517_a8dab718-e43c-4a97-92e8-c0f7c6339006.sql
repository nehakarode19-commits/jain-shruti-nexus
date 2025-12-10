-- Drop existing restrictive policies and add permissive ones for demo mode
-- This allows content management without authentication

-- GURUVANI TABLE
DROP POLICY IF EXISTS "Authenticated users can insert guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can update guruvani" ON public.guruvani;
DROP POLICY IF EXISTS "Authenticated users can delete guruvani" ON public.guruvani;

CREATE POLICY "Anyone can insert guruvani" ON public.guruvani FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update guruvani" ON public.guruvani FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete guruvani" ON public.guruvani FOR DELETE USING (true);

-- BOOKS TABLE
DROP POLICY IF EXISTS "Authenticated users can insert books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can update books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can delete books" ON public.books;

CREATE POLICY "Anyone can insert books" ON public.books FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update books" ON public.books FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete books" ON public.books FOR DELETE USING (true);

-- ARTICLES TABLE
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.articles;

CREATE POLICY "Anyone can insert articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update articles" ON public.articles FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete articles" ON public.articles FOR DELETE USING (true);

-- BLOGS TABLE
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON public.blogs;

CREATE POLICY "Anyone can insert blogs" ON public.blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blogs" ON public.blogs FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blogs" ON public.blogs FOR DELETE USING (true);

-- EVENTS TABLE
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

CREATE POLICY "Anyone can insert events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update events" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete events" ON public.events FOR DELETE USING (true);

-- GALLERY TABLE
DROP POLICY IF EXISTS "Authenticated users can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON public.gallery;

CREATE POLICY "Anyone can insert gallery" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update gallery" ON public.gallery FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete gallery" ON public.gallery FOR DELETE USING (true);

-- USER_ROLES TABLE
DROP POLICY IF EXISTS "Authenticated users can insert user_roles" ON public.user_roles;

CREATE POLICY "Anyone can insert user_roles" ON public.user_roles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update user_roles" ON public.user_roles FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete user_roles" ON public.user_roles FOR DELETE USING (true);

-- PROFILES TABLE
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON public.profiles;

CREATE POLICY "Anyone can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update profiles" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete profiles" ON public.profiles FOR DELETE USING (true);