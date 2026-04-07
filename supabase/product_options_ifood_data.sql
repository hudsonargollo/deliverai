-- iFood Product Options Data
-- This file contains SQL to populate all product options from the iFood menu
-- Copy and paste sections into Supabase SQL editor as needed

-- ============================================================================
-- COMBO MEDIO
-- ============================================================================

-- Get the Combo Medio menu item ID first, then replace 'COMBO_MEDIO_ID' below
-- SELECT id FROM menu_items WHERE name = 'Combo Medio';

-- Complementos (Choose up to 3)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('COMBO_MEDIO_ID', 'Complementos', 'Escolha até 3', false, 0, 3, 1);

-- Get the group ID and insert options
-- SELECT id FROM product_option_groups WHERE menu_item_id = 'COMBO_MEDIO_ID' AND name = 'Complementos';

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('COMPLEMENTOS_GROUP_ID', 'Leite em pó', 0, true, 1),
  ('COMPLEMENTOS_GROUP_ID', 'Granola', 0, true, 2),
  ('COMPLEMENTOS_GROUP_ID', 'Chocobol', 0, true, 3),
  ('COMPLEMENTOS_GROUP_ID', 'Ovomaltine', 0, true, 4),
  ('COMPLEMENTOS_GROUP_ID', 'Paçoca', 0, true, 5),
  ('COMPLEMENTOS_GROUP_ID', 'Amendoim Triturado', 0, true, 6),
  ('COMPLEMENTOS_GROUP_ID', 'Jujuba', 0, true, 7),
  ('COMPLEMENTOS_GROUP_ID', 'Gotas de chocolate', 0, true, 8),
  ('COMPLEMENTOS_GROUP_ID', 'Creme de avelã', 0, true, 9);

-- Frutas (Choose up to 2)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('COMBO_MEDIO_ID', 'Frutas', 'Escolha até 2', false, 0, 2, 2);

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('FRUTAS_GROUP_ID', 'Banana', 0, true, 1),
  ('FRUTAS_GROUP_ID', 'Morango', 0, true, 2);

-- Caldas (Choose up to 3)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('COMBO_MEDIO_ID', 'Caldas', 'Escolha até 3', false, 0, 3, 3);

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('CALDAS_GROUP_ID', 'Cobertura de Chocolate', 0, true, 1),
  ('CALDAS_GROUP_ID', 'Cobertura Fini - Dentaduras', 0, true, 2),
  ('CALDAS_GROUP_ID', 'Cobertura de Amora', 0, true, 3),
  ('CALDAS_GROUP_ID', 'Cobertura Fini - Beijos', 0, true, 4),
  ('CALDAS_GROUP_ID', 'Cobertura de Morango', 0, true, 5),
  ('CALDAS_GROUP_ID', 'Leite Condensado', 0, true, 6),
  ('CALDAS_GROUP_ID', 'Mel', 0, true, 7);

-- Montagem Recheio (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('COMBO_MEDIO_ID', 'Montagem Recheio', 'Obrigatório - Escolha 1', true, 1, 1, 4);

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('MONTAGEM_GROUP_ID', 'Complementos só no meio', 0, true, 1),
  ('MONTAGEM_GROUP_ID', 'Complementos só em cima', 0, true, 2),
  ('MONTAGEM_GROUP_ID', 'Complementos no meio e em cima', 0, true, 3);

-- Colher (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('COMBO_MEDIO_ID', 'Colher', 'Obrigatório - Escolha 1', true, 1, 1, 5);

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('COLHER_GROUP_ID', 'Sim, eu quero colher', 0, true, 1),
  ('COLHER_GROUP_ID', 'Não, eu não quero colher', 0, true, 2);

-- ============================================================================
-- AÇAÍ COM NINHO (Simple example with size options)
-- ============================================================================

-- Tamanho (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
VALUES ('ACAI_NINHO_ID', 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1);

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
VALUES 
  ('TAMANHO_GROUP_ID', '400 gr+', 0, true, 1),
  ('TAMANHO_GROUP_ID', '500 gr+', 3, true, 2),
  ('TAMANHO_GROUP_ID', '700 gr+', 9, true, 3);

-- ============================================================================
-- INSTRUCTIONS FOR BULK IMPORT
-- ============================================================================
-- 1. First, ensure all menu items exist in your database
-- 2. Get the UUID for each menu item:
--    SELECT id, name FROM menu_items WHERE name IN ('Combo Medio', 'Combo Grande', ...);
-- 3. Replace the placeholder IDs in this file with actual UUIDs
-- 4. Copy each section and paste into Supabase SQL editor
-- 5. Execute each section in order
-- 6. Verify the data was inserted correctly
