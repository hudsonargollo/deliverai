import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Search, Lock, ArrowRight, Zap, Shield, Smile, Sparkles } from "lucide-react";
import logo from "@/assets/coloridoacai.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 overflow-hidden relative">
      {/* Animated gradient background overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-purple-900/30 animate-pulse" />
      </div>

      {/* Decorative Blobs - Enhanced */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 rounded-full animate-blob bg-gradient-to-br from-purple-400 to-pink-400 opacity-30" />
        <div className="blob blob-secondary w-72 h-72 -bottom-36 -right-36 rounded-full animate-blob animation-delay-2000 bg-gradient-to-br from-blue-400 to-purple-400 opacity-25" />
        <div className="blob blob-tertiary w-80 h-80 top-1/2 left-1/3 rounded-full animate-blob animation-delay-4000 bg-gradient-to-br from-pink-400 to-purple-500 opacity-20" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-br from-yellow-400/15 to-orange-400/10 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-24 text-center">
          {/* Sparkle decoration */}
          <div className="absolute top-10 left-10 text-yellow-300 opacity-60 animate-bounce" style={{ animationDelay: '0s' }}>
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute top-20 right-20 text-pink-300 opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-6 h-6" />
          </div>

          {/* Logo */}
          <div className="mb-12 sm:mb-16 animate-pop-in">
            <div className="inline-block bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-purple-200/50 backdrop-blur-sm">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="h-24 sm:h-32 mx-auto drop-shadow-lg"
              />
            </div>
          </div>

          {/* Heading - Enhanced */}
          <h1 className="font-heading text-4xl sm:text-6xl font-bold bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 bg-clip-text text-transparent mb-4 animate-pop-in drop-shadow-2xl" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Açaí Colorido, Sabor Vibrante! 🫐
          </h1>
          <p className="text-lg sm:text-xl text-white mb-12 sm:mb-16 animate-pop-in max-w-2xl mx-auto font-semibold drop-shadow-lg" style={{ animationDelay: '0.2s', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
            Peça seu açaí delicioso e pague com PIX de forma rápida, fácil e segura
          </p>

          {/* Action Buttons - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16 sm:mb-24">
            {/* Fazer Pedido Button */}
            <button
              onClick={() => navigate("/menu")}
              className="btn-primary group flex items-center justify-center gap-3 animate-pop-in text-lg font-bold py-4 sm:py-5 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-green-300/50 hover:scale-105"
              style={{ animationDelay: '0.3s' }}
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Fazer Pedido</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Consultar Pedido Button */}
            <button
              onClick={() => navigate("/pedidos")}
              className="btn-secondary flex items-center justify-center gap-3 animate-pop-in text-lg font-bold py-4 sm:py-5 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-blue-300/50 hover:scale-105"
              style={{ animationDelay: '0.4s' }}
            >
              <Search className="w-6 h-6" />
              <span>Consultar Pedido</span>
            </button>

            {/* Área Restrita Button */}
            <button
              onClick={() => navigate("/auth")}
              className="btn-primary sm:col-span-2 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white animate-pop-in text-lg font-bold py-4 sm:py-5 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-amber-300/50 hover:scale-105"
              style={{ animationDelay: '0.5s' }}
            >
              <Lock className="w-6 h-6" />
              <span>Área Restrita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="relative z-10 bg-gradient-to-b from-white/5 via-white/10 to-white/5 backdrop-blur-md py-16 sm:py-28 border-t-2 border-purple-400/30">
        <div className="max-w-5xl mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Informações Importantes 📍
            </h2>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto font-semibold drop-shadow-lg" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              Tudo que você precisa saber para aproveitar nossos deliciosos açaís
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* Location Card */}
            <Card className="card-sticker p-8 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-purple-400/50 hover:border-purple-300 bg-gradient-to-br from-purple-500/25 to-purple-600/15 backdrop-blur-sm hover:bg-gradient-to-br hover:from-purple-500/35 hover:to-purple-600/25 hover:scale-105">
              <div className="icon-circle bg-gradient-to-br from-purple-400 to-purple-500 text-white mx-auto mb-5 shadow-lg group-hover:shadow-2xl transition-all duration-300 w-20 h-20 flex items-center justify-center rounded-full">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-white drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Localização</h3>
              <p className="text-base text-white mb-4 font-semibold leading-relaxed drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Jequié<br />
                <span className="text-sm text-white/95">Bahia</span>
              </p>
              <a 
                href="https://maps.google.com/?q=Jequié+Bahia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 text-purple-900 px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 hover:from-yellow-400 hover:to-yellow-500 w-full"
              >
                📍 Google Maps
              </a>
            </Card>

            {/* Hours Card */}
            <Card className="card-sticker p-8 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-pink-400/50 hover:border-pink-300 bg-gradient-to-br from-pink-500/25 to-pink-600/15 backdrop-blur-sm hover:bg-gradient-to-br hover:from-pink-500/35 hover:to-pink-600/25 hover:scale-105">
              <div className="icon-circle bg-gradient-to-br from-pink-400 to-pink-500 text-white mx-auto mb-5 shadow-lg group-hover:shadow-2xl transition-all duration-300 w-20 h-20 flex items-center justify-center rounded-full">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-white drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Horário</h3>
              <div className="space-y-2 mb-4">
                <p className="text-base text-white font-semibold drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                  Segunda - Domingo
                </p>
                <p className="text-lg font-bold text-white drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                  9:30 - 18:30
                </p>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-2.5 rounded-full animate-pulse shadow-lg w-full">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                Aberto agora!
              </div>
            </Card>

            {/* Contact Card */}
            <Card className="card-sticker p-8 text-center group hover:shadow-2xl transition-all duration-300 border-2 border-green-400/50 hover:border-green-300 bg-gradient-to-br from-green-500/25 to-green-600/15 backdrop-blur-sm hover:bg-gradient-to-br hover:from-green-500/35 hover:to-green-600/25 hover:scale-105">
              <div className="icon-circle bg-gradient-to-br from-green-400 to-green-500 text-white mx-auto mb-5 shadow-lg group-hover:shadow-2xl transition-all duration-300 w-20 h-20 flex items-center justify-center rounded-full">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-white drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Contato</h3>
              <p className="text-base text-white mb-4 font-semibold drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                (73) 98127-4415
              </p>
              <a 
                href="https://wa.me/5573981274415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 hover:from-green-500 hover:to-emerald-600 w-full"
              >
                💬 WhatsApp
              </a>
            </Card>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative z-10 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 py-16 sm:py-28 overflow-hidden border-t-2 border-purple-400/50">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Por que escolher o Colorido Açaí? 🫐
            </h2>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto font-semibold drop-shadow-lg" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              Qualidade, sabor e atendimento excepcional em cada pedido
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="icon-circle bg-gradient-to-br from-yellow-300 to-yellow-400 text-purple-600 mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 w-24 h-24 flex items-center justify-center rounded-full">
                <Smile className="w-12 h-12" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3 drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Feito com Amor</h3>
              <p className="text-white text-base max-w-md mx-auto leading-relaxed font-medium drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Cada açaí é preparado com carinho e ingredientes frescos selecionados com cuidado
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="icon-circle bg-gradient-to-br from-cyan-300 to-blue-400 text-purple-600 mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 w-24 h-24 flex items-center justify-center rounded-full">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3 drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Sabores Únicos</h3>
              <p className="text-white text-base max-w-md mx-auto leading-relaxed font-medium drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Variedade incrível de sabores e coberturas para você criar seu açaí perfeito
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="icon-circle bg-gradient-to-br from-green-300 to-emerald-400 text-purple-600 mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 w-24 h-24 flex items-center justify-center rounded-full">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3 drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Atendimento Especial</h3>
              <p className="text-white text-base max-w-md mx-auto leading-relaxed font-medium drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Nossa equipe está sempre pronta para te atender com um sorriso e fazer seu dia melhor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white py-12 sm:py-20 border-t-4 border-purple-500/50">
        <div className="max-w-5xl mx-auto px-4">
          {/* Logo and Brand */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-3 mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="h-14 w-auto drop-shadow-lg"
              />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>Colorido Açaí e Cia</h3>
            <p className="text-white text-base max-w-md mx-auto font-medium drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              Sabor e frescor em cada colherada! 🫐
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 pb-10 border-b border-white/20">
            <button 
              onClick={() => navigate("/menu")} 
              className="text-base text-white hover:text-yellow-300 hover:underline transition-colors font-semibold drop-shadow-sm"
            >
              Cardápio
            </button>
            <span className="text-white/30">•</span>
            <button 
              onClick={() => navigate("/pedidos")} 
              className="text-base text-white hover:text-yellow-300 hover:underline transition-colors font-semibold drop-shadow-sm"
            >
              Meus Pedidos
            </button>
            <span className="text-white/30">•</span>
            <button 
              onClick={() => navigate("/auth")} 
              className="text-base text-white hover:text-yellow-300 hover:underline transition-colors font-semibold drop-shadow-sm"
            >
              Área Restrita
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-base text-white space-y-3 mb-10 font-medium drop-shadow-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
            <p className="flex items-center justify-center gap-2">
              <span>📍</span>
              <span>Jequié, Bahia</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>📞</span>
              <span>(73) 98127-4415</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🕐</span>
              <span>Segunda a Domingo: 9:30 - 18:30</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-white/70 pt-8 border-t border-white/10 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <p>&copy; {new Date().getFullYear()} Colorido Açaí e Cia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
