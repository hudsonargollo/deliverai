# Mobile Testing Quick Start Guide

**Date**: April 7, 2026
**Status**: READY TO TEST
**Development Server**: ✅ RUNNING

---

## 🚀 Quick Start

### 1. Development Server is Running
```
✅ npm run dev
✅ http://localhost:8080
✅ Ready to test
```

### 2. Access on Mobile Device

#### Option A: Same Network (Recommended)
1. Find your computer's IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
2. On mobile device, open:
   ```
   http://[YOUR-IP]:8080
   ```

#### Option B: Chrome DevTools Emulator
1. Open http://localhost:8080 in Chrome
2. Press F12 to open DevTools
3. Click device icon (top-left of DevTools)
4. Select device (iPhone SE, iPhone 14 Pro, Galaxy S21, iPad)
5. Test on emulated screen

#### Option C: Safari Responsive Design Mode
1. Open http://localhost:8080 in Safari
2. Press Cmd+Option+I to open DevTools
3. Click Develop → Enter Responsive Design Mode
4. Select device from dropdown
5. Test on emulated screen

---

## 📱 Testing Devices

### iPhone SE (375px)
- **Viewport**: 375 × 667
- **Browser**: Safari
- **OS**: iOS 15+
- **Test URL**: http://[YOUR-IP]:8080

### iPhone 14 Pro (390px)
- **Viewport**: 390 × 844
- **Browser**: Safari
- **OS**: iOS 16+
- **Test URL**: http://[YOUR-IP]:8080

### Samsung Galaxy S21 (360px)
- **Viewport**: 360 × 800
- **Browser**: Chrome
- **OS**: Android 12+
- **Test URL**: http://[YOUR-IP]:8080

### iPad (768px)
- **Viewport**: 768 × 1024
- **Browser**: Safari
- **OS**: iOS 15+
- **Test URL**: http://[YOUR-IP]:8080

---

## ✅ Quick Visual Checklist

### Header (56px)
- [ ] Logo visible (40px)
- [ ] Title "Cardápio" centered
- [ ] Cart badge shows count
- [ ] Menu button visible
- [ ] Logout button visible
- [ ] Sticky (stays at top)

### Product Cards
- [ ] Images 112px × 112px
- [ ] Purple border on images
- [ ] Title visible
- [ ] Description visible (1 line)
- [ ] Price visible and bold
- [ ] Add button visible (green)
- [ ] 12px spacing between cards

