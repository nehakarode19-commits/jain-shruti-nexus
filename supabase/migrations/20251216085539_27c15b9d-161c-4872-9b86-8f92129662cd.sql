-- Drop existing restrictive INSERT policies for gallery
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;

-- Create permissive INSERT policy for gallery that allows any user
CREATE POLICY "Anyone can upload gallery images" 
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'gallery-images');

-- Also ensure SELECT policy exists for public
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
CREATE POLICY "Public can view gallery images" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'gallery-images');

-- Make UPDATE and DELETE also public for gallery
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

CREATE POLICY "Anyone can update gallery images" 
ON storage.objects FOR UPDATE 
TO public
USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can delete gallery images" 
ON storage.objects FOR DELETE 
TO public
USING (bucket_id = 'gallery-images');

-- Do the same for other buckets
DROP POLICY IF EXISTS "Authenticated users can upload book audio" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update book audio" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete book audio" ON storage.objects;

CREATE POLICY "Anyone can upload book audio" 
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'book-audio');

CREATE POLICY "Anyone can update book audio" 
ON storage.objects FOR UPDATE 
TO public
USING (bucket_id = 'book-audio');

CREATE POLICY "Anyone can delete book audio" 
ON storage.objects FOR DELETE 
TO public
USING (bucket_id = 'book-audio');

-- book-pdfs bucket
DROP POLICY IF EXISTS "Authenticated users can upload book pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update book pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete book pdfs" ON storage.objects;

CREATE POLICY "Anyone can upload book pdfs" 
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'book-pdfs');

CREATE POLICY "Anyone can update book pdfs" 
ON storage.objects FOR UPDATE 
TO public
USING (bucket_id = 'book-pdfs');

CREATE POLICY "Anyone can delete book pdfs" 
ON storage.objects FOR DELETE 
TO public
USING (bucket_id = 'book-pdfs');

-- emagazine-covers bucket
DROP POLICY IF EXISTS "Authenticated users can upload emagazine covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update emagazine covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete emagazine covers" ON storage.objects;

CREATE POLICY "Anyone can upload emagazine covers" 
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'emagazine-covers');

CREATE POLICY "Anyone can update emagazine covers" 
ON storage.objects FOR UPDATE 
TO public
USING (bucket_id = 'emagazine-covers');

CREATE POLICY "Anyone can delete emagazine covers" 
ON storage.objects FOR DELETE 
TO public
USING (bucket_id = 'emagazine-covers');