# SEO Implementation Guide

This document outlines the SEO implementation for TechPath.

## Overview

TechPath is fully optimized for search engines with comprehensive meta tags, structured data, and automatic sitemap generation.

## Features

### 1. Automatic Sitemap Generation

**XML Sitemap** (`/sitemap.xml`)
- Auto-generated on build using `next-sitemap`
- Includes all static and dynamic pages
- Custom priorities and change frequencies
- Updates automatically when content changes

**HTML Sitemap** (`/sitemap`)
- Human-readable sitemap for users
- Organized by category
- Lists all career roadmaps and resources
- Linked from footer

### 2. Robots.txt

Location: `/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Sitemap: https://techpath.dev/sitemap.xml
```

### 3. Meta Tags

All pages include:
- Title (unique per page)
- Description
- Keywords
- Canonical URL
- Open Graph tags (Facebook)
- Twitter Card tags
- Viewport and theme-color
- Robots directives

Example from homepage:
```tsx
<meta property="og:title" content="TechPath | Your Journey to Tech Excellence" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://techpath.dev/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

### 4. JSON-LD Structured Data

#### WebSite Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TechPath",
  "description": "...",
  "url": "https://techpath.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://techpath.dev?q={search_term_string}"
  }
}
```

#### Organization Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechPath",
  "url": "https://techpath.dev",
  "logo": "https://techpath.dev/logo.png",
  "sameAs": [
    "https://twitter.com/techpath",
    "https://github.com/techpath"
  ]
}
```

#### BreadcrumbList (Roadmap Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "..." },
    { "@type": "ListItem", "position": 2, "name": "Roadmaps", "item": "..." },
    { "@type": "ListItem", "position": 3, "name": "Data Analyst", "item": "..." }
  ]
}
```

#### Course Schema (Roadmap Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Data Analyst Learning Path",
  "description": "...",
  "provider": { "@type": "Organization", "name": "TechPath" }
}
```

## Components

### SEO Component
Location: `src/components/SEO.tsx`

Reusable component for adding meta tags to any page.

Usage:
```tsx
import { SEO } from '@/components/SEO'

<SEO
  title="Page Title"
  description="Page description"
  canonical="https://techpath.dev/page"
  keywords={['keyword1', 'keyword2']}
/>
```

### JSON-LD Components
Location: `src/components/JsonLd.tsx`

- `WebSiteSchema` - For homepage
- `OrganizationSchema` - For company info
- `BreadcrumbSchema` - For breadcrumb navigation
- `CourseSchema` - For learning paths
- `FAQSchema` - For FAQ pages

## Configuration

### next-sitemap.config.js

```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://techpath.dev',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  // Custom priority for important pages
  transform: async (config, path) => {
    if (path === '/') return { priority: 1.0, changefreq: 'daily' }
    if (path.startsWith('/roadmaps/')) return { priority: 0.9 }
    return config
  }
}
```

### Build Script

The sitemap is automatically generated after each build:

```json
{
  "scripts": {
    "build": "next build && next-sitemap",
    "postbuild": "next-sitemap"
  }
}
```

## Dynamic Routes

### Roadmap Pages

Each career roadmap generates:
1. Dynamic metadata (title, description, OG tags)
2. BreadcrumbList JSON-LD
3. Course schema JSON-LD
4. Canonical URL
5. Sitemap entry

See: `src/app/roadmaps/[career]/page.tsx`

## Best Practices

### 1. Titles
- Unique per page
- 50-60 characters
- Include brand name
- Format: "Page Title | TechPath"

### 2. Descriptions
- 150-160 characters
- Include target keywords
- Compelling call-to-action
- Unique per page

### 3. URLs
- Clean and descriptive
- Use hyphens for word separation
- Lowercase only
- Include keywords

### 4. Images
- Include alt text
- Optimize file size
- Use descriptive filenames
- Provide OG images (1200x630px)

### 5. Internal Linking
- Use descriptive anchor text
- Link to related content
- Maintain logical site structure
- Include breadcrumbs

## Monitoring

### Tools to Use

1. **Google Search Console**
   - Monitor indexing status
   - Check for crawl errors
   - View search performance

2. **Google Analytics**
   - Track organic traffic
   - Monitor bounce rates
   - Analyze user behavior

3. **Lighthouse**
   - SEO score
   - Performance metrics
   - Accessibility checks

### Key Metrics

- **Indexation Rate**: How many pages are indexed
- **Organic Traffic**: Visitors from search engines
- **Average Position**: Search result rankings
- **CTR**: Click-through rate from search results
- **Core Web Vitals**: LCP, FID, CLS scores

## Testing

### Validate Structured Data

Use Google's Rich Results Test:
https://search.google.com/test/rich-results

Test each schema:
- Homepage (WebSite + Organization)
- Roadmap pages (Breadcrumb + Course)

### Check Sitemaps

1. Visit `/sitemap.xml` - should load without errors
2. Visit `/robots.txt` - should show correct directives
3. Visit `/sitemap` - HTML sitemap should render

### Verify Meta Tags

Use tools like:
- Meta Tags (https://metatags.io/)
- Twitter Card Validator
- Facebook Sharing Debugger

## Deployment

When deploying to production:

1. Set environment variable: `SITE_URL=https://techpath.dev`
2. Run `npm run build` to generate sitemap
3. Verify sitemap.xml is accessible
4. Submit sitemap to Google Search Console
5. Monitor for any crawl errors

## Additional Resources

- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)



