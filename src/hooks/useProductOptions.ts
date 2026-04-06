import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProductOptionGroup, ProductOption, ProductOptionGroupWithOptions } from '@/types/product-options';
import { toast } from 'sonner';

export function useProductOptions(menuItemId: string | null) {
  const [optionGroups, setOptionGroups] = useState<ProductOptionGroupWithOptions[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menuItemId) {
      loadOptions();
    } else {
      setOptionGroups([]);
    }
  }, [menuItemId]);

  const loadOptions = async () => {
    if (!menuItemId) return;

    setLoading(true);
    try {
      // Load option groups
      const { data: groups, error: groupsError } = await supabase
        .from('product_option_groups')
        .select('*')
        .eq('menu_item_id', menuItemId)
        .order('display_order');

      if (groupsError) throw groupsError;

      if (!groups || groups.length === 0) {
        setOptionGroups([]);
        return;
      }

      // Load options for all groups
      const groupIds = groups.map(g => g.id);
      const { data: options, error: optionsError } = await supabase
        .from('product_options')
        .select('*')
        .in('option_group_id', groupIds)
        .eq('is_available', true)
        .order('display_order');

      if (optionsError) throw optionsError;

      // Combine groups with their options
      const groupsWithOptions: ProductOptionGroupWithOptions[] = groups.map(group => ({
        ...group,
        options: (options || []).filter(opt => opt.option_group_id === group.id)
      }));

      setOptionGroups(groupsWithOptions);
    } catch (error) {
      console.error('Error loading product options:', error);
      toast.error('Erro ao carregar opções do produto');
      setOptionGroups([]);
    } finally {
      setLoading(false);
    }
  };

  return { optionGroups, loading, reload: loadOptions };
}

// Hook for admin to manage options
export function useProductOptionsAdmin(menuItemId: string | null) {
  const [optionGroups, setOptionGroups] = useState<ProductOptionGroupWithOptions[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (menuItemId) {
      loadOptions();
    } else {
      setOptionGroups([]);
    }
  }, [menuItemId]);

  const loadOptions = async () => {
    if (!menuItemId) return;

    setLoading(true);
    try {
      const { data: groups, error: groupsError } = await supabase
        .from('product_option_groups')
        .select('*')
        .eq('menu_item_id', menuItemId)
        .order('display_order');

      if (groupsError) throw groupsError;

      if (!groups || groups.length === 0) {
        setOptionGroups([]);
        return;
      }

      const groupIds = groups.map(g => g.id);
      const { data: options, error: optionsError } = await supabase
        .from('product_options')
        .select('*')
        .in('option_group_id', groupIds)
        .order('display_order');

      if (optionsError) throw optionsError;

      const groupsWithOptions: ProductOptionGroupWithOptions[] = groups.map(group => ({
        ...group,
        options: (options || []).filter(opt => opt.option_group_id === group.id)
      }));

      setOptionGroups(groupsWithOptions);
    } catch (error) {
      console.error('Error loading product options:', error);
      toast.error('Erro ao carregar opções');
      setOptionGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const createOptionGroup = async (group: Omit<ProductOptionGroup, 'id' | 'created_at' | 'updated_at'>) => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('product_option_groups')
        .insert(group)
        .select()
        .single();

      if (error) throw error;

      toast.success('Grupo de opções criado!');
      await loadOptions();
      return data;
    } catch (error) {
      console.error('Error creating option group:', error);
      toast.error('Erro ao criar grupo de opções');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateOptionGroup = async (id: string, updates: Partial<ProductOptionGroup>) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('product_option_groups')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Grupo atualizado!');
      await loadOptions();
    } catch (error) {
      console.error('Error updating option group:', error);
      toast.error('Erro ao atualizar grupo');
    } finally {
      setSaving(false);
    }
  };

  const deleteOptionGroup = async (id: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('product_option_groups')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Grupo removido!');
      await loadOptions();
    } catch (error) {
      console.error('Error deleting option group:', error);
      toast.error('Erro ao remover grupo');
    } finally {
      setSaving(false);
    }
  };

  const createOption = async (option: Omit<ProductOption, 'id' | 'created_at' | 'updated_at'>) => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('product_options')
        .insert(option)
        .select()
        .single();

      if (error) throw error;

      toast.success('Opção criada!');
      await loadOptions();
      return data;
    } catch (error) {
      console.error('Error creating option:', error);
      toast.error('Erro ao criar opção');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateOption = async (id: string, updates: Partial<ProductOption>) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('product_options')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Opção atualizada!');
      await loadOptions();
    } catch (error) {
      console.error('Error updating option:', error);
      toast.error('Erro ao atualizar opção');
    } finally {
      setSaving(false);
    }
  };

  const deleteOption = async (id: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('product_options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Opção removida!');
      await loadOptions();
    } catch (error) {
      console.error('Error deleting option:', error);
      toast.error('Erro ao remover opção');
    } finally {
      setSaving(false);
    }
  };

  return {
    optionGroups,
    loading,
    saving,
    reload: loadOptions,
    createOptionGroup,
    updateOptionGroup,
    deleteOptionGroup,
    createOption,
    updateOption,
    deleteOption,
  };
}