### Cart Button
- [ ] Shows when items added
- [ ] Green gradient (#34D399)
- [ ] Shows item count
- [ ] Shows total price
- [ ] Bottom right position

### Store Closed Banner
- [ ] Red gradient when closed
- [ ] Text readable
- [ ] Icon visible
- [ ] Proper positioning

---

## 🎯 Quick Functional Checklist

### Navigation
- [ ] Category dropdown opens/closes
- [ ] Clicking category scrolls to section
- [ ] Dropdown closes after selection

### Add to Cart
- [ ] Click product opens detail view
- [ ] Add button works
- [ ] Toast shows success message
- [ ] Cart badge updates
- [ ] Cart button shows total

### Quantity Controls
- [ ] Plus button increases quantity
- [ ] Minus button decreases quantity
- [ ] Remove button works
- [ ] Cart updates correctly

### Checkout
- [ ] Checkout button works
- [ ] Redirects to checkout page
- [ ] No console errors

### Logout
- [ ] Logout button works
- [ ] Redirects to auth page
- [ ] Session ends

---

## 🔍 Quick Performance Checklist

### Load Time
- [ ] Page loads in < 2 seconds
- [ ] Images load properly
- [ ] No blank areas

### Animations
- [ ] Smooth (200-300ms)
- [ ] No janky movements
- [ ] No lag on interactions

### Scrolling
- [ ] Smooth scrolling
- [ ] No stuttering
- [ ] Responsive to touch

---

## ♿ Quick Accessibility Checklist

### Touch Targets
- [ ] All buttons 44px minimum
- [ ] Easy to tap
- [ ] No accidental taps

### Text
- [ ] Readable (16px minimum)
- [ ] Good contrast
- [ ] Headings larger

### Keyboard
- [ ] Tab navigation works
- [ ] Enter activates buttons
- [ ] Focus visible

---

## 🐛 Quick Debugging

### Console Errors
1. Open DevTools (F12)
2. Check Console tab
3. Look for red errors
4. Note error messages

### Layout Issues
1. Check viewport width
2. Look for horizontal scroll
3. Check padding/margins
4. Verify responsive design

### Performance Issues
1. Check Network tab
2. Look for slow requests
3. Check image sizes
4. Look for large bundles

---

## 📸 Screenshots to Take

### Visual Testing
- [ ] Header on iPhone SE
- [ ] Header on iPhone 14 Pro
- [ ] Header on Galaxy S21
- [ ] Header on iPad
- [ ] Product cards on iPhone SE
- [ ] Product cards on iPhone 14 Pro
- [ ] Product cards on Galaxy S21
- [ ] Product cards on iPad
- [ ] Cart button on iPhone SE
- [ ] Store closed banner

### Functional Testing
- [ ] Category dropdown open
- [ ] Product detail view
- [ ] Add to cart toast
- [ ] Cart with items
- [ ] Checkout page

### Performance Testing
- [ ] Network tab (load time)
- [ ] Performance tab (animations)
- [ ] Memory usage

---

## 📝 Issue Template

```
Device: [iPhone SE / 14 Pro / Galaxy S21 / iPad]
OS: [iOS / Android]
Browser: [Safari / Chrome]
Date: [Date]

Issue: [Brief description]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected: [What should happen]
Actual: [What actually happened]

Severity: [Critical / High / Medium / Low]

Screenshot: [Attach if possible]
Console Error: [If applicable]
```

---

## 🎬 Testing Workflow

1. **Setup**
   - Open http://localhost:8080 on device
   - Open DevTools (F12)
   - Clear console

2. **Visual Testing**
   - Check header
   - Check cards
   - Check buttons
   - Check colors
   - Take screenshots

3. **Functional Testing**
   - Test navigation
   - Test add to cart
   - Test quantity controls
   - Test checkout
   - Check console

4. **Performance Testing**
   - Check load time
   - Check animations
   - Check scrolling
   - Check memory

5. **Accessibility Testing**
   - Check touch targets
   - Check text size
   - Check contrast
   - Test keyboard

6. **Documentation**
   - Record results
   - Note issues
   - Take screenshots
   - Create report

---

## 🎯 Success Criteria

### Visual ✅
- Header is compact (56px)
- Product cards properly sized
- Images visible
- Colors consistent
- Text readable

### Functional ✅
- All buttons work
- Navigation works
- Add to cart works
- Quantity controls work
- No console errors

### Performance ✅
- Page loads < 2s
- Animations smooth
- No layout shifts
- No memory leaks

### Accessibility ✅
- Color contrast good
- Touch targets 44px
- Keyboard navigation works
- Screen reader works

---

## 📞 Need Help?

### Common Issues

**Header not sticky**
- Check: src/index.css
- Look for: position: sticky

**Images not loading**
- Check: Database image URLs
- Look for: 404 errors in Network tab

**Touch targets too small**
- Check: src/index.css
- Look for: min-height: 44px

**Animations janky**
- Check: src/index.css
- Look for: animation duration

### Debugging Tips

1. **Check Console**
   - F12 → Console tab
   - Look for red errors
   - Note error messages

2. **Check Network**
   - F12 → Network tab
   - Look for failed requests
   - Check image sizes

3. **Check Performance**
   - F12 → Performance tab
   - Record interaction
   - Look for long tasks

4. **Check Accessibility**
   - F12 → Accessibility tab
   - Check contrast
   - Check ARIA labels

---

## 📊 Testing Summary Template

```
Device: [Device Name]
Date: [Date]
Tester: [Name]

Visual: PASS / FAIL
- Issues: [List any issues]

Functional: PASS / FAIL
- Issues: [List any issues]

Performance: PASS / FAIL
- Issues: [List any issues]

Accessibility: PASS / FAIL
- Issues: [List any issues]

Overall: PASS / FAIL

Notes: [Any additional notes]
```

---

## 🚀 Ready to Test!

1. ✅ Development server running
2. ✅ Testing guide ready
3. ✅ Devices ready
4. ✅ Checklist prepared

**Start testing now!**

---

**Status**: READY TO TEST
**Last Updated**: April 7, 2026
**Development Server**: ✅ RUNNING (http://localhost:8080)

