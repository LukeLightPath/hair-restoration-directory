-- Supabase RPC function to atomically increment analytics counters
-- Replaces the broken client-side upsert that was overwriting instead of incrementing

CREATE OR REPLACE FUNCTION increment_analytics(
  p_listing_id UUID,
  p_date DATE,
  p_column TEXT
) RETURNS void AS $$
BEGIN
  -- Ensure the row exists first
  INSERT INTO listing_analytics (listing_id, date, page_views, phone_clicks, website_clicks, inquiry_clicks)
  VALUES (p_listing_id, p_date, 0, 0, 0, 0)
  ON CONFLICT (listing_id, date) DO NOTHING;

  -- Atomically increment the specified column
  EXECUTE format(
    'UPDATE listing_analytics SET %I = %I + 1 WHERE listing_id = $1 AND date = $2',
    p_column, p_column
  ) USING p_listing_id, p_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
