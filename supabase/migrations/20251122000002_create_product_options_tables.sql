-- Create product_option_groups table
CREATE TABLE IF NOT EXISTS product_option_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_required BOOLEAN NOT NULL DEFAULT false,
  min_selections INTEGER NOT NULL DEFAULT 0,
  max_selections INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_options table
CREATE TABLE IF NOT EXISTS product_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  option_group_id UUID NOT NULL REFERENCES product_option_groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_modifier DECIMAL(10, 2) NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_item_options table
CREATE TABLE IF NOT EXISTS order_item_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  product_option_id UUID NOT NULL REFERENCES product_options(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_product_option_groups_menu_item_id ON product_option_groups(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_product_options_option_group_id ON product_options(option_group_id);
CREATE INDEX IF NOT EXISTS idx_order_item_options_order_item_id ON order_item_options(order_item_id);
CREATE INDEX IF NOT EXISTS idx_order_item_options_product_option_id ON order_item_options(product_option_id);

-- Enable RLS
ALTER TABLE product_option_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_options ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_option_groups
CREATE POLICY "Allow public read access to product_option_groups" ON product_option_groups
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to manage product_option_groups" ON product_option_groups
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for product_options
CREATE POLICY "Allow public read access to product_options" ON product_options
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to manage product_options" ON product_options
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for order_item_options
CREATE POLICY "Allow public read access to order_item_options" ON order_item_options
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to manage order_item_options" ON order_item_options
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow users to insert order_item_options" ON order_item_options
  FOR INSERT WITH CHECK (true);
