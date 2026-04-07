-- Add missing menu items for product options setup
-- First, get the Açaís category ID
WITH acai_category AS (
  SELECT id FROM menu_categories WHERE name = 'Açaís' LIMIT 1
)
INSERT INTO menu_items (category_id, name, description, price, available)
SELECT 
  acai_category.id,
  product_name,
  description,
  price,
  true
FROM acai_category
CROSS JOIN (
  VALUES
    ('Combo Medio', 'Combo com açaí, complementos, frutas e caldas', 35.00),
    ('Combo Grande', 'Combo grande com açaí, complementos, frutas e caldas', 42.00),
    ('Açaí no Copo 400ml', 'Açaí fresco em copo de 400ml', 19.00),
    ('Açaí no Copo Trufado', 'Açaí com cobertura trufada em copo', 28.00),
    ('Açaí no Copo 500ml', 'Açaí fresco em copo de 500ml', 22.00),
    ('Açaí no Copo 700ml', 'Açaí fresco em copo de 700ml', 28.00),
    ('Açaí no Pote 1kg', 'Açaí fresco em pote de 1kg', 45.00),
    ('Açaí com Ninho', 'Açaí com leite Ninho', 19.00),
    ('Açaí Grego', 'Açaí com iogurte grego', 19.00),
    ('Açaí Tradicional', 'Açaí tradicional fresco', 19.00),
    ('Creme Cupuaçú', 'Creme de cupuaçú com complementos', 25.00)
) AS products(product_name, description, price)
WHERE NOT EXISTS (
  SELECT 1 FROM menu_items WHERE name = products.product_name
);
