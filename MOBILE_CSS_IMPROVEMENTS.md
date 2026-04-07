# Mobile CSS Improvements - Colorido Açaí

## CSS Enhancements for Mobile UX

### 1. Mobile-Specific Utilities

Add these to `src/index.css` in the `@layer utilities` section:

```css
/* Mobile-specific touch feedback */
@media (hover: none) and (pointer: coarse) {
  /* Disable hover effects on touch devices */
  button:hover,
  a:hover {
    background-color: inherit;
  }
  
  /* Add active state feedback instead */
  button:active,
  a:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

/* Improve mobile scrolling */
.mobile-scroll {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Ensure minimum touch target size */
@media (max-width: 768px) {
  button,
  a[role="button"],
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Ensure proper spacing between touch targets */
  button + button,
  a + a {
    margin-left: 8px;
  }
}

/* Mobile-optimized text sizing */
@media (max-width: 640px) {
  /* Ensure readable font sizes */
  input,
  textarea,
  select {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  /* Better mobile typography */
  h1 {
    font-size: 24px;
  }
  
  h2 {
    font-size: 20px;
  }
  
  h3 {
    font-size: 18px;
  }
  
  body {
    font-size: 14px;
  }
}

/* Mobile-specific spacing */
@media (max-width: 640px) {
  .mobile-padding {
    padding: 12px;
  }
  
  .mobile-gap-2 {
    gap: 8px;
  }
  
  .mobile-gap-3 {
    gap: 12px;
  }
}

/* Prevent horizontal scroll on mobile */
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

/* Better mobile viewport handling */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
}

/* Mobile-optimized shadows */
@media (max-width: 640px) {
  .shadow-md {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
  
  .shadow-lg {
    box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
  }
}

/* Mobile-optimized animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Fast animations for mobile */
@media (max-width: 640px) {
  .transition-all {
    transition-duration: 200ms;
  }
}
```

### 2. Mobile Header Styles

```css
/* Mobile Header */
@media (max-width: 768px) {
  .mobile-header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: linear-gradient(to right, #a855f7, #c084fc, #6366f1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid #c084fc;
  }
  
  .mobile-header-logo {
    height: 40px;
    width: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-header-title {
    flex: 1;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .mobile-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .mobile-header-button {
    padding: 8px;
    color: white;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 200ms;
  }
  
  .mobile-header-button:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
```

### 3. Mobile Product Card Styles

```css
/* Mobile Product Card */
@media (max-width: 768px) {
  .mobile-product-card {
    background: white;
    border-radius: 16px;
    padding: 12px;
    display: flex;
    gap: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: box-shadow 200ms;
  }
  
  .mobile-product-card:active {
    transform: scale(0.95);
  }
  
  .mobile-product-image {
    width: 112px;
    height: 112px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(to bottom right, #f3e8ff, #e9d5ff);
    border: 2px solid #e9d5ff;
    flex-shrink: 0;
    cursor: pointer;
  }
  
  .mobile-product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 300ms;
  }
  
  .mobile-product-image:active img {
    transform: scale(1.1);
  }
  
  .mobile-product-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
  }
  
  .mobile-product-title {
    font-weight: bold;
    color: #111827;
    font-size: 14px;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .mobile-product-description {
    font-size: 12px;
    color: #4b5563;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .mobile-product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  
  .mobile-product-price {
    color: #a855f7;
    font-weight: bold;
    font-size: 16px;
  }
}
```

### 4. Mobile Quantity Controls

```css
/* Mobile Quantity Controls */
@media (max-width: 768px) {
  .mobile-quantity-container {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: #f3e8ff;
    border-radius: 8px;
    padding: 6px;
  }
  
  .mobile-quantity-button {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms;
  }
  
  .mobile-quantity-button:active {
    transform: scale(0.95);
  }
  
  .mobile-quantity-button.remove {
    background-color: #ef4444;
  }
  
  .mobile-quantity-button.remove:hover {
    background-color: #dc2626;
  }
  
  .mobile-quantity-button.add {
    background-color: #10b981;
  }
  
  .mobile-quantity-button.add:hover {
    background-color: #059669;
  }
  
  .mobile-quantity-display {
    font-weight: bold;
    color: #581c87;
    font-size: 16px;
    min-width: 28px;
    text-align: center;
  }
}
```

### 5. Mobile Cart Button

