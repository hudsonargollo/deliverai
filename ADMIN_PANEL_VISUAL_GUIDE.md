# Admin Panel Visual Guide

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN PANEL LAYOUT                        │
├──────────────┬──────────────────────────────────────────────┤
│              │                                               │
│   SIDEBAR    │              MAIN CONTENT                    │
│              │                                               │
│  ┌────────┐  │  ┌──────────────────────────────────────┐   │
│  │ Logo   │  │  │  Uniform Header                      │   │
│  │Colorido│  │  │  Title + Actions                     │   │
│  └────────┘  │  └──────────────────────────────────────┘   │
│              │                                               │
│  Dashboard   │  ┌──────────────────────────────────────┐   │
│  Produtos    │  │  Stats Cards (4 columns)             │   │
│  Clientes    │  │  - Orders Today                      │   │
│  WhatsApp    │  │  - Revenue Today                     │   │
│  Config      │  │  - Pending Orders                    │   │
│  Sair        │  │  - Total Customers                   │   │
│              │  └──────────────────────────────────────┘   │
│              │                                               │
│              │  ┌──────────────────────────────────────┐   │
│              │  │  Recent Orders Table                 │   │
│              │  │  - Order #                           │   │
│              │  │  - Customer                          │   │
│              │  │  - Value                             │   │
│              │  │  - Status                            │   │
│              │  │  - Date                              │   │
│              │  └──────────────────────────────────────┘   │
│              │                                               │
└──────────────┴──────────────────────────────────────────────┘
```

## Sidebar Navigation

### Desktop View (Expanded)
```
┌─────────────────────┐
│  🫐 Colorido        │
│     Admin           │
├─────────────────────┤
│ 📊 Dashboard        │
│ 🛍️  Produtos        │
│ 👥 Clientes         │
│ 💬 WhatsApp         │
│ ⚙️  Configurações    │
├─────────────────────┤
│ 🚪 Sair             │
└─────────────────────┘
```

### Desktop View (Collapsed)
```
┌──┐
│🫐│
├──┤
│📊│
│🛍️ │
│👥│
│💬│
│⚙️ │
├──┤
│🚪│
└──┘
```

### Mobile View
```
┌─────────────────────────────────┐
│ ☰  Colorido Açaí        [X]     │
├─────────────────────────────────┤
│ 📊 Dashboard                    │
│ 🛍️  Produtos                    │
│ 👥 Clientes                     │
│ 💬 WhatsApp                     │
│ ⚙️  Configurações                │
│ 🚪 Sair                         │
└─────────────────────────────────┘
```

## Dashboard Stats Cards

### Card Layout
```
┌──────────────────────────────┐
│  📊 Pedidos Hoje             │
│                              │
│  24                          │
│  ↑ +12% vs ontem             │
└──────────────────────────────┘
```

### Color Scheme
- **Orders**: Blue (from-blue-50 to-blue-100)
- **Revenue**: Green (from-green-50 to-green-100)
- **Pending**: Orange (from-orange-50 to-orange-100)
- **Customers**: Purple (from-purple-50 to-purple-100)

## Recent Orders Table

### Table Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Pedidos Recentes                                            │
├─────────────────────────────────────────────────────────────┤
│ Pedido │ Cliente      │ Valor      │ Status    │ Data       │
├─────────────────────────────────────────────────────────────┤
│ #12345│ João Silva   │ R$ 45.00   │ Concluído │ 06/04/2026 │
│ #12344│ Maria Santos │ R$ 32.50   │ Pendente  │ 06/04/2026 │
│ #12343│ Pedro Costa  │ R$ 28.00   │ Em Preparo│ 06/04/2026 │
│ #12342│ Ana Oliveira │ R$ 55.00   │ Pronto    │ 05/04/2026 │
│ #12341│ Carlos Souza │ R$ 38.50   │ Concluído │ 05/04/2026 │
└─────────────────────────────────────────────────────────────┘
```

## Color Palette

### Primary Colors
```
Purple:     #7C3AED (from-purple-600)
Indigo:     #4F46E5 (to-indigo-700)
Blue:       #3B82F6 (blue-500)
Green:      #10B981 (green-500)
Orange:     #F97316 (orange-500)
```

### Background Colors
```
Purple:     #F3E8FF (from-purple-50)
Blue:       #EFF6FF (via-blue-50)
Indigo:     #E0E7FF (to-indigo-100)
```

### Status Colors
```
Completed:  #10B981 (green)
Pending:    #FBBF24 (yellow)
Preparing:  #3B82F6 (blue)
Ready:      #A855F7 (purple)
```

## Typography

### Headers
- **Page Title**: 24px, Bold, Dark Gray
- **Section Title**: 20px, Bold, Dark Gray
- **Card Title**: 16px, Bold, Dark Gray

### Body
- **Regular Text**: 14px, Regular, Gray
- **Small Text**: 12px, Regular, Light Gray
- **Labels**: 12px, Medium, Gray

## Spacing

### Padding
- **Container**: 24px (6 units)
- **Card**: 24px (6 units)
- **Section**: 32px (8 units)

### Gaps
- **Grid**: 16px-24px (4-6 units)
- **Vertical**: 16px-32px (4-8 units)
- **Horizontal**: 12px-24px (3-6 units)

## Transitions

### Sidebar
- Collapse/Expand: 300ms ease
- Hover: 200ms ease

### Cards
- Hover: 300ms ease (shadow + lift)
- Transition: shadow, transform

### Buttons
- Hover: 200ms ease
- Active: 100ms ease

## Responsive Breakpoints

### Mobile (< 768px)
- Sidebar: Hidden (hamburger menu)
- Content: Full width
- Cards: 1 column
- Table: Scrollable

### Tablet (768px - 1024px)
- Sidebar: Visible (collapsible)
- Content: Adjusted for sidebar
- Cards: 2 columns
- Table: Scrollable

### Desktop (> 1024px)
- Sidebar: Always visible
- Content: Full width minus sidebar
- Cards: 4 columns
- Table: Full width

## Interactive Elements

### Buttons
```
Normal:  bg-gradient-to-r from-purple-600 to-indigo-600
Hover:   from-purple-700 to-indigo-700 + shadow
Active:  Pressed effect
```

### Nav Items
```
Inactive: text-purple-100 hover:bg-white/10
Active:   bg-gradient-to-r from-purple-500 to-blue-600 + shadow
```

### Cards
```
Normal:  border-2 border-color + shadow-md
Hover:   shadow-lg + -translate-y-1
```

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast
- ✅ Focus indicators
- ✅ Mobile touch targets

## Performance

- ✅ Lazy loading
- ✅ Code splitting
- ✅ Image optimization
- ✅ CSS optimization
- ✅ Smooth animations

---

**Version**: 1.0
**Date**: April 6, 2026
