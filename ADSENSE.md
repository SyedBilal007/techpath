# Google AdSense Integration Guide

This document explains the AdSense implementation in TechPath, including ad placement, configuration, and best practices.

## Overview

TechPath uses Google AdSense with a development-safe approach that prevents Cumulative Layout Shift (CLS) and provides a seamless experience across all environments.

## Key Features

✅ **Development-Safe** - Bordered placeholders in dev mode (no live ads)  
✅ **Zero CLS** - Reserved heights prevent layout shifts  
✅ **Production-Ready** - Full AdSense integration with proper initialization  
✅ **Mobile-Optimized** - Dismissible sticky mobile ad  
✅ **Responsive** - Auto-adjusting ad formats  
✅ **Privacy-Friendly** - Respects user preferences  

## Architecture

### Components

All ad components are located in `src/components/ads/`:

1. **`AdBase.tsx`** - Core wrapper component
2. **`AdTop.tsx`** - Top banner ad
3. **`AdInContent.tsx`** - In-content ad
4. **`AdStickyMobile.tsx`** - Sticky mobile banner
5. **`AdSenseScript.tsx`** - Script loader

### Component Structure

```
src/components/ads/
├── AdBase.tsx           # Core ad wrapper with dev/prod logic
├── AdTop.tsx            # Top banner (horizontal)
├── AdInContent.tsx      # In-content ad (auto format)
├── AdStickyMobile.tsx   # Sticky mobile ad (dismissible)
├── AdSenseScript.tsx    # AdSense script loader
└── index.ts             # Exports
```

## Setup

### 1. Get AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up and get approved
3. Get your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### 2. Create Ad Units

In AdSense dashboard, create ad units:

1. **Top Banner**
   - Type: Display ads
   - Size: Responsive
   - Get Ad Slot ID (e.g., `1234567890`)

2. **In-Content**
   - Type: In-article ads
   - Size: Responsive
   - Get Ad Slot ID (e.g., `9876543210`)

3. **Mobile Sticky**
   - Type: Display ads
   - Size: Responsive
   - Get Ad Slot ID (e.g., `5555555555`)

### 3. Configure Environment Variable

Add to `.env.local`:

```bash
# Google AdSense Publisher ID
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

**Important**: The `NEXT_PUBLIC_` prefix makes the variable available in the browser.

### 4. Update Ad Slot IDs

Update the slot IDs in each component:

**`src/components/ads/AdTop.tsx`:**
```tsx
adSlot="YOUR_TOP_AD_SLOT_ID"  // Replace 1234567890
```

**`src/components/ads/AdInContent.tsx`:**
```tsx
adSlot="YOUR_IN_CONTENT_AD_SLOT_ID"  // Replace 9876543210
```

**`src/components/ads/AdStickyMobile.tsx`:**
```tsx
adSlot="YOUR_MOBILE_AD_SLOT_ID"  // Replace 5555555555
```

## Components

### AdBase (Core Wrapper)

The foundation component that handles dev/prod rendering:

```tsx
import { AdBase } from '@/components/ads'

<AdBase
  adSlot="1234567890"
  adFormat="auto"
  fullWidthResponsive={true}
  placeholderHeight="250px"
  placeholderLabel="Advertisement"
/>
```

**Props:**
- `adSlot` (required) - AdSense ad slot ID
- `adFormat` - `'auto' | 'rectangle' | 'horizontal' | 'vertical'`
- `fullWidthResponsive` - Enable responsive sizing (default: true)
- `placeholderHeight` - Dev placeholder height (default: '250px')
- `placeholderLabel` - Dev placeholder label (default: 'Advertisement')
- `className` - Additional CSS classes

**Behavior:**
- **Development**: Shows bordered placeholder with reserved height
- **Production (no env var)**: Shows placeholder with config message
- **Production (with env var)**: Renders actual AdSense ad

### AdTop

Top banner ad that appears below the header on career pages.

```tsx
import { AdTop } from '@/components/ads'

<AdTop />
```

**Specifications:**
- Format: Horizontal banner
- Height: 90px (reserved)
- Responsive: Yes
- Location: Career roadmap pages
- Desktop & Mobile: Visible

**Features:**
- Full-width responsive
- Centered with max-width
- Minimal padding for better integration

### AdInContent

In-content ad that appears after the RoadmapGraph.

```tsx
import { AdInContent } from '@/components/ads'

<AdInContent />
```

**Specifications:**
- Format: Auto (adapts to container)
- Height: 280px (reserved)
- Responsive: Yes
- Location: After interactive roadmap
- Desktop & Mobile: Visible

**Features:**
- Centered with max-width (2xl)
- Rounded corners
- Natural content integration

### AdStickyMobile

Sticky banner at the bottom of the screen, mobile-only.

```tsx
import { AdStickyMobile } from '@/components/ads'

