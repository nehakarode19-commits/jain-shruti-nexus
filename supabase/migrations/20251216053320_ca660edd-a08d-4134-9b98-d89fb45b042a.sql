-- Create storage bucket for scholar publications
INSERT INTO storage.buckets (id, name, public) VALUES ('scholar-publications', 'scholar-publications', true);

-- Create policies for scholar publications bucket
CREATE POLICY "Anyone can view publication files"
ON storage.objects FOR SELECT
USING (bucket_id = 'scholar-publications');

CREATE POLICY "Authenticated users can upload publication files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'scholar-publications' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own publication files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'scholar-publications' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own publication files"
ON storage.objects FOR DELETE
USING (bucket_id = 'scholar-publications' AND auth.uid()::text = (storage.foldername(name))[1]);