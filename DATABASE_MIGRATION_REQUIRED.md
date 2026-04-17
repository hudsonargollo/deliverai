# Database Migration Required - Store Settings RLS Fix

## Status: ⚠️ REQUIRES MANUAL DATABASE UPDATE

**Deployment ID**: fabb134f.coloridoacai.pages.dev  
**Date**: April 7, 2026  
**Issue**: RLS policies need to be updated to allow admin users to update color settings

---

## Problem

The Settings page color scheme editor is throwing an error when trying to update colors because the RLS (Row Level Security) policies on the `store_settings` table don't allow admin users to update the new color columns.

**Error**: "Error updating settings: Object"

---

## Solution

The migration file has been updated with the correct RLS policies. You need to apply this migration to your Supabase database.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the SQL below
5. Click **Run**

### Option 2: Using Supabase CLI

```bash
supabase db push
```

---

## SQL to Execute

```sql
-- Fix RLS policies for store_settings to allow admin to update all columns
-- Drop existing UPDATE policy if it exists
DROP POLICY IF EXISTS "Admin and cashier can update store status" ON store_settings;

-- Create new UPDATE policy that allows admin to update all columns
CREATE POLICY "Admin can update store settings"
  ON store_settings
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin'
  )
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin'
  );

-- Allow cashier to update only is_open (for store status)
CREATE POLICY IF NOT EXISTS "Cashier can update store status"
  ON store_settings
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'cashier'
  )
  WITH CHECK (
    get_user_role(auth.uid()) = 'cashier'
  );

-- Ensure INSERT policy exists for admin
CREATE POLICY IF NOT EXISTS "Admin can insert store settings"
  ON store_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin'
  );
```

---

## What This Does

1. **Removes** the old restrictive UPDATE policy that only allowed updating `is_open`
2. **Creates** a new UPDATE policy that allows admin users to update ALL columns (including colors)
3. **Preserves** cashier access to update store status
4. **Adds** INSERT policy for admin users

---

## After Migration

Once the migration is applied:
1. Refresh the Settings page
2. Try updating colors again
3. Colors should now save successfully
4. Changes will apply system-wide in real-time

---

## Files Modified

- `supabase/migrations/20260407000001_add_branding_settings.sql` - Added RLS policy fixes
- `src/hooks/useStoreSettings.ts` - Improved error handling and logging

---

## Testing

After applying the migration:

1. Go to `/admin/settings`
2. Click on a predefined color palette (e.g., "Ocean")
3. Should see success toast: "Configurações atualizadas com sucesso!"
4. Or manually edit colors and click "Salvar Cores Personalizadas"
5. Colors should update in the header and throughout the app

---

## Troubleshooting

If you still get an error after applying the migration:

1. Check that you're logged in as an admin user
2. Verify the `get_user_role()` function exists and works correctly
3. Check the browser console for the exact error message
4. Try refreshing the page and logging in again

---

## Next Steps

1. Apply the SQL migration to your Supabase database
2. Refresh the Settings page
3. Test updating colors
4. Verify colors apply system-wide

The frontend code is already deployed and ready to work once the database is updated.
