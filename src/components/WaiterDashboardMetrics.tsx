import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, CheckCircle, DollarSign, AlertCircle } from "lucide-react";
import type { Order } from "@/types/commission";

interface WaiterDashboardMetricsProps {
  orders: Order[];
}

export const WaiterDashboardMetrics = ({ orders }: WaiterDashboardMetricsProps) => {
  // Calculate metrics
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "pending_payment").length;
  const inProgressOrders = orders.filter((o) => o.status === "in_preparation").length;
  
  const totalSales = orders
    .filter((o) => o.status === "completed" || o.status === "paid")
    .reduce((sum, o) => sum + o.total_amount, 0);
  
  const totalCommission = totalSales * 0.1; // 10% commission
  
  const averageOrderValue = totalOrders > 0 ? totalSales / completedOrders : 0;
  
  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

  const metrics = [
    {
      label: "Total de Vendas",
      value: totalSales.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      label: "Sua Comissão",
      value: totalCommission.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      label: "Pedidos Concluídos",
      value: `${completedOrders}/${totalOrders}`,
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      subtext: `${completionRate}% taxa de conclusão`,
    },
    {
      label: "Em Andamento",
      value: inProgressOrders.toString(),
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      subtext: `${pendingOrders} aguardando pagamento`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={index}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white shadow-lg overflow-hidden relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-50"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 group-hover:text-white/90 transition-colors uppercase tracking-wide mb-1">
                    {metric.label}
                  </p>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors">
                    {metric.value}
                  </div>
                  {metric.subtext && (
                    <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white/20 group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
