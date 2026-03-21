-- Migration: Add last_google_sync column to listings
-- Run this in Supabase SQL Editor before using the refresh script

ALTER TABLE listings
ADD COLUMN IF NOT EXISTS last_google_sync timestamptz;

COMMENT ON COLUMN listings.last_google_sync IS 'Timestamp of last Google Places API data refresh';
