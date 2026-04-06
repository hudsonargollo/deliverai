# Developer Quick Reference Guide
**Colorido Açaí Project**

---

## 🚀 Quick Start

### Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:8080

# Start local Supabase
npx supabase start

# Run linter
npm run lint
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Pages
# (Automatic on git push to main)
```

---

## 📁 Key File Locations

### Admin Panel
- **Sidebar**: `src/components/AdminSidebar.tsx`
- **Dashboard**: `src/pages/admin/Dashboard.tsx`
- **Layout**: `src/layouts/AdminLayout.tsx`
- **Products**: `src/pages/admin/AdminProducts.tsx`

### Product Options
- **Types**: `src/types/product-options.ts`
- **Hook**: `src/hooks/useProductOptions.ts`
- **Manager**: `src/components/ProductOptionsManager.tsx`
- **Dialog**: `src/components/ProductCustomizationDialog.tsx`

### Core Files
- **Routes**: `src/App.tsx`
- **Cart Context**: `src/lib/cartContext.tsx`
- **Supabase Client**: `src/integrations/supabase/client.ts`
- **Auth Wrapper**: `src/components/ProtectedRoute.tsx`

### Configuration
- **Deployment**: `wrangler.toml`
- **Environment**: `.env`
- **Tailwind**: `tailwind.config.ts`
- **Vite**: `vite.config.ts`

---

## 🔐 Admin Credentials

```
Email: colorido@acai.com
Password: 123456
```

---

## 🌐 Important URLs

| Purpose | URL |
|---------|-----|
| Live App | https://coloridoacai.clubemkt.digital |
| Admin Dashboard | https://coloridoacai.clubemkt.digital/admin/dashboard |
| Supabase | https://app.supabase.com/projects/lxggnytlyzsoewdgahet |
| Cloudflare | https://dash.cloudflare.com/ |
| MercadoPago | https://www.mercadopago.com.br/developers/panel/app |

---

## 🗄️ Database Tables

### Core Tables
- `orders` - Customer orders
- `order_items` - Items in orders
- `menu_items` - Products/menu items
- `customers` - Customer information
- `users` - Admin/staff users

### Product Options
- `product_option_groups` - Option categories (sizes, toppings)
- `product_options` - Individual options
- `order_item_options` - Selected options per order item

### Key Columns
```sql
-- product_option_groups
id, menu_item_id, name, is_required, min_selections, max_selections

-- product_options
id, option_group_id, name, price_modifier, is_available

-- order_item_options
id, order_item_id, product_option_id, quantity, unit_price
```

---

## 🎨 Design System

### Colors
```css
Primary: #7C3AED (Purple)
Secondary: #4F46E5 (Indigo)
Accent: #3B82F6 (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Error: #EF4444 (Red)
```

### Tailwind Classes
```
Gradients: from-purple-600 to-indigo-600
Borders: border-purple-200
Backgrounds: bg-purple-50
Text: text-purple-600
Hover: hover:bg-purple-700
```

---

## 🔄 Common Tasks

### Add a New Admin Page

1. Create component in `src/pages/admin/`
```tsx
import { AdminLayout } from '@/layouts/AdminLayout';

export default function NewPage() {
  return (
    <AdminLayout>
      {/* Your content */}
    </AdminLayout>
  );
}
```

2. Add route in `src/App.tsx`
```tsx
<Route
  path="/admin/new-page"
  element={
    <ProtectedRoute requiredRole="admin">
      <Suspense fallback={<LoadingFallback />}>
        <NewPage />
      </Suspense>
    </ProtectedRoute>
  }
/>
```

3. Add navigation item in `src/components/AdminSidebar.tsx`
```tsx
{
  label: 'New Page',
  icon: <IconName className="w-5 h-5" />,
  path: '/admin/new-page',
}
```

### Add Product Options to a Product

1. Go to Admin Dashboard → Produtos
2. Select a product
3. Click "Manage Options"
4. Create option groups (e.g., "Tamanho", "Toppings")
5. Add options to each group
6. Set price modifiers and availability

### Query Supabase Data

```tsx
import { supabase } from '@/integrations/supabase/client';

// Fetch data
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', 'value');

// Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert([{ column: 'value' }]);

// Update data
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', 'id_value');

// Delete data
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 'id_value');
```

### Add Toast Notification

```tsx
import { toast } from 'sonner';

// Success
toast.success('Operation successful!');

// Error
toast.error('Something went wrong');

// Info
toast.info('Information message');

