/**
 * Product Options Types
 * Types for managing product customization options and complements
 */

export interface ProductOptionGroup {
  id: string;
  menu_item_id: string;
  name: string;
  description: string | null;
  is_required: boolean;
  min_selections: number;
  max_selections: number | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductOption {
  id: string;
  option_group_id: string;
  name: string;
  description: string | null;
  price_modifier: number;
  is_available: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItemOption {
  id: string;
  order_item_id: string;
  product_option_id: string;
  quantity: number;
  unit_price: number;
  created_at?: string;
}

// Extended types with relations
export interface ProductOptionGroupWithOptions extends ProductOptionGroup {
  options: ProductOption[];
}

export interface SelectedOption {
  option: ProductOption;
  quantity: number;
}

export interface CartItemWithOptions {
  menu_item_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  selected_options: SelectedOption[];
  total_price: number;
}
