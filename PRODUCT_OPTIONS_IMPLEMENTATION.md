# Product Options & Complements Implementation

## Overview
Complete implementation of the product options and complements system for Colorido Açaí. This allows customers to customize products with options (sizes, toppings, etc.) and complements, with real-time price calculations and full integration across the ordering flow.

## Database Schema (Already Exists)
The following tables are already configured in Supabase:

### `product_option_groups`
- `id` (UUID, PK)
- `menu_item_id` (UUID, FK to menu_items)
- `name` (text) - e.g., "Tamanho", "Complementos"
- `description` (text, nullable)
- `is_required` (boolean) - Whether selection is mandatory
- `min_selections` (integer) - Minimum options to select
- `max_selections` (integer, nullable) - Maximum options to select
- `display_order` (integer) - Order in UI
- `created_at`, `updated_at` (timestamps)

### `product_options`
- `id` (UUID, PK)
- `option_group_id` (UUID, FK to product_option_groups)
- `name` (text) - e.g., "300ml", "Granola"
- `description` (text, nullable)
- `price_modifier` (numeric) - Price adjustment (can be negative for discounts)
- `is_available` (boolean) - Availability flag
- `display_order` (integer) - Order in UI
- `created_at`, `updated_at` (timestamps)

### `order_item_options`
- `id` (UUID, PK)
- `order_item_id` (UUID, FK to order_items)
- `product_option_id` (UUID, FK to product_options)
- `quantity` (integer) - How many of this option selected
- `unit_price` (numeric) - Price modifier at time of order
- `created_at` (timestamp)

## New Files Created

### 1. `src/types/product-options.ts`
TypeScript types for the product options system:
- `ProductOptionGroup` - Option group structure
- `ProductOption` - Individual option structure
- `OrderItemOption` - Order-item option link
- `ProductOptionGroupWithOptions` - Group with nested options
- `SelectedOption` - Customer's selected option with quantity
- `CartItemWithOptions` - Cart item with selected options

### 2. `src/hooks/useProductOptions.ts`
Custom React hooks for managing product options:

#### `useProductOptions(menuItemId)`
- Loads available options for a product (customer-facing)
- Filters only available options
- Returns: `{ optionGroups, loading, reload }`

#### `useProductOptionsAdmin(menuItemId)`
- Full CRUD operations for admin management
- Methods:
  - `createOptionGroup()` - Create new option group
  - `updateOptionGroup()` - Update group settings
  - `deleteOptionGroup()` - Delete group and all options
  - `createOption()` - Create new option
  - `updateOption()` - Update option
  - `deleteOption()` - Delete option
- Returns: `{ optionGroups, loading, saving, reload, ...methods }`

### 3. `src/components/ProductOptionsManager.tsx`
Admin UI component for managing product options:
- Displays all option groups for a product
- Create/edit/delete option groups
- Create/edit/delete individual options
- Shows price modifiers and availability status
- Dialogs for group and option management
- Validation for required fields

### 4. `src/components/ProductCustomizationDialog.tsx`
Customer-facing product customization dialog:
- Shows product image, description, and base price
- Displays all option groups with their options
- Real-time price calculation with option modifiers
- Quantity controls for each option
- Validation of required groups and min/max selections
- Error display for validation failures
- "Add to Cart" button with selected options

## Modified Files

### 1. `src/pages/admin/AdminProducts.tsx`
- Added `ProductOptionsManager` import
- Added "Opções e Complementos" tab in product edit dialog
- Tab only enabled when editing existing product (not on create)
- Allows admin to manage options after product is created

### 2. `src/lib/cartContext.tsx`
- Extended `CartItem` interface to include `selectedOptions?: SelectedOption[]`
- Cart items now store selected options with quantities
- Price calculations remain unchanged (options added at checkout)

### 3. `src/pages/customer/Menu.tsx`
- Added `ProductCustomizationDialog` import
- Added state for customization dialog: `customizationProduct`, `isCustomizationOpen`
- New function `handleProductClick()` - Opens customization dialog
- New function `handleAddWithOptions()` - Adds product with selected options to cart
- Added `ProductCustomizationDialog` component at end of page
- Dialog opens when product is clicked (if it has options)

### 4. `src/pages/customer/Checkout.tsx`
- Added `SelectedOption` import from types
- Updated order creation to save options to `order_item_options` table
- Enhanced cart display to show selected options with prices
- Updated total calculation to include option price modifiers
- Options saved with order for kitchen/cashier reference

