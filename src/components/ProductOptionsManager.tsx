import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useProductOptionsAdmin } from '@/hooks/useProductOptions';
import { ProductOptionGroup, ProductOption } from '@/types/product-options';

interface ProductOptionsManagerProps {
  menuItemId: string;
  menuItemName: string;
}

export const ProductOptionsManager = ({ menuItemId, menuItemName }: ProductOptionsManagerProps) => {
  const {
    optionGroups,
    loading,
    saving,
    createOptionGroup,
    updateOptionGroup,
    deleteOptionGroup,
    createOption,
    updateOption,
    deleteOption,
  } = useProductOptionsAdmin(menuItemId);

  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ProductOptionGroup | null>(null);
  const [editingOption, setEditingOption] = useState<ProductOption | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Group form state
  const [groupForm, setGroupForm] = useState({
    name: '',
    description: '',
    is_required: false,
    min_selections: 0,
    max_selections: 1,
    display_order: 0,
  });

  // Option form state
  const [optionForm, setOptionForm] = useState({
    name: '',
    description: '',
    price_modifier: 0,
    is_available: true,
    display_order: 0,
  });

  const handleCreateGroup = () => {
    setEditingGroup(null);
    setGroupForm({
      name: '',
      description: '',
      is_required: false,
      min_selections: 0,
      max_selections: 1,
      display_order: optionGroups.length,
    });
    setIsGroupDialogOpen(true);
  };

  const handleEditGroup = (group: ProductOptionGroup) => {
    setEditingGroup(group);
    setGroupForm({
      name: group.name,
      description: group.description || '',
      is_required: group.is_required,
      min_selections: group.min_selections,
      max_selections: group.max_selections || 1,
      display_order: group.display_order,
    });
    setIsGroupDialogOpen(true);
  };

  const handleSaveGroup = async () => {
    if (!groupForm.name.trim()) return;

    const groupData = {
      menu_item_id: menuItemId,
      name: groupForm.name.trim(),
      description: groupForm.description.trim() || null,
      is_required: groupForm.is_required,
      min_selections: groupForm.min_selections,
      max_selections: groupForm.max_selections,
      display_order: groupForm.display_order,
    };

    if (editingGroup) {
      await updateOptionGroup(editingGroup.id, groupData);
    } else {
      await createOptionGroup(groupData);
    }

    setIsGroupDialogOpen(false);
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (confirm('Tem certeza que deseja excluir este grupo de opções? Todas as opções dentro dele também serão excluídas.')) {
      await deleteOptionGroup(groupId);
    }
  };

  const handleCreateOption = (groupId: string) => {
    setEditingOption(null);
    setSelectedGroupId(groupId);
    const group = optionGroups.find(g => g.id === groupId);
    setOptionForm({
      name: '',
      description: '',
      price_modifier: 0,
      is_available: true,
      display_order: group?.options.length || 0,
    });
    setIsOptionDialogOpen(true);
  };

  const handleEditOption = (option: ProductOption, groupId: string) => {
    setEditingOption(option);
    setSelectedGroupId(groupId);
    setOptionForm({
      name: option.name,
      description: option.description || '',
      price_modifier: option.price_modifier,
      is_available: option.is_available,
      display_order: option.display_order,
    });
    setIsOptionDialogOpen(true);
  };

  const handleSaveOption = async () => {
    if (!optionForm.name.trim() || !selectedGroupId) return;

    const optionData = {
      option_group_id: selectedGroupId,
      name: optionForm.name.trim(),
      description: optionForm.description.trim() || null,
      price_modifier: optionForm.price_modifier,
      is_available: optionForm.is_available,
      display_order: optionForm.display_order,
    };

    if (editingOption) {
      await updateOption(editingOption.id, optionData);
    } else {
      await createOption(optionData);
    }

    setIsOptionDialogOpen(false);
  };

  const handleDeleteOption = async (optionId: string) => {
    if (confirm('Tem certeza que deseja excluir esta opção?')) {
      await deleteOption(optionId);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Carregando opções...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Opções e Complementos</h3>
          <p className="text-sm text-gray-600">Configure as opções de personalização para {menuItemName}</p>
        </div>
        <Button
          onClick={handleCreateGroup}
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Grupo
        </Button>
      </div>

      {optionGroups.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto mb-2" />
          </div>
          <p className="text-gray-600 mb-4">Nenhum grupo de opções configurado</p>
          <Button onClick={handleCreateGroup} variant="outline">
            Criar Primeiro Grupo
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {optionGroups.map((group) => (
            <Card key={group.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold text-gray-900">{group.name}</h4>
                    {group.is_required && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Obrigatório
                      </span>
                    )}
                  </div>
                  {group.description && (
                    <p className="text-sm text-gray-600 mt-1 ml-6">{group.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Seleções: {group.min_selections} - {group.max_selections || '∞'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditGroup(group)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteGroup(group.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="ml-6 space-y-2">
                {group.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{option.name}</span>
                        {option.price_modifier !== 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            {option.price_modifier > 0 ? '+' : ''}R$ {option.price_modifier.toFixed(2)}
                          </span>
                        )}
                        {!option.is_available && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                            Indisponível
                          </span>
                        )}
                      </div>
                      {option.description && (
                        <p className="text-xs text-gray-600 mt-0.5">{option.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditOption(option, group.id)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteOption(option.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCreateOption(group.id)}
                  className="w-full"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Adicionar Opção
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Group Dialog */}
      <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGroup ? 'Editar Grupo de Opções' : 'Novo Grupo de Opções'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="group-name">Nome do Grupo *</Label>
              <Input
                id="group-name"
                value={groupForm.name}
                onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                placeholder="Ex: Tamanho, Complementos"
              />
            </div>
            <div>
              <Label htmlFor="group-description">Descrição</Label>
              <Textarea
                id="group-description"
                value={groupForm.description}
                onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                placeholder="Descrição opcional"
                rows={2}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="group-required"
                checked={groupForm.is_required}
                onChange={(e) => setGroupForm({ ...groupForm, is_required: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="group-required" className="cursor-pointer">
                Seleção obrigatória
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-selections">Mínimo de Seleções</Label>
                <Input
                  id="min-selections"
                  type="number"
                  min="0"
                  value={groupForm.min_selections}
                  onChange={(e) => setGroupForm({ ...groupForm, min_selections: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="max-selections">Máximo de Seleções</Label>
                <Input
                  id="max-selections"
                  type="number"
                  min="1"
                  value={groupForm.max_selections}
                  onChange={(e) => setGroupForm({ ...groupForm, max_selections: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGroupDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveGroup} disabled={saving || !groupForm.name.trim()}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Option Dialog */}
      <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOption ? 'Editar Opção' : 'Nova Opção'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="option-name">Nome da Opção *</Label>
              <Input
                id="option-name"
                value={optionForm.name}
                onChange={(e) => setOptionForm({ ...optionForm, name: e.target.value })}
                placeholder="Ex: 300ml, Granola, Leite Condensado"
              />
            </div>
            <div>
              <Label htmlFor="option-description">Descrição</Label>
              <Textarea
                id="option-description"
                value={optionForm.description}
                onChange={(e) => setOptionForm({ ...optionForm, description: e.target.value })}
                placeholder="Descrição opcional"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="price-modifier">Modificador de Preço (R$)</Label>
              <Input
                id="price-modifier"
                type="number"
                step="0.01"
                value={optionForm.price_modifier}
                onChange={(e) => setOptionForm({ ...optionForm, price_modifier: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
              <p className="text-xs text-gray-500 mt-1">
                Valor a ser adicionado ou subtraído do preço base (use valores negativos para descontos)
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="option-available"
                checked={optionForm.is_available}
                onChange={(e) => setOptionForm({ ...optionForm, is_available: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="option-available" className="cursor-pointer">
                Opção disponível
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOptionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveOption} disabled={saving || !optionForm.name.trim()}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
