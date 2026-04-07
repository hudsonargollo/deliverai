# Product Options Verification & Setup

## Overview

This document outlines the verification and setup process to ensure all products in the menu have proper options configured in the database.

## Files Created

### 1. `supabase/verify_and_add_product_options.sql`
A verification script that checks:
- All menu items exist in the database
- Which products have option groups configured
- Details of each option group (required, min/max selections)
- Total number of options per group

**Use this to audit the current state of product options.**

### 2. `supabase/migrations/20251207_ensure_all_products_have_options.sql`
A comprehensive migration that adds product options for all menu items:

#### Products Configured:

**Combo Products:**
- **Combo Medio** - 5 option groups (Complementos, Frutas, Caldas, Montagem Recheio, Colher)
- **Combo Grande** - 5 option groups (same as Medio, but Caldas allows up to 4 selections)

**Individual Açaí Products:**
- **Açaí no Copo 400ml** - Tamanho option (400/500/700 gr+)
- **Açaí no Copo 500ml** - Tamanho option (400/500/700 gr+)
- **Açaí no Copo 700ml** - Tamanho option (400/500/700 gr+)
- **Açaí no Copo Trufado** - Tamanho option (400/500/700 gr+)
- **Açaí no Pote 1kg** - Tamanho option (1kg fixed)
- **Açaí com Ninho** - Tamanho option (400/500/700 gr+)
- **Açaí Grego** - Tamanho option (400/500/700 gr+)
- **Açaí Tradicional** - Tamanho option (400/500/700 gr+)
- **Creme Cupuaçú** - Tamanho option (400/500/700 gr+)

## Option Groups Details

### Combo Medio & Combo Grande

| Group | Required | Min | Max | Options |
|-------|----------|-----|-----|---------|
| Complementos | No | 0 | 3 | Leite em pó, Granola, Chocobol, Ovomaltine, Paçoca, Amendoim Triturado, Jujuba, Gotas de chocolate, Creme de avelã |
| Frutas | No | 0 | 2 | Banana, Morango |
| Caldas | No | 0 | 3/4* | Cobertura de Chocolate, Cobertura Fini - Dentaduras, Cobertura de Amora, Cobertura Fini - Beijos, Cobertura de Morango, Leite Condensado, Mel |
| Montagem Recheio | Yes | 1 | 1 | Complementos só no meio, Complementos só em cima, Complementos no meio e em cima |
| Colher | Yes | 1 | 1 | Sim, eu quero colher, Não, eu não quero colher |

*Combo Medio: max 3, Combo Grande: max 4

### Individual Açaí Products

| Product | Tamanho Options | Price Modifiers |
|---------|-----------------|-----------------|
| 400ml, 500ml, 700ml, Trufado | 400 gr+, 500 gr+, 700 gr+ | 0, +3, +9 |
| 1kg Pote | 1kg | 0 |
| Com Ninho, Grego, Tradicional, Creme Cupuaçú | 400 gr+, 500 gr+, 700 gr+ | 0, +3, +9 |

## How to Apply

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project SQL editor
2. Copy the entire content of `supabase/migrations/20251207_ensure_all_products_have_options.sql`
3. Paste into the SQL editor
4. Click "Run"

### Option 2: Using Supabase CLI

```bash
# If using local Supabase
supabase db push

# Or manually run the migration
supabase migration up
```

### Option 3: Verify First, Then Apply

1. First run `supabase/verify_and_add_product_options.sql` to check current state
2. Review the results
3. Then run the migration file to add missing options

## Verification Steps

After applying the migration:

1. **Check Menu Page**: Go to `/menu` and verify all products show customization options
2. **Test Combo Products**: Click "Adicionar" on Combo Medio/Grande and verify all 5 option groups appear
3. **Test Individual Products**: Click "Adicionar" on any Açaí product and verify Tamanho options appear
4. **Test Price Calculation**: Select different sizes and verify price updates correctly
5. **Test Required Options**: Try to add a product without selecting required options (should show validation error)

## Database Schema

The options are stored in three tables:

```
menu_items
├── id (UUID)
├── name (string)
└── price (decimal)

product_option_groups
├── id (UUID)
├── menu_item_id (FK to menu_items)
├── name (string)
├── is_required (boolean)
├── min_selections (integer)
├── max_selections (integer)
└── display_order (integer)

product_options
├── id (UUID)
├── option_group_id (FK to product_option_groups)
├── name (string)
├── price_modifier (decimal)
├── is_available (boolean)
└── display_order (integer)
```

## Frontend Integration

The system automatically:

1. **Loads options** when customer clicks "Adicionar" on a product
2. **Displays option groups** in the customization dialog
3. **Validates selections** based on min/max constraints
4. **Calculates prices** including modifiers
5. **Saves selections** to the database

No additional frontend changes needed - the existing `ProductCustomizationDialog` component handles all of this.

## Troubleshooting

**Options not showing in menu?**
- Run the verification script to check if options exist
- Verify `is_available = true` for all options
- Check browser console for errors

**Price not calculating correctly?**
- Verify `price_modifier` values in the database
- Check that options are being selected correctly

**Can't add products?**
- Ensure all menu items exist first
- Run `supabase/check_and_add_menu_items.sql` if needed
- Then run the options migration

## Next Steps

1. Apply the migration to your database
2. Test the menu page with all products
3. Verify customization dialogs work correctly
4. Test price calculations with different options
5. Confirm orders save with selected options
