# Fix Color Settings Error

## Problem
Color updates fail with "Error updating settings"

## Solution (2 min)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Paste this:

```sql
DROP POLICY IF EXISTS "Admin and cashier can update store status" ON store_settings;
DROP POLICY IF EXISTS "Cashier can update store status" ON store_settings;
DROP POLICY IF EXISTS "Admin can insert store settings" ON store_settings;

CREATE POLICY "Admin can update store settings"
  ON store_settings FOR UPDATE TO authenticated
  USING (get_user_role(auth.uid()) = 'admin')
  WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Cashier can update store status"
  ON store_settings FOR UPDATE TO authenticated
  USING (get_user_role(auth.uid()) = 'cashier')
  WITH CHECK (get_user_role(auth.uid()) = 'cashier');

CREATE POLICY "Admin can insert store settings"
  ON store_settings FOR INSERT TO authenticated
  WITH CHECK (get_user_role(auth.uid()) = 'admin');
```

5. Click **Run** (or Ctrl+Enter)
6. Refresh app → Try updating colors ✅

## Troubleshoot
- Logged in as admin?
- Refresh page
- Check console (F12) for errors
