# Product Options Setup Guide - iFood Menu

This guide explains how to set up all product options from the iFood menu in your Colorido Açaí system.

## Overview

The product options system allows customers to customize their orders with:
- **Complementos** (Toppings): Leite em pó, Granola, Chocobol, etc.
- **Frutas** (Fruits): Banana, Morango
- **Caldas** (Sauces): Chocolate, Amora, Morango, etc.
- **Montagem** (Assembly): Where to place toppings
- **Colher** (Spoon): Yes or No
- **Tamanho** (Size): For individual products with price modifiers

## Database Schema

Three main tables:
1. **product_option_groups** - Groups of options (e.g., "Complementos", "Frutas")
2. **product_options** - Individual options within groups (e.g., "Leite em pó", "Granola")
3. **order_item_options** - Tracks which options were selected for each order

## Setup Steps

### Step 1: Ensure Menu Items Exist

First, verify all products exist in your menu_items table:

```sql
SELECT id, name FROM menu_items WHERE name IN (
  'Combo Medio',
  'Combo Grande',
  'Açaí no Copo 400ml',
  'Açaí no Copo Trufado',
  'Açaí no Copo 500ml',
  'Açaí no Copo 700ml',
  'Açaí no Pote 1kg',
  'Açaí com Ninho',
  'Açaí Grego',
  'Açaí Tradicional',
  'Creme Cupuaçú'
);
```

If any are missing, add them:

```sql
INSERT INTO menu_items (category_id, name, description, price, available)
VALUES (
  (SELECT id FROM menu_categories WHERE name = 'Açaís' LIMIT 1),
  'Combo Medio',
  'Combo com açaí, complementos, frutas e caldas',
  35.00,
  true
);
```

### Step 2: Add Product Option Groups and Options

Use the SQL script in `supabase/product_options_ifood_data.sql` as a template.

**Example for Combo Medio:**

```sql
-- 1. Create Complementos group
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES (
  (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1),
  'Complementos',
  'Escolha até 3',
  false,
  0,
  3,
  1
);

-- 2. Get the group ID
SELECT id FROM product_option_groups WHERE name = 'Complementos' AND menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1);

-- 3. Insert options (replace GROUP_ID with the ID from step 2)
INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('GROUP_ID', 'Leite em pó', 0, true, 1),
  ('GROUP_ID', 'Granola', 0, true, 2),
  ('GROUP_ID', 'Chocobol', 0, true, 3),
  -- ... etc
```

### Step 3: Using the Admin UI

1. Go to `/admin/products`
2. Select a product from the menu
3. Click "Gerenciar Opções" (Manage Options)
4. Add option groups and options through the UI

## Product Configuration Reference

### Combo Medio & Combo Grande

**Complementos** (Choose up to 3):
- Leite em pó, Granola, Chocobol, Ovomaltine, Paçoca, Amendoim Triturado, Jujuba, Gotas de chocolate, Creme de avelã

**Frutas** (Choose up to 2):
- Banana, Morango

**Caldas** (Choose up to 3 for Medio, up to 4 for Grande):
- Cobertura de Chocolate, Cobertura Fini - Dentaduras, Cobertura de Amora, Cobertura Fini - Beijos, Cobertura de Morango, Leite Condensado, Mel

**Montagem Recheio** (Required - Choose 1):
- Complementos só no meio
- Complementos só em cima
- Complementos no meio e em cima

**Colher** (Required - Choose 1):
- Sim, eu quero colher
- Não, eu não quero colher

### Açaí no Copo 400ml

**Açaís & Cremes** (Required - Choose 1-2):
- Açaí Tradicional, Açaí Grego, Açaí com Ninho, Creme de Cupuaçú

**Complementos** (Choose up to 3):
- Same as Combo Medio

**Frutas** (Choose up to 2):
- Banana, Morango

**Caldas** (Choose up to 2):
- Leite Condensado, Mel, Cobertura Fini - Dentaduras, Cobertura Fini - Beijos, Cobertura de Morango, Cobertura de Chocolate, Cobertura de Amora

**Montagem Recheios** (Required - Choose 1):
- Complementos só no meio, Complementos só em cima, Complementos no meio e em cima

**Colher** (Required - Choose 1):
- Sim, eu quero colher, Não, eu não quero colher

### Açaí com Ninho, Açaí Grego, Açaí Tradicional

**Tamanho** (Required - Choose 1):
- 400 gr+ (R$ 19,00) - price_modifier: 0
- 500 gr+ (R$ 22,00) - price_modifier: 3
- 700 gr+ (R$ 28,00) - price_modifier: 9

## Frontend Integration

The system automatically:

1. **Shows customization dialog** when customer clicks "Adicionar" on a product
2. **Displays all option groups** with their constraints
3. **Validates selections** based on min/max selections
4. **Calculates total price** including option modifiers
5. **Saves selections** to order_item_options table

## Testing

1. Go to `/menu`
2. Click "Adicionar" on a product with options
3. Verify all option groups appear
4. Test min/max selection validation
5. Verify price calculation with modifiers
6. Complete order and verify options are saved

## Troubleshooting

**Options not showing?**
- Check that product_option_groups exist for the menu item
- Verify is_available = true for all options
- Check browser console for errors

**Price not calculating correctly?**
- Verify price_modifier values in product_options
- Check that options are being selected correctly

**Can't add options in admin?**
- Ensure you have admin role
- Check that menu item exists
- Verify RLS policies allow admin access

## Files Reference

- **Database**: `supabase/migrations/20251122000002_create_product_options_tables.sql`
- **Data Template**: `supabase/product_options_ifood_data.sql`
- **Frontend Hook**: `src/hooks/useProductOptions.ts`
- **Customization Dialog**: `src/components/ProductCustomizationDialog.tsx`
- **Admin Manager**: `src/components/ProductOptionsManager.tsx`
- **Types**: `src/types/product-options.ts`
