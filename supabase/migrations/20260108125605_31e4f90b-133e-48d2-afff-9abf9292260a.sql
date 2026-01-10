-- Update existing sections with new names
UPDATE sections SET name = 'Descartes' WHERE name = 'Section A';
UPDATE sections SET name = 'Einstein' WHERE name = 'Section B';
UPDATE sections SET name = 'Euclid' WHERE name = 'Section C';
UPDATE sections SET name = 'Euler' WHERE name = 'Section D';
UPDATE sections SET name = 'Leibniz' WHERE name = 'Section E';

-- Insert remaining sections
INSERT INTO sections (name) VALUES ('Newton'), ('Pascal');

-- Create lesson_views table to track which lessons students have viewed
CREATE TABLE public.lesson_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lesson_views ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own lesson views"
ON public.lesson_views
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson views"
ON public.lesson_views
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view all lesson views"
ON public.lesson_views
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

-- Add avatar_url column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatar uploads
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);