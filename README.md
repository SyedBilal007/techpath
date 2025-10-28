# TechPath

A production-ready Next.js 14 application for tech career roadmaps with a modern, futuristic UI.

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 🎨 **TailwindCSS** for styling with custom gradients and animations
- 🌙 **Dark/Light Mode** toggle with system preference detection
- 🎭 **Framer Motion** for smooth animations and transitions
- 🧩 **shadcn/ui** components for consistent, accessible UI
- 📱 **Responsive Design** that works on all devices
- 🗺️ **Dynamic Routing** for career roadmaps with SEO optimization
- 📊 **Interactive Comparison** tool with dropdown selection
- 🎯 **Structured Learning** paths with interactive graph visualization
- 📚 **Resource Hub** organized by career and learning step
- 📧 **Contact Form** with honeypot spam protection

## Pages

- `/` - Homepage with futuristic hero and interactive career cards
- `/roadmaps` - Browse all available career roadmaps
- `/roadmaps/[career]` - Interactive roadmap with graph visualization and sidebar
- `/compare` - Compare different career paths side-by-side
- `/resources` - Curated learning resources and tools
- `/about` - About page with team and mission
- `/contact` - Contact form and support information
- `/privacy` - Privacy policy (GDPR/CCPA compliant, tailored for no-account site)
- `/terms` - Terms of service (educational platform, free content)
- `/site-map` - HTML sitemap for users
- `/sitemap.xml` - XML sitemap for search engines
- `/robots.txt` - Robots directives for crawlers
- `/ads.txt` - AdSense verification file

## Career Paths

- **Data Analyst** - Transform data into actionable insights (6 steps)
- **Web Developer** - Build modern web applications (6 steps)
- **AI Engineer** - Create intelligent systems and models (6 steps)
- **Cybersecurity Analyst** - Protect systems from cyber threats (6 steps)
- **Cloud Architect** - Design scalable cloud infrastructure (6 steps)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **SEO**: next-sitemap, JSON-LD structured data
- **Deployment**: Vercel

## SEO & Analytics Features

### SEO
- ✅ **Automatic Sitemap Generation** - XML and HTML sitemaps
- ✅ **Robots.txt** - Configured for optimal crawling
- ✅ **Meta Tags** - Open Graph and Twitter Cards on all pages
- ✅ **Canonical URLs** - Prevent duplicate content issues
- ✅ **JSON-LD Structured Data**:
  - WebSite schema on homepage
  - Organization schema for company info
  - BreadcrumbList on roadmap pages
  - Course schema for learning paths
- ✅ **Dynamic Metadata** - Per-page SEO optimization
- ✅ **Crawlable Links** - All navigation uses proper anchor tags

### Analytics
- ✅ **Google Analytics 4** - Privacy-first analytics
- ✅ **Cookie Consent Banner** - GDPR/CCPA compliant
- ✅ **localStorage Consent Storage** - Persistent user preferences
- ✅ **Event Tracking Helpers** - Track custom events
- ✅ **IP Anonymization** - Enhanced privacy
- ✅ **Opt-out Support** - Full user control

### Monetization
- ✅ **Google AdSense Integration** - Development-safe ad components
- ✅ **Zero CLS** - Reserved heights prevent layout shifts
- ✅ **Smart Placements** - Top banner, in-content, and sticky mobile ads
- ✅ **Dismissible Mobile Ads** - Better user experience
- ✅ **Production-Ready** - Automatic dev/prod environment detection

