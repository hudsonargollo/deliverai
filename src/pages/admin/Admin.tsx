import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, BarChart3, ChefHat, MessageCircle, Printer, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminLayout } from "@/layouts/AdminLayout";

const Admin = () => {
  const navigate = useNavigate();
  
  // Check if bypass parameter is present
  const urlParams = new URLSearchParams(window.location.search);
  const bypassParam = urlParams.get('bypass');
  const bypassSuffix = bypassParam ? `?bypass=${bypassParam}` : '';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  const handleNavigation = (path: string) => {
    navigate(`${path}${bypassSuffix}`);
  };

  const adminMenuItems = [
    { title: "Dashboard", icon: BarChart3, path: "/admin/dashboard", description: "Visão geral e métricas", color: "from-blue-500 to-blue-600" },
    { title: "Pedidos", icon: ChefHat, path: "/cashier", description: "Gerenciar pedidos", color: "from-orange-500 to-orange-600" },
    { title: "Produtos", icon: ShoppingBag, path: "/admin/products", description: "Gerenciar cardápio", color: "from-green-500 to-green-600" },
    { title: "Equipe", icon: Users, path: "/waiter-management", description: "Gerenciar equipe", color: "from-purple-500 to-purple-600" },
    { title: "Clientes", icon: Users, path: "/customers", description: "Gerenciar clientes", color: "from-pink-500 to-pink-600" },
    { title: "Relatórios", icon: BarChart3, path: "/reports", description: "Análises e métricas", color: "from-indigo-500 to-indigo-600" },
    { title: "WhatsApp", icon: MessageCircle, path: "/whatsapp-admin", description: "Configurar WhatsApp", color: "from-green-400 to-green-500" },
    { title: "Impressão", icon: Printer, path: "/print-server-config", description: "Configurar impressora", color: "from-gray-500 to-gray-600" },
  ];

  return (
    <AdminLayout>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao Admin</h2>
            <p className="text-gray-600">Gerencie todos os aspectos do seu negócio em um único lugar</p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {adminMenuItems.map((item) => (
              <Card
                key={item.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-purple-200 bg-white overflow-hidden"
                onClick={() => handleNavigation(item.path)}
              >
                <CardContent className="p-6 relative h-full flex flex-col">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="relative flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                    <span className="text-sm font-medium">Acessar</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Sistema</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">Operacional</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Versão</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">1.0.0</p>
                  </div>
                  <div className="text-3xl">🫐</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-indigo-600 font-medium">Status</p>
                    <p className="text-2xl font-bold text-indigo-900 mt-1">Ativo</p>
                  </div>
                  <div className="text-3xl">✨</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </AdminLayout>
  );
};

export default Admin;
