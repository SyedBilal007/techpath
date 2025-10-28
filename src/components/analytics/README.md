# Analytics Components

This folder contains Google Analytics 4 integration with privacy-first features.

## Components

### 1. GA.tsx

Main Google Analytics component that loads gtag.js.

**Usage in `layout.tsx`**:
```tsx
import { GA } from '@/components/analytics/GA'

<GA />
```

**Features**:
- Loads only after user consent
- Listens for consent changes
- IP anonymization enabled
- Secure cookie settings

### 2. CookieConsent.tsx

Two components for cookie consent management:

#### CookieConsent (Banner)

Animated consent banner that appears on first visit.

**Usage**:
```tsx
import { CookieConsent } from '@/components/analytics/CookieConsent'

<CookieConsent />
```

**Features**:
- Appears after 1-second delay
- Three options: Accept, Decline, Close
- Smooth Framer Motion animations
- Stores preference in localStorage
- Dispatches custom events for GA

#### CookieSettings

Settings panel for managing preferences.

**Usage**:
```tsx
import { CookieSettings } from '@/components/analytics/CookieConsent'

<CookieSettings />
```

**Features**:
- Toggle analytics on/off
- Reset preferences
- Show current status
- Used in Privacy Policy page

## Event Tracking

### Track Events

```typescript
import { trackEvent } from '@/components/analytics/GA'

// Basic event
trackEvent('button_click', 'engagement', 'CTA Button')

// With value
trackEvent('purchase', 'ecommerce', 'Plan', 99.99)
```

### Track Page Views

```typescript
import { trackPageView } from '@/components/analytics/GA'

trackPageView('/custom-page')
```

## localStorage Keys

- `cookie-consent` - Stores user's consent choice (`'granted'` | `'denied'`)

## Custom Events

The components dispatch custom events for communication:

```typescript
// When consent changes
const event = new CustomEvent('cookie-consent-change', { 
  detail: 'granted' | 'denied' 
})
window.dispatchEvent(event)
```

## Environment Variables

Required:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Optional:
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Privacy Features

✅ No tracking without consent  
✅ IP anonymization  
✅ Secure cookies (SameSite=None;Secure)  
✅ Consent stored in localStorage  
✅ Full opt-out support  
✅ Transparent in Privacy Policy  

## Testing

1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Accept/decline cookies
4. Check Network tab for GA requests
5. Verify GA4 DebugView

## Documentation

See `ANALYTICS.md` in the root directory for comprehensive documentation.

