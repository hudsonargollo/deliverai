import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface StoreSettings {
  id: string;
  is_open: boolean;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  menu_background_color: string;
  menu_text_color: string;
  header_gradient_start: string;
  header_gradient_end: string;
  updated_at: string;
  updated_by: string | null;
}

export const useStoreSettings = () => {
  const queryClient = useQueryClient();

  // Fetch store settings
  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['store-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data as StoreSettings;
    },
  });

  // Update store settings
  const updateSettings = useMutation({
    mutationFn: async (updates: Partial<StoreSettings>) => {
      const { data, error } = await supabase
        .from('store_settings')
        .update(updates)
        .eq('id', settings?.id)
        .select()
        .single();

      if (error) throw error;
      return data as StoreSettings;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['store-settings'], data);
      toast.success('Configurações atualizadas com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Erro ao atualizar configurações');
    },
  });

  // Upload logo
  const uploadLogo = useMutation({
    mutationFn: async (file: File) => {
      const fileName = `logo-${Date.now()}.${file.name.split('.').pop()}`;
      
      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('store-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('store-assets')
        .getPublicUrl(fileName);

      // Update settings with logo URL
      const { data: updatedSettings, error: updateError } = await supabase
        .from('store_settings')
        .update({ logo_url: publicUrl })
        .eq('id', settings?.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return updatedSettings as StoreSettings;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['store-settings'], data);
      toast.success('Logo atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error uploading logo:', error);
      toast.error('Erro ao fazer upload do logo');
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateSettings.mutate,
    updateSettingsAsync: updateSettings.mutateAsync,
    isUpdating: updateSettings.isPending,
    uploadLogo: uploadLogo.mutate,
    uploadLogoAsync: uploadLogo.mutateAsync,
    isUploading: uploadLogo.isPending,
  };
};
