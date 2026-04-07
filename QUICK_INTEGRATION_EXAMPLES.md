# Quick Integration Examples

This document provides copy-paste ready code examples for integrating the new UI/UX components.

---

## 1. Add Recent Orders to Customer Menu

**File:** `src/pages/customer/Menu.tsx`

```tsx
import { RecentOrdersCard } from "@/components/RecentOrdersCard";

// Add this in your component JSX, typically in a sidebar or below the menu:
<div className="mb-8">
  <RecentOrdersCard limit={5} />
</div>
```

---

## 2. Integrate Search/Filter in Cashier Page

**File:** `src/pages/staff/Cashier.tsx`

```tsx
import { OrderSearchFilter } from "@/components/OrderSearchFilter";
import { useState } from "react";

// Add state for filtered orders:
const [filteredOrders, setFilteredOrders] = useState<OrderWithItems[]>(orders);

// Add component before your order list:
<OrderSearchFilter 
  orders={orders} 
  onFilterChange={(filtered) => setFilteredOrders(filtered)} 
/>

// Use filteredOrders instead of orders for display:
{filteredOrders.map((order) => (
  // Your order card component
))}
```

---

## 3. Add Order Cancellation to Cashier

**File:** `src/pages/staff/Cashier.tsx`

```tsx
import { OrderCancellationDialog } from "@/components/OrderCancellationDialog";
import { useState } from "react";

// Add state:
const [selectedOrderForCancellation, setSelectedOrderForCancellation] = useState<Order | null>(null);
const [cancellationDialogOpen, setCancellationDialogOpen] = useState(false);

// Add dialog component:
<OrderCancellationDialog
  order={selectedOrderForCancellation}
  open={cancellationDialogOpen}
  onOpenChange={setCancellationDialogOpen}
  onCancelled={() => {
    setCancellationDialogOpen(false);
    loadOrders(); // Refresh orders
  }}
/>

// Add cancel button to each order card:
<Button
  onClick={() => {
    setSelectedOrderForCancellation(order);
    setCancellationDialogOpen(true);
  }}
  variant="destructive"
  size="sm"
>
  <X className="w-4 h-4 mr-2" />
  Cancelar
</Button>
```

---

## 4. Add Cancellation to Customer Order Details

**File:** `src/pages/customer/OrderStatus.tsx` or similar

```tsx
import { OrderCancellationDialog } from "@/components/OrderCancellationDialog";
import { useState } from "react";

// Add state:
const [cancellationDialogOpen, setCancellationDialogOpen] = useState(false);

// Add dialog:
<OrderCancellationDialog
  order={order}
  open={cancellationDialogOpen}
  onOpenChange={setCancellationDialogOpen}
  onCancelled={() => {
    // Refresh order or navigate back
    navigate("/menu");
  }}
/>

// Add cancel button (only for pending orders):
{order.status === "pending" && (
  <Button
    onClick={() => setCancellationDialogOpen(true)}
    variant="destructive"
  >
    Cancelar Pedido
  </Button>
)}
```

---

## 5. Enhance Waiter Dashboard

**File:** `src/pages/waiter/WaiterDashboard.tsx`

```tsx
import { WaiterDashboardMetrics } from "@/components/WaiterDashboardMetrics";
import { EnhancedWaiterDashboard } from "@/components/EnhancedWaiterDashboard";
import { useState } from "react";

// Add state for selected order:
const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

// Replace existing dashboard content with:
<div className="space-y-8">
  {/* Metrics Section */}
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Seu Desempenho</h2>
    <WaiterDashboardMetrics orders={orders} />
  </div>

  {/* Enhanced Dashboard */}
  <EnhancedWaiterDashboard
    orders={orders}
    selectedOrder={selectedOrder}
    onOrderSelect={setSelectedOrder}
  />
</div>
```

---

## 6. Show Order Timeline for Individual Order

**File:** Any page showing order details

```tsx
import { OrderStatusTimeline } from "@/components/OrderStatusTimeline";

// Add in your order details section:
<div className="mt-8">
  <OrderStatusTimeline order={selectedOrder} />
</div>
```

---

## 7. Create New Customer Orders Page

**File:** `src/pages/customer/Orders.tsx` (already created)

**Add to App.tsx:**

```tsx
import Orders from "./pages/customer/Orders";

// In Routes:
<Route path="/orders" element={
  <Suspense fallback={<LoadingFallback />}>
    <Orders />
  </Suspense>
} />
```

**Add link in Menu page:**

```tsx
<Button onClick={() => navigate("/orders")}>
  Ver Meus Pedidos
</Button>
```

---

## 8. Complete Cashier Enhancement

**File:** `src/pages/staff/Cashier.tsx`

```tsx
import { CashierEnhancements } from "@/components/CashierEnhancements";
import { useState } from "react";

// Add state:
const [filteredOrders, setFilteredOrders] = useState<OrderWithItems[]>(orders);

// Add component:
<CashierEnhancements
  orders={orders}
  onOrdersFiltered={setFilteredOrders}
  onOrderCancelled={loadOrders}
/>

// Use filteredOrders for display:
{filteredOrders.map((order) => (
  // Your order card
))}
```

---

## 9. Add Recent Orders to Landing Page

**File:** `src/pages/public/Index.tsx`

```tsx
import { RecentOrdersCard } from "@/components/RecentOrdersCard";

// Add in a new section:
<div className="relative z-10 bg-white/95 backdrop-blur-sm py-16 sm:py-24">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Seus Pedidos Recentes</h2>
    <RecentOrdersCard limit={3} />
  </div>
</div>
```

