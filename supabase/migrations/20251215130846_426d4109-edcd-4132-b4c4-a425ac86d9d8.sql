-- Make file_url nullable in lms_materials table
ALTER TABLE public.lms_materials 
ALTER COLUMN file_url DROP NOT NULL;