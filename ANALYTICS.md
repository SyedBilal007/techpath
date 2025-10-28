# Google Analytics 4 Integration Guide

This document explains the Google Analytics 4 (GA4) implementation in TechPath, including privacy features and usage guidelines.

## Overview

TechPath uses Google Analytics 4 with a privacy-first approach, ensuring compliance with GDPR, CCPA, and other privacy regulations.

## Key Features

✅ **Consent-based tracking** - No data collection without user consent  
✅ **Cookie consent banner** - GDPR/CCPA compliant  
✅ **IP anonymization** - Enhanced user privacy  
✅ **localStorage preferences** - Persistent consent storage  
✅ **Event tracking helpers** - Easy custom event tracking  
✅ **Automatic page view tracking** - Via Next.js navigation  
✅ **Opt-out support** - Users can revoke consent anytime  

## Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Property**, click **Create Property**
4. Follow the setup wizard:
   - Enter property name: "TechPath"
   - Select timezone and currency
   - Configure data collection (Web)
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Add your Measurement ID to `.env.local`:

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Site URL for production
NEXT_PUBLIC_SITE_URL=https://techpath.dev
```

**Important**: The `NEXT_PUBLIC_` prefix makes the variable available in the browser.

### 3. Verify Installation

1. Start the dev server: `npm run dev`
2. Open the site in your browser
3. Accept cookies in the consent banner
4. Open browser DevTools → Network tab
5. Look for requests to `www.googletagmanager.com`
6. Check GA4 DebugView (in GA admin) for real-time data

## Components

### GA Component

**Location**: `src/components/analytics/GA.tsx`

Main component that loads Google Analytics:

```tsx
import { GA } from '@/components/analytics/GA'

// In layout.tsx
<GA />
```

**Features**:
- Loads gtag.js script only when consent is granted
- Listens for consent changes
- Automatically sends initial page view
- Configures IP anonymization

### Cookie Consent Banner

**Location**: `src/components/analytics/CookieConsent.tsx`

Beautiful, animated consent banner:

```tsx
import { CookieConsent } from '@/components/analytics/CookieConsent'

// In layout.tsx
<CookieConsent />
```

**Features**:
- Appears 1 second after page load
- Smooth animations (Framer Motion)
- Three options: Accept, Decline, Close
- Stores preference in localStorage
- Links to Privacy Policy

### Cookie Settings Component

**Location**: `src/components/analytics/CookieConsent.tsx`

Allows users to manage preferences:

```tsx
import { CookieSettings } from '@/components/analytics/CookieConsent'

// In privacy policy or settings page
<CookieSettings />
```

**Features**:
- Toggle analytics on/off
- Reset preferences
- Show current consent status

## Tracking Events

### Basic Event Tracking

Use the `trackEvent` helper function:

```typescript
import { trackEvent } from '@/components/analytics/GA'

// Basic event
trackEvent('button_click', 'engagement', 'Sign Up Button')

// Event with value
trackEvent('purchase', 'ecommerce', 'Premium Plan', 99.99)

// Parameters:
// 1. action: string - The event action (e.g., 'click', 'submit', 'view')
// 2. category: string - The event category (e.g., 'engagement', 'navigation')
// 3. label?: string - Optional label for more context
// 4. value?: number - Optional numeric value
```

### Common Event Examples

**Button Clicks**:
```typescript
trackEvent('click', 'engagement', 'CTA Button - Get Started')
```

**Form Submissions**:
```typescript
trackEvent('submit', 'forms', 'Contact Form')
```

**Navigation**:
```typescript
trackEvent('navigation', 'menu', 'Roadmaps - Data Analyst')
```

**Downloads**:
```typescript
trackEvent('download', 'resources', 'Roadmap PDF')
```

**Video/Content Interaction**:
```typescript
trackEvent('play', 'video', 'Tutorial Video')
trackEvent('complete', 'course', 'Step 1 - Introduction')
```

**Social Sharing**:
```typescript
trackEvent('share', 'social', 'Twitter')
```

### Page View Tracking

Page views are automatically tracked on route changes. To manually track:

```typescript
import { trackPageView } from '@/components/analytics/GA'

