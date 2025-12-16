-- Add audio URLs for multilingual audio support to books table
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS audio_hindi text,
ADD COLUMN IF NOT EXISTS audio_english text,
ADD COLUMN IF NOT EXISTS audio_sanskrit text,
ADD COLUMN IF NOT EXISTS audio_prakrit text,
ADD COLUMN IF NOT EXISTS audio_gujarati text;

-- Create storage bucket for book audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-audio', 'book-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for book PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-pdfs', 'book-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for book-audio bucket
CREATE POLICY "Anyone can view book audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-audio');

CREATE POLICY "Admins can upload book audio"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'book-audio');

CREATE POLICY "Admins can update book audio"
ON storage.objects FOR UPDATE
USING (bucket_id = 'book-audio');

CREATE POLICY "Admins can delete book audio"
ON storage.objects FOR DELETE
USING (bucket_id = 'book-audio');

-- Storage policies for book-pdfs bucket
CREATE POLICY "Anyone can view book pdfs"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-pdfs');

CREATE POLICY "Admins can upload book pdfs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'book-pdfs');

CREATE POLICY "Admins can update book pdfs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'book-pdfs');

CREATE POLICY "Admins can delete book pdfs"
ON storage.objects FOR DELETE
USING (bucket_id = 'book-pdfs');