// Loading
const id = toast.loading('Processing...');
toast.success('Done!', { id });
```

### Use Product Options Hook

```tsx
import { useProductOptions } from '@/hooks/useProductOptions';

const { optionGroups, loading } = useProductOptions(productId);

// optionGroups is an array of ProductOptionGroupWithOptions
// Each group has: id, name, description, options[]
```

---

## 🐛 Debugging

### Check Console
```bash
# Browser DevTools → Console tab
# Look for errors and warnings
```

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Project: lxggnytlyzsoewdgahet
3. Logs → Edge Functions or Database

### Check Cloudflare Logs
1. Go to Cloudflare Dashboard
2. Project: coloridoacai
3. Analytics → Logs

### Common Issues

**Admin page not loading**
- Check ProtectedRoute wrapper
- Verify user role in Supabase
- Check browser console for errors

**Product options not showing**
- Verify option groups exist in database
- Check product_option_groups table
- Ensure menu_item_id matches

**Payment not working**
- Check MercadoPago keys in wrangler.toml
- Verify API keys are correct
- Check MercadoPago dashboard for errors

**WhatsApp not sending**
- Check Evolution API configuration
- Verify API key and instance name
- Check WhatsApp queue in database

---

## 📊 Environment Variables

### Frontend (VITE_*)
```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_MERCADOPAGO_PUBLIC_KEY
VITE_MERCADOPAGO_ACCESS_TOKEN
VITE_EVOLUTION_API_URL
VITE_EVOLUTION_API_KEY
VITE_EVOLUTION_INSTANCE_NAME
```

### Backend (Server-side)
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
MERCADOPAGO_ACCESS_TOKEN
WHATSAPP_ENCRYPTION_KEY
WHATSAPP_SESSION_ID
```

---

## 🚀 Deployment

### Automatic Deployment
- Push to `main` branch
- Cloudflare Pages automatically builds and deploys
- Check deployment status in Cloudflare Dashboard

### Manual Deployment
```bash
# Build
npm run build

# Deploy (requires Cloudflare CLI)
wrangler pages deploy dist/
```

### Rollback
1. Go to Cloudflare Dashboard
2. Project: coloridoacai
3. Deployments tab
4. Select previous deployment
5. Click "Rollback"

---

## 📝 Code Style

### Component Structure
```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

### Naming Conventions
- Components: PascalCase (Button, AdminSidebar)
- Functions: camelCase (handleClick, fetchData)
- Constants: UPPER_SNAKE_CASE (API_URL, MAX_ITEMS)
- Files: PascalCase for components, camelCase for utilities
- Database: snake_case (product_options, order_items)

### Imports
```tsx
// React
import { useState, useEffect } from 'react';

// External libraries
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// Internal modules
import { useProductOptions } from '@/hooks/useProductOptions';
import { AdminLayout } from '@/layouts/AdminLayout';
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Admin login works
- [ ] Dashboard loads and shows data
- [ ] Sidebar navigation works
- [ ] Product options display correctly
- [ ] Can add options to cart
- [ ] Checkout process works
- [ ] Payment processing works
- [ ] WhatsApp notifications send
- [ ] Responsive design works on mobile

### Test Credentials
```
Admin: colorido@acai.com / 123456
Test PIX: Use MercadoPago sandbox
Test Card: 4111 1111 1111 1111
```

---

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Project Docs
- `README.md` - Project overview
- `PRODUCT_OPTIONS_IMPLEMENTATION.md` - Options system
- `ADMIN_PANEL_REDESIGN.md` - Admin panel details
- `PROJECT_STATUS.md` - Current status
- `SYSTEM_VERIFICATION.md` - Verification checklist

---

## 💡 Tips & Tricks

### Performance
- Use lazy loading for routes
- Implement code splitting
- Optimize images
- Use React.memo for expensive components
- Debounce search inputs

### Development
- Use React DevTools browser extension
- Use Supabase Studio for database management
- Check browser console regularly
- Use TypeScript strict mode
- Write meaningful commit messages

### Debugging
- Add console.log statements
- Use browser DevTools debugger
- Check network tab for API calls
- Use Supabase logs
- Check Cloudflare logs

---

## 🔗 Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
# After review, merge to main

# Main branch automatically deploys to production
```

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the implementation guides
3. Check browser console for errors
4. Check Supabase logs
5. Check Cloudflare logs
6. Review git history for similar changes

---

**Last Updated**: April 6, 2026  
**Project**: Colorido Açaí  
**Status**: Production Ready
