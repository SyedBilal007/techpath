/**
 * Environment variable utilities with validation and warnings
 */

const isDev = process.env.NODE_ENV === 'development'

/**
 * Get an environment variable with optional validation
 */
function getEnvVar(key: string, required: boolean = false): string | undefined {
  const value = process.env[key]
  
  if (required && !value && isDev) {
    console.warn(
      `⚠️ Missing required environment variable: ${key}\n` +
      `Please add it to your .env.local file.\n` +
      `See .env.example for reference.`
    )
  }
  
  return value
}

/**
 * Site configuration from environment variables
 */
export const env = {
  // Site information
  siteName: getEnvVar('NEXT_PUBLIC_SITE_NAME') || 'TechPath',
  siteUrl: getEnvVar('NEXT_PUBLIC_SITE_URL') || 
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
  
  // Google Analytics
  gaId: getEnvVar('NEXT_PUBLIC_GA_ID'),
  
  // Google AdSense
  adsenseClient: getEnvVar('NEXT_PUBLIC_ADSENSE_CLIENT'),
  
  // Helper flags
  hasAnalytics: !!getEnvVar('NEXT_PUBLIC_GA_ID'),
  hasAdsense: !!getEnvVar('NEXT_PUBLIC_ADSENSE_CLIENT'),
  isDev,
  isProd: process.env.NODE_ENV === 'production',
}

/**
 * Validate environment variables on startup (dev only)
 */
if (isDev && typeof window === 'undefined') {
  // Server-side validation
  console.log('\n🔍 Checking environment variables...\n')
  
  const warnings: string[] = []
  
  if (!env.gaId) {
    warnings.push('• NEXT_PUBLIC_GA_ID - Google Analytics will be disabled')
  }
  
  if (!env.adsenseClient) {
    warnings.push('• NEXT_PUBLIC_ADSENSE_CLIENT - AdSense ads will show placeholders')
  }
  
  if (env.siteUrl === 'http://localhost:3000') {
    warnings.push('• NEXT_PUBLIC_SITE_URL - Using default localhost (update for production)')
  }
  
  if (warnings.length > 0) {
    console.warn(
      '⚠️  Optional environment variables not set:\n' +
      warnings.join('\n') +
      '\n\nℹ️  Copy .env.example to .env.local and add your values.\n'
    )
  } else {
    console.log('✅ All environment variables configured!\n')
  }
}

/**
 * Get the full URL for a path
 */
export function getFullUrl(path: string = ''): string {
  const baseUrl = env.siteUrl.replace(/\/$/, '') // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Get site metadata
 */
export function getSiteMetadata() {
  return {
    name: env.siteName,
    url: env.siteUrl,
    description: 'Interactive, step-by-step learning paths for tech careers',
    ogImage: getFullUrl('/og-image.png'),
  }
}




