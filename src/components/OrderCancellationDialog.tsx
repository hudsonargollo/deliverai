import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { notificationTriggers } from "@/integrations/whatsapp";
import { AlertTriangle } from "lucide-react";
import type { Order } from "@/integrations/supabase/realtime";

interface OrderCancellationDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelled?: () => void;
}

export const OrderCancellationDialog = ({
  order,
  open,
  onOpenChange,
  onCancelled,
}: OrderCancellationDialogProps) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!order) return;

    if (!reason.trim()) {
      toast.error("Por favor, informe o motivo do cancelamento");
      return;
    }

    try {
      setLoading(true);

      // Update order status to cancelled
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "cancelled",
          cancellation_reason: reason,
          cancelled_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) throw updateError;

      // Send WhatsApp notification to customer
      try {
        await notificationTriggers.onOrderCancelled(order.id, reason);
      } catch (whatsappError) {
        console.error("Error sending WhatsApp notification:", whatsappError);
        // Don't fail the cancellation if WhatsApp fails
        toast.warning("Pedido cancelado, mas notificação WhatsApp falhou");
      }

      toast.success("✅ Pedido cancelado com sucesso!", {
        description: `Cliente será notificado via WhatsApp`,
      });

      setReason("");
      onOpenChange(false);
      onCancelled?.();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Erro ao cancelar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            Tem certeza que deseja cancelar o pedido{" "}
            <span className="font-bold text-gray-900">#{order?.order_number}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Motivo do Cancelamento *
            </label>
            <Textarea
              placeholder="Ex: Cliente solicitou cancelamento, produto indisponível, etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-2 border-gray-200 focus:border-red-500 rounded-lg min-h-24 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              O cliente será notificado via WhatsApp com o motivo do cancelamento
            </p>
          </div>

          {order && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-semibold text-gray-900">
                    {order.customer_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold text-gray-900">
                    {order.total_amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Manter Pedido</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={loading || !reason.trim()}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Cancelando..." : "Cancelar Pedido"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
