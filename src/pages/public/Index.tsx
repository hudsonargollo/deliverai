import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Search, Lock, ArrowRight, Zap, Shield, Smile } from "lucide-react";
import logo from "@/assets/coloridoacai.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 rounded-full animate-blob" />
        <div className="blob blob-secondary w-72 h-72 -bottom-36 -right-36 rounded-full animate-blob animation-delay-2000" />
        <div className="blob blob-tertiary w-80 h-80 top-1/2 left-1/3 rounded-full animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-24 text-center">
          {/* Logo */}
          <div className="mb-12 sm:mb-16 animate-pop-in">
            <div className="inline-block bg-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="h-24 sm:h-32 mx-auto"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-pop-in" style={{ animationDelay: '0.1s' }}>
            Açaí Colorido, Sabor Vibrante! 🫐
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 animate-pop-in max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Peça seu açaí delicioso e pague com PIX de forma rápida, fácil e segura
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16 sm:mb-24">
            {/* Fazer Pedido Button */}
            <button
              onClick={() => navigate("/menu")}
              className="btn-primary group flex items-center justify-center gap-3 animate-pop-in text-lg font-bold py-4 sm:py-5"
              style={{ animationDelay: '0.3s' }}
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Fazer Pedido</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Consultar Pedido Button */}
            <button
              onClick={() => navigate("/pedidos")}
              className="btn-secondary flex items-center justify-center gap-3 animate-pop-in text-lg font-bold py-4 sm:py-5"
              style={{ animationDelay: '0.4s' }}
            >
              <Search className="w-6 h-6" />
              <span>Consultar Pedido</span>
            </button>

            {/* Área Restrita Button */}
            <button
              onClick={() => navigate("/auth")}
              className="btn-primary sm:col-span-2 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-2 border-foreground animate-pop-in text-lg font-bold py-4 sm:py-5 hover:shadow-pop-hover"
              style={{ animationDelay: '0.5s' }}
            >
              <Lock className="w-6 h-6" />
              <span>Área Restrita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="relative z-10 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Location Card */}
            <Card className="card-sticker p-6 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
              <div className="icon-circle bg-gradient-to-br from-purple-500 to-purple-600 text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">Localização</h3>
              <p className="text-sm text-gray-600 mb-3">
                Jequié<br />
                Bahia
              </p>
              <a 
                href="https://maps.google.com/?q=Jequié+Bahia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Abrir no Google Maps 📍
              </a>
            </Card>

            {/* Hours Card */}
            <Card className="card-sticker p-6 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-400">
              <div className="icon-circle bg-gradient-to-br from-pink-500 to-pink-600 text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">Horário</h3>
              <p className="text-sm text-gray-600 mb-1">
                Segunda - Domingo
              </p>
              <p className="text-sm font-semibold text-gray-900">
                9:30 - 18:30
              </p>
              <p className="text-xs text-green-600 font-semibold mt-2 animate-pulse">
                ✓ Aberto agora!
              </p>
            </Card>

            {/* Contact Card */}
            <Card className="card-sticker p-6 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400">
              <div className="icon-circle bg-gradient-to-br from-green-500 to-green-600 text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">Contato</h3>
              <p className="text-sm text-gray-600 mb-3">
                (73) 98127-4415
              </p>
              <a 
                href="https://wa.me/5573981274415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                💬 WhatsApp
              </a>
            </Card>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative z-10 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 py-16 sm:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
            Por que escolher o Colorido Açaí? 🫐
          </h2>
          <p className="text-center text-white/90 mb-12 max-w-2xl mx-auto">
            Qualidade, sabor e atendimento excepcional em cada pedido
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="icon-circle bg-white text-purple-600 mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Smile className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Feito com Amor</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto leading-relaxed">
                Cada açaí é preparado com carinho e ingredientes frescos e selecionados com cuidado
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="icon-circle bg-white text-purple-600 mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Sabores Únicos</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto leading-relaxed">
                Variedade incrível de sabores e coberturas para você criar seu açaí perfeito
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="icon-circle bg-white text-purple-600 mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Atendimento Especial</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto leading-relaxed">
                Nossa equipe está sempre pronta para te atender com um sorriso e fazer seu dia melhor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16 border-t-4 border-purple-600">
        <div className="max-w-4xl mx-auto px-4">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 mb-4 shadow-xl">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="h-12 w-auto"
              />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-2">Colorido Açaí e Cia</h3>
            <p className="text-white/80 text-sm max-w-md mx-auto">
              Sabor e frescor em cada colherada! 🫐
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 pb-8 border-b border-white/20">
            <button 
              onClick={() => navigate("/menu")} 
              className="text-sm text-white/80 hover:text-white hover:underline transition-colors font-medium"
            >
              Cardápio
            </button>
            <span className="text-white/30">•</span>
            <button 
              onClick={() => navigate("/pedidos")} 
              className="text-sm text-white/80 hover:text-white hover:underline transition-colors font-medium"
            >
              Meus Pedidos
            </button>
            <span className="text-white/30">•</span>
            <button 
              onClick={() => navigate("/auth")} 
              className="text-sm text-white/80 hover:text-white hover:underline transition-colors font-medium"
            >
              Área Restrita
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-white/70 space-y-2 mb-8">
            <p>📍 Jequié, Bahia</p>
            <p>📞 (73) 98127-4415</p>
            <p>🕐 Segunda a Domingo: 9:30 - 18:30</p>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-white/50 pt-6">
            <p>&copy; {new Date().getFullYear()} Colorido Açaí e Cia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
