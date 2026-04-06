import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Phone, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const OrderLookup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");



  const searchByPhone = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Digite o número do telefone");
      return;
    }

    // Format phone number (remove non-digits and add +55 if needed)
    let formattedPhone = phoneNumber.replace(/\D/g, "");
    if (formattedPhone.length === 11 && !formattedPhone.startsWith("55")) {
      formattedPhone = "55" + formattedPhone;
    }
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, customer_name, status, created_at")
        .eq("customer_phone", formattedPhone)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error searching orders:", error);
        toast.error("Erro ao buscar pedidos");
        return;
      }

      if (!data || data.length === 0) {
        toast.error("Nenhum pedido encontrado para este telefone");
        return;
      }

      // If only one order, navigate directly
      if (data.length === 1) {
        navigate(`/order-status/${data[0].id}`);
        return;
      }

      // If multiple orders, show selection
      setOrderResults(data);
    } catch (error) {
      console.error("Error searching orders:", error);
      toast.error("Erro ao buscar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const [orderResults, setOrderResults] = useState<any[]>([]);

  const formatPhoneDisplay = (phone: string) => {
    // Remove +55 and format as (XX) XXXXX-XXXX
    const cleaned = phone.replace(/^\+55/, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_payment":
        return "Aguardando Pagamento";
      case "paid":
        return "Pagamento Confirmado";
      case "in_preparation":
        return "Em Preparo";
      case "ready":
        return "Pronto";
      case "completed":
        return "Finalizado";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_payment":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "paid":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "in_preparation":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "ready":
        return "text-green-600 bg-green-50 border-green-200";
      case "completed":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 rounded-full" />
        <div className="blob blob-secondary w-72 h-72 -bottom-36 -right-36 rounded-full" />
        <div className="blob blob-tertiary w-80 h-80 top-1/2 right-1/4 rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-card border-b-4 border-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:bg-muted transition-all rounded-full p-3"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Meus Pedidos 🫐
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Encontre seu pedido pelo telefone
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Search Card */}
        <Card className="card-sticker animate-pop-in">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="icon-circle bg-primary text-primary-foreground">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Buscar Pedido</h2>
                <p className="text-sm text-muted-foreground">Digite seu número de telefone</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-bold text-foreground uppercase tracking-wide">
                  Telefone
                </Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="(73) 99999-9999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchByPhone()}
                    className="h-14 text-lg pl-4 pr-14 border-2 border-foreground focus:border-primary rounded-lg transition-all bg-input focus:shadow-pop"
                  />
                  <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg border-2 border-border">
                  💡 Use o telefone cadastrado no pedido (com DDD)
                </p>
              </div>
              <Button 
                onClick={searchByPhone} 
                disabled={loading || !phoneNumber.trim()}
                className="btn-primary w-full h-14 text-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-3" />
                    Buscar Pedidos
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Order Results */}
        {orderResults.length > 0 && (
          <Card className="card-sticker animate-pop-in">
            <div className="bg-success text-success-foreground p-6 border-b-2 border-foreground">
              <h3 className="font-heading font-bold text-2xl mb-2">Pedidos Encontrados! 🎉</h3>
              <p className="opacity-90">
                {orderResults.length} pedido(s) encontrado(s)
              </p>
            </div>
            <div className="p-6 space-y-4">
              {orderResults.map((order, index) => (
                <div
                  key={order.id}
                  className="card-sticker p-5 cursor-pointer transition-all hover:scale-[1.02]"
                  onClick={() => navigate(`/order-status/${order.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="icon-circle bg-primary text-primary-foreground w-12 h-12">
                        <span className="font-bold text-lg">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-lg text-foreground">
                          Pedido #{order.order_number}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          👤 {order.customer_name}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    📅 {new Date(order.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
              <Button
                onClick={() => setOrderResults([])}
                className="btn-secondary w-full h-12"
              >
                🔍 Nova Busca
              </Button>
            </div>
          </Card>
        )}

        {/* Help Card */}
        <Card className="card-sticker bg-tertiary/10 border-tertiary animate-pop-in" style={{ animationDelay: '0.1s' }}>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="icon-circle bg-tertiary text-tertiary-foreground flex-shrink-0">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Precisa de Ajuda? 💡</h3>
                <div className="space-y-2">
                  <p className="text-sm text-foreground bg-card p-3 rounded-lg border-2 border-border">
                    📱 Use o telefone com DDD cadastrado no pedido
                  </p>
                  <p className="text-sm text-foreground bg-card p-3 rounded-lg border-2 border-border">
                    ✅ Exemplo: (73) 99999-9999
                  </p>
                  <p className="text-sm text-foreground bg-card p-3 rounded-lg border-2 border-border">
                    🤝 Não encontrou? Entre em contato conosco
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pop-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => navigate('/')}
            className="btn-primary h-14 text-base"
          >
            🛒 Fazer Novo Pedido
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="btn-secondary h-14 text-base"
          >
            📋 Ver Cardápio
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLookup;
