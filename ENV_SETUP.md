# Environment Variables Setup Guide

## Overview

TechPath uses environment variables to configure site-wide settings, analytics, and monetization features. All configuration is **optional** - the app works perfectly fine without any environment variables set.

---

## Quick Start

### 1. Copy the Example File

```bash
cp .env.example .env.local
```

### 2. Update Values

Edit `.env.local` with your actual values:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_NAME=TechPath
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-YOUR_PUBLISHER_ID
```

### 3. Restart Dev Server

```bash
npm run dev
```

---

## Environment Variables Reference

### `NEXT_PUBLIC_SITE_NAME`

**Purpose:** Site name used in metadata, titles, and branding  
**Default:** `"TechPath"`  
**Required:** No  
**Example:** `TechPath`

**Usage:**
- Page titles: `"Data Analyst Roadmap | TechPath"`
- Open Graph metadata
- SEO structured data

---

### `NEXT_PUBLIC_SITE_URL`

**Purpose:** Base URL for your site (used in sitemaps, canonical URLs, Open Graph)  
**Default:** `"http://localhost:3000"` (dev) or current origin  
**Required:** No (but recommended for production)  
**Examples:**
- Development: `http://localhost:3000`
- Production: `https://techpath.dev`
- Custom domain: `https://your-domain.com`

**Usage:**
- XML sitemap generation
- Canonical URLs
- Open Graph URLs
- Social sharing metadata

**⚠️ Important:**
- Use `http://localhost:3000` for local development
- Use your actual domain for production
- Don't include trailing slash

---

### `NEXT_PUBLIC_GA_ID`

**Purpose:** Google Analytics 4 Measurement ID  
**Default:** None (analytics disabled)  
**Required:** No  
**Format:** `G-XXXXXXXXXX`  
**Where to get:** https://analytics.google.com

**Setup:**
1. Create a GA4 property at https://analytics.google.com
2. Go to Admin → Data Streams → Web
3. Copy your Measurement ID (starts with `G-`)
4. Add to `.env.local`

**Behavior:**
- ✅ **With ID:** Analytics tracking enabled (requires user cookie consent)
- ❌ **Without ID:** Analytics disabled, console warning in dev mode

**Features Enabled:**
- Page view tracking
- Event tracking (`trackEvent` helper)
- User consent management
- IP anonymization (privacy-first)

**Example:**
```bash
NEXT_PUBLIC_GA_ID=G-ABC123XYZ
```

---

### `NEXT_PUBLIC_ADSENSE_CLIENT`

**Purpose:** Google AdSense Publisher Client ID  
**Default:** None (shows ad placeholders)  
**Required:** No  
**Format:** `ca-pub-1234567890123456`  
**Where to get:** https://www.google.com/adsense

**Setup:**
1. Apply for AdSense at https://www.google.com/adsense
2. Wait for approval (can take days/weeks)
3. Get your Publisher ID from AdSense dashboard
4. Add to `.env.local`
5. Update ad slot IDs in ad components (see ADSENSE.md)
6. Update `src/app/ads.txt/route.ts` with your Publisher ID

**Behavior:**
- ✅ **With ID (production):** Real ads displayed
- ❌ **Without ID:** Placeholder ads shown
- 🔧 **Development:** Always shows placeholders (with console warning)

**Ad Placements:**
- `AdTop` - Banner ad below header (90px)
- `AdInContent` - In-content ad (280px)
- `AdStickyMobile` - Sticky mobile banner (60px)

**Example:**
```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
```

---

## Development Warnings

When running in development mode (`npm run dev`), the app automatically checks for missing environment variables and logs helpful warnings:

### Server-Side Warnings (Terminal)

```bash
🔍 Checking environment variables...

⚠️  Optional environment variables not set:
• NEXT_PUBLIC_GA_ID - Google Analytics will be disabled
• NEXT_PUBLIC_ADSENSE_CLIENT - AdSense ads will show placeholders
• NEXT_PUBLIC_SITE_URL - Using default localhost (update for production)

ℹ️  Copy .env.example to .env.local and add your values.
```

### Client-Side Warnings (Browser Console)

**Google Analytics Missing:**
```
⚠️ Google Analytics: NEXT_PUBLIC_GA_ID not set
Add it to .env.local to enable analytics tracking.
See .env.example for reference.
```

**Google AdSense Missing:**
```
⚠️ Google AdSense: NEXT_PUBLIC_ADSENSE_CLIENT not set
Ad placeholders will be shown instead of real ads.
Add your AdSense client ID to .env.local after approval.
See .env.example for reference.
```

**These warnings only appear in development mode and are automatically disabled in production.**

---

## Environment Variable Utilities

### Location: `src/lib/env.ts`

Centralized environment variable management with validation and helpers.

### Available Exports

```typescript
import { env, getSiteMetadata, getFullUrl } from '@/lib/env'

// Environment configuration
env.siteName          // 'TechPath'
env.siteUrl           // 'http://localhost:3000' or your domain
env.gaId              // Google Analytics ID or undefined
env.adsenseClient     // AdSense Client ID or undefined
env.hasAnalytics      // boolean: true if GA ID is set
env.hasAdsense        // boolean: true if AdSense client is set
env.isDev             // boolean: true in development
env.isProd            // boolean: true in production

// Helper functions
getSiteMetadata()     // Get site name, URL, description, OG image
getFullUrl('/path')   // Convert path to full URL
```

### Usage Examples

