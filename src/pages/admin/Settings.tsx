import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Copy, Check, RotateCcw } from 'lucide-react';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import { toast } from 'sonner';
import { AdminLayout } from '@/layouts/AdminLayout';
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

// Color swatches for quick selection
const COLOR_SWATCHES = [
  '0 100% 50%',    // Red
  '30 100% 50%',   // Orange
  '60 100% 50%',   // Yellow
  '120 100% 50%',  // Green
  '180 100% 50%',  // Cyan
  '210 100% 50%',  // Blue
  '280 100% 50%',  // Purple
  '320 100% 50%',  // Magenta
  '0 0% 0%',       // Black
  '0 0% 100%',     // White
  '0 0% 50%',      // Gray
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
  const [selectedColorField, setSelectedColorField] = useState<keyof typeof customColors>('primary');

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

  const applySwatch = (hsl: string) => {
    handleColorChange(selectedColorField, hsl);
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

  const resetColors = () => {
    setCustomColors({
      primary: settings?.primary_color || '258 90% 66%',
      secondary: settings?.secondary_color || '334 100% 71%',
      accent: settings?.accent_color || '258 90% 66%',
      menuBg: settings?.menu_background_color || '48 100% 98%',
      menuText: settings?.menu_text_color || '215 28% 17%',
      headerStart: settings?.header_gradient_start || '258 90% 66%',
      headerEnd: settings?.header_gradient_end || '334 100% 71%',
    });
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
    return (
      <AdminLayout>
        <div className="p-8">Carregando configurações...</div>
      </AdminLayout>
    );
  }

  const colorFields = [
    { key: 'primary' as const, label: 'Primária', desc: 'Cor principal da marca' },
    { key: 'secondary' as const, label: 'Secundária', desc: 'Cor secundária' },
    { key: 'accent' as const, label: 'Destaque', desc: 'Cor de destaque' },
    { key: 'menuBg' as const, label: 'Menu BG', desc: 'Fundo do menu' },
    { key: 'menuText' as const, label: 'Menu Texto', desc: 'Texto do menu' },
    { key: 'headerStart' as const, label: 'Header Início', desc: 'Gradiente início' },
    { key: 'headerEnd' as const, label: 'Header Fim', desc: 'Gradiente fim' },
  ];

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Configurações</h1>

        {/* Logo Upload Section */}
        <Card className="p-8 mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <span>📸</span> Logo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Logo */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-4">Atual</p>
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-48 border-2 border-gray-200">
                <img 
                  src={settings?.logo_url || logo} 
                  alt="Store Logo" 
                  className="max-h-40 max-w-full object-contain"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-4">Upload</p>
              <label className="border-2 border-dashed border-purple-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all flex flex-col items-center justify-center min-h-48 bg-purple-50">
                <Upload className="w-12 h-12 text-purple-600 mb-3" />
                <p className="text-sm font-semibold text-gray-700 text-center">
                  Clique ou arraste
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
        <Card className="p-8 mb-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <span>🎨</span> Paletas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_PALETTES.map((palette) => (
              <div
                key={palette.name}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-purple-50"
                onClick={() => applyPalette(palette)}
              >
                <h3 className="font-bold text-gray-900 mb-1">{palette.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{palette.description}</p>
                
                <div className="flex gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: hslToHex(palette.primary) }}
                    title="Primary"
                  />
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: hslToHex(palette.secondary) }}
                    title="Secondary"
                  />
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: hslToHex(palette.accent) }}
                    title="Accent"
                  />
                </div>
                
                <Button
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs"
                  disabled={isUpdating}
                >
                  Aplicar
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Custom Color Picker Section */}
        <Card className="p-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>🎯</span> Cores Personalizadas
            </h2>
            <Button
              onClick={resetColors}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Color Fields */}
            <div className="lg:col-span-2 space-y-4">
              {colorFields.map((field) => (
                <div
                  key={field.key}
                  onClick={() => setSelectedColorField(field.key)}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedColorField === field.key
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: hslToHex(customColors[field.key]) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{field.label}</p>
                      <p className="text-xs text-gray-600">{field.desc}</p>
                      <p className="text-xs font-mono text-gray-500 mt-1">{customColors[field.key]}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(customColors[field.key], field.key);
                      }}
                      className="p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    >
                      {copiedColor === field.key ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-700" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Swatches */}
            <div>
              <p className="text-sm font-bold text-gray-900 mb-3">Paleta Rápida</p>
              <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                {COLOR_SWATCHES.map((swatch, idx) => (
                  <button
                    key={idx}
                    onClick={() => applySwatch(swatch)}
                    className="w-full aspect-square rounded-lg border-2 border-gray-300 hover:border-purple-500 hover:shadow-lg transition-all hover:scale-110"
                    style={{ backgroundColor: hslToHex(swatch) }}
                    title={swatch}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">Clique em uma cor para aplicar ao campo selecionado</p>
            </div>
          </div>

          {/* Input Field for Manual Entry */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Editar Manualmente (HSL)
            </label>
            <input
              type="text"
              value={customColors[selectedColorField]}
              onChange={(e) => handleColorChange(selectedColorField, e.target.value)}
              placeholder="h s% l%"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-mono text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
            <p className="text-xs text-gray-600 mt-2">Formato: hue (0-360) saturation (0-100%) lightness (0-100%)</p>
          </div>

          {/* Save Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={saveCustomColors}
              disabled={isUpdating}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              {isUpdating ? 'Salvando...' : 'Salvar Cores'}
            </Button>
            <Button
              onClick={resetColors}
              variant="outline"
              className="flex-1 font-bold py-3"
            >
              Cancelar
            </Button>
          </div>
        </Card>

        {/* Help Section */}
        <Card className="p-6 mt-8 bg-blue-50 border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>ℹ️</span> Dica: Formato HSL
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            HSL (Hue, Saturation, Lightness) é um formato intuitivo para cores.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Hue (H):</strong> 0-360 (posição na roda de cores)</li>
            <li><strong>Saturation (S):</strong> 0-100% (intensidade da cor)</li>
            <li><strong>Lightness (L):</strong> 0-100% (claridade da cor)</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">Ex: <code className="bg-white px-2 py-1 rounded border border-gray-300">258 90% 66%</code> = Roxo vibrante</p>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
