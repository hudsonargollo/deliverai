-- Check which menu items exist
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
)
ORDER BY name;

-- If any are missing, add them one by one:

-- 1. Combo Medio
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Combo Medio', 'Combo com açaí, complementos, frutas e caldas', 35.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 2. Combo Grande
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Combo Grande', 'Combo grande com açaí, complementos, frutas e caldas', 42.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 3. Açaí no Copo 400ml
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí no Copo 400ml', 'Açaí fresco em copo de 400ml', 19.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 4. Açaí no Copo Trufado
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí no Copo Trufado', 'Açaí com cobertura trufada em copo', 28.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 5. Açaí no Copo 500ml
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí no Copo 500ml', 'Açaí fresco em copo de 500ml', 22.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 6. Açaí no Copo 700ml
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí no Copo 700ml', 'Açaí fresco em copo de 700ml', 28.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 7. Açaí no Pote 1kg
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí no Pote 1kg', 'Açaí fresco em pote de 1kg', 45.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 8. Açaí com Ninho
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí com Ninho', 'Açaí com leite Ninho', 19.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 9. Açaí Grego
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí Grego', 'Açaí com iogurte grego', 19.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 10. Açaí Tradicional
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Açaí Tradicional', 'Açaí tradicional fresco', 19.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- 11. Creme Cupuaçú
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT id, 'Creme Cupuaçú', 'Creme de cupuaçú com complementos', 25.00, true
FROM menu_categories WHERE name = 'Açaís' LIMIT 1
ON CONFLICT DO NOTHING;

-- Verify all items were added
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
)
ORDER BY name;
