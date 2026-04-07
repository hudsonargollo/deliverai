# Branding & Color Customization - Quick Start Guide

## Access Settings
1. Log in as admin
2. Click **Configurações** in the sidebar
3. Or navigate to `/admin/settings`

## Upload Logo
1. Scroll to "Logo da Loja" section
2. Click upload area or drag & drop image
3. Supported: PNG, JPG, GIF (max 5MB)
4. Logo updates immediately in header

## Apply Predefined Palette
1. Scroll to "Paletas de Cores Predefinidas"
2. Choose from 5 options:
   - **Ocean**: Blue & Cyan
   - **Sunset**: Orange & Red
   - **Acai**: Purple & Magenta
   - **Forest**: Green & Emerald
   - **Berry**: Raspberry & Strawberry
3. Click **Aplicar** button
4. Colors apply instantly to entire system

## Create Custom Colors
1. Scroll to "Cores Personalizadas"
2. Modify any of 7 colors:
   - Primary Color
   - Secondary Color
   - Accent Color
   - Menu Background
   - Menu Text
   - Header Gradient Start
   - Header Gradient End

3. Enter HSL values (format: `h s% l%`)
   - Example: `258 90% 66%`
4. See color preview in square
5. Click **Salvar Cores Personalizadas**
6. Changes apply system-wide

## HSL Format Quick Reference
```
Format: Hue Saturation% Lightness%

Hue (0-360):
  0° = Red
  60° = Yellow
  120° = Green
  180° = Cyan
  240° = Blue
  300° = Magenta

Saturation (0-100%):
  0% = Gray
  100% = Full Color

Lightness (0-100%):
  0% = Black
  50% = Normal
  100% = White

Examples:
  0 100% 50% = Pure Red
  120 100% 50% = Pure Green
  240 100% 50% = Pure Blue
  258 90% 66% = Violet
  334 100% 71% = Hot Pink
```

## Copy Color Values
- Click copy icon next to any color input
- HSL value copied to clipboard
- Paste in other fields or share with team

## Reset to Defaults
- Click **Cancelar** to discard unsaved changes
- Refresh page to reload from database

## Where Colors Apply
- ✅ Header gradient
- ✅ Buttons & interactive elements
- ✅ Customer menu
- ✅ Admin sidebar
- ✅ All UI components
- ✅ Entire system

## Tips
1. **Test on Mobile**: Colors should look good on all devices
2. **Contrast**: Ensure text is readable on background
3. **Brand Consistency**: Use colors that match your brand
4. **Save Often**: Click save after making changes
5. **Preview**: See changes instantly in header

## Troubleshooting

**Logo not updating?**
- Check file size (max 5MB)
- Try PNG format
- Clear browser cache
- Refresh page

**Colors not applying?**
- Verify HSL format (h s% l%)
- Check database connection
- Clear browser cache
- Refresh page

**Can't access settings?**
- Verify you're logged in as admin
- Check user role in database
- Try logging out and back in

## File Limits
- Logo: 5MB max
- Supported formats: PNG, JPG, GIF
- Recommended size: 200x100px or larger

## Color Recommendations

**For Light Backgrounds:**
- Use darker text colors (lower lightness)
- Example: `0 0% 20%` (dark gray)

**For Dark Backgrounds:**
- Use lighter text colors (higher lightness)
- Example: `0 0% 90%` (light gray)

**For Vibrant Look:**
- Use high saturation (80-100%)
- Example: `258 90% 66%`

**For Subtle Look:**
- Use lower saturation (30-60%)
- Example: `258 40% 66%`

## Support
For issues, check the full documentation in `BRANDING_CUSTOMIZATION_COMPLETE.md`
