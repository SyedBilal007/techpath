import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | TechPath',
  description: 'Terms and conditions for using TechPath learning platform.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Legal Terms
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Important Notice */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    Free Educational Platform
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    TechPath is a free educational resource. We do not require accounts, collect personal 
                    information, or charge for any content. By using this site, you agree to these terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement to Terms */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>1. Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                By accessing and using TechPath ("we", "us", "our"), you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </CardContent>
          </Card>

          {/* Description of Service */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                TechPath provides:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Career Roadmaps:</strong> Step-by-step learning paths for various tech careers</li>
                <li><strong>Learning Resources:</strong> Curated links and recommendations</li>
                <li><strong>Educational Content:</strong> Guides, comparisons, and informational articles</li>
              </ul>
              <p className="mt-4">
                <strong>What we DO NOT provide:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Direct instruction or tutoring</li>
                <li>❌ Certifications or credentials</li>
                <li>❌ Job placement or career counseling</li>
                <li>❌ Paid courses or premium content</li>
                <li>❌ User accounts or profile management</li>
              </ul>
            </CardContent>
          </Card>

          {/* No User Accounts */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>3. No User Accounts Required</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                TechPath does not require user registration or accounts. All content is freely accessible 
                without providing personal information.
              </p>
              <p>
                We do not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Store usernames or passwords</li>
                <li>Collect email addresses</li>
                <li>Track individual user progress</li>
                <li>Maintain user profiles</li>
              </ul>
            </CardContent>
          </Card>

          {/* Educational Purpose */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>4. Educational Purpose & Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Information Accuracy</h3>
              <p>
                While we strive to provide accurate and up-to-date information, the tech industry evolves 
                rapidly. We make no warranties or guarantees about:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accuracy or completeness of learning paths</li>
                <li>Suitability for specific career goals</li>
                <li>Currency of linked resources</li>
                <li>Outcomes from following our roadmaps</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">External Links</h3>
              <p>
                Our site contains links to third-party websites and resources. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Content on external sites</li>
                <li>Availability of linked resources</li>
                <li>Privacy practices of third parties</li>
                <li>Costs associated with external services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>5. Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                You agree to use TechPath only for lawful purposes. You will not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Use the site to distribute malware or harmful code</li>
                <li>❌ Attempt to gain unauthorized access to our systems</li>
                <li>❌ Scrape or copy large portions of content without permission</li>
                <li>❌ Use automated tools to overwhelm our servers (DDoS attacks)</li>
                <li>❌ Impersonate TechPath or claim affiliation falsely</li>
                <li>❌ Violate any applicable laws or regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>6. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Our Content</h3>
              <p>
                All original content on TechPath (text, graphics, roadmaps, layouts) is owned by us or 
                our licensors. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Career roadmap structures and sequences</li>
                <li>Original descriptions and explanations</li>
                <li>Site design and user interface</li>
                <li>TechPath branding and logos</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Fair Use</h3>
              <p>
                You may:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>✅ View and use content for personal learning</li>
                <li>✅ Share links to our pages</li>
                <li>✅ Reference our roadmaps with proper attribution</li>
              </ul>

              <p className="mt-2">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Republish significant portions without permission</li>
                <li>❌ Claim our content as your own</li>
                <li>❌ Use our content for commercial purposes without authorization</li>
              </ul>
            </CardContent>
          </Card>

          {/* Advertising */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>7. Advertising & Monetization</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                TechPath is funded through advertising to keep all content free. We use Google AdSense 
                to display ads on our site.
              </p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Ad Policies</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ads are clearly distinguished from content</li>
                <li>We do not control specific ads shown (managed by Google)</li>
                <li>We do not endorse products/services in ads</li>
                <li>Clicking ads supports our free content</li>
              </ul>

              <p className="mt-2">
                See our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> for 
                information about advertising cookies.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer of Warranties */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>8. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="font-semibold">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
              </p>
              <p>
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The service will be uninterrupted or error-free</li>
                <li>Information provided will lead to specific career outcomes</li>
                <li>All content will be current or accurate at all times</li>
                <li>Linked resources will remain available</li>
              </ul>
              <p className="mt-4">
                Use of our roadmaps and resources is at your own discretion and risk.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                To the maximum extent permitted by law, TechPath and its operators shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or opportunities</li>
                <li>Outcomes from following learning recommendations</li>
                <li>Costs of substitute services</li>
                <li>Issues arising from third-party content or links</li>
              </ul>
              <p className="mt-4">
                Since our service is free, our maximum liability is limited to the amount you paid to use 
                TechPath (which is zero).
              </p>
            </CardContent>
          </Card>

          {/* Changes to Service */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>10. Changes to Service & Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Service Changes</h3>
              <p>
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modify, suspend, or discontinue any part of the service</li>
                <li>Update roadmap content and resources</li>
                <li>Change site features or layout</li>
                <li>Remove or update learning paths</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Terms Updates</h3>
              <p>
                We may update these terms from time to time. Changes will be posted on this page with an 
                updated "Last updated" date. Continued use of the site after changes constitutes acceptance 
                of the new terms.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>11. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Since we don't have user accounts, there's nothing to terminate. However, we reserve the 
                right to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Block access from specific IP addresses that violate our terms</li>
                <li>Take legal action against malicious use</li>
                <li>Discontinue the service at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>12. Governing Law & Disputes</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                These terms shall be governed by and construed in accordance with applicable laws. Any 
                disputes arising from use of TechPath shall be resolved through good faith negotiation first.
              </p>
              <p className="mt-4">
                For any legal concerns or copyright issues, please contact us at{' '}
                <a href="mailto:legal@techpath.dev" className="text-blue-600 dark:text-blue-400 hover:underline">
                  legal@techpath.dev
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Severability */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>13. Severability</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If any provision of these terms is found to be unenforceable or invalid, that provision 
                shall be limited or eliminated to the minimum extent necessary so that these terms shall 
                otherwise remain in full force and effect.
              </p>
            </CardContent>
          </Card>

          {/* Entire Agreement */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>14. Entire Agreement</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                These Terms of Service, together with our{' '}
                <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>, constitute the entire agreement between you and TechPath regarding use of the service.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li>
                  Email: <a href="mailto:legal@techpath.dev" className="text-blue-600 dark:text-blue-400 hover:underline">
                    legal@techpath.dev
                  </a>
                </li>
                <li>
                  Contact Form: <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                    /contact
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}






