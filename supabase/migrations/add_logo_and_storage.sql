-- Add logo_url column to listings
ALTER TABLE listings ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Storage bucket 'clinic-images' must be created manually in the Supabase dashboard.
-- Set it to PUBLIC so images are served without auth tokens.

-- Storage RLS policies for clinic-images bucket:

-- Anyone can view images (public read)
CREATE POLICY "Public read clinic images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'clinic-images');

-- Authenticated owners can upload images for their listing
CREATE POLICY "Owners can upload clinic images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'clinic-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM listings WHERE claimed_by = auth.uid()
    )
  );

-- Authenticated owners can delete their own images
CREATE POLICY "Owners can delete clinic images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'clinic-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM listings WHERE claimed_by = auth.uid()
    )
  );
