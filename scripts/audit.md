# Performance Audit & Optimization Guide

**Last Updated:** December 2024  
**Target:** Lighthouse Mobile Score > 90  
**Framework:** Next.js 14 (App Router)

---

## 🎯 Performance Optimizations Implemented

### 1. **Cumulative Layout Shift (CLS) Prevention**

#### Ad Components
All ad components now have **reserved heights** to prevent layout shifts:

```tsx
// src/components/ads/AdBase.tsx
<div 
  style={{ 
    minHeight: placeholderHeight,
    height: placeholderHeight,
    contain: 'layout style paint' // CSS containment
  }}
>
```

**Specific Heights:**
- `AdTop`: 90px (horizontal banner)
- `AdInContent`: 280px (medium rectangle)
- `AdStickyMobile`: 60px (mobile banner)

**Benefits:**
- ✅ Zero layout shift from ad loading
- ✅ CSS `contain` property for performance isolation
- ✅ Consistent placeholder heights in dev mode

---

### 2. **Lazy Loading Strategy**

#### Critical vs Non-Critical Components

**Lazy Loaded (below the fold):**
```tsx
// Footer - below fold, keep SSR for SEO
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true })

// RoadmapGraph - heavy Framer Motion component
const RoadmapGraph = dynamic(() => import("@/components/RoadmapGraph"), {
  loading: () => <Skeleton />,
  ssr: false
})

// Ad Components - not critical for initial render
const AdTop = dynamic(() => import("@/components/ads").then(mod => mod.AdTop), { ssr: false })
```

**NOT Lazy Loaded (above fold):**
- Navigation (sticky header)
- Hero sections (first paint)
- Critical content cards

**Benefits:**
- ✅ Reduced initial JavaScript bundle
- ✅ Faster Time to Interactive (TTI)
- ✅ Better First Contentful Paint (FCP)

---

### 3. **Font Loading Optimization**

#### next/font Configuration

```tsx
// src/app/layout.tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",              // ⚡ Show fallback immediately
  preload: true,                 // Preload primary font
  fallback: ["system-ui", "arial"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,                // Don't preload secondary font
  fallback: ["ui-monospace", "monospace"],
})
```

**Key Strategies:**
- ✅ `display: "swap"` - Show text immediately with fallback
- ✅ Only preload primary font (geistSans)
- ✅ System font fallbacks for instant rendering
- ✅ Automatic font subsetting via next/font

**Benefits:**
- Zero font blocking time
- Instant text visibility
- Reduced FOIT (Flash of Invisible Text)

---

### 4. **Link Prefetching**

#### Intelligent Route Prefetching

```tsx
// src/components/Navigation.tsx
useEffect(() => {
  const prefetchRoutes = async () => {
    const routes = ['/roadmaps', '/compare', '/resources', '/about']
    routes.forEach(route => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = route
      document.head.appendChild(link)
    })
  }
  
  // Delay to not block initial load
  const timer = setTimeout(prefetchRoutes, 2000)
  return () => clearTimeout(timer)
}, [])
```

**Strategy:**
- ✅ Prefetch after 2s delay (after initial load)
- ✅ Only prefetch likely navigation targets
- ✅ Uses browser idle time

**Benefits:**
- Near-instant navigation
- Reduced perceived loading time
- Better user experience

---

### 5. **Third-Party Script Optimization**

#### Google Analytics

```tsx
// src/components/analytics/GA.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
  strategy="afterInteractive"  // ⚡ Load after page interactive
  onLoad={() => setIsLoaded(true)}
/>
```

#### Google AdSense

```tsx
// src/components/ads/AdSenseScript.tsx
<Script
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

**Strategy:**
- ✅ `afterInteractive` - Load after page becomes interactive
- ✅ Don't block main thread
- ✅ Conditional loading (only in production with env vars)

---

### 6. **Image Optimization**

#### next/image Best Practices

**If adding images, always use:**
```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority          // For above-fold images
  placeholder="blur" // For smooth loading
  quality={85}      // Balance quality/size
/>
```

**For below-fold images:**
```tsx
<Image
  src="/feature.jpg"
  alt="Feature"
  width={800}
  height={600}
  loading="lazy"    // Native lazy loading
  quality={80}