<AdStickyMobile />
```

**Specifications:**
- Format: Auto (optimized for mobile)
- Height: 60px (reserved)
- Responsive: Mobile only (< 768px)
- Location: Fixed at bottom
- Dismissible: Yes

**Features:**
- Only shows on mobile devices
- Appears after 3-second delay
- Dismissible with X button
- Remembers dismissal for 24 hours (localStorage)
- Smooth animations (Framer Motion)
- Elevated with shadow for visibility

**localStorage Key:**
```javascript
'sticky-ad-dismissed' // 'true' when dismissed
```

### AdSenseScript

Script loader that includes the AdSense JavaScript.

```tsx
import { AdSenseScript } from '@/components/ads'

<AdSenseScript />
```

**Behavior:**
- Only loads in production
- Only loads when `NEXT_PUBLIC_ADSENSE_CLIENT` is set
- Uses Next.js `<Script>` with `afterInteractive` strategy
- Includes `crossOrigin="anonymous"` for security

## Ad Placements

### Current Implementation

**Career Roadmap Pages** (`/roadmaps/[career]`):

1. **`<AdTop />`**
   - Position: Below site header, before page content
   - Visibility: Desktop + Mobile
   - Format: Horizontal banner

2. **`<AdInContent />`**
   - Position: After RoadmapGraph, before Steps Overview
   - Visibility: Desktop + Mobile
   - Format: Responsive rectangle

3. **`<AdStickyMobile />`**
   - Position: Fixed bottom (global)
   - Visibility: Mobile only
   - Format: Sticky banner

### Recommended Additional Placements

You can add ads to other pages:

**Homepage** (`src/app/page.tsx`):
```tsx
import { AdInContent } from '@/components/ads'

// After hero section, before career cards
<AdInContent />
```

**Resources Page** (`src/app/resources/page.tsx`):
```tsx
import { AdTop, AdInContent } from '@/components/ads'

<AdTop />
// ... content ...
<AdInContent />
```

**Blog Posts** (if you add a blog):
```tsx
import { AdInContent, AdStickyMobile } from '@/components/ads'

// Between sections
<AdInContent />

// Global mobile
<AdStickyMobile />
```

## Development vs Production

### Development Mode

**Characteristics:**
- `process.env.NODE_ENV !== 'production'`
- Bordered placeholders with dashed borders
- Reserved heights to prevent CLS
- No actual AdSense scripts loaded
- No external requests

**Example Placeholder:**
```
┌─────────────────────────────────┐
│                                 │
│        Advertisement            │
│       Development Mode          │
│                                 │
└─────────────────────────────────┘
```

**Benefits:**
- ✅ No AdSense violations (testing on localhost)
- ✅ Visual representation of ad placement
- ✅ No layout shifts
- ✅ Faster development
- ✅ No external dependencies

### Production Mode

**Characteristics:**
- `process.env.NODE_ENV === 'production'`
- `NEXT_PUBLIC_ADSENSE_CLIENT` is set
- Real AdSense ads load
- Full tracking and revenue

**Features:**
- Auto-optimization by AdSense
- Real-time bidding
- Responsive ad sizing
- Full monetization

## AdSense Policies Compliance

### Auto Ads Disabled

This implementation uses **manual ad placements** (not Auto Ads) for:
- ✅ Better control over user experience
- ✅ No unexpected ad insertions
- ✅ Consistent layout
- ✅ Compliance with content policies

### Placement Best Practices

✅ **Not above the fold** - Top ad appears after header  
✅ **Clear separation** - Ads visually distinct from content  
✅ **Limited density** - Max 3 ads per page  
✅ **Mobile-friendly** - Dismissible sticky ad  
✅ **Non-intrusive** - No pop-ups or overlays  

### Content Guidelines

Ensure your content:
- ✅ Provides value to users
- ✅ Has sufficient text content (300+ words per page)
- ✅ Is original and unique
- ✅ Complies with AdSense Program Policies
- ✅ Has clear navigation

## Performance Optimization

### CLS Prevention

**Reserved Heights:**
All ads have `minHeight` set to prevent layout shifts:

```tsx
style={{ minHeight: placeholderHeight }}
```

**Values:**
- Top: `90px`
- In-Content: `280px`
- Mobile Sticky: `60px`

### Lazy Loading

AdSense ads are loaded with `afterInteractive` strategy:

```tsx
<Script strategy="afterInteractive" />
```

This ensures ads load after the page is interactive, not blocking initial render.

### Mobile Optimization

**Sticky Ad Delay:**
```tsx
setTimeout(() => setIsVisible(true), 3000)
```

Shows sticky ad after 3 seconds to avoid immediate disruption.

**Dismissal Memory:**
```tsx
localStorage.setItem('sticky-ad-dismissed', 'true')
```

Remembers dismissal for 24 hours.

## Testing

### Local Development

```bash
npm run dev
```

**Expected:**
- Placeholders with "Development Mode"
- No AdSense scripts loaded
- No console errors
- Reserved space (no layout shifts)

### Production Build (Local)

```bash
npm run build
npm start
```

**Without AdSense ID:**
- Placeholders with "AdSense Not Configured"
- No AdSense scripts

**With AdSense ID:**
- Real ads load
- Test on multiple devices
- Verify ad display

### Staging/Production

```bash
# Set environment variable
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Deploy to Vercel
vercel
```

**Verification:**
1. Open DevTools → Network tab
2. Filter for `googlesyndication.com`
3. Verify scripts load
4. Check ads display correctly
5. Test on mobile devices
6. Verify sticky ad dismissal works

## Troubleshooting

### Ads Not Showing

**Check:**
1. Is `NEXT_PUBLIC_ADSENSE_CLIENT` set?
   ```bash
   echo $NEXT_PUBLIC_ADSENSE_CLIENT
   ```

2. Are you in production mode?
   ```javascript
   console.log(process.env.NODE_ENV)
   ```

3. Is the ad slot ID correct?
   ```tsx
   adSlot="1234567890"  // Check this
   ```

4. Open DevTools → Console for errors

5. Check AdSense account approval status

### Blank Ad Space

**Possible causes:**
- AdSense account pending approval
- Ad slot ID mismatch
- Insufficient content on page
- Ad blocker enabled
- Policy violation

**Solutions:**
- Wait for account approval (can take days)
- Verify slot IDs in AdSense dashboard
- Add more content (300+ words recommended)
- Test in incognito mode (disable ad blockers)
- Review AdSense policy center

### Layout Shifts

**Fix:**
Ensure all ads have `placeholderHeight` set:

```tsx
<AdBase placeholderHeight="250px" />
```

Adjust heights based on actual ad sizes.

### Mobile Sticky Ad Not Dismissing

**Check:**
1. localStorage permissions
2. JavaScript console for errors
3. Browser compatibility

**Debug:**
```javascript
// Check localStorage
console.log(localStorage.getItem('sticky-ad-dismissed'))

