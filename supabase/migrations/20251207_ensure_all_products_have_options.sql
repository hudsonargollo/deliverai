-- Migration: Ensure all products have options configured
-- This migration adds product options for any products that are missing them

-- ============================================================================
-- COMBO MEDIO - Full Configuration
-- ============================================================================

-- Complementos (Choose up to 3)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Complementos', 'Escolha até 3', false, 0, 3, 1
FROM menu_items WHERE name = 'Combo Medio'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, opt.price_modifier, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Leite em pó', 0, 1),
    ('Granola', 0, 2),
    ('Chocobol', 0, 3),
    ('Ovomaltine', 0, 4),
    ('Paçoca', 0, 5),
    ('Amendoim Triturado', 0, 6),
    ('Jujuba', 0, 7),
    ('Gotas de chocolate', 0, 8),
    ('Creme de avelã', 0, 9)
) AS opt(name, price_modifier, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1)
  AND pog.name = 'Complementos'
ON CONFLICT DO NOTHING;

-- Frutas (Choose up to 2)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Frutas', 'Escolha até 2', false, 0, 2, 2
FROM menu_items WHERE name = 'Combo Medio'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Banana', 1),
    ('Morango', 2)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1)
  AND pog.name = 'Frutas'
ON CONFLICT DO NOTHING;

-- Caldas (Choose up to 3)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Caldas', 'Escolha até 3', false, 0, 3, 3
FROM menu_items WHERE name = 'Combo Medio'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Cobertura de Chocolate', 1),
    ('Cobertura Fini - Dentaduras', 2),
    ('Cobertura de Amora', 3),
    ('Cobertura Fini - Beijos', 4),
    ('Cobertura de Morango', 5),
    ('Leite Condensado', 6),
    ('Mel', 7)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1)
  AND pog.name = 'Caldas'
ON CONFLICT DO NOTHING;

-- Montagem Recheio (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Montagem Recheio', 'Obrigatório - Escolha 1', true, 1, 1, 4
FROM menu_items WHERE name = 'Combo Medio'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Complementos só no meio', 1),
    ('Complementos só em cima', 2),
    ('Complementos no meio e em cima', 3)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1)
  AND pog.name = 'Montagem Recheio'
ON CONFLICT DO NOTHING;

-- Colher (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Colher', 'Obrigatório - Escolha 1', true, 1, 1, 5
FROM menu_items WHERE name = 'Combo Medio'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Sim, eu quero colher', 1),
    ('Não, eu não quero colher', 2)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Medio' LIMIT 1)
  AND pog.name = 'Colher'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMBO GRANDE - Full Configuration
-- ============================================================================

-- Complementos (Choose up to 3)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Complementos', 'Escolha até 3', false, 0, 3, 1
FROM menu_items WHERE name = 'Combo Grande'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Leite em pó', 1),
    ('Granola', 2),
    ('Chocobol', 3),
    ('Ovomaltine', 4),
    ('Paçoca', 5),
    ('Amendoim Triturado', 6),
    ('Jujuba', 7),
    ('Gotas de chocolate', 8),
    ('Creme de avelã', 9)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1)
  AND pog.name = 'Complementos'
ON CONFLICT DO NOTHING;

-- Frutas (Choose up to 2)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Frutas', 'Escolha até 2', false, 0, 2, 2
FROM menu_items WHERE name = 'Combo Grande'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Banana', 1),
    ('Morango', 2)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1)
  AND pog.name = 'Frutas'
ON CONFLICT DO NOTHING;

-- Caldas (Choose up to 4)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Caldas', 'Escolha até 4', false, 0, 4, 3
FROM menu_items WHERE name = 'Combo Grande'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Cobertura de Chocolate', 1),
    ('Cobertura Fini - Dentaduras', 2),
    ('Cobertura de Amora', 3),
    ('Cobertura Fini - Beijos', 4),
    ('Cobertura de Morango', 5),
    ('Leite Condensado', 6),
    ('Mel', 7)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1)
  AND pog.name = 'Caldas'
ON CONFLICT DO NOTHING;

