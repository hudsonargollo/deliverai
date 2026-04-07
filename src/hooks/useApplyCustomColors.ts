import { useEffect } from 'react';
import { useStoreSettings } from './useStoreSettings';

/**
 * Hook to apply custom color palette to the entire application
 * Updates CSS custom properties dynamically based on store settings
 */
export const useApplyCustomColors = () => {
  const { settings } = useStoreSettings();

  useEffect(() => {
    if (!settings) return;

    // Apply custom colors to CSS variables
    const root = document.documentElement;

    // Primary color
    if (settings.primary_color) {
      root.style.setProperty('--primary', settings.primary_color);
    }

    // Secondary color
    if (settings.secondary_color) {
      root.style.setProperty('--secondary', settings.secondary_color);
    }

    // Accent color
    if (settings.accent_color) {
      root.style.setProperty('--accent', settings.accent_color);
    }

    // Menu background color
    if (settings.menu_background_color) {
      root.style.setProperty('--menu-background', settings.menu_background_color);
    }

    // Menu text color
    if (settings.menu_text_color) {
      root.style.setProperty('--menu-text', settings.menu_text_color);
    }

    // Header gradient colors (stored separately for gradient use)
    if (settings.header_gradient_start) {
      root.style.setProperty('--header-gradient-start', settings.header_gradient_start);
    }

    if (settings.header_gradient_end) {
      root.style.setProperty('--header-gradient-end', settings.header_gradient_end);
    }

    console.log('Custom colors applied:', {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
      accent: settings.accent_color,
      menuBg: settings.menu_background_color,
      menuText: settings.menu_text_color,
    });
  }, [settings]);
};
