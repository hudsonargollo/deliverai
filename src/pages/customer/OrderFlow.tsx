import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Minus, X, MapPin, Phone, User, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cartContext";
import { normalizePhone } from "@/lib/phoneUtils";

type OrderStep = 'CART_REVIEW' | 'CUSTOMER_INFO' | 'DELIVERY_ADDRESS' | 'PAYMENT' | 'CONFIRMATION';

interface CustomerInfo {
  name: string;
  whatsapp: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  latitude?: number;
  longitude?: number;
}

const OrderFlow = () => {
  const navigate = useNavigate();
  const { state: cartState, clearCart, removeItem, updateQuantity } = useCart();
  
  const [step, setStep] = useState<OrderStep>('CART_REVIEW');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    whatsapp: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    cep: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapSearchOpen, setMapSearchOpen] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const transition = { duration: 0.3 };

  // Validate customer info
  const validateCustomerInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim() || customerInfo.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(customerInfo.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "WhatsApp inválido (10 ou 11 dígitos)";
    }

    if (!customerInfo.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    }

    if (!customerInfo.numero.trim()) {
      newErrors.numero = "Número é obrigatório";
    }

    if (!customerInfo.bairro.trim()) {
      newErrors.bairro = "Bairro é obrigatório";
    }

    if (!customerInfo.cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória";
    }

    if (!customerInfo.cep.trim()) {
      newErrors.cep = "CEP é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (step === 'CART_REVIEW') {
      if (cartState.items.length === 0) {
        toast.error("Adicione itens ao carrinho");
        return;
      }
      setStep('CUSTOMER_INFO');
    } else if (step === 'CUSTOMER_INFO') {
      if (validateCustomerInfo()) {
        setStep('DELIVERY_ADDRESS');
      }
    } else if (step === 'DELIVERY_ADDRESS') {
      setStep('PAYMENT');
    } else if (step === 'PAYMENT') {
      setStep('CONFIRMATION');
    }
  };

  const handlePreviousStep = () => {
    if (step === 'CUSTOMER_INFO') {
      setStep('CART_REVIEW');
    } else if (step === 'DELIVERY_ADDRESS') {
      setStep('CUSTOMER_INFO');
    } else if (step === 'PAYMENT') {
      setStep('DELIVERY_ADDRESS');
    } else if (step === 'CONFIRMATION') {
      setStep('PAYMENT');
    }
  };

  // Step 1: Cart Review
  const CartReviewStep = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Resumo do Pedido</h2>
        <button
          onClick={() => navigate('/menu')}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cartState.items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-600">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.selectedOptions && item.selectedOptions.length > 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    {item.selectedOptions.map(opt => opt.value).join(", ")}
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 hover:bg-slate-200 rounded transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-slate-200 rounded transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 hover:bg-red-100 rounded transition text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Total */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-800">Total:</span>
          <span className="text-2xl font-bold text-purple-600">
            R$ {cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </span>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/menu')}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Menu
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );

  // Step 2: Customer Info
  const CustomerInfoStep = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-slate-800">Seus Dados</h2>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-slate-700 font-semibold">
            Nome Completo *
          </Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            placeholder="Seu nome"
            className="mt-2 text-base"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <Label htmlFor="whatsapp" className="text-slate-700 font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4" />
            WhatsApp *
          </Label>
          <Input
            id="whatsapp"
            value={customerInfo.whatsapp}
            onChange={(e) => {
              const normalized = normalizePhone(e.target.value);
              setCustomerInfo({ ...customerInfo, whatsapp: normalized });
              if (errors.whatsapp) setErrors({ ...errors, whatsapp: "" });
            }}
            placeholder="(11) 99999-9999"
            className="mt-2 text-base"
          />
          {errors.whatsapp && <p className="text-red-600 text-sm mt-1">{errors.whatsapp}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          Próximo
        </Button>
      </div>
    </motion.div>
  );

  // Step 3: Delivery Address
  const DeliveryAddressStep = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-slate-800">Endereço de Entrega</h2>
      </div>

      <div className="space-y-4">
        {/* Logradouro with Google Maps Search */}
        <div>
          <Label htmlFor="endereco" className="text-slate-700 font-semibold">
            Logradouro *
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="endereco"
              value={customerInfo.endereco}
              onChange={(e) => {
                setCustomerInfo({ ...customerInfo, endereco: e.target.value });
                if (errors.endereco) setErrors({ ...errors, endereco: "" });
              }}
              placeholder="Rua, Avenida, etc"
              className="flex-1 text-base"
            />
            <Button
              variant="outline"
              onClick={() => setMapSearchOpen(true)}
              className="px-3"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
          {errors.endereco && <p className="text-red-600 text-sm mt-1">{errors.endereco}</p>}
        </div>

        {/* Número */}
        <div>
          <Label htmlFor="numero" className="text-slate-700 font-semibold">
            Número *
          </Label>
          <Input
            id="numero"
            value={customerInfo.numero}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, numero: e.target.value });
              if (errors.numero) setErrors({ ...errors, numero: "" });
            }}
            placeholder="123"
            className="mt-2 text-base"
          />
          {errors.numero && <p className="text-red-600 text-sm mt-1">{errors.numero}</p>}
        </div>

        {/* Complemento */}
        <div>
          <Label htmlFor="complemento" className="text-slate-700 font-semibold">
            Complemento (Apto, Sala, etc)
          </Label>
          <Input
            id="complemento"
            value={customerInfo.complemento}
            onChange={(e) => setCustomerInfo({ ...customerInfo, complemento: e.target.value })}
            placeholder="Apto 101"
            className="mt-2 text-base"
          />
        </div>

        {/* Bairro */}
        <div>
          <Label htmlFor="bairro" className="text-slate-700 font-semibold">
            Bairro *
          </Label>
          <Input
            id="bairro"
            value={customerInfo.bairro}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, bairro: e.target.value });
              if (errors.bairro) setErrors({ ...errors, bairro: "" });
            }}
            placeholder="Bairro"
            className="mt-2 text-base"
          />
          {errors.bairro && <p className="text-red-600 text-sm mt-1">{errors.bairro}</p>}
        </div>

        {/* Cidade */}
        <div>
          <Label htmlFor="cidade" className="text-slate-700 font-semibold">
            Cidade *
          </Label>
          <Input
            id="cidade"
            value={customerInfo.cidade}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, cidade: e.target.value });
              if (errors.cidade) setErrors({ ...errors, cidade: "" });
            }}
            placeholder="Cidade"
            className="mt-2 text-base"
          />
          {errors.cidade && <p className="text-red-600 text-sm mt-1">{errors.cidade}</p>}
        </div>

        {/* CEP */}
        <div>
          <Label htmlFor="cep" className="text-slate-700 font-semibold">
            CEP *
          </Label>
          <Input
            id="cep"
            value={customerInfo.cep}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, cep: e.target.value });
              if (errors.cep) setErrors({ ...errors, cep: "" });
            }}
            placeholder="12345-678"
            className="mt-2 text-base"
          />
          {errors.cep && <p className="text-red-600 text-sm mt-1">{errors.cep}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          Próximo
        </Button>
      </div>

      {/* Map Search Dialog */}
      <Dialog open={mapSearchOpen} onOpenChange={setMapSearchOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buscar Endereço</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={mapSearchQuery}
              onChange={(e) => setMapSearchQuery(e.target.value)}
              placeholder="Digite o logradouro..."
              className="text-base"
            />
            <p className="text-sm text-slate-600">
              Integração com Google Maps será implementada aqui para buscar endereços
            </p>
            <Button
              onClick={() => {
                if (mapSearchQuery) {
                  setCustomerInfo({ ...customerInfo, endereco: mapSearchQuery });
                  setMapSearchOpen(false);
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Usar este endereço
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );

  // Step 4: Payment
  const PaymentStep = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-slate-800">Pagamento</h2>
      </div>

      {/* Order Summary */}
      <Card className="p-4 bg-slate-50">
        <h3 className="font-semibold text-slate-800 mb-3">Resumo do Pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal:</span>
            <span className="font-semibold">
              R$ {cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Taxa de Entrega:</span>
            <span className="font-semibold">R$ 0,00</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-purple-600">
              R$ {cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-800">Forma de Pagamento</h3>
        <Button
          variant="outline"
          className="w-full justify-start text-left h-auto p-4 border-2 hover:border-purple-600 hover:bg-purple-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded flex items-center justify-center text-white text-xs font-bold">
              PIX
            </div>
            <div>
              <p className="font-semibold text-slate-800">PIX</p>
              <p className="text-xs text-slate-600">Instantâneo</p>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start text-left h-auto p-4 border-2 hover:border-purple-600 hover:bg-purple-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
              CC
            </div>
            <div>
              <p className="font-semibold text-slate-800">Cartão de Crédito</p>
              <p className="text-xs text-slate-600">Parcelado</p>
            </div>
          </div>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
        >
          Confirmar Pedido
        </Button>
      </div>
    </motion.div>
  );

  // Step 5: Confirmation
  const ConfirmationStep = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="space-y-4 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800">Pedido Confirmado!</h2>
      <p className="text-slate-600">Seu pedido foi recebido com sucesso</p>

      <Card className="p-4 bg-slate-50 text-left">
        <h3 className="font-semibold text-slate-800 mb-3">Detalhes do Pedido</h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-slate-600">Cliente:</p>
            <p className="font-semibold">{customerInfo.name}</p>
          </div>
          <div>
            <p className="text-slate-600">WhatsApp:</p>
            <p className="font-semibold">{customerInfo.whatsapp}</p>
          </div>
          <div>
            <p className="text-slate-600">Endereço:</p>
            <p className="font-semibold">
              {customerInfo.endereco}, {customerInfo.numero}
              {customerInfo.complemento && ` - ${customerInfo.complemento}`}
            </p>
          </div>
          <div>
            <p className="text-slate-600">Total:</p>
            <p className="font-semibold text-purple-600">
              R$ {cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={() => navigate('/menu')}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          Voltar ao Menu
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'CART_REVIEW' && <CartReviewStep key="cart" />}
          {step === 'CUSTOMER_INFO' && <CustomerInfoStep key="info" />}
          {step === 'DELIVERY_ADDRESS' && <DeliveryAddressStep key="address" />}
          {step === 'PAYMENT' && <PaymentStep key="payment" />}
          {step === 'CONFIRMATION' && <ConfirmationStep key="confirmation" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderFlow;