trackPageView('/custom-page')
```

### Custom Dimensions (Advanced)

For more advanced tracking, use the global `gtag` function:

```typescript
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'custom_event', {
    event_category: 'engagement',
    event_label: 'custom_label',
    custom_dimension_1: 'value',
    custom_dimension_2: 'another_value',
  })
}
```

## Privacy Implementation

### Consent Flow

1. **First Visit**: Banner appears after 1-second delay
2. **User Choice**:
   - **Accept**: GA loads, tracking begins
   - **Decline**: No GA, no tracking
   - **Close**: Banner disappears (no choice stored)
3. **Subsequent Visits**: Preference remembered, no banner

### Data Stored

**localStorage**:
```javascript
// Key: 'cookie-consent'
// Value: 'granted' | 'denied'
localStorage.getItem('cookie-consent')
```

**Cookies** (only if consent granted):
- `_ga` - Main GA cookie (2 years)
- `_ga_*` - Property-specific cookie (2 years)
- `_gid` - User session (24 hours)

### Privacy Safeguards

1. **No tracking without consent** - GA script doesn't load until accepted
2. **IP anonymization** - `anonymize_ip: true` in config
3. **Secure cookies** - `SameSite=None;Secure` flags
4. **Data retention** - 26 months (GA4 default, configurable)
5. **Opt-out support** - Users can revoke consent anytime
6. **Transparency** - Full disclosure in Privacy Policy

### GDPR Compliance

✅ **Consent before processing** - No tracking without explicit consent  
✅ **Clear information** - Privacy Policy explains data usage  
✅ **Easy opt-out** - One-click consent revocation  
✅ **Data minimization** - Only essential analytics data  
✅ **User rights** - Access, rectification, erasure supported  

## Configuration

### GA Script Configuration

Located in `src/components/analytics/GA.tsx`:

```typescript
gtag('config', '${gaId}', {
  page_path: window.location.pathname,
  anonymize_ip: true,                    // Anonymize IP addresses
  cookie_flags: 'SameSite=None;Secure'   // Secure cookie settings
})
```

### Consent Configuration

```typescript
gtag('consent', 'default', {
  'analytics_storage': 'granted'  // or 'denied'
})
```

## Monitoring & Debugging

### GA4 DebugView

1. Open Google Analytics
2. Navigate to **Admin** → **DebugView**
3. Events appear in real-time when in debug mode

Enable debug mode:
```typescript
// In GA.tsx, add to config:
gtag('config', '${gaId}', {
  debug_mode: true  // Only for development!
})
```

### Browser Console

Check if GA is loaded:
```javascript
console.log(window.gtag)        // Should be a function
console.log(window.dataLayer)   // Should be an array
```

Check consent status:
```javascript
console.log(localStorage.getItem('cookie-consent'))
```

### Network Tab

Filter for `google-analytics.com` or `googletagmanager.com` to see requests.

## Best Practices

### 1. Track Meaningful Events

Focus on events that provide actionable insights:
- ✅ User goals (signups, completions)
- ✅ Feature usage
- ✅ Engagement metrics
- ❌ Excessive clicks
- ❌ Mouse movements
- ❌ Every scroll

### 2. Use Consistent Naming

Establish naming conventions:
```typescript
// Good: verb_noun format
trackEvent('click_cta', 'engagement', 'Get Started')
trackEvent('submit_form', 'conversion', 'Contact')

// Avoid: inconsistent casing/structure
trackEvent('Button Click', 'click', 'button')
```

### 3. Respect User Privacy

- Always check consent before tracking
- Don't track sensitive information
- Be transparent in Privacy Policy
- Make opt-out easy to find

### 4. Test Before Deploying

- Verify events in GA4 DebugView
- Test consent flow thoroughly
- Check both accept and decline paths
- Validate on mobile devices

### 5. Document Custom Events

Keep a registry of all custom events:
```typescript
// events.ts
export const EVENTS = {
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  ROADMAP_VIEW: 'roadmap_view',
  // ... more events
}
```

## Troubleshooting

### GA Not Loading

**Check**:
1. Is `NEXT_PUBLIC_GA_ID` set correctly?
2. Did user accept cookies?
3. Check browser console for errors
4. Verify network requests in DevTools

### Events Not Appearing

**Check**:
1. Is consent granted? (`localStorage.getItem('cookie-consent')`)
2. Is `window.gtag` defined?
3. Are you calling `trackEvent` correctly?
4. Check GA4 DebugView for real-time data

### Consent Banner Not Showing

**Check**:
1. Clear localStorage: `localStorage.removeItem('cookie-consent')`
2. Refresh page
3. Check browser console for errors
4. Verify component is imported in layout

## Production Deployment

### Vercel

Environment variables are automatically handled:

1. Go to Vercel project settings
2. Navigate to **Environment Variables**
3. Add `NEXT_PUBLIC_GA_ID` with your Measurement ID
4. Redeploy the project

### Other Platforms

Ensure environment variables are set:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs/reference)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [GDPR Compliance](https://support.google.com/analytics/answer/9019185)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)

## Support

For issues or questions:
- Check GA4 DebugView
- Review browser console logs
- Test with different browsers
- Verify environment variables
- Check Privacy Policy page functionality

---

**Last Updated**: October 2025  
**GA4 Property**: TechPath Analytics  
**Implementation**: Privacy-First, GDPR-Compliant







