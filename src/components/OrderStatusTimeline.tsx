import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import type { Order } from "@/integrations/supabase/realtime";

interface OrderStatusTimelineProps {
  order: Order;
}

export const OrderStatusTimeline = ({ order }: OrderStatusTimelineProps) => {
  const getStatusSteps = () => {
    const steps = [
      {
        status: "pending",
        label: "Pedido Criado",
        icon: Clock,
        timestamp: order.created_at,
        completed: true,
      },
      {
        status: "paid",
        label: "Pagamento Confirmado",
        icon: CheckCircle,
        timestamp: order.payment_confirmed_at,
        completed: !!order.payment_confirmed_at,
      },
      {
        status: "in_preparation",
        label: "Em Preparo",
        icon: Package,
        timestamp: order.updated_at,
        completed: order.status === "in_preparation" || order.status === "ready" || order.status === "completed",
      },
      {
        status: "ready",
        label: "Pronto para Retirada",
        icon: Truck,
        timestamp: order.ready_at,
        completed: order.status === "ready" || order.status === "completed",
      },
      {
        status: "completed",
        label: "Concluído",
        icon: CheckCircle,
        timestamp: order.completed_at,
        completed: order.status === "completed",
      },
    ];

    // Handle cancelled orders
    if (order.status === "cancelled") {
      return [
        ...steps.slice(0, 2),
        {
          status: "cancelled",
          label: "Cancelado",
          icon: XCircle,
          timestamp: order.cancelled_at,
          completed: true,
        },
      ];
    }

    return steps;
  };

  const steps = getStatusSteps();

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-purple-600" />
          Histórico do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            const isCurrent = order.status === step.status;

            return (
              <div key={step.status} className="flex gap-4">
                {/* Timeline line and icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step.completed
                        ? "bg-gradient-to-br from-green-500 to-green-600 border-green-600 text-white"
                        : isCurrent
                        ? "bg-gradient-to-br from-purple-500 to-purple-600 border-purple-600 text-white animate-pulse"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {!isLast && (
                    <div
                      className={`w-1 h-12 mt-2 transition-all duration-300 ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{step.label}</h4>
                    {step.completed && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Concluído
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge className="bg-purple-100 text-purple-800 text-xs animate-pulse">
                        Atual
                      </Badge>
                    )}
                  </div>

                  {step.timestamp && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">
                        {formatDate(step.timestamp)}
                      </span>
                      {" às "}
                      <span className="font-medium">
                        {formatTime(step.timestamp)}
                      </span>
                    </div>
                  )}

                  {!step.timestamp && !step.completed && (
                    <div className="text-sm text-gray-400 italic">
                      Aguardando...
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Cancellation reason if applicable */}
          {order.status === "cancelled" && order.cancellation_reason && (
            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm font-semibold text-red-900 mb-1">
                Motivo do Cancelamento:
              </p>
              <p className="text-sm text-red-800">{order.cancellation_reason}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
