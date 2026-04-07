import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecentOrdersCard } from "@/components/RecentOrdersCard";
import { OrderStatusTimeline } from "@/components/OrderStatusTimeline";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Order } from "@/integrations/supabase/realtime";

const Orders = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 sm:py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={() => navigate("/menu")}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold">Meus Pedidos</h1>
          </div>
          <p className="text-white/90">Acompanhe seus pedidos e repita os favoritos</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders List */}
          <div className="lg:col-span-2">
            <RecentOrdersCard limit={10} />
          </div>

          {/* Order Details */}
          <div>
            {selectedOrder ? (
              <div className="space-y-4">
                <OrderStatusTimeline order={selectedOrder} />
                <Button
                  onClick={() => setSelectedOrder(null)}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                >
                  Fechar Detalhes
                </Button>
              </div>
            ) : (
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Selecione um pedido</p>
                <p className="text-sm text-gray-500">
                  Clique em um pedido para ver mais detalhes e acompanhar o status
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
