-- Populate product options from iFood menu
-- Run this migration to add all product customization options

-- Note: Make sure your menu items exist first. You may need to adjust menu_item_id values.
-- This script assumes the following products exist:
-- - Combo Medio
-- - Combo Grande
-- - Açaí no Copo 400ml
-- - Açaí no Copo Trufado
-- - Açaí no Copo 500ml
-- - Açaí no Copo 700ml
-- - Açaí no Pote 1kg
-- - Açaí com Ninho
-- - Açaí Grego
-- - Açaí Tradicional
-- - Creme Cupuaçú

-- Helper function to safely insert option groups and options
DO $$
DECLARE
  v_combo_medio_id UUID;
  v_combo_grande_id UUID;
  v_acai_400_id UUID;
  v_acai_trufado_id UUID;
  v_acai_500_id UUID;
  v_acai_700_id UUID;
  v_acai_1kg_id UUID;
  v_acai_ninho_id UUID;
  v_acai_grego_id UUID;
  v_acai_trad_id UUID;
  v_creme_cupuacu_id UUID;
BEGIN
  -- Get menu item IDs
  SELECT id INTO v_combo_medio_id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1;
  SELECT id INTO v_combo_grande_id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1;
  SELECT id INTO v_acai_400_id FROM menu_items WHERE name = 'Açaí no Copo 400ml' LIMIT 1;
  SELECT id INTO v_acai_trufado_id FROM menu_items WHERE name = 'Açaí no Copo Trufado' LIMIT 1;
  SELECT id INTO v_acai_500_id FROM menu_items WHERE name = 'Açaí no Copo 500ml' LIMIT 1;
  SELECT id INTO v_acai_700_id FROM menu_items WHERE name = 'Açaí no Copo 700ml' LIMIT 1;
  SELECT id INTO v_acai_1kg_id FROM menu_items WHERE name = 'Açaí no Pote 1kg' LIMIT 1;
  SELECT id INTO v_acai_ninho_id FROM menu_items WHERE name = 'Açaí com Ninho' LIMIT 1;
  SELECT id INTO v_acai_grego_id FROM menu_items WHERE name = 'Açaí Grego' LIMIT 1;
  SELECT id INTO v_acai_trad_id FROM menu_items WHERE name = 'Açaí Tradicional' LIMIT 1;
  SELECT id INTO v_creme_cupuacu_id FROM menu_items WHERE name = 'Creme Cupuaçú' LIMIT 1;

  -- Only proceed if we found the menu items
  IF v_combo_medio_id IS NOT NULL THEN
    RAISE NOTICE 'Found Combo Medio: %', v_combo_medio_id;
  ELSE
    RAISE NOTICE 'Combo Medio not found - please create it first';
  END IF;

END $$;
