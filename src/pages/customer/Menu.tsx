import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, LogOut, Coffee, Droplets, IceCream, Sandwich, Pizza, Cake, LayoutGrid, List, Store, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cartContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useStoreStatus } from "@/hooks/useStoreStatus";
import { useSortingMode } from "@/hooks/useSortingMode";
import { useMenuSorting } from "@/hooks/useMenuSorting";
import { SortingToggle } from "@/components/SortingToggle";
import { SortableProductList } from "@/components/SortableProductList";
import { DraggableProductCard } from "@/components/DraggableProductCard";
import { ProductCustomizationDialog } from "@/components/ProductCustomizationDialog";
import { SelectedOption } from "@/types/product-options";
import logo from "@/assets/coloridoacai.jpg";
import headerImage from "@/assets/header.webp";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  available: boolean;
  image_url: string | null;
  sort_order: number;
}

interface Category {
  id: string;
  name: string;
  display_order: number;
}

const Menu = () => {
  const navigate = useNavigate();
  
  const {
    state: cartState,
    addItem,
    removeItem,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  
  // Admin and sorting hooks
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { isSortingMode, toggleSortingMode } = useSortingMode();
  const { updateSortOrder, reorderItems, isSaving } = useMenuSorting();
  
  // Store status hook
  const { isOpen: storeIsOpen, loading: storeStatusLoading } = useStoreStatus();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    // Restore view mode from localStorage
    const saved = localStorage.getItem('menu_view_mode');
    return (saved === 'list' ? 'list' : 'grid') as 'grid' | 'list';
  });
  const [customizationProduct, setCustomizationProduct] = useState<MenuItem | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  useEffect(() => {
    console.log('🍽️ Menu component mounted');
    loadMenu();
  }, []);

  // Memoized category items for performance
  const categorizedItems = useMemo(() => {
    return categories.map(category => ({
      ...category,
      items: menuItems.filter(item => item.category_id === category.id)
    })).filter(category => category.items.length > 0);
  }, [categories, menuItems]);

  // Set initial active tab when categories load
  useEffect(() => {
    if (categorizedItems.length > 0 && !activeTab) {
      setActiveTab(categorizedItems[0].id);
    }
  }, [categorizedItems, activeTab]);

  // Persist view mode to localStorage
  useEffect(() => {
    localStorage.setItem('menu_view_mode', viewMode);
  }, [viewMode]);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  // Optimized scroll handler
  const handleCategoryScroll = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 220;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle image errors
  const handleImageError = useCallback((itemId: string) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  }, []);

  // Optimized add to cart with feedback
  const handleAddToCart = useCallback((item: MenuItem) => {
    // Check if store is open
    if (!storeIsOpen) {
      toast.error('🔒 Desculpe, a loja está fechada no momento. Não é possível adicionar itens ao carrinho.', {
        duration: 4000,
      });
      return;
    }
    
    addItem(item);
    toast.success(`${item.name} adicionado ao carrinho! 🛒`, {
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        border: 'none',
      }
    });
  }, [addItem, storeIsOpen]);

  // Handle product with options
  const handleProductClick = useCallback((item: MenuItem) => {
    setCustomizationProduct(item);
    setIsCustomizationOpen(true);
  }, []);

  // Handle add button click - check for options first
  const handleAddButtonClick = useCallback((item: MenuItem) => {
    if (!storeIsOpen) {
      toast.error('🔒 Desculpe, a loja está fechada no momento. Não é possível adicionar itens ao carrinho.', {
        duration: 4000,
      });
      return;
    }

    // Show customization dialog to check for options
    handleProductClick(item);
  }, [storeIsOpen, handleProductClick]);

  // Handle adding product with options to cart
  const handleAddWithOptions = useCallback((selectedOptions: SelectedOption[]) => {
    if (!customizationProduct) return;

    if (!storeIsOpen) {
      toast.error('🔒 Desculpe, a loja está fechada no momento. Não é possível adicionar itens ao carrinho.', {
        duration: 4000,
      });
      return;
    }

    addItem({
      ...customizationProduct,
      selectedOptions,
    });

    toast.success(`${customizationProduct.name} adicionado ao carrinho! 🛒`, {
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        border: 'none',
      }
    });

    setIsCustomizationOpen(false);
    setCustomizationProduct(null);
  }, [customizationProduct, addItem, storeIsOpen]);

  // Handle product reordering
  const handleReorder = useCallback(async (categoryId: string, startIndex: number, endIndex: number) => {
    const categoryItems = menuItems.filter(item => item.category_id === categoryId);
    const reordered = reorderItems(categoryItems, startIndex, endIndex);
    
    // Update local state optimistically
    setMenuItems(prevItems => {
      const otherItems = prevItems.filter(item => item.category_id !== categoryId);
      return [...otherItems, ...reordered].sort((a, b) => {
        if (a.category_id !== b.category_id) {
          return a.category_id.localeCompare(b.category_id);
        }
        return a.sort_order - b.sort_order;
      });
    });
    
    // Save to database
    const updates = reordered.map((item, index) => ({
      id: item.id,
      sort_order: index
    }));
    
    const success = await updateSortOrder(updates);
    if (!success) {
      // Revert on failure
      loadMenu();
    }
  }, [menuItems, reorderItems, updateSortOrder]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Erro ao fazer logout");
        return;
      }
      toast.success("Logout realizado com sucesso! 👋");
      navigate("/auth");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Erro ao fazer logout");
    }
  }, [navigate]);

  const loadMenu = async () => {
    try {
      setLoading(true);
      console.log('📋 Loading menu data...');
      
      const { data: categoriesData, error: catError } = await supabase
        .from("menu_categories")
        .select("*")
        .order("display_order");

      if (catError) throw catError;

      const { data: itemsData, error: itemsError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("category_id")
        .order("sort_order");

      if (itemsError) throw itemsError;

      console.log('✅ Menu loaded:', categoriesData?.length, 'categories,', itemsData?.length, 'items');
      setCategories(categoriesData || []);
      // Ensure sort_order exists on all items
      const itemsWithSortOrder = (itemsData || []).map(item => ({
        ...item,
        sort_order: (item as any).sort_order ?? 0
      })) as MenuItem[];
      setMenuItems(itemsWithSortOrder);
    } catch (error) {
      console.error("❌ Error loading menu:", error);
      toast.error("Erro ao carregar cardápio");
    } finally {
      setLoading(false);
    }
  };



  const goToCheckout = useCallback(() => {
    if (cartState.items.length === 0) {
      toast.error("Adicione itens ao carrinho primeiro! 🛒");
      return;
    }
    
    // Check if store is open before checkout
    if (!storeIsOpen) {
      toast.error('🔒 Desculpe, a loja está fechada no momento. Não é possível finalizar pedidos.', {
        duration: 4000,
      });
      return;
    }
    
    navigate("/order-flow");
  }, [cartState.items.length, navigate, storeIsOpen]);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center md:bg-gray-50">
        {/* Background Image - Mobile Only */}
        <div 
          className="md:hidden fixed inset-0 bg-cover bg-top bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/bck-menu.webp')`,
          }}
        />
        <div className="relative z-10 bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-2xl border border-purple-200 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-purple-900 font-bold text-lg">Carregando cardápio...</p>
              <p className="text-purple-600 text-sm mt-1">Preparando delícias para você! 🫐</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-24 bg-gradient-to-br from-purple-400 via-purple-300 to-indigo-400">
      {/* Mobile Header - Sticky (56px) */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500 shadow-lg border-b-4 border-purple-400">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between h-14">
          {/* Logo */}
          <img src={logo} alt="Colorido" className="h-10 w-auto rounded-lg shadow-md" />
          
          {/* Center: Title */}
          <div className="flex-1 text-center">
            <h1 className="text-white font-bold text-sm truncate">Cardápio</h1>
          </div>
          
          {/* Right: Cart Badge + Menu */}
          <div className="flex items-center gap-2">
            {/* Cart Badge */}
            {getTotalItems() > 0 && (
              <div className="bg-white text-purple-600 border-2 border-purple-300 shadow-lg animate-pulse-badge px-2.5 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                <span>{getTotalItems()}</span>
              </div>
            )}
            
            {/* Menu Button */}
            <button
              onClick={() => setSelectedCategory(selectedCategory ? null : categorizedItems[0]?.id)}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-all"
              aria-label="Menu"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${selectedCategory ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-all"
              aria-label="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Categories Dropdown - Mobile */}
        {selectedCategory && categorizedItems.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm border-t-2 border-purple-200 max-h-64 overflow-y-auto">
            <div className="px-4 py-2 space-y-1">
              {categorizedItems.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    handleCategoryScroll(category.id);
                    setSelectedCategory(null);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors font-medium text-gray-900 text-sm"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Header - Desktop: Logo + Categories */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-lg hidden md:block">
        {/* Desktop: Gradient header with logo, title, and categories */}
        <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500 shadow-xl border-b-4 border-purple-400">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Top Row: Logo, Title, Cart, Logout */}
            <div className="flex items-center justify-between mb-6">
              {/* Logo and Title */}
              <div className="flex items-center gap-4">
                <img 
                  src={logo} 
                  alt="Colorido Açaí" 
                  className="h-16 w-auto drop-shadow-lg"
                />
                <h1 className="text-3xl font-bold text-white drop-shadow-md">
                  Cardápio
                </h1>
              </div>
              
              {/* Right Side: Cart Badge, View Toggle, and Logout */}
              <div className="flex items-center gap-4">
                {/* Cart Badge - Desktop */}
                {getTotalItems() > 0 && (
                  <div className="bg-white text-purple-600 border-2 border-purple-300 shadow-lg animate-pulse-badge px-4 py-2 rounded-full font-bold text-base flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>{getTotalItems()}</span>
                  </div>
                )}
                
                <button
                  onClick={toggleViewMode}
                  className="p-2.5 text-white hover:text-white/80 hover:bg-white/20 rounded-full transition-all"
                  aria-label={viewMode === 'grid' ? 'Mudar para lista' : 'Mudar para grade'}
                  title={viewMode === 'grid' ? 'Mudar para lista' : 'Mudar para grade'}
                >
                  {viewMode === 'grid' ? <List className="w-6 h-6" /> : <LayoutGrid className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-white hover:text-white/80 hover:bg-white/20 rounded-full transition-all"
                  aria-label="Sair"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Store Closed Banner - Mobile Optimized */}
      {!storeIsOpen && !storeStatusLoading && (
        <div className="fixed top-14 md:top-20 left-0 right-0 p-3 z-40 animate-in slide-in-from-top duration-300 md:hidden">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl shadow-lg border-2 border-red-400">
              <div className="flex items-center justify-center gap-2">
                <Store className="h-5 w-5" />
                <div className="text-center">
                  <p className="font-bold text-sm">Loja Fechada</p>
                  <p className="text-xs text-red-100">Não estamos aceitando pedidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Store Closed Banner */}
      {!storeIsOpen && !storeStatusLoading && (
        <div className="hidden md:block fixed top-20 left-0 right-0 p-4 z-40 animate-in slide-in-from-top duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-2xl shadow-2xl border-2 border-red-400">
              <div className="flex items-center justify-center gap-3">
                <Store className="h-6 w-6" />
                <div className="text-center">
                  <p className="font-bold text-lg">Loja Fechada</p>
                  <p className="text-sm text-red-100">Não estamos aceitando pedidos no momento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Button - Mobile Optimized */}
      {cartState.items.length > 0 && storeIsOpen && (
        <div className="fixed top-14 md:top-20 left-0 right-0 p-3 z-30 animate-in slide-in-from-top duration-300 md:hidden">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={goToCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Ver Carrinho ({getTotalItems()})</span>
                </div>
                <span className="font-bold">R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Cart Button */}
      {cartState.items.length > 0 && storeIsOpen && (
        <div className="hidden md:block fixed top-20 left-0 right-0 p-4 z-30 animate-in slide-in-from-top duration-300">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={goToCheckout}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Ver Carrinho ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</span>
                </div>
                <span className="font-bold text-lg">R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Menu Content - Adjusted padding for fixed header and cart */}
      <div className={`relative z-10 max-w-2xl lg:max-w-6xl mx-auto px-3 pb-8 ${
        !storeIsOpen ? 'pt-32 md:pt-28' : 
        cartState.items.length > 0 ? 'pt-32 md:pt-28' : 'pt-20 md:pt-24'
      }`}>
        {categorizedItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-4xl mb-3">🫐</div>
            <p className="text-gray-900 font-semibold text-lg">Nenhum item disponível</p>
          </div>
        ) : (
          <>
            {/* Mobile: Scrollable List */}
            <div className="md:hidden space-y-6">
              {categorizedItems.map((category) => (
                <div key={category.id} id={`category-${category.id}`} className="space-y-4 scroll-mt-20">
                  {/* Category Header - Mobile Optimized */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-3 py-1.5 rounded-full inline-block shadow-md border-2 border-purple-300">
                    <h2 className="text-xs font-bold uppercase tracking-wider">
                      {category.name}
                    </h2>
                  </div>

                  {/* Category Items - Mobile Optimized Cards */}
                  <SortableProductList
                    items={category.items}
                    categoryId={category.id}
                    onReorder={(startIndex, endIndex) => handleReorder(category.id, startIndex, endIndex)}
                  >
                    <div className="grid grid-cols-1 gap-3">
                      {category.items.map((item) => {
                        const quantity = getItemQuantity(item.id);
                        const hasImageError = imageErrors.has(item.id);
                        
                        return (
                          <DraggableProductCard
                            key={item.id}
                            item={item}
                            isSortingMode={isSortingMode}
                          >
                            <div 
                              className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-all flex gap-3 active:scale-95"
                            >
                      {/* Image - Left Side - Larger for mobile */}
                      <div 
                        className="w-28 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 flex-shrink-0 cursor-pointer border-2 border-purple-100"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.image_url && !hasImageError ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            onError={() => handleImageError(item.id)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-purple-50">
                            <IceCream className="w-12 h-12 text-purple-300" />
                          </div>
                        )}
                      </div>

                      {/* Right Column - Info and Actions */}
                      <div className="flex-1 flex flex-col min-w-0 justify-between">
                        {/* Title and Description */}
                        <div 
                          className="cursor-pointer mb-1"
                          onClick={() => setSelectedItem(item)}
                        >
                          <h3 className="font-bold text-gray-900 text-sm mb-0.5 line-clamp-2">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-600 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Price and Button Row */}
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-purple-600 font-bold text-base">
                            R$ {item.price.toFixed(2)}
                          </p>
                          
                          {/* Add/Quantity Controls - Touch Friendly */}
                          <div className="flex-shrink-0">
                            {quantity > 0 ? (
                              <div className="flex items-center gap-1.5 bg-purple-100 rounded-lg p-1.5">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="w-9 h-9 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                  aria-label="Remover um"
                                  disabled={isSortingMode || !storeIsOpen}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-purple-900 text-base min-w-[28px] text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="w-9 h-9 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                  aria-label="Adicionar mais"
                                  disabled={isSortingMode || !storeIsOpen}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleAddButtonClick(item)}
                                className={`bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 ${(isSortingMode || !storeIsOpen) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSortingMode || !storeIsOpen}
                              >
                                {!storeIsOpen ? 'Fechado' : 'Adicionar'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                      </DraggableProductCard>
                    );
                  })}
                    </div>
                  </SortableProductList>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet: Tabs */}
            <div className="hidden md:block">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg mb-6 flex-wrap h-auto gap-2">
                  {categorizedItems.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-6 py-3 rounded-xl font-semibold text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                  
                  {/* Sorting Toggle - Desktop Tabs */}
                  {isAdmin && !adminLoading && (
                    <div className="ml-auto">
                      <SortingToggle
                        isSortingMode={isSortingMode}
                        onToggle={toggleSortingMode}
                        disabled={isSaving}
                      />
                    </div>
                  )}
                </TabsList>

                {categorizedItems.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <SortableProductList
                      items={category.items}
                      categoryId={category.id}
                      onReorder={(startIndex, endIndex) => handleReorder(category.id, startIndex, endIndex)}
                    >
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.items.map((item) => {
                          const quantity = getItemQuantity(item.id);
                          const hasImageError = imageErrors.has(item.id);
                          
                          return (
                            <DraggableProductCard
                              key={item.id}
                              item={item}
                              isSortingMode={isSortingMode}
                            >
                              <div 
                                className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all ${
                                  viewMode === 'grid' ? 'flex flex-col h-full' : 'flex gap-4'
                                }`}
                              >
                      {/* Image */}
                      <div 
                        className={`rounded-xl overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0 ${
                          viewMode === 'grid' ? 'w-full aspect-square mb-3 relative group' : 'w-24 h-24'
                        }`}
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.image_url && !hasImageError ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(item.id)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-purple-50">
                            <ShoppingCart className={viewMode === 'grid' ? 'w-12 h-12 text-purple-400' : 'w-10 h-10 text-purple-400'} />
                          </div>
                        )}
                        {/* Hover Description Overlay - Grid View Only */}
                        {viewMode === 'grid' && item.description && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-sm line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Info and Actions */}
                      <div className={`${viewMode === 'grid' ? 'flex-1 flex flex-col' : 'flex-1 flex flex-col min-w-0'}`}>
                        {/* Title and Description */}
                        <div 
                          className={`cursor-pointer ${viewMode === 'grid' ? 'mb-3' : 'mb-2'}`}
                          onClick={() => setSelectedItem(item)}
                        >
                          <h3 className={`font-bold text-gray-900 ${viewMode === 'grid' ? 'text-lg mb-1 line-clamp-2' : 'text-base mb-1'}`}>
                            {item.name}
                          </h3>
                          {viewMode === 'list' && item.description && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Price and Button Row */}
                        <div className={`flex items-center justify-between gap-3 ${viewMode === 'grid' ? 'mt-auto' : 'mt-auto'}`}>
                          <p className={`text-purple-600 font-bold ${viewMode === 'grid' ? 'text-xl' : 'text-lg'}`}>
                            R$ {item.price.toFixed(2)}
                          </p>
                          
                          {/* Add/Quantity Controls */}
                          <div className="flex-shrink-0">
                            {quantity > 0 ? (
                              <div className={viewMode === 'grid' ? 'space-y-2' : 'flex flex-col gap-2'}>
                                <div className={`flex items-center gap-2 bg-purple-50 rounded-xl p-2 ${
                                  viewMode === 'grid' ? 'justify-center gap-3' : ''
                                }`}>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className={`rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                      viewMode === 'grid' ? 'w-10 h-10' : 'w-8 h-8'
                                    }`}
                                    aria-label="Remover um"
                                    disabled={isSortingMode || !storeIsOpen}
                                  >
                                    <Minus className={viewMode === 'grid' ? 'w-5 h-5' : 'w-4 h-4'} />
                                  </button>
                                  <span className={`font-bold text-purple-900 text-center ${
                                    viewMode === 'grid' ? 'text-xl min-w-[32px]' : 'text-lg min-w-[24px]'
                                  }`}>
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => handleAddToCart(item)}
                                    className={`rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                      viewMode === 'grid' ? 'w-10 h-10' : 'w-8 h-8'
                                    }`}
                                    aria-label="Adicionar mais"
                                    disabled={isSortingMode || !storeIsOpen}
                                  >
                                    <Plus className={viewMode === 'grid' ? 'w-5 h-5' : 'w-4 h-4'} />
                                  </button>
                                </div>
                                {viewMode === 'grid' && (
                                  <button
                                    onClick={() => {
                                      for (let i = 0; i < quantity; i++) {
                                        removeItem(item.id);
                                      }
                                      toast.success(`${item.name} removido do carrinho`);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSortingMode || !storeIsOpen}
                                  >
                                    Remover Todos
                                  </button>
                                )}
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleAddToCart(item)}
                                className={`bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all ${
                                  viewMode === 'grid' ? 'w-full py-3 text-base' : 'px-6 py-3 text-base'
                                } ${(isSortingMode || !storeIsOpen) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSortingMode || !storeIsOpen}
                              >
                                {!storeIsOpen ? 'Fechado' : 'Adicionar'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                            </DraggableProductCard>
                          );
                        })}
                      </div>
                    </SortableProductList>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </>
        )}
      </div>



      {/* Enhanced Product Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl border-2 border-purple-200 rounded-3xl shadow-2xl">
          {selectedItem && (
            <>
              <DialogHeader className="text-center pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedItem.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Enhanced Product Image */}
                {selectedItem.image_url && !imageErrors.has(selectedItem.id) && (
                  <div className="w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl border-2 border-purple-100">
                    <img
                      src={selectedItem.image_url}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(selectedItem.id)}
                    />
                  </div>
                )}

                {/* Enhanced Description */}
                {selectedItem.description && (
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Descrição
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                )}



                {/* Enhanced Price and Actions */}
                <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border-2 border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-emerald-600">
                      R$ {selectedItem.price.toFixed(2)}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">R$ {(selectedItem.price * 1.2).toFixed(2)}</div>
                      <div className="text-xs text-green-600 font-medium">Economize 20%</div>
                    </div>
                  </div>
                  
                  {/* Enhanced Add to Cart Button */}
                  {getItemQuantity(selectedItem.id) > 0 ? (
                    <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                      <button
                        onClick={() => removeItem(selectedItem.id)}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="text-center px-4">
                        <span className="font-bold text-purple-900 text-2xl block">
                          {getItemQuantity(selectedItem.id)}
                        </span>
                        <span className="text-xs text-purple-600 font-medium">
                          no carrinho
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(selectedItem)}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        handleAddToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-500"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Customization Dialog */}
      {customizationProduct && (
        <ProductCustomizationDialog
          open={isCustomizationOpen}
          onOpenChange={setIsCustomizationOpen}
          product={customizationProduct}
          onAddToCart={handleAddWithOptions}
        />
      )}
    </div>
  );
};

export default Menu;