/>
```

**Current State:**
- ✅ No unoptimized images in codebase
- ✅ Using SVG icons (lucide-react) for zero-cost icons
- ✅ Gradient backgrounds (CSS, zero HTTP requests)

---

### 7. **Bundle Size Optimization**

#### Code Splitting

**Automatic (Next.js):**
- Each page route is automatically split
- Dynamic imports create separate chunks
- Tree shaking removes unused code

**Manual Optimizations:**
```tsx
// Before: Import entire library
import { motion } from 'framer-motion' // ~25KB

// After: Keep for now, but monitor bundle size
// Consider replacing with CSS animations for simple cases
```

**Monitoring:**
```bash
# Analyze bundle
npm run build
# Look for: Page Size, First Load JS

# Target metrics:
# - First Load JS < 100 KB (ideal)
# - Per-page JS < 50 KB
```

---

### 8. **Framer Motion Optimization**

#### Selective Animation

**Hero Section (Homepage):**
- Keep animations (critical for UX)
- Users expect rich interactions
- Already above fold

**Below Fold:**
- Use `lazy` prop for motion components
- Defer animation initialization

```tsx
// Optimize heavy animations
<motion.div
  initial={false}           // Skip initial animation on SSR
  whileInView={{ opacity: 1 }} // Animate only when visible
  viewport={{ once: true }}    // Animate only once
>
```

**Benefits:**
- ✅ Reduce JavaScript execution
- ✅ Better scroll performance
- ✅ Animations only when needed

---

## 🧪 Running Lighthouse Audit

### Local Audit (Production Build)

```bash
# 1. Build production bundle
npm run build

# 2. Start production server
npm run start

# 3. Open Chrome DevTools
# Navigate to: http://localhost:3000
# Press F12 → Lighthouse tab
# Select: Mobile, Performance
# Click: Generate report
```

### Target Metrics (Mobile)

| Metric | Target | Weight |
|--------|--------|--------|
| **Performance** | > 90 | - |
| First Contentful Paint | < 1.8s | 10% |
| Speed Index | < 3.4s | 10% |
| Largest Contentful Paint | < 2.5s | 25% |
| Time to Interactive | < 3.8s | 10% |
| Total Blocking Time | < 200ms | 30% |
| Cumulative Layout Shift | < 0.1 | 15% |

### Desktop Metrics

| Metric | Expected |
|--------|----------|
| Performance | > 95 |
| Accessibility | > 95 |
| Best Practices | > 95 |
| SEO | 100 |

---

## 📊 Optimization Checklist

### Before Deployment

- [x] All images use next/image
- [x] Fonts optimized with next/font
- [x] Critical CSS inlined (automatic with Next.js)
- [x] JavaScript code-split by route
- [x] Third-party scripts lazy loaded
- [x] Ads have reserved heights (CLS prevention)
- [x] Below-fold components lazy loaded
- [x] Link prefetching enabled
- [ ] Run Lighthouse audit (mobile) - **DO THIS**
- [ ] Verify Core Web Vitals
- [ ] Test on 3G network throttling

### Post-Deployment

- [ ] Monitor real user metrics (Google Analytics)
- [ ] Check PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Set up Core Web Vitals monitoring
- [ ] Review bundle size on every deploy

---

## 🐛 Common Performance Issues & Fixes

### Issue: High CLS Score

**Symptoms:**
- Layout shifts when images/ads load
- Content jumping around

**Fixes:**
- ✅ Already fixed: Ads have reserved heights
- Add `width` and `height` to all images
- Use `placeholder="blur"` for images
- Avoid inserting content above existing content

---

### Issue: High TBT (Total Blocking Time)

**Symptoms:**
- Page feels laggy/unresponsive
- Slow interaction response

**Fixes:**
- Split large JavaScript files
- Lazy load below-fold components
- Use `next/dynamic` for heavy libraries
- Avoid large synchronous operations

**Check:**
```bash
npm run build
# Look for large chunks (> 100 KB)
```

---

### Issue: Slow LCP (Largest Contentful Paint)

**Symptoms:**
- Main content takes long to appear
- Users see blank screen

**Fixes:**
- ✅ Fonts optimized (display: swap)
- ✅ Hero content is server-rendered
- Optimize hero images (use next/image)
- Preload critical assets

---

### Issue: Large JavaScript Bundle

**Symptoms:**
- Slow initial page load
- High First Load JS metric

**Fixes:**
- Use dynamic imports for large libraries
- Remove unused dependencies
- Tree-shake with proper imports
- Consider lighter alternatives

**Example:**
```bash
# Analyze bundle
npm run build