```css
/* Mobile Cart Button */
@media (max-width: 768px) {
  .mobile-cart-button {
    width: 100%;
    height: 48px;
    background: linear-gradient(to right, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 200ms;
  }
  
  .mobile-cart-button:active {
    transform: scale(0.95);
  }
  
  .mobile-cart-button:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-cart-button-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .mobile-cart-button-price {
    font-weight: bold;
    margin-left: auto;
  }
}
```

### 6. Mobile Category Header

```css
/* Mobile Category Header */
@media (max-width: 768px) {
  .mobile-category-header {
    background: linear-gradient(to right, #a855f7, #c084fc);
    color: white;
    padding: 6px 12px;
    border-radius: 9999px;
    display: inline-block;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 2px solid #c084fc;
  }
  
  .mobile-category-header h2 {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }
}
```

### 7. Mobile Store Closed Banner

```css
/* Mobile Store Closed Banner */
@media (max-width: 768px) {
  .mobile-store-closed {
    background: linear-gradient(to right, #dc2626, #b91c1c);
    color: white;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid #dc2626;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .mobile-store-closed-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .mobile-store-closed-content {
    text-align: center;
  }
  
  .mobile-store-closed-title {
    font-weight: bold;
    font-size: 14px;
    margin: 0;
  }
  
  .mobile-store-closed-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
}
```

### 8. Mobile Dropdown Menu

```css
/* Mobile Dropdown Menu */
@media (max-width: 768px) {
  .mobile-dropdown {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 2px solid #e9d5ff;
    max-height: 256px;
    overflow-y: auto;
  }
  
  .mobile-dropdown-content {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .mobile-dropdown-item {
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    border-radius: 8px;
    background: transparent;
    border: none;
    font-weight: 500;
    color: #111827;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 200ms;
  }
  
  .mobile-dropdown-item:active {
    background-color: #f3e8ff;
  }
}
```

### 9. Mobile Scrolling Optimization

```css
/* Smooth scrolling for mobile */
@media (max-width: 768px) {
  html {
    scroll-behavior: smooth;
  }
  
  /* Optimize scrolling performance */
  .scrollable-content {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
  }
  
  /* Prevent layout shift during scroll */
  body {
    overflow-x: hidden;
  }
}
```

### 10. Mobile Loading States

```css
/* Mobile Loading States */
@media (max-width: 768px) {
  .mobile-skeleton {
    background: linear-gradient(
      90deg,
      #f3f4f6 25%,
      #e5e7eb 50%,
      #f3f4f6 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .mobile-spinner {
    width: 32px;
    height: 32px;
    border: 4px solid #f3f4f6;
    border-top-color: #a855f7;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
```

## Implementation Steps

1. **Add CSS to `src/index.css`**:
   - Copy all CSS sections above
   - Add to `@layer utilities` section
   - Ensure media queries are properly nested

2. **Update Tailwind Configuration** (if needed):
   - Verify breakpoints are correct
   - Check color palette matches
   - Ensure spacing scale is consistent

3. **Test on Real Devices**:
   - iPhone SE (375px)
   - iPhone 14 Pro (390px)
   - Samsung Galaxy S21 (360px)
   - iPad (768px)

4. **Performance Testing**:
   - Check bundle size
   - Monitor animation performance
   - Test on slow networks

5. **Accessibility Testing**:
   - Verify color contrast
   - Test touch targets
   - Check keyboard navigation

## Browser Support

- iOS Safari 12+
- Chrome Android 80+
- Samsung Internet 12+
- Firefox Android 68+

## Performance Metrics

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 4s

## Optimization Tips

1. **Use CSS Grid/Flexbox** instead of floats
2. **Minimize repaints** with `transform` and `opacity`
3. **Use `will-change`** sparingly
4. **Lazy load images** with `loading="lazy"`
5. **Optimize images** for mobile sizes
6. **Use WebP format** where supported
7. **Minify CSS** in production
8. **Use CSS variables** for theming

## Testing Checklist

- [ ] Mobile header displays correctly
- [ ] Product cards are properly sized
- [ ] Touch targets are 44px minimum
- [ ] Animations are smooth
- [ ] Colors have proper contrast
- [ ] Text is readable at 16px minimum
- [ ] No horizontal scroll
- [ ] Dropdown menu works smoothly
- [ ] Cart button is accessible
- [ ] Store closed banner displays correctly
