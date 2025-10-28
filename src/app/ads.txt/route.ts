import { NextResponse } from 'next/server'

/**
 * ads.txt route handler for Google AdSense
 * 
 * This file is required by Google AdSense to verify ownership of your site.
 * It must be accessible at: https://yourdomain.com/ads.txt
 * 
 * IMPORTANT: Replace pub-1234567890123456 with your actual AdSense Publisher ID
 * after your AdSense account is approved.
 * 
 * Find your Publisher ID in Google AdSense dashboard:
 * 1. Go to https://www.google.com/adsense/
 * 2. Click on "Account" in the left sidebar
 * 3. Your Publisher ID will be shown (format: ca-pub-XXXXXXXXXXXXXXXX)
 * 4. Use only the numeric part after "ca-pub-"
 */

export async function GET() {
  const adsContent = `# ads.txt for TechPath
# Replace pub-1234567890123456 with your real publisher ID after AdSense approval
# Format: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0

google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0

# The format breakdown:
# - google.com: The advertising system domain
# - pub-XXXXXXXXXXXXXXXX: Your unique AdSense Publisher ID (REPLACE THIS!)
# - DIRECT: Indicates you directly control this inventory
# - f08c47fec0942fa0: Google's unique identifier (certified ads.txt identifier)

# Additional notes:
# - This file helps prevent unauthorized inventory sales
# - It's required for AdSense monetization
# - Keep this file at the root of your domain
# - Update the Publisher ID once you're approved by AdSense
`

  return new NextResponse(adsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}






