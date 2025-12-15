-- Create storage bucket for emagazine covers
INSERT INTO storage.buckets (id, name, public)
VALUES ('emagazine-covers', 'emagazine-covers', true);

-- Allow anyone to view emagazine covers (public bucket)
CREATE POLICY "Anyone can view emagazine covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'emagazine-covers');

-- Allow authenticated admins to upload emagazine covers
CREATE POLICY "Admins can upload emagazine covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'emagazine-covers' 
  AND auth.uid() IS NOT NULL 
  AND is_admin(auth.uid())
);

-- Allow authenticated admins to update emagazine covers
CREATE POLICY "Admins can update emagazine covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'emagazine-covers' 
  AND auth.uid() IS NOT NULL 
  AND is_admin(auth.uid())
);

-- Allow authenticated admins to delete emagazine covers
CREATE POLICY "Admins can delete emagazine covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'emagazine-covers' 
  AND auth.uid() IS NOT NULL 
  AND is_admin(auth.uid())
);