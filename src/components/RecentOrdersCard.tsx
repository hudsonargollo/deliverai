import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Clock, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type { Order } from "@/integrations/supabase/realtime";

interface RecentOrder extends Order {
  items?: Array<{
    id: string;
    item_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

interface RecentOrdersCardProps {
  customerId?: string;
  limit?: number;
}

export const RecentOrdersCard = ({ customerId, limit = 5 }: RecentOrdersCardProps) => {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  useEffect(() => {
    loadRecentOrders();
  }, [customerId]);

  const loadRecentOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("orders")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (customerId) {
        query = query.eq("customer_id", customerId);
      }

      const { data: ordersData, error } = await query;

      if (error) throw error;

      // Load items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("id, item_name, quantity, unit_price")
            .eq("order_id", order.id)
            .order("created_at", { ascending: true });

          return {
            ...order,
            items: items || [],
          } as RecentOrder;
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error loading recent orders:", error);
      toast.error("Erro ao carregar pedidos recentes");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReorder = async (order: RecentOrder) => {
    try {
      setReorderingId(order.id);
      
      // Create new order with same items
      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          customer_id: order.customer_id,
          waiter_id: order.waiter_id,
          status: "pending",
          payment_status: "pending",
          total_amount: order.total_amount,
          notes: `Reorder de pedido #${order.order_number}`,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Copy items from original order
      if (order.items && order.items.length > 0) {
        const itemsToInsert = order.items.map((item) => ({
          order_id: newOrder.id,
          item_name: item.item_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }

      toast.success("✅ Pedido repetido com sucesso!", {
        description: `Novo pedido #${newOrder.order_number} criado`,
      });

      // Reload orders
      await loadRecentOrders();
    } catch (error) {
      console.error("Error creating reorder:", error);
      toast.error("Erro ao repetir pedido");
    } finally {
      setReorderingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "ready":
        return "bg-blue-100 text-blue-800";
      case "in_preparation":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      completed: "Concluído",
      cancelled: "Cancelado",
      ready: "Pronto",
      in_preparation: "Em Preparo",
      pending: "Pendente",
      paid: "Pago",
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            Pedidos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            Pedidos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-400">Seus pedidos aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-purple-600" />
          Pedidos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">
                      Pedido #{order.order_number}
                    </span>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(order.created_at)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    {order.total_amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              </div>

              {/* Items preview */}
              {order.items && order.items.length > 0 && (
                <div className="mb-3 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="text-xs">
                        {item.quantity}x {item.item_name}
                        {idx < Math.min(order.items!.length - 1, 1) && ","}
                      </span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{order.items.length - 2} mais
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Quick reorder button */}
              {order.status === "completed" && (
                <Button
                  onClick={() => handleQuickReorder(order)}
                  disabled={reorderingId === order.id}
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {reorderingId === order.id ? "Repetindo..." : "Repetir Pedido"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
