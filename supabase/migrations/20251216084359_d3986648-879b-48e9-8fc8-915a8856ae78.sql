-- Fix gallery-images storage policies
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'gallery-images');

-- Fix emagazine-covers storage policies
DROP POLICY IF EXISTS "Admins can upload emagazine covers" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update emagazine covers" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete emagazine covers" ON storage.objects;

CREATE POLICY "Authenticated users can upload emagazine covers" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'emagazine-covers');

CREATE POLICY "Authenticated users can update emagazine covers" 
ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'emagazine-covers');

CREATE POLICY "Authenticated users can delete emagazine covers" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'emagazine-covers');

-- Fix book-audio storage policies
DROP POLICY IF EXISTS "Admins can upload book audio" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update book audio" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete book audio" ON storage.objects;

CREATE POLICY "Authenticated users can upload book audio" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'book-audio');

CREATE POLICY "Authenticated users can update book audio" 
ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'book-audio');

CREATE POLICY "Authenticated users can delete book audio" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'book-audio');

-- Fix book-pdfs storage policies
DROP POLICY IF EXISTS "Admins can upload book pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update book pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete book pdfs" ON storage.objects;

CREATE POLICY "Authenticated users can upload book pdfs" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'book-pdfs');

CREATE POLICY "Authenticated users can update book pdfs" 
ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'book-pdfs');

CREATE POLICY "Authenticated users can delete book pdfs" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'book-pdfs');