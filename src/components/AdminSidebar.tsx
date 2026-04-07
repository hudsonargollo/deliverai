import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSidebar } from '@/lib/sidebarContext';
import logo from '@/assets/coloridoacai.jpg';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, setIsOpen } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      label: 'Produtos',
      icon: <ShoppingBag className="w-5 h-5" />,
      path: '/admin/products',
    },
    {
      label: 'Clientes',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/customers',
    },
    {
      label: 'WhatsApp',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/admin/whatsapp',
    },
    {
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
    },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Erro ao fazer logout');
        return;
      }
      toast.success('Logout realizado com sucesso! 👋');
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex items-center justify-between">
        <img src={logo} alt="Colorido" className="h-8 w-auto" />
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed left-4 top-4 z-50 p-2 hover:bg-purple-100 rounded-lg transition-colors text-purple-900 bg-white shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white transition-all duration-300 z-30 md:z-20 ${
          isOpen ? 'w-64' : 'w-0 md:w-20'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-purple-700/50 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <img src={logo} alt="Colorido" className="h-10 w-auto rounded-lg" />
              <div className="hidden sm:block">
                <p className="font-bold text-sm">Colorido</p>
                <p className="text-xs text-purple-300">Admin</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'text-purple-100 hover:bg-white/10'
              }`}
              title={!isOpen ? item.label : ''}
            >
              {item.icon}
              {isOpen && (
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-purple-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-100 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            title={!isOpen ? 'Sair' : ''}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="text-sm font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};
