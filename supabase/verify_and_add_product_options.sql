-- Verify and Add Product Options for All Menu Items
-- This script ensures all products have proper options configured

-- ============================================================================
-- STEP 1: Verify all menu items exist
-- ============================================================================

SELECT 'Menu Items Status' as check_type, COUNT(*) as total_items
FROM menu_items 
WHERE name IN (
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

-- ============================================================================
-- STEP 2: Check which products have option groups
-- ============================================================================

SELECT 
  mi.name as product_name,
  COUNT(pog.id) as option_groups_count,
  CASE WHEN COUNT(pog.id) = 0 THEN 'MISSING OPTIONS' ELSE 'HAS OPTIONS' END as status
FROM menu_items mi
LEFT JOIN product_option_groups pog ON mi.id = pog.menu_item_id
WHERE mi.name IN (
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
)
GROUP BY mi.id, mi.name
ORDER BY mi.name;

-- ============================================================================
-- STEP 3: Check option details for products that have options
-- ============================================================================

SELECT 
  mi.name as product_name,
  pog.name as option_group,
  pog.is_required,
  pog.min_selections,
  pog.max_selections,
  COUNT(po.id) as total_options
FROM menu_items mi
JOIN product_option_groups pog ON mi.id = pog.menu_item_id
LEFT JOIN product_options po ON pog.id = po.option_group_id
WHERE mi.name IN (
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
)
GROUP BY mi.id, mi.name, pog.id, pog.name, pog.is_required, pog.min_selections, pog.max_selections
ORDER BY mi.name, pog.display_order;
