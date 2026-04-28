-- Migration: Add hidden column to listings
-- Purpose: Allow listings to be hidden from public views while still
-- accessible to their owner (e.g. demo/test listings)

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN listings.hidden IS 'When true, listing is excluded from all public directory pages, search, sitemap. Only visible to the listing owner when logged in.';

-- Set the demo test clinic as hidden
UPDATE listings
SET hidden = true
WHERE slug = 'demo-test-clinic-liverpool';

-- Update the nearby_clinics RPC to exclude hidden listings
CREATE OR REPLACE FUNCTION nearby_clinics(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_miles INTEGER DEFAULT 50,
  result_limit INTEGER DEFAULT 30,
  result_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  distance_miles DOUBLE PRECISION
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    l.id,
    ROUND(
      (ST_Distance(
        l.location,
        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
      ) / 1609.344)::NUMERIC,
      1
    )::DOUBLE PRECISION AS distance_miles
  FROM listings l
  WHERE l.location IS NOT NULL
    AND l.business_status = 'OPERATIONAL'
    AND (l.hidden IS NOT TRUE)
    AND ST_DWithin(
      l.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
      radius_miles * 1609.344
    )
  ORDER BY l.location <-> ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
  LIMIT result_limit
  OFFSET result_offset;
$$;
