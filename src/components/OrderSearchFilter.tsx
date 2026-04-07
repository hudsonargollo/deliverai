import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import type { Order } from "@/integrations/supabase/realtime";

interface OrderSearchFilterProps {
  orders: Order[];
  onFilterChange: (filtered: Order[]) => void;
}

type FilterType = "all" | "order_number" | "customer_name" | "phone" | "date_range" | "payment_status" | "order_status";

interface FilterState {
  searchQuery: string;
  searchType: FilterType;
  paymentStatus: string;
  orderStatus: string;
  dateFrom: string;
  dateTo: string;
}

export const OrderSearchFilter = ({ orders, onFilterChange }: OrderSearchFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    searchType: "all",
    paymentStatus: "all",
    orderStatus: "all",
    dateFrom: "",
    dateTo: "",
  });

  const [activeFilters, setActiveFilters] = useState(0);

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...orders];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();

      if (filters.searchType === "all" || filters.searchType === "order_number") {
        filtered = filtered.filter((o) =>
          o.order_number?.toString().includes(query)
        );
      } else if (filters.searchType === "customer_name") {
        filtered = filtered.filter((o) =>
          o.customer_name?.toLowerCase().includes(query)
        );
      } else if (filters.searchType === "phone") {
        filtered = filtered.filter((o) =>
          o.customer_phone?.replace(/\D/g, "").includes(query.replace(/\D/g, ""))
        );
      }
    }

    // Payment status filter
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((o) => o.payment_status === filters.paymentStatus);
    }

    // Order status filter
    if (filters.orderStatus !== "all") {
      filtered = filtered.filter((o) => o.status === filters.orderStatus);
    }

    // Date range filter
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter((o) => new Date(o.created_at) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((o) => new Date(o.created_at) <= toDate);
    }

    // Count active filters
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.paymentStatus !== "all") count++;
    if (filters.orderStatus !== "all") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;

    setActiveFilters(count);
    onFilterChange(filtered);
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      searchType: "all",
      paymentStatus: "all",
      orderStatus: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleSearchTypeChange = (type: FilterType) => {
    setFilters((prev) => ({
      ...prev,
      searchType: type,
      searchQuery: "",
    }));
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          Buscar e Filtrar Pedidos
          {activeFilters > 0 && (
            <Badge className="ml-auto bg-purple-600 text-white">
              {activeFilters} filtro{activeFilters !== 1 ? "s" : ""}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Buscar</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Digite para buscar..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="pl-10 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
                />
              </div>
              <Select
                value={filters.searchType}
                onValueChange={(value) =>
                  handleSearchTypeChange(value as FilterType)
                }
              >
                <SelectTrigger className="w-40 border-2 border-gray-200 focus:border-purple-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tudo</SelectItem>
                  <SelectItem value="order_number">Nº Pedido</SelectItem>
                  <SelectItem value="customer_name">Nome Cliente</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Status de Pagamento
              </label>
              <Select
                value={filters.paymentStatus}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    paymentStatus: value,
                  }))
                }
              >
                <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Status do Pedido
              </label>
              <Select
                value={filters.orderStatus}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    orderStatus: value,
                  }))
                }
              >
                <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="pending_payment">Aguardando Pagamento</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="in_preparation">Em Preparo</SelectItem>
                  <SelectItem value="ready">Pronto</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Intervalo de Datas
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateFrom: e.target.value,
                  }))
                }
                className="border-2 border-gray-200 focus:border-purple-500 rounded-lg"
              />
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateTo: e.target.value,
                  }))
                }
                className="border-2 border-gray-200 focus:border-purple-500 rounded-lg"
              />
            </div>
          </div>

          {/* Reset Button */}
          {activeFilters > 0 && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 hover:text-red-700 font-semibold transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
