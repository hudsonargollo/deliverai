import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Plus, Trash2, Copy, Check } from 'lucide-react';
import { useStoreSettings, type StoreSettings } from '@/hooks/useStoreSettings';
import { toast } from 'sonner';
import logo from '@/assets/coloridoacai.jpg';

// Predefined color palettes
const COLOR_PALETTES = [
  {
    name: 'Ocean',
    description: 'Azul e turquesa refrescante',
    primary: '210 100% 50%',
    secondary: '180 100% 50%',
    accent: '210 100% 50%',
    menuBg: '210 50% 95%',
    menuText: '210 50% 20%',
    headerStart: '210 100% 50%',
    headerEnd: '180 100% 50%',
  },
  {
    name: 'Sunset',
    description: 'Laranja e rosa quente',
    primary: '30 100% 50%',
    secondary: '0 100% 50%',
    accent: '30 100% 50%',
    menuBg: '30 100% 95%',
    menuText: '30 50% 20%',
    headerStart: '30 100% 50%',
    headerEnd: '0 100% 50%',
  },
  {
    name: 'Acai',
    description: 'Roxo e magenta vibrante',
    primary: '280 100% 50%',
    secondary: '320 100% 50%',
    accent: '280 100% 50%',
    menuBg: '280 50% 95%',
    menuText: '280 50% 20%',
    headerStart: '280 100% 50%',
    headerEnd: '320 100% 50%',
  },
  {
    name: 'Forest',
    description: 'Verde e esmeralda natural',
    primary: '120 100% 40%',
    secondary: '160 100% 40%',
    accent: '120 100% 40%',
    menuBg: '120 50% 95%',
    menuText: '120 50% 20%',
    headerStart: '120 100% 40%',
    headerEnd: '160 100% 40%',
  },
  {
    name: 'Berry',
    description: 'Framboesa e morango',
    primary: '340 100% 50%',
    secondary: '0 100% 60%',
    accent: '340 100% 50%',
    menuBg: '340 100% 95%',
    menuText: '340 50% 20%',
    headerStart: '340 100% 50%',
    headerEnd: '0 100% 60%',
  },
];

