-- Add branding and color customization to store_settings
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '258 90% 66%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '334 100% 71%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '258 90% 66%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS menu_background_color TEXT DEFAULT '48 100% 98%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS menu_text_color TEXT DEFAULT '215 28% 17%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS header_gradient_start TEXT DEFAULT '258 90% 66%';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS header_gradient_end TEXT DEFAULT '334 100% 71%';

-- Add comment
COMMENT ON COLUMN store_settings.logo_url IS 'URL to the store logo image stored in Supabase Storage';
COMMENT ON COLUMN store_settings.primary_color IS 'Primary brand color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.secondary_color IS 'Secondary brand color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.accent_color IS 'Accent color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.menu_background_color IS 'Customer menu background color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.menu_text_color IS 'Customer menu text color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.header_gradient_start IS 'Header gradient start color in HSL format (h s% l%)';
COMMENT ON COLUMN store_settings.header_gradient_end IS 'Header gradient end color in HSL format (h s% l%)';
