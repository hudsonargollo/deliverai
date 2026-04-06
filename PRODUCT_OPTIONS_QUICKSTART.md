# Product Options Quick Start Guide

## For Admins: Setting Up Product Options

### Step 1: Go to Admin Panel
1. Login to Colorido Açaí admin
2. Navigate to **Produtos** section
3. Find the product you want to add options to

### Step 2: Edit Product
1. Click **Editar Produto** on the product card
2. The edit dialog opens with two tabs:
   - **Informações Básicas** (product name, price, image)
   - **Opções e Complementos** (only available when editing existing products)

### Step 3: Create Option Groups
1. Click the **Opções e Complementos** tab
2. Click **Novo Grupo** button
3. Fill in the group details:
   - **Nome do Grupo**: e.g., "Tamanho", "Complementos", "Bebida"
   - **Descrição**: Optional description
   - **Seleção obrigatória**: Check if customer MUST select from this group
   - **Mínimo de Seleções**: Minimum options to select (usually 0 or 1)
   - **Máximo de Seleções**: Maximum options to select (1 for sizes, unlimited for toppings)
4. Click **Salvar**

### Step 4: Add Options to Group
1. In the group card, click **Adicionar Opção**
2. Fill in the option details:
   - **Nome da Opção**: e.g., "300ml", "Granola", "Leite Condensado"
   - **Descrição**: Optional
   - **Modificador de Preço**: Price adjustment
     - Use positive numbers for extras: `+2.50`
     - Use negative numbers for discounts: `-1.00`
     - Use `0` for no price change
   - **Opção disponível**: Check if this option is currently available
3. Click **Salvar**

### Step 5: Repeat
- Add more options to the same group
- Create more groups for the same product
- Edit or delete groups/options as needed

## Example: Açaí with Size and Toppings

### Group 1: Tamanho (Required, Max 1)
- 300ml - R$ 0.00
- 500ml - R$ +2.50
- 700ml - R$ +4.00

### Group 2: Complementos (Optional, Unlimited)
- Granola - R$ +1.50
- Leite Condensado - R$ +1.00
- Mel - R$ +0.50
- Banana - R$ +0.00

## For Customers: Ordering with Options

### Step 1: Browse Menu
1. Open the Colorido Açaí menu
2. Browse products

### Step 2: Click Product
1. Click on a product that has options
2. A **Personalizar** dialog opens

### Step 3: Select Options
1. For each option group:
   - Click **Adicionar** to select an option
   - Use **+** and **-** buttons to adjust quantity
   - Remove options by clicking **-** until quantity is 0
2. Watch the price update in real-time
3. Required groups show a red error if not selected

### Step 4: Add to Cart
1. Click **Adicionar ao Carrinho**
2. Product added with your selected options
3. Continue shopping or go to checkout

### Step 5: Review at Checkout
1. Go to checkout
2. Your cart shows:
   - Product name
   - Base price
   - Selected options with prices
   - Total price including options
3. Confirm and proceed to payment

## For Kitchen/Cashier: Viewing Orders

### In Order Details
1. Open order from dashboard
2. Each item shows:
   - Item name and quantity
   - Selected options listed below
   - Total price for that item

### In WhatsApp Notifications
1. Customer receives order confirmation
2. Message includes:
   - Item names
   - Selected options (indented list)
   - Total price

Example:
```
📝 *Seus Itens:*
• 2x Açaí 500ml - R$ 25.00
  ✓ Granola
  ✓ Leite Condensado
• 1x Suco Natural - R$ 8.00

💰 *Total:* R$ 33.00
```

## Common Scenarios

### Scenario 1: Mandatory Size Selection
- Group: "Tamanho"
- Required: ✓ Yes
- Min: 1, Max: 1
- Options: 300ml, 500ml, 700ml
- Result: Customer MUST pick exactly one size

### Scenario 2: Optional Toppings
- Group: "Complementos"
- Required: ✗ No
- Min: 0, Max: unlimited
- Options: Granola, Leite Condensado, Mel, etc.
- Result: Customer can pick any combination

### Scenario 3: Drink Size (Max 2)
- Group: "Tamanho da Bebida"
- Required: ✓ Yes
- Min: 1, Max: 2
- Options: 300ml, 500ml
- Result: Customer picks 1-2 sizes

### Scenario 4: Discount Option
- Group: "Promoção"
- Required: ✗ No
- Min: 0, Max: 1
- Options: "Sem Açúcar" (-R$ 1.00)
- Result: Customer can apply discount

## Tips & Best Practices

### For Admins
1. **Keep it simple**: Don't create too many option groups
2. **Clear names**: Use names customers understand
3. **Test prices**: Verify price modifiers are correct
4. **Availability**: Mark options unavailable during shortages
5. **Order matters**: Use display_order to arrange options logically

### For Customers
1. **Read descriptions**: Check option descriptions for details
2. **Watch the price**: Price updates as you select options
3. **Required fields**: Red errors show what's required
4. **Customize freely**: You can change options before checkout

### For Kitchen
1. **Check options**: Always read the options in the order
2. **Prepare accordingly**: Adjust preparation based on options
3. **Verify**: Confirm options match customer expectations

## Troubleshooting

### Options Not Showing
- Check if product has options configured
- Verify options are marked as available
- Refresh the page

### Price Not Updating
- Check price modifiers are set correctly
- Verify you're selecting options (not just viewing)
- Refresh if stuck

### Can't Add to Cart
- Check if all required groups are selected
- Verify you haven't exceeded max selections
- Check if store is open

### Options Not in Order
- Verify options were selected before adding to cart
- Check order details in admin panel
- Look for options in WhatsApp notification

## Support

For issues or questions:
1. Check this guide first
2. Contact admin support
3. Report bugs to development team

---

**Last Updated**: April 2026
**Version**: 1.0
