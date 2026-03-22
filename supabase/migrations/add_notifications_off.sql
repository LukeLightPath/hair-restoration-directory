-- Add opt-out flag for email notifications
-- Run this in the Supabase SQL Editor

ALTER TABLE listings
ADD COLUMN IF NOT EXISTS notifications_off boolean DEFAULT false;

COMMENT ON COLUMN listings.notifications_off IS 'When true, no inquiry email notifications are sent for this listing';
