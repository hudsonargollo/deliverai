# Product Options API Integration Guide

## Overview
This guide explains how the product options system integrates with the Supabase database and the application flow.

## Database Queries

### Load Options for a Product (Customer View)
```typescript
// Load option groups for a product
const { data: groups } = await supabase
  .from('product_option_groups')
  .select('*')
  .eq('menu_item_id', menuItemId)
  .order('display_order');

// Load available options for those groups
const { data: options } = await supabase
  .from('product_options')
  .select('*')
  .in('option_group_id', groupIds)
  .eq('is_available', true)
  .order('display_order');
```

### Create Option Group (Admin)
```typescript
const { data, error } = await supabase
  .from('product_option_groups')
  .insert({
    menu_item_id: menuItemId,
    name: 'Tamanho',
    description: 'Escolha o tamanho',
    is_required: true,
    min_selections: 1,
    max_selections: 1,
    display_order: 0
  })
  .select()
  .single();
```

### Create Option (Admin)
```typescript
const { data, error } = await supabase
  .from('product_options')
  .insert({
    option_group_id: groupId,
    name: '300ml',
    description: 'Pequeno',
    price_modifier: 0,
    is_available: true,
    display_order: 0
  })
  .select()
  .single();
```

### Save Order with Options
```typescript
// 1. Create order
const { data: order } = await supabase
  .from('orders')
  .insert(orderData)
  .select()
  .single();

// 2. Create order items
const { data: orderItems } = await supabase
  .from('order_items')
  .insert(orderItemsData)
  .select();

// 3. Create order item options
const orderItemOptions = [];
for (const item of cartItems) {
  if (item.selectedOptions) {
    const orderItem = orderItems.find(oi => oi.menu_item_id === item.id);
    item.selectedOptions.forEach(selection => {
      orderItemOptions.push({
        order_item_id: orderItem.id,
        product_option_id: selection.option.id,
        quantity: selection.quantity,
        unit_price: selection.option.price_modifier
      });
    });
  }
}

const { error } = await supabase
  .from('order_item_options')
  .insert(orderItemOptions);
```

### Retrieve Order with Options
```typescript
// Get order with items and options
const { data: order } = await supabase
  .from('orders')
  .select(`
    *,
    order_items (
      *,
      order_item_options (
        *,
        product_options (
          name,
          price_modifier
        )
      )
    )
  `)
  .eq('id', orderId)
  .single();
```

## Hook Usage

### useProductOptions (Customer)
```typescript
import { useProductOptions } from '@/hooks/useProductOptions';

function ProductMenu() {
  const { optionGroups, loading } = useProductOptions(productId);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {optionGroups.map(group => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          {group.options.map(option => (
            <button key={option.id}>
              {option.name} - R$ {option.price_modifier.toFixed(2)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### useProductOptionsAdmin (Admin)
```typescript
import { useProductOptionsAdmin } from '@/hooks/useProductOptions';

