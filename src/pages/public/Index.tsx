import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Search, Lock, ArrowRight } from "lucide-react";
import logo from "@/assets/coloridoacai.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 rounded-full" />
        <div className="blob blob-secondary w-72 h-72 -bottom-36 -right-36 rounded-full" />
        <div className="blob blob-tertiary w-80 h-80 top-1/2 left-1/3 rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-24 text-center">
          {/* Logo */}
          <div className="mb-12 sm:mb-16 animate-pop-in">
            <img 
              src={logo} 
              alt="Colorido Açaí" 
              className="h-24 sm:h-32 mx-auto drop-shadow-lg"
            />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-pop-in" style={{ animationDelay: '0.1s' }}>
            Açaí Colorido, Sabor Vibrante! 🫐
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 sm:mb-16 animate-pop-in" style={{ animationDelay: '0.2s' }}>
            Peça seu açaí e pague com PIX de forma rápida e fácil
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16 sm:mb-24">
            {/* Fazer Pedido Button */}
            <button
              onClick={() => navigate("/menu")}
              className="btn-primary group flex items-center justify-center gap-3 animate-pop-in"
              style={{ animationDelay: '0.3s' }}
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Fazer Pedido</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Consultar Pedido Button */}
            <button
              onClick={() => navigate("/pedidos")}
              className="btn-secondary flex items-center justify-center gap-3 animate-pop-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Search className="w-6 h-6" />
              <span>Consultar Pedido</span>
            </button>

            {/* Área Restrita Button */}
            <button
              onClick={() => navigate("/auth")}
              className="btn-primary sm:col-span-2 flex items-center justify-center gap-3 bg-tertiary text-tertiary-foreground border-foreground animate-pop-in"
              style={{ animationDelay: '0.5s' }}
            >
              <Lock className="w-6 h-6" />
              <span>Área Restrita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="relative z-10 bg-card py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Location Card */}
            <Card className="card-sticker p-6 text-center">
              <div className="icon-circle bg-primary text-primary-foreground mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">Localização</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Av. Dois de Julho, 44<br />
                Centro, Ilhéus - BA
              </p>
              <a 
                href="https://maps.google.com/?q=Av.+Dois+de+Julho+44+Ilhéus+BA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Abrir no Google Maps 📍
              </a>
            </Card>

            {/* Hours Card */}
            <Card className="card-sticker p-6 text-center">
              <div className="icon-circle bg-tertiary text-tertiary-foreground mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">Horário</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Segunda - Domingo
              </p>
              <p className="text-sm font-semibold text-foreground">
                9:30 - 18:30
              </p>
              <p className="text-xs text-success mt-2">
                Aberto agora! 🫐
              </p>
            </Card>

            {/* Contact Card */}
            <Card className="card-sticker p-6 text-center">
              <div className="icon-circle bg-secondary text-secondary-foreground mx-auto mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">Contato</h3>
              <p className="text-sm text-muted-foreground mb-2">
                (73) 98127-4415
              </p>
              <a 
                href="https://wa.me/5573981274415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs bg-success text-success-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
            </Card>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative z-10 bg-gradient-to-br from-secondary via-primary to-tertiary py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
            Por que escolher o Colorido Açaí? 🫐
          </h2>
          
          <div className="space-y-8 mt-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="icon-circle bg-white text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Feito com Amor</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto">
                Cada açaí é preparado com carinho e ingredientes frescos e selecionados
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="icon-circle bg-white text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Sabores Únicos</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto">
                Variedade incrível de sabores e coberturas para você criar seu açaí perfeito
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="icon-circle bg-white text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Atendimento Especial</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto">
                Nossa equipe está sempre pronta para te atender com um sorriso e fazer seu dia melhor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-primary via-secondary to-tertiary text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-2xl p-3 mb-4">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="h-12 w-auto"
              />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-2">Colorido Açaí e Cia</h3>
            <p className="text-white/90 text-sm max-w-md mx-auto">
              Sabor e frescor em cada colherada! 🫐
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate("/menu")} 
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Cardápio
            </button>
            <span className="text-white/50">•</span>
            <button 
              onClick={() => navigate("/pedidos")} 
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Meus Pedidos
            </button>
            <span className="text-white/50">•</span>
            <button 
              onClick={() => navigate("/auth")} 
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Área Restrita
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-white/80 space-y-1 mb-8">
            <p>📍 Av. Dois de Julho, 44 - Centro, Ilhéus - BA</p>
            <p>📞 (73) 98127-4415</p>
            <p>🕐 Segunda a Domingo: 9:30 - 18:30</p>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-white/60 pt-6 border-t border-white/20">
            <p>&copy; {new Date().getFullYear()} Colorido Açaí e Cia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
