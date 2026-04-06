import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useProductOptions } from '@/hooks/useProductOptions';
import { ProductOptionGroupWithOptions, SelectedOption } from '@/types/product-options';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
}

interface ProductCustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: MenuItem;
  onAddToCart: (selectedOptions: SelectedOption[]) => void;
  isLoading?: boolean;
}

export const ProductCustomizationDialog = ({
  open,
  onOpenChange,
  product,
  onAddToCart,
  isLoading = false,
}: ProductCustomizationDialogProps) => {
  const { optionGroups, loading: optionsLoading } = useProductOptions(open ? product.id : null);
  const [selectedOptions, setSelectedOptions] = useState<Map<string, SelectedOption[]>>(new Map());
  const [errors, setErrors] = useState<string[]>([]);

  // Reset selections when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedOptions(new Map());
      setErrors([]);
    }
  }, [open]);

  const handleOptionSelect = (groupId: string, option: any, quantity: number) => {
    const groupSelections = selectedOptions.get(groupId) || [];
    const existingIndex = groupSelections.findIndex(s => s.option.id === option.id);

    if (quantity === 0) {
      // Remove option
      if (existingIndex >= 0) {
        groupSelections.splice(existingIndex, 1);
      }
    } else {
      // Add or update option
      if (existingIndex >= 0) {
        groupSelections[existingIndex].quantity = quantity;
      } else {
        groupSelections.push({ option, quantity });
      }
    }

    const newSelections = new Map(selectedOptions);
    if (groupSelections.length === 0) {
      newSelections.delete(groupId);
    } else {
      newSelections.set(groupId, groupSelections);
    }
    setSelectedOptions(newSelections);
  };

  const validateSelections = (): boolean => {
    const newErrors: string[] = [];

    for (const group of optionGroups) {
      const selections = selectedOptions.get(group.id) || [];
      const totalQuantity = selections.reduce((sum, s) => sum + s.quantity, 0);

      // Check if required
      if (group.is_required && totalQuantity === 0) {
        newErrors.push(`${group.name} é obrigatório`);
      }

      // Check min selections
      if (totalQuantity < group.min_selections) {
        newErrors.push(`${group.name} requer no mínimo ${group.min_selections} seleção(ões)`);
      }

      // Check max selections
      if (group.max_selections && totalQuantity > group.max_selections) {
        newErrors.push(`${group.name} permite no máximo ${group.max_selections} seleção(ões)`);
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const calculateTotalPrice = (): number => {
    let total = product.price;
    selectedOptions.forEach((selections) => {
      selections.forEach((selection) => {
        total += selection.option.price_modifier * selection.quantity;
      });
    });
    return total;
  };

  const handleAddToCart = () => {
    if (!validateSelections()) {
      return;
    }

    const allSelections: SelectedOption[] = [];
    selectedOptions.forEach((selections) => {
      allSelections.push(...selections);
    });

    onAddToCart(allSelections);
    onOpenChange(false);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Personalizar {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Info */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{product.name}</p>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                )}
                <p className="text-lg font-bold text-purple-600 mt-2">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Validation Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx} className="text-sm text-red-700">
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Options Loading */}
          {optionsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-2xl mb-2">⏳</div>
              <p className="text-gray-600">Carregando opções...</p>
            </div>
          ) : optionGroups.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Este produto não possui opções de personalização</p>
            </div>
          ) : (
            /* Option Groups */
            <div className="space-y-6">
              {optionGroups.map((group) => {
                const groupSelections = selectedOptions.get(group.id) || [];
                const totalQuantity = groupSelections.reduce((sum, s) => sum + s.quantity, 0);

                return (
                  <div key={group.id} className="space-y-3">
                    {/* Group Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        {group.description && (
                          <p className="text-sm text-gray-600">{group.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {group.is_required ? '✓ Obrigatório' : 'Opcional'} • 
                          {group.max_selections 
                            ? ` Máx: ${group.max_selections}` 
                            : ' Sem limite'}
                        </p>
                      </div>
                      {totalQuantity > 0 && (
                        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {totalQuantity} selecionado(s)
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {group.options.map((option) => {
                        const selection = groupSelections.find(s => s.option.id === option.id);
                        const quantity = selection?.quantity || 0;

                        return (
                          <Card
                            key={option.id}
                            className={`p-3 cursor-pointer transition-all ${
                              quantity > 0
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900">{option.name}</p>
                                {option.description && (
                                  <p className="text-xs text-gray-600 mt-0.5">{option.description}</p>
                                )}
                                {option.price_modifier !== 0 && (
                                  <p className="text-sm font-semibold text-green-600 mt-1">
                                    {option.price_modifier > 0 ? '+' : ''}R$ {option.price_modifier.toFixed(2)}
                                  </p>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              {quantity > 0 ? (
                                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-purple-300">
                                  <button
                                    onClick={() => handleOptionSelect(group.id, option, quantity - 1)}
                                    className="w-7 h-7 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                                    aria-label="Remover"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-bold text-gray-900 min-w-[1.5rem] text-center">
                                    {quantity}
                                  </span>
                                  {!group.max_selections || quantity < group.max_selections ? (
                                    <button
                                      onClick={() => handleOptionSelect(group.id, option, quantity + 1)}
                                      className="w-7 h-7 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                                      aria-label="Adicionar"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  ) : (
                                    <div className="w-7 h-7" />
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleOptionSelect(group.id, option, 1)}
                                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                                  disabled={!option.is_available}
                                >
                                  Adicionar
                                </button>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Price Summary */}
          {optionGroups.length > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Preço Total:</span>
                <span className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</span>
              </div>
              {totalPrice !== product.price && (
                <p className="text-sm text-purple-100 mt-2">
                  Preço base: R$ {product.price.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || optionsLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || optionsLoading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
