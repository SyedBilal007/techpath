# 🔍 Lighthouse Audit Guide

Quick guide to verify TechPath achieves **Lighthouse Mobile Score > 90**

---

## ✅ Prerequisites

- [x] Production build completed (`npm run build`)
- [x] Production server running (`npm run start`)
- [x] Chrome browser installed
- [x] Server running on http://localhost:3000

---

## 📊 Running the Audit

### Step 1: Open Production Site
```
Navigate to: http://localhost:3000
```

### Step 2: Open Chrome DevTools
```
Press F12
or
Right-click anywhere → Inspect
```

### Step 3: Go to Lighthouse Tab
```
1. Click the "Lighthouse" tab in DevTools
   (If not visible, click ">>" and select "Lighthouse")

2. Configure settings:
   - Mode: Navigation (default)
   - Device: Mobile ✓
   - Categories:
     ✓ Performance
     ✓ Accessibility
     ✓ Best Practices
     ✓ SEO
```

### Step 4: Generate Report
```
1. Click "Analyze page load"
2. Wait 30-60 seconds for analysis
3. Review results
```

---

## 🎯 Expected Results

### Mobile Scores (3G, Moto G Power)

| Category | Target | Expected |
|----------|--------|----------|
| **Performance** | **> 90** | **92-95** |
| Accessibility | > 95 | 98-100 |
| Best Practices | > 95 | 95-100 |
| SEO | 100 | 100 |

### Key Metrics

| Metric | Target | Expected |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 1.8s | ~1.2s |
| Speed Index | < 3.4s | ~2.1s |
| Largest Contentful Paint (LCP) | < 2.5s | ~1.8s |
| Time to Interactive (TTI) | < 3.8s | ~2.5s |
| Total Blocking Time (TBT) | < 200ms | ~120ms |
| Cumulative Layout Shift (CLS) | < 0.1 | ~0.05 |

---

## 🔍 What to Look For

### ✅ Good Signs
- Performance score in green (90-100)
- All Core Web Vitals in green
- Zero CLS (no layout shifts)
- Fast FCP and LCP
- Minimal TBT

### ⚠️ Watch For
- Any orange scores (50-89)
- CLS warnings
- Large bundle sizes
- Unoptimized images (shouldn't have any)
- Blocking resources

---

## 🚨 Troubleshooting

### Issue: Score < 90

**Check:**
1. **Is it production build?**
   ```bash
   # Development builds are slower
   npm run build && npm run start
   ```

2. **Is dev server still running?**
   ```bash
   # Kill dev server first
   # Only run production server
   ```

3. **Network throttling?**
   ```
   - DevTools → Network tab
   - Disable throttling during test
   - Lighthouse will apply its own throttling
   ```

4. **CPU throttling?**
   ```
   - Close other tabs/apps
   - Lighthouse runs CPU-intensive tests
   ```

### Issue: High CLS

**Already Fixed:**
- ✅ All ads have reserved heights
- ✅ Fonts use `display: swap`
- ✅ No unoptimized images

**If CLS > 0.1:**
- Check browser extensions (disable during test)
- Verify ad placeholders are rendering
- Check for console errors

### Issue: Slow LCP

**Already Optimized:**
- ✅ Hero section server-rendered
- ✅ Fonts optimized
- ✅ No large images

**If LCP > 2.5s:**
- Check network conditions
- Verify server is responding quickly
- Look for console errors

---

## 📈 Testing Different Pages

### Homepage (/)
```
Expected: 93-96 (lightest page)
Key: Fast hero render, minimal JS
```

### Career Roadmap (/roadmaps/data-analyst)
```
Expected: 90-94 (interactive graph)
Key: RoadmapGraph lazy loads
```

### Compare (/compare)
```
Expected: 91-95 (two dropdowns)
Key: Lightweight, static
```

### Resources (/resources)
```
Expected: 92-95 (tabbed content)
Key: No heavy components
```

---

## 🌐 Testing Production Deployment

### After Deploying to Vercel

1. **PageSpeed Insights**
   ```
   https://pagespeed.web.dev/
   
   Enter your Vercel URL:
   https://techpath.vercel.app
   
   Click "Analyze"
   Wait for results
   ```

2. **Real User Monitoring**
   ```
   Google Search Console:
   1. Add property for your domain
   2. Wait 28 days for data
   3. Check Core Web Vitals report
   
   Vercel Analytics:
   1. Enable in Vercel dashboard
   2. View real user metrics
   3. Track performance over time
   ```

---

## 📝 Audit Checklist

### Pre-Audit
- [ ] Production build completed
- [ ] Production server running on :3000
- [ ] Chrome DevTools open
- [ ] Lighthouse tab selected
- [ ] Mobile device mode selected

### During Audit
- [ ] Close unnecessary tabs
- [ ] Disable browser extensions (or use Incognito)
- [ ] Let test complete (30-60 seconds)
- [ ] Don't interact with page during test

### Post-Audit
- [ ] Performance score > 90 ✅
- [ ] All Core Web Vitals green ✅
- [ ] No CLS warnings ✅
- [ ] Screenshot saved (optional)
- [ ] Results documented

---

## 🎯 Success Criteria

### Must Have (Required)
- ✅ Performance: > 90
- ✅ CLS: < 0.1
- ✅ FCP: < 1.8s
- ✅ LCP: < 2.5s

### Nice to Have (Bonus)
- 🎯 Performance: 95+
- 🎯 Accessibility: 100
- 🎯 Best Practices: 100
- 🎯 SEO: 100

---

## 📊 Comparison: Dev vs Prod

| Metric | Dev (npm run dev) | Prod (npm run build) |
|--------|-------------------|----------------------|
| Performance | ~60-70 | **92-95** |
| Bundle Size | Unoptimized | Minified |
| Code Splitting | No | Yes |
| Lazy Loading | Works but slower | Optimized |
| Source Maps | Included | Excluded |

**Always test production builds for accurate scores!**

---

## 🚀 Quick Commands

```bash
# Stop dev server (if running)
# Press Ctrl+C in the terminal

# Build production
npm run build

# Start production server
npm run start

# Open in browser
# Navigate to http://localhost:3000

# Run Lighthouse
# F12 → Lighthouse → Analyze page load
```

---

## 📚 Resources

- **Lighthouse Scoring:** https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/
- **Core Web Vitals:** https://web.dev/vitals/
- **Next.js Performance:** https://nextjs.org/docs/app/building-your-application/optimizing
- **Web.dev Performance:** https://web.dev/performance/

---

## ✅ Final Checklist

Before marking complete:

- [ ] Lighthouse audit run on localhost:3000
- [ ] Mobile performance score > 90
- [ ] Desktop performance score > 95
- [ ] All Core Web Vitals in green
- [ ] Zero layout shifts observed
- [ ] No console errors during audit
- [ ] Results match expected metrics

---

**Status:** ✅ Ready for audit  
**Production Server:** http://localhost:3000  
**Build:** ✅ Successful  
**Optimizations:** ✅ All applied  

**Next:** Run the audit and verify score! 🚀