# Look for warnings:
# ⚠ Warning: Large page bundle detected
```

---

## 🚀 Advanced Optimizations (Future)

### 1. Image CDN
```bash
# Add to next.config.js
images: {
  domains: ['cdn.techpath.dev'],
  formats: ['image/avif', 'image/webp'],
}
```

### 2. Edge Caching
- Deploy to Vercel Edge Network
- Add revalidation strategies
- Cache static assets

### 3. Service Worker (PWA)
```bash
npm install next-pwa
# Add offline support
# Cache API responses
```

### 4. Web Vitals Monitoring
```tsx
// src/app/layout.tsx
export function reportWebVitals(metric) {
  // Send to analytics
  window.gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
  })
}
```

---

## 📈 Performance Budget

Set limits to prevent regression:

```json
// .lighthouserc.json (optional)
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

---

## 🔍 Monitoring Tools

### Development
- Chrome DevTools → Lighthouse
- Next.js Build Output
- Bundle Analyzer

### Production
- Google PageSpeed Insights
- Google Search Console (Core Web Vitals)
- Vercel Analytics (if deployed)
- Google Analytics 4 (custom events)

---

## 📝 Testing Checklist

### Manual Tests

```bash
# 1. Test on Mobile
- Open Chrome DevTools
- Toggle device toolbar (Ctrl+Shift+M)
- Select "Moto G Power" or "iPhone 12"
- Throttle to "Fast 3G"
- Reload page and test interactions

# 2. Test Font Loading
- DevTools → Network → Throttle to "Slow 3G"
- Check if text appears immediately (fallback)
- Verify no FOIT (flash of invisible text)

# 3. Test Ad CLS
- Open career page
- Watch for layout shifts as ads load
- Check sticky mobile ad (smooth animation)

# 4. Test Navigation Speed
- Click around site
- Navigation should feel instant (prefetching)
- Check network tab for prefetch requests
```

---

## 🎓 Performance Resources

**Official Docs:**
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

**Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

---

## 🏆 Success Criteria

### Lighthouse Scores (Mobile)

- ✅ **Performance:** > 90
- ✅ **Accessibility:** > 95
- ✅ **Best Practices:** > 95
- ✅ **SEO:** 100

### Core Web Vitals

- ✅ **LCP:** < 2.5s
- ✅ **FID:** < 100ms (or INP < 200ms)
- ✅ **CLS:** < 0.1

### User Experience

- Page load feels instant on 4G
- No visible layout shifts
- Smooth scrolling and animations
- Fast navigation between pages

---

## 📞 Troubleshooting

### Score Below 90?

1. **Check TBT (Total Blocking Time)**
   - High TBT? → Lazy load more components
   - Use Chrome DevTools → Performance tab
   - Look for long tasks (> 50ms)

2. **Check CLS (Cumulative Layout Shift)**
   - Layout shifts? → Add explicit dimensions
   - Ads shifting? → Verify reserved heights
   - Use Layout Shift Regions in DevTools

3. **Check LCP (Largest Contentful Paint)**
   - Slow LCP? → Optimize hero images
   - Check font loading (display: swap)
   - Ensure hero content is above fold

4. **Check Bundle Size**
   ```bash
   npm run build
   # First Load JS should be < 100 KB
   ```

---

## 🔄 Continuous Optimization

### After Every Feature

1. Run `npm run build` - Check bundle size
2. Run Lighthouse audit
3. Test on mobile device
4. Monitor Core Web Vitals

### Monthly

1. Update dependencies
2. Review analytics for slow pages
3. A/B test performance improvements
4. Review and update this document

---

**Last Audit:** _Pending first production audit_  
**Next Review:** _After deployment_

**Audit Command:**
```bash
# Build and audit
npm run build && npm run start
# Then run Lighthouse in Chrome DevTools
```

**Expected Result:** Lighthouse Mobile Performance > 90 ✨


