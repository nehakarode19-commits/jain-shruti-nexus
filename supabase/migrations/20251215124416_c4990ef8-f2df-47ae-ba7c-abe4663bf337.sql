-- Create storage bucket for LMS content (recordings and materials)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lms-content', 'lms-content', true);

-- Allow anyone to view LMS content
CREATE POLICY "Anyone can view lms content"
ON storage.objects
FOR SELECT
USING (bucket_id = 'lms-content');

-- Allow anyone to upload LMS content (demo mode)
CREATE POLICY "Anyone can upload lms content"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'lms-content');

-- Allow anyone to update LMS content (demo mode)
CREATE POLICY "Anyone can update lms content"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'lms-content');

-- Allow anyone to delete LMS content (demo mode)
CREATE POLICY "Anyone can delete lms content"
ON storage.objects
FOR DELETE
USING (bucket_id = 'lms-content');