```typescript
// In components
import { env } from '@/lib/env'

if (env.hasAnalytics) {
  // Track event
  gtag('event', 'click', { ... })
}

// Get full URL for canonical tags
import { getFullUrl } from '@/lib/env'

const canonicalUrl = getFullUrl('/roadmaps/data-analyst')
// Returns: 'https://techpath.dev/roadmaps/data-analyst'

// Get site metadata for SEO
import { getSiteMetadata } from '@/lib/env'

const metadata = getSiteMetadata()
// Returns:
// {
//   name: 'TechPath',
//   url: 'https://techpath.dev',
//   description: 'Interactive, step-by-step learning paths for tech careers',
//   ogImage: 'https://techpath.dev/og-image.png'
// }
```

---

## Production Deployment

### Vercel (Recommended)

1. **Deploy via CLI:**
   ```bash
   vercel --prod
   ```

2. **Add environment variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add each variable for Production, Preview, and Development
   - Redeploy to apply changes

3. **Via Vercel Dashboard:**
   ```
   Project → Settings → Environment Variables → Add
   
   Name: NEXT_PUBLIC_SITE_NAME
   Value: TechPath
   Environments: Production, Preview, Development
   
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://your-domain.vercel.app
   Environments: Production, Preview, Development
   
   Name: NEXT_PUBLIC_GA_ID
   Value: G-YOUR_ID
   Environments: Production, Preview, Development
   
   Name: NEXT_PUBLIC_ADSENSE_CLIENT
   Value: ca-pub-YOUR_ID
   Environments: Production only
   ```

### Other Platforms

**Netlify:**
```bash
# netlify.toml
[build.environment]
  NEXT_PUBLIC_SITE_NAME = "TechPath"
  NEXT_PUBLIC_SITE_URL = "https://your-site.netlify.app"
```

**Docker:**
```dockerfile
# Dockerfile
ENV NEXT_PUBLIC_SITE_NAME=TechPath
ENV NEXT_PUBLIC_SITE_URL=https://your-domain.com
ENV NEXT_PUBLIC_GA_ID=G-YOUR_ID
ENV NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-YOUR_ID
```

---

## Security Notes

### ✅ Safe to Expose (Public)

All `NEXT_PUBLIC_*` variables are **embedded into the client-side JavaScript bundle** and visible to users. This is by design and safe for:

- ✅ Site name and URL
- ✅ Google Analytics Measurement ID
- ✅ Google AdSense Publisher ID

These are **not secret** and are meant to be public.

### ❌ Never Use for Secrets

**DO NOT** store sensitive data in `NEXT_PUBLIC_*` variables:

- ❌ API keys with write access
- ❌ Database credentials
- ❌ Authentication secrets
- ❌ Private tokens

For server-only secrets, use regular environment variables (without `NEXT_PUBLIC_` prefix) and access them in Server Components or API Routes.

---

## Troubleshooting

### Environment Variables Not Working

**Problem:** Changes to `.env.local` not reflecting

**Solution:**
1. Restart the dev server (`Ctrl+C` then `npm run dev`)
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

### Build Failing with Missing Variables

**Problem:** Build fails saying variables are required

**Solution:**
- Environment variables are **optional** - the build should never fail
- Check for typos in variable names
- Ensure you're using `NEXT_PUBLIC_` prefix for client-side variables

### Production Site Not Using Environment Variables

**Problem:** Production deployment not loading environment variables

**Solution:**
1. Verify variables are set in your hosting platform (Vercel, Netlify, etc.)
2. Check variable names match exactly (case-sensitive)
3. Redeploy after adding variables
4. Check browser console for warnings

### Console Warnings in Production

**Problem:** Seeing dev warnings in production

**Solution:**
- Warnings only appear in development (`NODE_ENV=development`)
- In production, missing variables are silently handled with defaults
- Check that `NODE_ENV=production` in your deployment

---

## FAQ

### Q: Do I need to set all environment variables?

**A:** No! All variables are optional. The app works perfectly fine with defaults:
- No analytics if `GA_ID` not set
- Placeholder ads if `ADSENSE_CLIENT` not set
- Default site name and localhost URL

### Q: Can I use different values for dev/prod?

**A:** Yes! Use `.env.local` for local development and set production values in your hosting platform.

### Q: Why do I see warnings in the console?

**A:** In development, helpful warnings alert you to missing optional config. They disappear in production.

### Q: How do I change the site name?

**A:** Set `NEXT_PUBLIC_SITE_NAME` in `.env.local` and restart the dev server.

### Q: Can I use custom domain?

**A:** Yes! Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in your production environment variables.

### Q: Do I need to rebuild after changing env vars?

**A:** For local development, just restart `npm run dev`. For production, redeploy.

---

## Reference Files

- **`.env.example`** - Template with all available variables
- **`src/lib/env.ts`** - Environment variable utilities and validation
- **`src/app/layout.tsx`** - Uses site metadata for SEO
- **`src/components/analytics/GA.tsx`** - Google Analytics integration
- **`src/components/ads/AdSenseScript.tsx`** - AdSense script loader
- **`src/components/ads/AdBase.tsx`** - Ad component base
- **`src/components/SEO.tsx`** - SEO metadata component

---

## Related Documentation

- **ANALYTICS.md** - Google Analytics 4 setup guide
- **ADSENSE.md** - Google AdSense integration guide
- **SEO.md** - SEO implementation details
- **README.md** - Main project documentation

---

**Need Help?**

- Check `.env.example` for correct format
- Run `npm run dev` and check console for warnings
- See related documentation above
- All variables are optional - defaults work fine!

---

**Last Updated:** 2024-10-27  
**Status:** ✅ Environment variable system fully implemented  
**Validation:** Development warnings enabled  
**Production Ready:** ✅ Yes




