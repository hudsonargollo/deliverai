# Mobile Visual Reference - Colorido Açaí

## Screen Layouts

### 1. Menu Screen - Mobile

```
┌─────────────────────────────────────┐
│ [Logo] Cardápio  [2] [≡] [←]       │ ← Header (56px)
├─────────────────────────────────────┤
│ [🛒] Ver Carrinho (2)  R$ 38.00    │ ← Cart Button (48px)
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ AÇAÍS                           │ │ ← Category Header
│ └─────────────────────────────────┘ │
│                                     │
│ ┌──────────────────────────────────┐│
│ │ ┌──────────┐  Açaí Tradicional  ││
│ │ │          │  Fresco e delicioso││
│ │ │  Image   │  ─────────────────││
│ │ │ 112×112  │  R$ 19.00  [Add]  ││
│ │ └──────────┘                    ││
│ └──────────────────────────────────┘│
│                                     │
│ ┌──────────────────────────────────┐│
│ │ ┌──────────┐  Açaí com Ninho    ││
│ │ │          │  Com leite Ninho   ││
│ │ │  Image   │  ─────────────────││
│ │ │ 112×112  │  R$ 19.00  [Add]  ││
│ │ └──────────┘                    ││
│ └──────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ BEBIDAS                         │ │ ← Category Header
│ └─────────────────────────────────┘ │
│                                     │
│ ┌──────────────────────────────────┐│
│ │ ┌──────────┐  Suco Natural      ││
│ │ │          │  Fresco e natural  ││
│ │ │  Image   │  ─────────────────││
│ │ │ 112×112  │  R$ 8.00   [Add]  ││
│ │ └──────────┘                    ││
│ └──────────────────────────────────┘│
│                                     │
│                                     │ ← Scrollable content
│                                     │
└─────────────────────────────────────┘
```

### 2. Product Card - Detailed View

```
┌──────────────────────────────────────┐
│ ┌──────────────┐  Açaí Tradicional  │
│ │              │  Fresco e delicioso│
│ │    Image     │  ─────────────────│
│ │  112 × 112   │  R$ 19.00         │
│ │              │                   │
│ │              │  ┌─────────────┐  │
│ │              │  │  [Add]      │  │
│ │              │  └─────────────┘  │
│ └──────────────┘                   │
└──────────────────────────────────────┘
```

### 3. Product Card - With Quantity

```
┌──────────────────────────────────────┐
│ ┌──────────────┐  Açaí Tradicional  │
│ │              │  Fresco e delicioso│
│ │    Image     │  ─────────────────│
│ │  112 × 112   │  R$ 19.00         │
│ │              │                   │
│ │              │  ┌─────────────┐  │
│ │              │  │ [-] 2 [+]   │  │
│ │              │  └─────────────┘  │
│ └──────────────┘                   │
└──────────────────────────────────────┘
```

### 4. Header - Mobile

```
┌─────────────────────────────────────┐
│ [Logo] Cardápio  [2] [≡] [←]       │
└─────────────────────────────────────┘
  ↑      ↑          ↑  ↑  ↑
  |      |          |  |  └─ Logout
  |      |          |  └──── Menu
  |      |          └─────── Cart Badge
  |      └─────────────────── Title
  └────────────────────────── Logo (40px)
```

### 5. Category Dropdown - Mobile

