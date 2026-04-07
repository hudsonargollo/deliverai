import { useState } from "react";
import { OrderSearchFilter } from "@/components/OrderSearchFilter";
import { OrderCancellationDialog } from "@/components/OrderCancellationDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Order } from "@/integrations/supabase/realtime";

interface CashierEnhancementsProps {
  orders: Order[];
  onOrdersFiltered: (filtered: Order[]) => void;
  onOrderCancelled?: () => void;
}

export const CashierEnhancements = ({
  orders,
  onOrdersFiltered,
  onOrderCancelled,
}: CashierEnhancementsProps) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [selectedOrderForCancellation, setSelectedOrderForCancellation] = useState<Order | null>(null);
  const [cancellationDialogOpen, setCancellationDialogOpen] = useState(false);

  const handleFilterChange = (filtered: Order[]) => {
    setFilteredOrders(filtered);
    onOrdersFiltered(filtered);
  };

  const handleCancelOrder = (order: Order) => {
    // Check if order can be cancelled
    if (order.status === "completed" || order.status === "cancelled") {
      toast.error("Não é possível cancelar este pedido");
      return;
    }

    setSelectedOrderForCancellation(order);
    setCancellationDialogOpen(true);
  };

  const handleCancellationSuccess = () => {
    setCancellationDialogOpen(false);
    setSelectedOrderForCancellation(null);
    onOrderCancelled?.();
  };

  return (
    <>
      {/* Search and Filter Component */}
      <OrderSearchFilter orders={orders} onFilterChange={handleFilterChange} />

      {/* Cancellation Dialog */}
      <OrderCancellationDialog
        order={selectedOrderForCancellation}
        open={cancellationDialogOpen}
        onOpenChange={setCancellationDialogOpen}
        onCancelled={handleCancellationSuccess}
      />

      {/* Quick Actions for Filtered Orders */}
      {filteredOrders.length > 0 && filteredOrders.length < orders.length && (
        <Card className="bg-blue-50 border-2 border-blue-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">
                  {filteredOrders.length} de {orders.length}
                </Badge>
                <span className="text-sm text-gray-700">
                  pedidos encontrados
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results Message */}
      {filteredOrders.length === 0 && orders.length > 0 && (
        <Card className="bg-amber-50 border-2 border-amber-200 mb-6">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-600">
              Tente ajustar seus filtros de busca
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
