# TechPath Setup Guide

Quick start guide to get TechPath up and running locally and in production.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- (Optional) Google Analytics 4 account

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd techpath
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables (Optional)

Create a `.env.local` file in the root directory:

```bash
# Google Analytics 4 (optional - can skip for local development)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL for SEO
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: The app works perfectly fine without Google Analytics configured. The analytics will simply not load if the environment variable is not set.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

- ✅ Navigate through different pages
- ✅ Test theme toggle (light/dark mode)
- ✅ Try the career search on homepage
- ✅ View a roadmap page
- ✅ Test the comparison tool
- ✅ Check cookie consent banner (if GA is configured)

## Production Deployment

### Vercel (Recommended)

#### Step 1: Prepare for Deployment

```bash
# Build locally to verify no errors
npm run build

# Test production build locally
npm start
```

#### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

#### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Your Google Analytics Measurement ID |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Your production URL |

3. Click **Save**
4. **Redeploy** the project for changes to take effect

#### Step 4: Verify Deployment

- ✅ Visit your live site
- ✅ Check `/sitemap.xml` is accessible
- ✅ Check `/robots.txt` is accessible
- ✅ Test cookie consent banner appears
- ✅ Accept cookies and verify GA events in DebugView
- ✅ Test all pages load correctly
- ✅ Verify theme toggle works
- ✅ Test mobile responsiveness

### Other Platforms

#### Netlify

```bash
# Build command
npm run build

# Output directory
.next

# Environment variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

#### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Google Analytics Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property details:
   - Property name: "TechPath"
   - Time zone: Your timezone
   - Currency: Your currency
5. Click **Next** → **Create**
6. Choose **Web** as platform
7. Enter your website URL
8. Copy your **Measurement ID** (G-XXXXXXXXXX)

### 2. Configure Data Streams

1. In GA4, go to **Admin** → **Data Streams**
2. Click your web stream
3. Enable **Enhanced measurement** (recommended)
4. Optionally configure:
   - Cross-domain tracking
   - User ID tracking
   - Custom dimensions

### 3. Test Analytics

1. Add `NEXT_PUBLIC_GA_ID` to your environment
2. Deploy or restart local server
3. Visit your site and accept cookies
4. Open GA4 → **Reports** → **Realtime**
5. You should see your session appear

### 4. Set Up Important Events

In GA4 Admin:

1. Go to **Events**
2. Mark these as **Conversions**:
   - `button_click` (CTA interactions)
   - `form_submit` (Contact form)
   - `roadmap_view` (Career path views)

### 5. Create Custom Reports (Optional)

Useful reports to create:
- Most viewed career paths
- User journey flow
- Device breakdown
- Geographic distribution
- Conversion funnel

## SEO Configuration

### 1. Submit Sitemap to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (verify ownership)
3. Go to **Sitemaps** in left menu
4. Enter: `https://your-domain.com/sitemap.xml`
5. Click **Submit**

### 2. Verify Structured Data

1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your homepage URL
3. Verify WebSite and Organization schemas are detected
4. Test a roadmap page for BreadcrumbList and Course schemas

### 3. Monitor Search Performance

Check weekly in Google Search Console:
- Impressions and clicks
- Average position
- Search queries
- Page indexing status

## Customization

### Adding a New Career Path

1. Open `src/data/roadmaps.json`
2. Add a new career object:

```json
{
  "career": "Mobile Developer",
  "slug": "mobile-developer",
  "tagline": "Build native iOS and Android apps",
  "steps": [
    {
      "name": "Learn Programming Basics",
      "desc": "Start with Swift or Kotlin",
      "resources": [
        "Swift Programming",
        "Kotlin Fundamentals"
      ]
    }
    // ... more steps
  ]
}
```

3. The new roadmap will automatically appear on:
   - Homepage career cards
   - `/roadmaps` listing
   - Comparison tool
   - Sitemaps

### Customizing Theme Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Change primary color */
  --accent: 210 40% 96.1%;        /* Change accent color */
  /* ... more variables */
}
```

### Adding Custom Analytics Events

In any component:

```typescript
import { trackEvent } from '@/components/analytics/GA'

function MyComponent() {
  const handleClick = () => {
    trackEvent('custom_action', 'category', 'label')
    // Your logic here
  }
  
  return <button onClick={handleClick}>Click me</button>
}
```

## Troubleshooting

### Issue: Cookie Banner Not Appearing

**Solution**:
1. Clear browser localStorage: `localStorage.clear()`
2. Refresh page
3. Banner should appear after 1 second

### Issue: GA Not Tracking

**Check**:
1. Is `NEXT_PUBLIC_GA_ID` set correctly?
2. Did you accept cookies?
3. Open DevTools → Console, check for errors
4. Open DevTools → Network, filter for `google-analytics`
5. Check GA4 DebugView for real-time events

### Issue: Build Errors

**Common fixes**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Issue: Sitemap Not Generating

**Check**:
1. Is `next-sitemap` installed? `npm list next-sitemap`
2. Does `next-sitemap.config.js` exist in root?
3. Run build: `npm run build`
4. Check `public/sitemap.xml` was created

### Issue: Theme Not Persisting

**Solution**:
- Clear browser cookies/localStorage
- Check `next-themes` is installed
- Verify `ThemeProvider` wraps app in `layout.tsx`

## Maintenance

### Regular Tasks

**Weekly**:
- Check GA4 reports for anomalies
- Review Search Console performance
- Monitor error logs in Vercel

**Monthly**:
- Update dependencies: `npm outdated` → `npm update`
- Review and update roadmap content
- Check broken links
- Audit Core Web Vitals in PageSpeed Insights

**Quarterly**:
- Review privacy policy for compliance
- Update career paths with new resources
- Analyze top-performing content
- Optimize for new search queries

### Security Updates

```bash
# Check for security vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Manual fixes for breaking changes
npm audit fix --force
```

## Performance Optimization

### Image Optimization

- Use Next.js `<Image>` component
- Serve images in WebP format
- Implement lazy loading

### Code Splitting

- Use dynamic imports for large components
- Split vendor bundles
- Implement route-based code splitting

### Caching Strategy

```typescript
// In next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

## Support & Resources

- **Documentation**: See `README.md` for overview
- **Analytics Guide**: See `ANALYTICS.md` for GA4 details
- **SEO Guide**: See `SEO.md` for search optimization
- **Issues**: Open an issue on GitHub
- **Questions**: Check the FAQ in `/contact` page

## Next Steps

After successful deployment:

1. ✅ Submit sitemap to Google Search Console
2. ✅ Set up GA4 custom events and conversions
3. ✅ Create social media og-images
4. ✅ Set up monitoring (Vercel Analytics, Sentry)
5. ✅ Plan content updates and new roadmaps
6. ✅ Gather user feedback
7. ✅ Iterate and improve

---

**Happy coding!** 🚀

For more detailed information, see:
- `README.md` - Project overview
- `ANALYTICS.md` - Google Analytics guide
- `SEO.md` - SEO implementation details






