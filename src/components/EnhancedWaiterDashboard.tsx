import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaiterDashboardMetrics } from "@/components/WaiterDashboardMetrics";
import { OrderStatusTimeline } from "@/components/OrderStatusTimeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Order } from "@/types/commission";
import type { Order as RealtimeOrder } from "@/integrations/supabase/realtime";

interface EnhancedWaiterDashboardProps {
  orders: Order[];
  selectedOrder?: Order | null;
  onOrderSelect?: (order: Order) => void;
}

export const EnhancedWaiterDashboard = ({
  orders,
  selectedOrder,
  onOrderSelect,
}: EnhancedWaiterDashboardProps) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    selectedOrder?.id || null
  );

  // Get recent orders (last 5)
  const recentOrders = orders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          📊 Seu Desempenho
        </h2>
        <WaiterDashboardMetrics orders={orders} />
      </div>

      {/* Recent Orders Timeline */}
      {recentOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📋 Pedidos Recentes
          </h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Card
                key={order.id}
                className="bg-white/95 backdrop-blur-sm shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setExpandedOrderId(
                    expandedOrderId === order.id ? null : order.id
                  );
                  onOrderSelect?.(order);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          Pedido #{order.order_number}
                        </h3>
                        <Badge
                          className={`text-xs font-semibold ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "in_preparation"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "ready"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Concluído"
                            : order.status === "in_preparation"
                            ? "Em Preparo"
                            : order.status === "ready"
                            ? "Pronto"
                            : "Pendente"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👤 {order.customer_name}</span>
                        <span>💰 {order.total_amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                        <span>⏰ {new Date(order.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedOrderId === order.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Expanded Timeline */}
                  {expandedOrderId === order.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <OrderStatusTimeline order={order as RealtimeOrder} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {orders.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Nenhum pedido ainda
            </p>
            <p className="text-sm text-gray-500">
              Seus pedidos aparecerão aqui quando você começar a atender clientes
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
