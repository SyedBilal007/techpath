import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import { CookieSettings } from '@/components/analytics/CookieConsent'

export const metadata: Metadata = {
  title: 'Privacy Policy | TechPath',
  description: 'Learn how TechPath collects, uses, and protects your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Privacy & Security
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Welcome to TechPath. We respect your privacy and are committed to transparency about how we handle 
                information on our website. TechPath is a free educational platform providing career roadmaps and 
                learning resources. <strong>We do not require user accounts, do not collect personal information, 
                and do not sell any data.</strong>
              </p>
              <p>
                This privacy policy explains our minimal data practices and how we use cookies for analytics and 
                advertising purposes only.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>What We DO NOT Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="font-semibold text-green-600 dark:text-green-400">
                TechPath does NOT collect, store, or process:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Personal information (names, emails, phone numbers)</li>
                <li>❌ User accounts or login credentials</li>
                <li>❌ Payment information (the site is completely free)</li>
                <li>❌ Location data beyond country-level analytics</li>
                <li>❌ Browsing history outside our site</li>
                <li>❌ Any information for selling to third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Information We Collect (Analytics Only)</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We only collect anonymous, aggregated data through third-party services to understand how 
                visitors use our site and to improve the learning experience.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-4">Google Analytics (Optional)</h3>
              <p>
                With your consent, we use Google Analytics to collect anonymous usage statistics:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Anonymized IP addresses (last octet removed)</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Device type (mobile, desktop, tablet)</li>
                <li>Approximate geographic location (country/city level)</li>
                <li>Referring website</li>
              </ul>
              <p className="mt-2">
                <strong>You control this:</strong> Analytics only run if you accept cookies in our consent banner.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Google AdSense (Optional)</h3>
              <p>
                We display ads through Google AdSense to support the free content. AdSense may use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Show relevant advertisements</li>
                <li>Measure ad performance</li>
                <li>Prevent fraudulent activity</li>
              </ul>
              <p className="mt-2">
                AdSense operates independently and follows Google's advertising policies. 
                See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google's Advertising Policy</a> for details.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Analytics:</strong> To understand how users navigate our site</li>
                <li><strong>Improvement:</strong> To enhance user experience and content</li>
                <li><strong>Performance:</strong> To monitor site performance and fix issues</li>
                <li><strong>Security:</strong> To detect and prevent abuse or malicious activity</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We use cookies and similar tracking technologies to track activity on our website. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for the website to function (theme preference)</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics (only with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <CookieSettings />
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Google Analytics</h3>
              <p>
                We use Google Analytics to analyze website traffic. Google Analytics is a web analytics 
                service that tracks and reports website traffic. Google uses the data collected to track 
                and monitor the use of our service.
              </p>
              <p>
                You can opt-out of having your activity tracked by Google Analytics by installing the 
                Google Analytics opt-out browser add-on or by declining our cookie consent.
              </p>
              <p>
                For more information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Privacy Policy</a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We retain analytics data for a maximum of 26 months, after which it is automatically deleted. 
                Cookie consent preferences are stored in your browser's local storage indefinitely until you 
                clear your browser data or reset your preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request restriction of processing</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@techpath.dev" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@techpath.dev</a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li>Email: <a href="mailto:privacy@techpath.dev" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@techpath.dev</a></li>
                <li>Website: <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Form</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