export const Settings = () => {
  const { settings, isLoading, uploadLogo, isUploading, updateSettings, isUpdating } = useStoreSettings();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState({
    primary: settings?.primary_color || '258 90% 66%',
    secondary: settings?.secondary_color || '334 100% 71%',
    accent: settings?.accent_color || '258 90% 66%',
    menuBg: settings?.menu_background_color || '48 100% 98%',
    menuText: settings?.menu_text_color || '215 28% 17%',
    headerStart: settings?.header_gradient_start || '258 90% 66%',
    headerEnd: settings?.header_gradient_end || '334 100% 71%',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Logo deve ter menos de 5MB');
        return;
      }
      uploadLogo(file);
    }
  };

  const applyPalette = (palette: typeof COLOR_PALETTES[0]) => {
    const newColors = {
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      menuBg: palette.menuBg,
      menuText: palette.menuText,
      headerStart: palette.headerStart,
      headerEnd: palette.headerEnd,
    };
    setCustomColors(newColors);
    updateSettings(newColors as any);
  };

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }));
  };

  const saveCustomColors = () => {
    updateSettings({
      primary_color: customColors.primary,
      secondary_color: customColors.secondary,
      accent_color: customColors.accent,
      menu_background_color: customColors.menuBg,
      menu_text_color: customColors.menuText,
      header_gradient_start: customColors.headerStart,
      header_gradient_end: customColors.headerEnd,
    } as any);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l / 100 - c / 2;
    let r = 0, g = 0, b = 0;
    
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  if (isLoading) {
    return <div className="p-8">Carregando configurações...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Configurações da Loja</h1>

      {/* Logo Upload Section */}
      <Card className="p-8 mb-8 border-2 border-purple-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Logo da Loja</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Logo */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-4">Logo Atual</p>
            <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-48">
              <img 
                src={settings?.logo_url || logo} 
                alt="Store Logo" 
                className="max-h-40 max-w-full object-contain"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-4">Fazer Upload de Novo Logo</p>
            <label className="border-2 border-dashed border-purple-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 transition-colors flex flex-col items-center justify-center min-h-48 bg-purple-50">
              <Upload className="w-12 h-12 text-purple-600 mb-3" />
              <p className="text-sm font-semibold text-gray-700 text-center">
                Clique para fazer upload ou arraste uma imagem
              </p>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF até 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            {isUploading && <p className="text-sm text-purple-600 mt-2">Enviando...</p>}
          </div>
        </div>
      </Card>

      {/* Color Palettes Section */}
      <Card className="p-8 mb-8 border-2 border-pink-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Paletas de Cores Predefinidas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLOR_PALETTES.map((palette) => (
            <div
              key={palette.name}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-400 transition-colors cursor-pointer bg-white"
              onClick={() => applyPalette(palette)}
            >
              <h3 className="font-bold text-gray-900 mb-1">{palette.name}</h3>
              <p className="text-xs text-gray-700 mb-3 font-medium">{palette.description}</p>
              
              <div className="flex gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: hslToHex(palette.primary) }}
                  title="Primary"
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: hslToHex(palette.secondary) }}
                  title="Secondary"
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: hslToHex(palette.accent) }}
                  title="Accent"
                />
              </div>
              
              <Button
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isUpdating}
              >
                Aplicar
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Color Picker Section */}
      <Card className="p-8 border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Cores Personalizadas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Cor Primária</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.primary) }}
              />
              <input
                type="text"
                value={customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.primary, 'primary')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'primary' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Cor Secundária</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.secondary) }}
              />
              <input
                type="text"
                value={customColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.secondary, 'secondary')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'secondary' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Cor de Destaque</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.accent) }}
              />
              <input
                type="text"
                value={customColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.accent, 'accent')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'accent' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Menu Background */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Fundo do Menu</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.menuBg) }}
              />
              <input
                type="text"
                value={customColors.menuBg}
                onChange={(e) => handleColorChange('menuBg', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.menuBg, 'menuBg')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'menuBg' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Menu Text */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Texto do Menu</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.menuText) }}
              />
              <input
                type="text"
                value={customColors.menuText}
                onChange={(e) => handleColorChange('menuText', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.menuText, 'menuText')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'menuText' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Header Gradient Start */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Cabeçalho (Início)</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.headerStart) }}
              />
              <input
                type="text"
                value={customColors.headerStart}
                onChange={(e) => handleColorChange('headerStart', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.headerStart, 'headerStart')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'headerStart' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Header Gradient End */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Cabeçalho (Fim)</label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: hslToHex(customColors.headerEnd) }}
              />
              <input
                type="text"
                value={customColors.headerEnd}
                onChange={(e) => handleColorChange('headerEnd', e.target.value)}
                placeholder="h s% l%"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={() => copyToClipboard(customColors.headerEnd, 'headerEnd')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedColor === 'headerEnd' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={saveCustomColors}
            disabled={isUpdating}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isUpdating ? 'Salvando...' : 'Salvar Cores Personalizadas'}
          </Button>
          <Button
            onClick={() => setCustomColors({
              primary: settings?.primary_color || '258 90% 66%',
              secondary: settings?.secondary_color || '334 100% 71%',
              accent: settings?.accent_color || '258 90% 66%',
              menuBg: settings?.menu_background_color || '48 100% 98%',
              menuText: settings?.menu_text_color || '215 28% 17%',
              headerStart: settings?.header_gradient_start || '258 90% 66%',
              headerEnd: settings?.header_gradient_end || '334 100% 71%',
            })}
            variant="outline"
          >
            Cancelar
          </Button>
        </div>
      </Card>

      {/* Color Format Help */}
      <Card className="p-6 mt-8 bg-blue-50 border-2 border-blue-200">
        <h3 className="font-bold text-gray-900 mb-2">Formato de Cores HSL</h3>
        <p className="text-sm text-gray-700 mb-3">
          Use o formato HSL (Hue, Saturation, Lightness) para definir cores personalizadas.
        </p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Hue (H):</strong> 0-360 (ângulo na roda de cores)</li>
          <li><strong>Saturation (S):</strong> 0-100% (intensidade da cor)</li>
          <li><strong>Lightness (L):</strong> 0-100% (claridade da cor)</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3">Exemplo: <code className="bg-white px-2 py-1 rounded">258 90% 66%</code></p>
      </Card>
    </div>
  );
};

export default Settings;