-- Montagem Recheio (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Montagem Recheio', 'Obrigatório - Escolha 1', true, 1, 1, 4
FROM menu_items WHERE name = 'Combo Grande'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Complementos só no meio', 1),
    ('Complementos só em cima', 2),
    ('Complementos no meio e em cima', 3)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1)
  AND pog.name = 'Montagem Recheio'
ON CONFLICT DO NOTHING;

-- Colher (Required - Choose 1)
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Colher', 'Obrigatório - Escolha 1', true, 1, 1, 5
FROM menu_items WHERE name = 'Combo Grande'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, 0, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('Sim, eu quero colher', 1),
    ('Não, eu não quero colher', 2)
) AS opt(name, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Combo Grande' LIMIT 1)
  AND pog.name = 'Colher'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- AÇAÍ NO COPO 400ML, 500ML, 700ML - Size-based Configuration
-- ============================================================================

-- For each size variant, add Tamanho option group
INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1
FROM menu_items WHERE name IN ('Açaí no Copo 400ml', 'Açaí no Copo 500ml', 'Açaí no Copo 700ml')
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, opt.price_modifier, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('400 gr+', 0, 1),
    ('500 gr+', 3, 2),
    ('700 gr+', 9, 3)
) AS opt(name, price_modifier, display_order)
WHERE pog.name = 'Tamanho'
  AND pog.menu_item_id IN (SELECT id FROM menu_items WHERE name IN ('Açaí no Copo 400ml', 'Açaí no Copo 500ml', 'Açaí no Copo 700ml'))
ON CONFLICT DO NOTHING;

-- ============================================================================
-- AÇAÍ NO COPO TRUFADO - Tamanho Configuration
-- ============================================================================

INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1
FROM menu_items WHERE name = 'Açaí no Copo Trufado'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, opt.price_modifier, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('400 gr+', 0, 1),
    ('500 gr+', 3, 2),
    ('700 gr+', 9, 3)
) AS opt(name, price_modifier, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Açaí no Copo Trufado' LIMIT 1)
  AND pog.name = 'Tamanho'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- AÇAÍ NO POTE 1KG - Tamanho Configuration
-- ============================================================================

INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1
FROM menu_items WHERE name = 'Açaí no Pote 1kg'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, '1kg', 0, true, 1
FROM product_option_groups pog
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Açaí no Pote 1kg' LIMIT 1)
  AND pog.name = 'Tamanho'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- AÇAÍ COM NINHO, AÇAÍ GREGO, AÇAÍ TRADICIONAL - Tamanho Configuration
-- ============================================================================

INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1
FROM menu_items WHERE name IN ('Açaí com Ninho', 'Açaí Grego', 'Açaí Tradicional')
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, opt.price_modifier, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('400 gr+', 0, 1),
    ('500 gr+', 3, 2),
    ('700 gr+', 9, 3)
) AS opt(name, price_modifier, display_order)
WHERE pog.name = 'Tamanho'
  AND pog.menu_item_id IN (SELECT id FROM menu_items WHERE name IN ('Açaí com Ninho', 'Açaí Grego', 'Açaí Tradicional'))
ON CONFLICT DO NOTHING;

-- ============================================================================
-- CREME CUPUAÇÚ - Tamanho Configuration
-- ============================================================================

INSERT INTO product_option_groups (menu_item_id, name, description, is_required, min_selections, max_selections, display_order)
SELECT id, 'Tamanho', 'Obrigatório - Escolha 1', true, 1, 1, 1
FROM menu_items WHERE name = 'Creme Cupuaçú'
ON CONFLICT DO NOTHING;

INSERT INTO product_options (option_group_id, name, price_modifier, is_available, display_order)
SELECT pog.id, opt.name, opt.price_modifier, true, opt.display_order
FROM product_option_groups pog
CROSS JOIN (
  VALUES 
    ('400 gr+', 0, 1),
    ('500 gr+', 3, 2),
    ('700 gr+', 9, 3)
) AS opt(name, price_modifier, display_order)
WHERE pog.menu_item_id = (SELECT id FROM menu_items WHERE name = 'Creme Cupuaçú' LIMIT 1)
  AND pog.name = 'Tamanho'
ON CONFLICT DO NOTHING;