### Performance
- ✅ **Static Site Generation (SSG)** - All pages pre-rendered at build time
- ✅ **Code Splitting** - Automatic route-based splitting
- ✅ **Lazy Loading** - Heavy components loaded on demand
- ✅ **Font Optimization** - `display: swap` with system fallbacks
- ✅ **Route Prefetching** - Intelligent preloading of likely pages
- ✅ **Third-Party Script Optimization** - Analytics and ads load after interactive
- ✅ **Framer Motion Optimization** - Selective animations, viewport detection
- ✅ **Zero Layout Shift** - Reserved heights for all dynamic content
- 🎯 **Target: Lighthouse Mobile Score > 90** - Expected: 92-95

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git (for version control)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd techpath
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   Copy `.env.example` to `.env.local` and update with your values:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local`:
   ```bash
   # Site Configuration
   NEXT_PUBLIC_SITE_NAME=TechPath
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Google Analytics (optional - get from https://analytics.google.com)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   
   # Google AdSense (optional - get from https://www.google.com/adsense)
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   ```
   
   **Note:** The app works without these variables:
   - Missing `GA_ID`: Analytics disabled (with dev warning)
   - Missing `ADSENSE_CLIENT`: Shows ad placeholders (with dev warning)
   - Missing `SITE_URL`: Uses `localhost:3000` or current origin
   - Missing `SITE_NAME`: Defaults to "TechPath"

### Development

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Run linting**:
   ```bash
   npm run lint
   ```

4. **Run tests**:
   ```bash
   npm test              # Headless mode
   npm run test:headed   # Visible browser
   npm run test:ui       # Interactive UI mode
   npm run test:debug    # Debug mode
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Start production server** (after build):
   ```bash
   npm start
   ```

## Google Analytics Setup

TechPath includes Google Analytics 4 integration with privacy-first features.

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Features

- **Automatic Initialization**: GA loads only after user consent
- **Cookie Consent Banner**: GDPR/CCPA compliant consent management
- **IP Anonymization**: User privacy protection
- **Event Tracking**: Helper functions for custom events

### 4. Track Custom Events

```typescript
import { trackEvent } from '@/components/analytics/GA'

// Track a custom event
trackEvent('button_click', 'engagement', 'CTA Button', 1)
```

### 5. Cookie Consent

Users can manage their analytics preferences:
- Initial consent banner appears on first visit
- Preferences stored in localStorage
- Can be changed anytime in Privacy Policy page (`/privacy`)
- No tracking without explicit consent

### 6. Privacy Features

- ✅ No data collection without consent
- ✅ Anonymized IP addresses
- ✅ SameSite=None;Secure cookies
- ✅ 26-month data retention (GA default)
- ✅ User can opt-out anytime
- ✅ Full transparency in Privacy Policy

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── roadmaps/          # Roadmap pages
│   ├── compare/           # Comparison page
│   ├── resources/         # Resources page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── sitemap/           # HTML sitemap
│   ├── sitemap.ts         # XML sitemap generator
│   └── robots.ts          # Robots.txt generator
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── analytics/        # Analytics components
│   │   ├── GA.tsx        # Google Analytics
│   │   └── CookieConsent.tsx  # Cookie banner
│   ├── ads/              # AdSense components
│   │   ├── AdTop.tsx     # Top banner ad
│   │   ├── AdInContent.tsx    # In-content ad
│   │   ├── AdStickyMobile.tsx # Mobile sticky ad
│   │   └── AdBase.tsx    # Base ad wrapper
│   ├── Navigation.tsx    # Main navigation
│   ├── Footer.tsx        # Site footer
│   ├── ThemeToggle.tsx   # Theme switcher
│   ├── SEO.tsx           # SEO meta component
│   ├── JsonLd.tsx        # Structured data schemas
│   └── RoadmapGraph.tsx  # Interactive roadmap
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme management
├── data/                 # Static data
│   └── roadmaps.json     # Career roadmap data
├── lib/                  # Utility functions
│   ├── utils.ts          # Helper functions
│   └── roadmaps.ts       # Roadmap helpers
└── types/                # TypeScript types
    └── roadmap.ts        # Roadmap interfaces
```

## Testing

TechPath uses [Playwright](https://playwright.dev) for end-to-end testing.

### Test Structure

- `tests/roadmap.spec.ts` - Tests for roadmap navigation and functionality

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests with visible browser
npm run test:headed

# Run tests in interactive UI mode
npm run test:ui

# Debug tests step-by-step
npm run test:debug

# View test report
npm run test:report
```

### Test Coverage

- ✅ Homepage navigation
- ✅ Data Analyst roadmap page
- ✅ 6 steps render correctly
- ✅ Progress tracking functionality
- ✅ Copy and share buttons
- ✅ Download PDF button

### Adding New Tests

Create test files in the `tests/` directory:

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('/');
  // Your test code here
});
```

## Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SITE_NAME` - Your site name (optional)
     - `NEXT_PUBLIC_SITE_URL` - Your production URL (optional)
     - `NEXT_PUBLIC_GA_ID` - Your Google Analytics Measurement ID (optional)
     - `NEXT_PUBLIC_ADSENSE_CLIENT` - Your AdSense Publisher ID (optional)
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

3. **Post-Deployment Checklist**:
   - [ ] Verify sitemap at `/sitemap.xml`
   - [ ] Submit sitemap to Google Search Console
   - [ ] Submit sitemap to Bing Webmaster Tools
   - [ ] Test all pages load correctly
   - [ ] Test cookie consent banner
   - [ ] Check GA4 real-time reports (if configured)
   - [ ] Verify AdSense ads display (if configured)
   - [ ] Test on mobile devices
   - [ ] Run Lighthouse audit (target: >90)
   - [ ] Check robots.txt at `/robots.txt`
   - [ ] Verify ads.txt at `/ads.txt` (if using AdSense)

### Deploy to Other Platforms

#### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

#### Docker

```bash
# Build Docker image
docker build -t techpath .

# Run container
docker run -p 3000:3000 techpath
```

#### Self-Hosting

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Customization

### Adding New Career Paths

1. Edit `src/data/roadmaps.json`
2. Add your new career path with the required structure:
   ```json
   {
     "title": "Career Name",
     "description": "Brief description",
     "duration": "X-Y months",
     "difficulty": "Beginner|Intermediate|Advanced",
     "skills": [...]
   }
   ```

### Styling

- Modify `src/app/globals.css` for global styles
- Use TailwindCSS classes for component styling
- Customize the gradient backgrounds in individual pages

### Theme

- Theme configuration is in `src/contexts/ThemeContext.tsx`
- Add new theme variants by extending the Theme type
- Customize theme colors in `tailwind.config.js`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us through the contact page
- Join our community discussions

---

Built with ❤️ for the tech community