// Clear dismissal
localStorage.removeItem('sticky-ad-dismissed')
```

## Revenue Optimization

### Best Practices

1. **Content Quality**
   - High-quality, original content
   - Comprehensive guides (1000+ words)
   - Regular updates

2. **Ad Placement**
   - Above the fold (but not at very top)
   - Between content sections
   - High-engagement areas

3. **User Experience**
   - Fast page load
   - Mobile-responsive
   - Minimal intrusion

4. **A/B Testing**
   - Test different placements
   - Monitor bounce rates
   - Adjust based on data

### Monitoring

**Key Metrics:**
- Page RPM (Revenue Per Mille)
- CTR (Click-Through Rate)
- Viewability percentage
- CLS score (< 0.1 is good)

**Tools:**
- Google AdSense dashboard
- Google Analytics 4
- Chrome DevTools (Core Web Vitals)
- PageSpeed Insights

## AdSense Policies

### Important Rules

❌ **Don't:**
- Click your own ads
- Encourage clicks ("Click here!")
- Place ads on error pages
- Mislead users about ad nature
- Violate content policies

✅ **Do:**
- Provide valuable content
- Maintain clear labeling
- Follow placement guidelines
- Monitor policy updates
- Respond to policy violations promptly

### Content Requirements

✅ Original content  
✅ Sufficient text (300+ words)  
✅ Easy navigation  
✅ Privacy policy page  
✅ Contact information  

## Environment Variables

### Required

```bash
# AdSense Publisher ID (required for production ads)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

### Optional

```bash
# Site URL (for canonical tags, already set)
NEXT_PUBLIC_SITE_URL=https://techpath.dev
```

## Deployment

### Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add:
   - Key: `NEXT_PUBLIC_ADSENSE_CLIENT`
   - Value: `ca-pub-XXXXXXXXXXXXXXXX`
3. **Redeploy** the project

### Other Platforms

Set environment variable in your platform's dashboard:

**Netlify:**
- Site Settings → Environment → Environment variables

**Railway:**
- Project → Variables

**Docker:**
```dockerfile
ENV NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

## Next Steps

1. ✅ Get AdSense account approved
2. ✅ Create ad units in AdSense dashboard
3. ✅ Update ad slot IDs in components
4. ✅ Set `NEXT_PUBLIC_ADSENSE_CLIENT` in environment
5. ✅ Deploy to production
6. ✅ Monitor AdSense dashboard for impressions
7. ✅ Optimize based on performance data
8. ✅ Stay compliant with policies

## Support & Resources

- **AdSense Help**: [support.google.com/adsense](https://support.google.com/adsense)
- **Policy Center**: [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- **Best Practices**: [AdSense Optimization](https://support.google.com/adsense/answer/9183549)
- **Performance**: [Core Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: October 2025  
**Status**: Production-Ready  
**License**: MIT