function AdminProductOptions() {
  const {
    optionGroups,
    loading,
    saving,
    createOptionGroup,
    updateOptionGroup,
    deleteOptionGroup,
    createOption,
    updateOption,
    deleteOption
  } = useProductOptionsAdmin(productId);
  
  const handleCreateGroup = async () => {
    await createOptionGroup({
      menu_item_id: productId,
      name: 'Tamanho',
      description: '',
      is_required: true,
      min_selections: 1,
      max_selections: 1,
      display_order: 0
    });
  };
  
  return (
    <div>
      {optionGroups.map(group => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <button onClick={() => updateOptionGroup(group.id, { name: 'Novo Nome' })}>
            Edit
          </button>
          <button onClick={() => deleteOptionGroup(group.id)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={handleCreateGroup}>Add Group</button>
    </div>
  );
}
```

## Component Usage

### ProductCustomizationDialog
```typescript
import { ProductCustomizationDialog } from '@/components/ProductCustomizationDialog';
import { SelectedOption } from '@/types/product-options';

function Menu() {
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleAddWithOptions = (selectedOptions: SelectedOption[]) => {
    // selectedOptions is an array of { option, quantity }
    addItem({
      ...product,
      selectedOptions
    });
  };
  
  return (
    <>
      <button onClick={() => {
        setProduct(menuItem);
        setIsOpen(true);
      }}>
        Personalizar
      </button>
      
      <ProductCustomizationDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        product={product}
        onAddToCart={handleAddWithOptions}
      />
    </>
  );
}
```

### ProductOptionsManager
```typescript
import { ProductOptionsManager } from '@/components/ProductOptionsManager';

function AdminProducts() {
  return (
    <ProductOptionsManager
      menuItemId={productId}
      menuItemName={productName}
    />
  );
}
```

## Cart Integration

### CartItem with Options
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: SelectedOption[];
}

interface SelectedOption {
  option: ProductOption;
  quantity: number;
}
```

### Price Calculation
```typescript
// Base price
const basePrice = item.price * item.quantity;

// Options price
const optionsPrice = item.selectedOptions?.reduce((sum, selection) => {
  return sum + (selection.option.price_modifier * selection.quantity);
}, 0) || 0;

// Total
const total = basePrice + optionsPrice;
```

## WhatsApp Integration

### OrderData with Options
```typescript
interface OrderData {
  items: Array<{
    itemName: string;
    quantity: number;
    unitPrice: number;
    selectedOptions?: Array<{
      optionName: string;
      quantity: number;
      priceModifier: number;
    }>;
  }>;
}
```

### Message Format
```
• 2x Açaí 500ml - R$ 25.00
  ✓ Granola
  ✓ Leite Condensado x2
```

## Error Handling

### Validation Errors
```typescript
const errors: string[] = [];

// Check required groups
for (const group of optionGroups) {
  const selections = selectedOptions.get(group.id) || [];
  const totalQuantity = selections.reduce((sum, s) => sum + s.quantity, 0);
  
  if (group.is_required && totalQuantity === 0) {
    errors.push(`${group.name} é obrigatório`);
  }
  
  if (totalQuantity < group.min_selections) {
    errors.push(`${group.name} requer no mínimo ${group.min_selections}`);
  }
  
  if (group.max_selections && totalQuantity > group.max_selections) {
    errors.push(`${group.name} permite no máximo ${group.max_selections}`);
  }
}

if (errors.length > 0) {
  // Show errors to user
  toast.error(errors.join('\n'));
}
```

## Performance Considerations

### Caching
- Option groups are loaded once per product
- Use `reload()` function to refresh after admin changes
- Cart items store full option data to avoid re-fetching

### Database Indexes
Recommended indexes for performance:
```sql
CREATE INDEX idx_product_option_groups_menu_item_id 
  ON product_option_groups(menu_item_id);

CREATE INDEX idx_product_options_option_group_id 
  ON product_options(option_group_id);

CREATE INDEX idx_order_item_options_order_item_id 
  ON order_item_options(order_item_id);
```

### Query Optimization
- Load options only when needed (lazy loading)
- Filter unavailable options at database level
- Use `select()` to limit returned columns

## Testing

### Unit Tests
```typescript
describe('useProductOptions', () => {
  it('should load available options', async () => {
    const { result } = renderHook(() => useProductOptions(productId));
    await waitFor(() => {
      expect(result.current.optionGroups).toHaveLength(2);
    });
  });
});
```

### Integration Tests
```typescript
describe('Product Customization Flow', () => {
  it('should add product with options to cart', async () => {
    // 1. Load product
    // 2. Open customization dialog
    // 3. Select options
    // 4. Add to cart
    // 5. Verify cart contains options
  });
});
```

## Troubleshooting

### Options Not Loading
- Check `menu_item_id` is correct
- Verify options are marked as `is_available = true`
- Check database permissions

### Price Not Calculating
- Verify `price_modifier` is numeric
- Check `selectedOptions` array is populated
- Ensure quantity is > 0

### Options Not Saving
- Check `order_item_id` exists
- Verify `product_option_id` is valid
- Check database constraints

## Migration Guide

### From No Options to With Options
1. Create option groups for existing products
2. Create options within groups
3. No changes needed to existing orders
4. New orders will include options automatically

### Backward Compatibility
- Products without options work as before
- `selectedOptions` is optional in CartItem
- Existing orders unaffected
- No database migrations required