---

## 10. Database Schema Update

**Run in Supabase SQL Editor:**

```sql
-- Add cancellation tracking to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_cancelled_at 
ON orders(cancelled_at);

-- Add comment for documentation
COMMENT ON COLUMN orders.cancellation_reason IS 'Reason why the order was cancelled';
COMMENT ON COLUMN orders.cancelled_at IS 'Timestamp when the order was cancelled';
```

---

## 11. Update WhatsApp Integration

**File:** `src/integrations/whatsapp/message-variations.ts`

Add cancellation message template:

```typescript
export const cancellationMessage = (
  orderNumber: number,
  customerName: string,
  reason: string
): string => {
  return `Olá ${customerName}! 😢

Seu pedido #${orderNumber} foi cancelado.

Motivo: ${reason}

Se tiver dúvidas, entre em contato conosco!

Colorido Açaí 🫐`;
};
```

---

## 12. Add Cancellation Trigger

**File:** `src/integrations/whatsapp/notification-triggers.ts`

Add to notification triggers:

```typescript
export const onOrderCancelled = async (
  orderId: string,
  cancellationReason: string
): Promise<void> => {
  try {
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (!order) throw new Error("Order not found");

    const message = cancellationMessage(
      order.order_number,
      order.customer_name,
      cancellationReason
    );

    await sendWhatsAppMessage(order.customer_phone, message);
  } catch (error) {
    console.error("Error sending cancellation notification:", error);
    throw error;
  }
};
```

---

## 13. Add Navigation Links

**File:** `src/components/AppHeader.tsx` or navigation component

```tsx
<nav>
  <Link to="/menu">Cardápio</Link>
  <Link to="/orders">Meus Pedidos</Link>
  <Link to="/auth">Área Restrita</Link>
</nav>
```

---

## 14. Update Type Definitions

**File:** `src/types/commission.ts` or similar

```typescript
export interface Order extends RealtimeOrder {
  cancellation_reason?: string;
  cancelled_at?: string;
}
```

---

## 15. Add Styling for New Components

**File:** `src/index.css`

The design system is already in place. No additional CSS needed!

All components use:
- Tailwind CSS classes
- CSS custom properties from design system
- Existing animations and transitions

---

## Testing the Integration

### 1. Test Recent Orders:
```bash
# Navigate to /menu
# Should see recent orders card
# Click "Repetir Pedido" button
# New order should be created
```

### 2. Test Search/Filter:
```bash
# Navigate to /cashier
# Type in search box
# Select different filters
# Orders should update in real-time
```

### 3. Test Cancellation:
```bash
# Click cancel button on order
# Enter cancellation reason
# Confirm cancellation
# Order status should change to "cancelled"
# Customer should receive WhatsApp notification
```

### 4. Test Waiter Dashboard:
```bash
# Navigate to /waiter/dashboard
# Should see metrics at top
# Should see recent orders
# Click on order to expand timeline
# Timeline should show order progression
```

---

## Troubleshooting

### Recent Orders Not Showing:
```tsx
// Check if customer is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log("Current user:", user);

// Check if orders exist in database
const { data: orders } = await supabase
  .from("orders")
  .select("*")
  .limit(5);
console.log("Orders:", orders);
```

### Search Not Working:
```tsx
// Check filter logic
console.log("Search query:", filters.searchQuery);
console.log("Filtered results:", filteredOrders);

// Verify order data structure
console.log("Order sample:", orders[0]);
```

### Cancellation Not Sending WhatsApp:
```tsx
// Check WhatsApp configuration
console.log("WhatsApp API key:", process.env.VITE_WHATSAPP_API_KEY);

// Check customer phone format
console.log("Customer phone:", order.customer_phone);

// Check error logs
// Review WhatsApp error indicator component
```

### Metrics Showing Wrong Values:
```tsx
// Verify order status values
console.log("Order statuses:", orders.map(o => o.status));

// Check commission calculation
const commission = totalSales * 0.1;
console.log("Commission:", commission);

// Verify completed orders filter
const completed = orders.filter(o => o.status === "completed");
console.log("Completed orders:", completed);
```

---

## Performance Tips

1. **Lazy Load Components:**
```tsx
const RecentOrdersCard = lazy(() => import("@/components/RecentOrdersCard"));
```

2. **Memoize Expensive Calculations:**
```tsx
const metrics = useMemo(() => calculateMetrics(orders), [orders]);
```

3. **Debounce Search:**
```tsx
const debouncedSearch = useCallback(
  debounce((query) => handleSearch(query), 300),
  []
);
```

4. **Optimize Re-renders:**
```tsx
const OrderCard = memo(({ order }) => (
  // Component
));
```

---

## Accessibility Checklist

- [ ] All buttons have proper labels
- [ ] All inputs have associated labels
- [ ] Color is not the only indicator
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Proper heading hierarchy
- [ ] Touch targets are 44px minimum

---

## Mobile Testing

Test on:
- [ ] iPhone 12/13/14
- [ ] Android devices
- [ ] Tablet (iPad)
- [ ] Small screens (320px)
- [ ] Large screens (1920px)

---

## Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Ready to Deploy!

Once you've integrated all components:

1. ✅ Run tests
2. ✅ Test on mobile
3. ✅ Test on different browsers
4. ✅ Verify accessibility
5. ✅ Check performance
6. ✅ Deploy to production

---

**Happy coding! 🚀**
