-- ============================================================
-- Postcode Search: PostGIS setup + nearby_clinics RPC
-- ============================================================
-- PREREQUISITE: Enable the PostGIS extension in Supabase dashboard
--   Database → Extensions → search "postgis" → Enable
-- Then run this migration.
-- ============================================================

-- 1. Enable PostGIS (idempotent, safe to run even if already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Add geography column to listings
ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS location geography(Point, 4326);

-- 3. Backfill location from existing latitude/longitude
UPDATE listings
SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
WHERE latitude IS NOT NULL
  AND longitude IS NOT NULL
  AND location IS NULL;

-- 4. Create spatial index for fast distance queries
CREATE INDEX IF NOT EXISTS idx_listings_location
  ON listings USING GIST (location);

-- 5. Create the nearby_clinics RPC function
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
    AND ST_DWithin(
      l.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
      radius_miles * 1609.344  -- convert miles to metres
    )
  ORDER BY l.location <-> ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
  LIMIT result_limit
  OFFSET result_offset;
$$;
