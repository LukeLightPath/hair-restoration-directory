-- ============================================================================
-- Migration: optimize_disk_io.sql
-- Purpose:   Reduce disk I/O by adding server-side functions and composite
--            indexes that cover the most frequent public query patterns.
-- Created:   2026-06-07
-- ============================================================================


-- ============================================================================
-- SECTION 1: DATABASE FUNCTIONS
-- ----------------------------------------------------------------------------
-- These STABLE functions let the client call a single RPC instead of building
-- raw queries. PostgreSQL can also cache their plans across calls within the
-- same transaction, cutting parse/plan overhead.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- get_distinct_cities()
-- Returns an alphabetical list of distinct city names from operational,
-- non-hidden listings. Used by the city selector / autocomplete components.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_distinct_cities()
RETURNS TABLE(city text) AS $$
  SELECT DISTINCT l.city FROM listings l
  WHERE l.business_status = 'OPERATIONAL' AND l.hidden = false
  ORDER BY l.city;
$$ LANGUAGE sql STABLE;


-- ----------------------------------------------------------------------------
-- get_city_counts()
-- Returns each city with its listing count. Powers the "Browse by City"
-- grid where we show "Liverpool (12)" style badges.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_city_counts()
RETURNS TABLE(city text, count bigint) AS $$
  SELECT l.city, COUNT(*) as count FROM listings l
  WHERE l.business_status = 'OPERATIONAL' AND l.hidden = false
  GROUP BY l.city ORDER BY l.city;
$$ LANGUAGE sql STABLE;


-- ----------------------------------------------------------------------------
-- get_city_counts_with_county()
-- Same as get_city_counts but also returns the county (MIN to pick one
-- deterministically when a city spans multiple county values). Used on the
-- UK all-cities page where we group cities under county headings.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_city_counts_with_county()
RETURNS TABLE(city text, county text, count bigint) AS $$
  SELECT l.city, MIN(l.county) as county, COUNT(*) as count FROM listings l
  WHERE l.business_status = 'OPERATIONAL' AND l.hidden = false
  GROUP BY l.city ORDER BY l.city;
$$ LANGUAGE sql STABLE;


-- ----------------------------------------------------------------------------
-- get_treatment_counts()
-- Returns the total number of listings offering each treatment service.
-- Each row is a (treatment_name, count) pair. The listing_services table
-- stores boolean flags per service type; we UNION ALL across all 12 columns
-- to produce a single result set in one round-trip.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_treatment_counts()
RETURNS TABLE(treatment text, count bigint) AS $$
  SELECT 'has_hair_systems'::text, COUNT(*) FROM listing_services WHERE has_hair_systems = true
  UNION ALL
  SELECT 'has_smp', COUNT(*) FROM listing_services WHERE has_smp = true
  UNION ALL
  SELECT 'has_wigs', COUNT(*) FROM listing_services WHERE has_wigs = true
  UNION ALL
  SELECT 'has_extensions', COUNT(*) FROM listing_services WHERE has_extensions = true
  UNION ALL
  SELECT 'has_prp', COUNT(*) FROM listing_services WHERE has_prp = true
  UNION ALL
  SELECT 'has_transplant', COUNT(*) FROM listing_services WHERE has_transplant = true
  UNION ALL
  SELECT 'has_trichology', COUNT(*) FROM listing_services WHERE has_trichology = true
  UNION ALL
  SELECT 'has_laser', COUNT(*) FROM listing_services WHERE has_laser = true
  UNION ALL
  SELECT 'has_fitting', COUNT(*) FROM listing_services WHERE has_fitting = true
  UNION ALL
  SELECT 'has_toppers', COUNT(*) FROM listing_services WHERE has_toppers = true
  UNION ALL
  SELECT 'has_integration', COUNT(*) FROM listing_services WHERE has_integration = true
  UNION ALL
  SELECT 'has_cranial', COUNT(*) FROM listing_services WHERE has_cranial = true;
$$ LANGUAGE sql STABLE;


-- ============================================================================
-- SECTION 2: COMPOSITE INDEXES
-- ----------------------------------------------------------------------------
-- These indexes target the exact column combinations used by public queries.
-- Without them PostgreSQL falls back to sequential scans on every request.
-- ============================================================================


-- Composite index covering ~90% of public queries that filter by
-- business_status = 'OPERATIONAL' AND hidden = false.
CREATE INDEX IF NOT EXISTS idx_listings_status_hidden
  ON listings(business_status, hidden);

-- Partial index for the homepage featured clinics query.
-- Only indexes rows where featured = true, keeping the index tiny.
CREATE INDEX IF NOT EXISTS idx_listings_featured
  ON listings(featured) WHERE featured = true;

-- Covers ORDER BY google_rating DESC used on city pages, treatment pages,
-- and the homepage "top rated" section. NULLS LAST matches our query pattern.
CREATE INDEX IF NOT EXISTS idx_listings_rating
  ON listings(google_rating DESC NULLS LAST);

-- Composite index for city pages — the single most common query pattern.
-- Lets Postgres satisfy WHERE city = ? AND business_status = 'OPERATIONAL'
-- AND hidden = false with a single index scan.
CREATE INDEX IF NOT EXISTS idx_listings_city_status_hidden
  ON listings(city, business_status, hidden);

-- Partial index on hidden = false. Useful when queries only filter on hidden
-- without also filtering on business_status (e.g. admin dashboards).
CREATE INDEX IF NOT EXISTS idx_listings_hidden
  ON listings(hidden) WHERE hidden = false;

-- GIN full-text search index. Replaces expensive ILIKE '%term%' sequential
-- scans with fast inverted-index lookups across title, city, and description.
CREATE INDEX IF NOT EXISTS idx_listings_search
  ON listings USING gin(
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(city,'') || ' ' || coalesce(description,''))
  );