```
┌─────────────────────────────────────┐
│ [Logo] Cardápio  [2] [≡] [←]       │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐   │
│ │ Açaís                         │   │
│ │ Bebidas                       │   │
│ │ Lanches                       │   │
│ │ Sobremesas                    │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 6. Store Closed Banner

```
┌─────────────────────────────────────┐
│ [Logo] Cardápio  [2] [≡] [←]       │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🏪 Loja Fechada                 │ │
│ │    Não estamos aceitando pedidos │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Content below]                     │
└─────────────────────────────────────┘
```

## Color Palette

### Primary Colors
```
Purple:     #8B5CF6 (RGB: 139, 92, 246)
Pink:       #F472B6 (RGB: 244, 114, 182)
Indigo:     #6366F1 (RGB: 99, 102, 241)
Green:      #34D399 (RGB: 52, 211, 153)
Red:        #EF4444 (RGB: 239, 68, 68)
```

### Gradients
```
Header:     from-purple-500 via-purple-400 to-indigo-500
Cart:       from-green-500 to-green-600
Closed:     from-red-600 to-red-700
```

### Backgrounds
```
White:      #FFFFFF
Gray-50:    #F9FAFB
Gray-100:   #F3F4F6
Purple-50:  #F3E8FF
Purple-100: #E9D5FF
```

## Typography

### Font Families
```
Headings:   Outfit (700 bold)
Body:       Plus Jakarta Sans (400 regular)
```

### Font Sizes
```
H1:         24px (mobile), 32px (desktop)
H2:         20px (mobile), 28px (desktop)
H3:         18px (mobile), 24px (desktop)
Body:       14px (mobile), 16px (desktop)
Small:      12px (mobile), 14px (desktop)
Caption:    11px (mobile), 12px (desktop)
```

## Component Dimensions

### Header
```
Height:         56px
Logo:           40px height
Cart Badge:     24px height
Icons:          20px size
Padding:        12px horizontal, 12px vertical
Border:         4px bottom
```

### Product Card
```
Image:          112px × 112px
Image Border:   2px
Image Radius:   12px
Card Padding:   12px
Card Radius:    16px
Card Shadow:    md (0 4px 6px -1px)
Gap:            12px
```

### Buttons
```
Quantity:       36px × 36px
Cart:           48px height
Minimum:        44px × 44px
Radius:         8-12px
Padding:        8-12px
```

### Spacing
```
Horizontal:     12px (mobile), 16px (desktop)
Vertical:       16px between sections
Gap:            8px (small), 12px (medium)
Bottom:         96px padding
```

## Animation Timings

```
Fast:           200ms
Normal:         300ms
Slow:           500ms
Easing:         cubic-bezier(0.4, 0, 0.2, 1)
```

## Touch Targets

```
Minimum:        44px × 44px
Spacing:        8px between targets
Feedback:       active:scale-95
Hover:          Disabled on touch devices
```

## Responsive Breakpoints

```
Mobile:         320px - 639px
Tablet:         640px - 1023px
Desktop:        1024px+
```

## Icon Sizes

```
Header:         20px
Product:        12px (description)
Button:         16-20px
Badge:          16px
```

## Shadow Specifications

```
sm:             0 1px 2px 0 rgba(0,0,0,0.05)
md:             0 4px 6px -1px rgba(0,0,0,0.1)
lg:             0 10px 15px -3px rgba(0,0,0,0.1)
xl:             0 20px 25px -5px rgba(0,0,0,0.1)
```

## Border Radius

```
sm:             8px
md:             12px
lg:             16px
full:           9999px (pill)
```

## Opacity Values

```
Hover:          opacity-80
Disabled:       opacity-50
Muted:          opacity-60
```

## Z-Index Stack

```
Header:         z-50
Alerts:         z-40
Dropdown:       z-40
Cart Button:    z-30
Content:        z-10
Background:     z-0
```

## Mobile-First Approach

### Step 1: Design for 375px
- iPhone SE baseline
- Compact layout
- Touch-friendly

### Step 2: Test on 320px
- Older devices
- Ensure readability
- Check overflow

### Step 3: Enhance for 640px+
- Tablet layout
- More spacing
- Better typography

### Step 4: Optimize for 1024px+
- Desktop layout
- Full features
- Enhanced interactions

## Accessibility Checklist

```
Color Contrast:     WCAG AA minimum (4.5:1)
Touch Targets:      44px × 44px minimum
Font Size:          16px minimum for inputs
Line Height:        1.5 minimum
Letter Spacing:     0.05em for headings
```

## Performance Metrics

```
FCP:                < 2s
LCP:                < 3s
CLS:                < 0.1
TTI:                < 4s
Bundle Size:        < 200KB (gzipped)
```

## Browser Support

```
iOS Safari:         12+
Chrome Android:     80+
Samsung Internet:   12+
Firefox Android:    68+
```

## Testing Devices

```
iPhone SE:          375px × 667px
iPhone 14 Pro:      390px × 844px
Galaxy S21:         360px × 800px
iPad:               768px × 1024px
```

## Color Usage Examples

### Header
```
Background:     Gradient (purple → indigo)
Text:           White
Border:         Purple-400
```

### Product Card
```
Background:     White
Title:          Gray-900
Description:    Gray-600
Price:          Purple-600
Image BG:       Purple-50
Image Border:   Purple-100
```

### Buttons
```
Add:            Green gradient
Remove:         Red gradient
Primary:        Purple gradient
Secondary:      Gray background
```

### Alerts
```
Success:        Green gradient
Error:          Red gradient
Warning:        Yellow gradient
Info:           Blue gradient
```

## Visual Hierarchy

### Primary
- Product title (14px, bold)
- Price (16px, bold, purple)
- Add button (14px, bold)

### Secondary
- Product description (12px, gray)
- Category header (12px, bold, uppercase)

### Tertiary
- Quantity display (16px, bold)
- Helper text (11px, gray)

## Interaction States

### Button States
```
Default:        Normal appearance
Hover:          Slightly darker
Active:         scale-95 (pressed)
Disabled:       opacity-50
Focus:          ring-2 ring-offset-2
```

### Card States
```
Default:        Normal shadow
Hover:          Increased shadow
Active:         scale-95
Disabled:       opacity-50
```

---

**Visual Reference Version**: 1.0
**Last Updated**: April 7, 2026
**Status**: Ready for Implementation
