# Settings Page - Quick Guide

## 📍 Access
Admin Panel → Configurações (or `/admin/settings`)

---

## 🎨 Three Main Sections

### 1️⃣ Logo (📸)
- Upload custom store logo
- Max 5MB (PNG, JPG, GIF)
- Preview current logo
- Displays in header & sidebar

### 2️⃣ Palettes (🎨)
- 5 predefined color schemes
- Click any palette to apply all colors at once
- Includes: Ocean, Sunset, Acai, Forest, Berry
- Shows color preview swatches

### 3️⃣ Custom Colors (🎯)
- Edit individual colors
- 7 color fields to customize
- Quick swatch palette (11 colors)
- Manual HSL input for precision

---

## 🎯 How to Change Colors

### Method 1: Quick Swatches (Fastest)
```
1. Click a color field (e.g., "Primária")
2. Click any swatch in the palette
3. Color updates instantly
4. Click "Salvar Cores" to save
```

### Method 2: Predefined Palettes
```
1. Click any palette card
2. All 7 colors apply at once
3. Automatically saves
```

### Method 3: Manual Entry
```
1. Click a color field
2. Edit HSL value in input box
3. Format: "hue saturation% lightness%"
4. Example: "258 90% 66%"
5. Click "Salvar Cores"
```

---

## 🎨 Color Fields Explained

| Field | Purpose | Example |
|-------|---------|---------|
| **Primária** | Main brand color | Buttons, headers |
| **Secundária** | Secondary color | Accents, borders |
| **Destaque** | Highlight color | Active states |
| **Menu BG** | Menu background | Customer menu |
| **Menu Texto** | Menu text | Customer menu text |
| **Header Início** | Gradient start | Header top |
| **Header Fim** | Gradient end | Header bottom |

---

## 🎨 Quick Swatch Palette

11 colors available:
- 🔴 Red
- 🟠 Orange
- 🟡 Yellow
- 🟢 Green
- 🔵 Cyan
- 🔷 Blue
- 🟣 Purple
- 🩷 Magenta
- ⬛ Black
- ⬜ White
- ⚫ Gray

---

## 💾 Saving Changes

### Auto-Save
- Predefined palettes save automatically
- Click "Salvar Cores" for custom colors

### Reset
- Click "Resetar" to undo unsaved changes
- Reverts to last saved colors

---

## 📋 HSL Format

**HSL = Hue, Saturation, Lightness**

- **Hue (H)**: 0-360 (position on color wheel)
  - 0° = Red
  - 120° = Green
  - 240° = Blue
  
- **Saturation (S)**: 0-100% (color intensity)
  - 0% = Gray
  - 100% = Full color
  
- **Lightness (L)**: 0-100% (brightness)
  - 0% = Black
  - 50% = Normal
  - 100% = White

**Example**: `258 90% 66%` = Vibrant purple

---

## 🎯 Tips & Tricks

1. **Copy Colors**: Click copy icon to copy HSL value
2. **Quick Test**: Use swatches to preview colors
3. **Undo Changes**: Click Reset before saving
4. **Mobile**: Swatches stack vertically on mobile
5. **Precision**: Use manual input for exact colors

---

## ✅ What Gets Customized

When you change colors, these update system-wide:
- ✅ Header gradient
- ✅ Buttons & CTAs
- ✅ Menu background & text
- ✅ Accents & highlights
- ✅ Active states
- ✅ Hover effects

---

## 🚀 Next: Apply Database Migration

To enable color saving, run this SQL in Supabase:

See: `QUICK_FIX_COLOR_SETTINGS.md`

---

## 📞 Troubleshooting

**Colors not saving?**
- Check database migration is applied
- Verify you're logged in as admin
- Refresh page and try again

**Colors not applying?**
- Clear browser cache
- Refresh page
- Check console for errors (F12)

**Swatch not working?**
- Select a color field first
- Then click a swatch
- Field should highlight in purple