### 5. `src/integrations/whatsapp/types.ts`
- Extended `OrderData.items` to include `selectedOptions` array
- Each option includes: `optionName`, `quantity`, `priceModifier`

### 6. `src/integrations/whatsapp/templates.ts`
- Updated all message templates to display selected options
- Options shown as indented list under each item
- Format: `✓ Option Name x{quantity}` (if quantity > 1)
- Updated in:
  - `generateOrderCreatedFallback()`
  - `generateStatusUpdateFallback()`
  - `generateCustomMessageFallback()`

## User Flow

### Admin: Setting Up Product Options
1. Go to Admin → Produtos
2. Click "Editar Produto" on any product
3. Click "Opções e Complementos" tab
4. Click "Novo Grupo" to create option group
5. Fill in group details:
   - Name (e.g., "Tamanho")
   - Description (optional)
   - Required checkbox
   - Min/Max selections
6. Click "Adicionar Opção" to add options to group
7. Fill in option details:
   - Name (e.g., "300ml")
   - Price modifier (e.g., +2.50)
   - Availability checkbox
8. Save and repeat for other groups

### Customer: Ordering with Options
1. Browse menu
2. Click on product with options
3. Customization dialog opens
4. Select options from each group (respecting min/max rules)
5. Real-time price updates as options are selected
6. Click "Adicionar ao Carrinho"
7. Product added with selected options
8. Proceed to checkout

### Checkout: Reviewing Options
1. Cart displays each item with selected options
2. Options shown as sub-items with price modifiers
3. Total price includes all option modifiers
4. Options saved to database when order is created

### Kitchen/Cashier: Viewing Options
1. Order displays with all items
2. Selected options shown for each item
3. Options included in WhatsApp notifications
4. Format: Item name with indented options list

## Price Calculation

### Base Price
- Product base price: `R$ 10.00`

### With Options
- Option 1: +R$ 2.50
- Option 2: -R$ 1.00 (discount)
- **Total: R$ 11.50**

### Multiple Quantities
- 2x Product with options
- Base: 2 × R$ 10.00 = R$ 20.00
- Options: (2 × R$ 2.50) + (2 × -R$ 1.00) = R$ 3.00
- **Total: R$ 23.00**

## Validation Rules

### Required Groups
- If `is_required = true`, customer must select at least one option
- Error shown if not selected

### Min/Max Selections
- `min_selections`: Minimum options to select in group
- `max_selections`: Maximum options to select in group
- Validation errors shown if violated
- Add button disabled when max reached

### Availability
- Only available options shown to customers
- Admin can mark options as unavailable
- Unavailable options hidden from customization dialog

## WhatsApp Integration

### Message Format
```
🫐 *Colorido Açaí* 🫐

Olá *João*! 👋

📋 *Pedido #12345*

📝 *Seus Itens:*
• 2x Açaí 500ml - R$ 25.00
  ✓ Granola
  ✓ Leite Condensado
• 1x Suco Natural - R$ 8.00

💰 *Total:* R$ 33.00

🫐💜
```

### Included in Notifications
- Order created
- Payment confirmed
- Order preparing
- Order ready
- Custom messages

## Testing Checklist

- [ ] Admin can create option groups
- [ ] Admin can create options within groups
- [ ] Admin can edit/delete groups and options
- [ ] Customer sees customization dialog for products with options
- [ ] Customer can select options respecting min/max rules
- [ ] Price updates in real-time as options are selected
- [ ] Required group validation works
- [ ] Options saved to cart correctly
- [ ] Checkout displays options with prices
- [ ] Order created with options in database
- [ ] WhatsApp notifications include options
- [ ] Kitchen/Cashier can see options in order details

## Future Enhancements

1. **Option Images**: Add images to options (e.g., topping photos)
2. **Option Groups Reordering**: Drag-to-reorder option groups
3. **Bulk Option Management**: Import/export options from CSV
4. **Option Analytics**: Track most popular options
5. **Conditional Options**: Show options based on other selections
6. **Option Presets**: Save common option combinations
7. **Mobile Admin**: Manage options from mobile app
8. **Option Descriptions**: Rich text descriptions with formatting

## Notes

- Options are fully integrated with the existing cart and checkout system
- No breaking changes to existing functionality
- Backward compatible with products that don't have options
- All price calculations include option modifiers
- Database schema already exists and is ready to use
- WhatsApp notifications automatically include options
