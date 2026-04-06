import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '@/layouts/AdminLayout';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
  ordersTrend: number;
  revenueTrend: number;
}

interface RecentOrder {
  id: string;
  order_number: number;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    ordersTrend: 0,
    revenueTrend: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayString = today.toISOString();

      // Get yesterday's date
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString();

      // Get total orders today
      const { data: todayOrders, error: todayError } = await supabase
        .from('orders')
        .select('id, total_amount')
        .gte('created_at', todayString);

      if (todayError) throw todayError;

      // Get total orders yesterday
      const { data: yesterdayOrders, error: yesterdayError } = await supabase
        .from('orders')
        .select('id, total_amount')
        .gte('created_at', yesterdayString)
        .lt('created_at', todayString);

      if (yesterdayError) throw yesterdayError;

      // Get pending orders
      const { data: pendingOrders, error: pendingError } = await supabase
        .from('orders')
        .select('id')
        .eq('status', 'pending');

      if (pendingError) throw pendingError;

      // Get total customers
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('id');

      if (customersError) throw customersError;

      // Get recent orders
      const { data: recent, error: recentError } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, total_amount, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Calculate stats
      const todayRevenue = todayOrders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
      const yesterdayRevenue = yesterdayOrders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
      const ordersTrend = yesterdayOrders ? ((todayOrders?.length || 0) - yesterdayOrders.length) / yesterdayOrders.length * 100 : 0;
      const revenueTrend = yesterdayRevenue ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0;

      setStats({
        totalOrders: todayOrders?.length || 0,
        totalRevenue: todayRevenue,
        pendingOrders: pendingOrders?.length || 0,
        totalCustomers: customers?.length || 0,
        ordersTrend: Math.round(ordersTrend),
        revenueTrend: Math.round(revenueTrend),
      });

      setRecentOrders(recent || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in_preparation':
        return 'bg-blue-100 text-blue-700';
      case 'ready':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'in_preparation':
        return 'Em Preparo';
      case 'ready':
        return 'Pronto';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 pt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Orders */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pedidos Hoje</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className={`w-4 h-4 ${stats.ordersTrend >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <span className={stats.ordersTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
                {stats.ordersTrend >= 0 ? '+' : ''}{stats.ordersTrend}% vs ontem
              </span>
            </div>
          </Card>

          {/* Total Revenue */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Faturamento</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  R$ {stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className={`w-4 h-4 ${stats.revenueTrend >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <span className={stats.revenueTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
                {stats.revenueTrend >= 0 ? '+' : ''}{stats.revenueTrend}% vs ontem
              </span>
            </div>
          </Card>

          {/* Pending Orders */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pedidos Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-600">Aguardando pagamento</p>
          </Card>

          {/* Total Customers */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Clientes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-600">Total cadastrados</p>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-2 border-purple-200 overflow-hidden">
          <div className="p-6 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
              Pedidos Recentes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pedido</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Nenhum pedido encontrado</p>
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">#{order.order_number}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.customer_name}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        R$ {order.total_amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              Ver Todos os Pedidos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
