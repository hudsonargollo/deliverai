# Mobile Design System - Colorido Açaí

## Brand Identity

### Logo & Colors
- **Primary Brand Color**: Purple (#8B5CF6)
- **Secondary Color**: Pink (#F472B6)
- **Accent Color**: Indigo (#6366F1)
- **Success Color**: Green (#34D399)
- **Danger Color**: Red (#EF4444)

### Typography
- **Headings**: Outfit font, bold (700)
- **Body**: Plus Jakarta Sans, regular (400-600)
- **Minimum size on mobile**: 16px (for inputs)

## Mobile Layout Structure

```
┌─────────────────────────────────────┐
│  HEADER (56px)                      │
│  Logo | Title | Cart | Menu | Logout│
├─────────────────────────────────────┤
│  ALERTS (if needed)                 │
│  - Store Closed Banner (56px)       │
│  - Cart Button (56px)               │
├─────────────────────────────────────┤
│                                     │
│  CONTENT AREA                       │
│  - Category Headers                 │
│  - Product Cards (112px images)     │
│  - Spacing: 12px between cards      │
│                                     │
├─────────────────────────────────────┤
│  BOTTOM PADDING (96px)              │
│  (For scrolling past content)       │
└─────────────────────────────────────┘
```

## Component Specifications

### Header (Mobile)
- **Height**: 56px
- **Background**: Gradient (purple-500 → indigo-500)
- **Padding**: 12px horizontal, 12px vertical
- **Logo**: 40px height
- **Cart Badge**: 24px height, white background, purple text
- **Icons**: 20px size
- **Border**: 4px bottom border (purple-400)

### Product Card
- **Layout**: Horizontal (image left, content right)
- **Image**: 112px × 112px (1:1 ratio)
- **Image Border**: 2px (purple-100)
- **Image Radius**: 12px
- **Card Padding**: 12px
- **Card Radius**: 16px
- **Card Shadow**: md (0 4px 6px -1px rgba(0,0,0,0.1))
- **Gap between image and content**: 12px

### Product Card - Content
- **Title**: 14px, bold, gray-900, max 2 lines
- **Description**: 12px, gray-600, max 1 line
- **Price**: 16px, bold, purple-600
- **Button**: 36px height minimum (44px with padding)

### Quantity Controls
- **Container**: 12px padding, purple-100 background, 8px radius
- **Button Size**: 36px × 36px
- **Remove Button**: Red background
- **Add Button**: Green background
- **Quantity Display**: 16px, bold, purple-900
- **Gap between buttons**: 6px

### Category Header
- **Background**: Gradient (purple-500 → purple-400)
- **Padding**: 12px horizontal, 6px vertical
- **Border**: 2px (purple-300)
- **Radius**: 9999px (pill shape)
- **Text**: 12px, bold, uppercase, white
- **Letter Spacing**: wider

### Cart Button
- **Height**: 48px
- **Background**: Gradient (green-500 → green-600)
- **Padding**: 12px horizontal
- **Radius**: 12px
- **Text**: 14px, bold, white
- **Icon**: 20px
- **Shadow**: lg

### Store Closed Banner
- **Height**: 56px
- **Background**: Gradient (red-600 → red-700)
- **Padding**: 12px
- **Radius**: 12px
- **Border**: 2px (red-400)
- **Text**: 14px bold title, 12px subtitle
- **Icon**: 20px

## Spacing System

### Horizontal Spacing
- **Container padding**: 12px (mobile), 16px (desktop)
- **Card gap**: 12px
- **Element gap**: 8px (small), 12px (medium), 16px (large)

### Vertical Spacing
- **Header height**: 56px
- **Alert height**: 56px
- **Card height**: 112px (image) + content
- **Category spacing**: 16px between categories
- **Bottom padding**: 96px (for scrolling)

### Touch Target Sizing
- **Minimum**: 44px × 44px
- **Buttons**: 36px × 36px (with padding = 44px)
- **Icon buttons**: 40px × 40px (with padding = 44px)
- **Spacing between targets**: 8px minimum

## Color Palette

### Primary Gradient
```
from-purple-500 via-purple-400 to-indigo-500
#A855F7 → #C084FC → #6366F1
```

### Secondary Gradient
```
from-purple-500 to-purple-600
#A855F7 → #9333EA
```

### Success Gradient
```
from-green-500 to-green-600
#10B981 → #059669
```

### Danger Gradient
```
from-red-600 to-red-700
#DC2626 → #B91C1C
```

### Backgrounds
- **Card**: White (#FFFFFF)
- **Hover**: Gray-50 (#F9FAFB)
- **Disabled**: Gray-100 (#F3F4F6)
- **Input**: White (#FFFFFF)

### Text Colors
- **Primary**: Gray-900 (#111827)
- **Secondary**: Gray-600 (#4B5563)
- **Tertiary**: Gray-500 (#6B7280)
- **Muted**: Gray-400 (#9CA3AF)
- **On Purple**: White (#FFFFFF)
- **On Green**: White (#FFFFFF)
- **On Red**: White (#FFFFFF)

## Typography Scale

### Mobile
- **H1**: 24px, bold (700)
- **H2**: 20px, bold (700)
- **H3**: 18px, bold (700)
- **Body Large**: 16px, regular (400)
- **Body**: 14px, regular (400)
- **Body Small**: 12px, regular (400)
- **Caption**: 11px, regular (400)

### Desktop
- **H1**: 32px, bold (700)
- **H2**: 28px, bold (700)
- **H3**: 24px, bold (700)
- **Body Large**: 18px, regular (400)
- **Body**: 16px, regular (400)
- **Body Small**: 14px, regular (400)
- **Caption**: 12px, regular (400)

## Animation Specifications

### Transitions
- **Duration**: 200ms (fast), 300ms (normal), 500ms (slow)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth)
- **Properties**: `transition-all`

### Micro-interactions
- **Button press**: `active:scale-95` (shrink 5%)
- **Hover**: `hover:shadow-lg` (increase shadow)
- **Focus**: `focus:ring-2 focus:ring-offset-2`

### Loading States
- **Spinner**: 8px border, 4px border-top, rotating
- **Skeleton**: Pulse animation (opacity 0.5 → 1)
- **Duration**: 2s infinite

### Success Animation
- **Toast**: Slide in from top, 2s duration
- **Color**: Green gradient background
- **Icon**: Checkmark

## Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

### Mobile-First Approach
1. Design for 375px (iPhone SE)
2. Test on 320px (older devices)
3. Enhance for 640px+ (tablets)
4. Optimize for 1024px+ (desktop)

## Accessibility Guidelines

### Color Contrast
- **Text on Purple**: WCAG AAA (7:1 ratio)
- **Text on Green**: WCAG AAA (7:1 ratio)
- **Text on Red**: WCAG AAA (7:1 ratio)
- **Text on White**: WCAG AAA (12:1 ratio)

### Touch Targets
- **Minimum size**: 44px × 44px
- **Spacing**: 8px between targets
- **Feedback**: Visual change on interaction

### Semantic HTML
- Use `<button>` for interactive elements
- Use `aria-label` for icon buttons
- Use `role="button"` for divs acting as buttons
- Use `aria-disabled` for disabled states

### Keyboard Navigation
- Tab order: logical flow
- Enter/Space: activate buttons
- Escape: close modals/dropdowns
- Arrow keys: navigate lists

## Component Examples

### Product Card - Mobile
```
┌─────────────────────────────────┐
│ ┌──────────┐  Title             │
│ │          │  Description       │
│ │  Image   │  ─────────────────│
│ │ 112×112  │  R$ 19.00  [Add]  │
│ └──────────┘                    │
└─────────────────────────────────┘
```

### Quantity Controls
```
┌──────────────────────────┐
│ [-] 2 [+]               │
└──────────────────────────┘
```

### Header - Mobile
```
┌─────────────────────────────────┐
│ [Logo] Cardápio  [2] [≡] [←]   │
└─────────────────────────────────┘
```

### Cart Button
```
┌─────────────────────────────────┐
│ [🛒] Ver Carrinho (2)  R$ 38.00 │
└─────────────────────────────────┘
```

## Implementation Checklist

- [ ] Header: 56px height, gradient background
- [ ] Logo: 40px height, rounded corners
- [ ] Cart badge: White background, purple text
- [ ] Product cards: 112px images, horizontal layout
- [ ] Quantity controls: 36px buttons, 12px padding
- [ ] Category headers: Pill shape, gradient background
- [ ] Cart button: Green gradient, 48px height
- [ ] Store closed banner: Red gradient, 56px height
- [ ] All touch targets: 44px minimum
- [ ] Spacing: Consistent 12px gaps
- [ ] Colors: Brand purple, green, red
- [ ] Typography: Outfit headings, Plus Jakarta Sans body
- [ ] Animations: 200-300ms transitions
- [ ] Accessibility: WCAG AA minimum

## Performance Targets

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 4s
- **Bundle Size**: < 200KB (gzipped)

## Testing Checklist

- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (390px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] iPad (768px)
- [ ] Slow 3G network
- [ ] VoiceOver (iOS)
- [ ] TalkBack (Android)
- [ ] Keyboard navigation
- [ ] Zoom at 200%
- [ ] Landscape orientation
- [ ] Dark mode (if applicable)
