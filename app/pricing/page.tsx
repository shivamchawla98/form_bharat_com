import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import { Button } from '@/components/ui/button'

const freeFeatures = [
  'Unlimited forms',
  'Unlimited responses',
  'AI form generator',
  '13 field types',
  'WhatsApp sharing',
  'Google Sheets sync',
  'Webhook integration',
  'Email notifications',
  'Multi-step forms',
  'CSV export',
  'File uploads',
  'Custom thank-you pages',
  'QR codes',
  'Form analytics',
  'UPI + card payment collection',
  'Templates library',
]

const proFeatures = [
  'Custom domain',
  'White-label forms',
  'Priority support',
  'Advanced analytics',
  'Team collaboration',
  'API access',
  'Zapier integration',
]

const comparisonRows: { feature: string; free: boolean | 'soon'; pro: boolean | 'soon' }[] = [
  { feature: 'Unlimited forms & responses', free: true, pro: true },
  { feature: 'AI form generator', free: true, pro: true },
  { feature: 'UPI + card payment collection', free: true, pro: true },
  { feature: 'WhatsApp sharing & QR codes', free: true, pro: true },
  { feature: 'Google Sheets sync & Webhooks', free: true, pro: true },
  { feature: 'Form analytics', free: true, pro: true },
  { feature: 'Custom domain', free: false, pro: 'soon' },
  { feature: 'White-label (remove FormBharat branding)', free: false, pro: 'soon' },
  { feature: 'Team collaboration', free: false, pro: 'soon' },
  { feature: 'API access & Zapier integration', free: false, pro: 'soon' },
]

interface FaqItem {
  q: string
  a: string
  githubLink?: boolean
}

const faqs: FaqItem[] = [
  {
    q: 'Do I need a credit card?',
    a: 'No. FormBharat is completely free. Just sign up with your email.',
  },
  {
    q: 'Will it stay free?',
    a: 'Yes. All users who join during early access will keep their current features free forever, even after we launch paid plans.',
  },
  {
    q: 'Is there a response limit?',
    a: 'No. Collect unlimited responses across all your forms.',
  },
  {
    q: 'How does UPI payment collection work?',
    a: "Add a Payment field to your form and connect your Razorpay account in settings. FormBharat doesn't charge any platform fee on top of Razorpay's standard rates.",
  },
  {
    q: 'Can I self-host FormBharat?',
    a: 'Yes — FormBharat is open source. You can deploy your own instance for free.',
    githubLink: true,
  },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-orange-50 py-20 px-4 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm">
              Early Access — 100% Free
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Simple Pricing. Free Forever.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              No credit card. No hidden fees. Get every feature free while we&apos;re in early access.
            </p>
          </AnimatedSection>
        </section>

        {/* Pricing cards */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">

            {/* Free card */}
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-2xl border-2 border-orange-400 shadow-lg p-8 ring-2 ring-orange-200 ring-offset-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    Current Plan
                  </span>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Free (Early Access)</h2>
                  <p className="text-sm text-gray-500 mb-4">Free forever for early users</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold text-gray-900">₹0</span>
                    <span className="text-gray-500 mb-2">/ month</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/builder">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-base py-3 h-auto shadow-md">
                    Start Building — It&apos;s Free
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Pro card */}
            <AnimatedSection delay={80}>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-400">Pro</h2>
                    <span className="inline-flex items-center bg-gray-200 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">For growing teams and agencies</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold text-gray-300">₹</span>
                    <span className="text-gray-400 mb-2">/ month</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-500 hover:bg-gray-100 font-semibold text-base py-3 h-auto"
                  >
                    Join Waitlist
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
                What&apos;s included
              </h2>
              <p className="text-gray-500 text-center mb-10">
                Everything in Free — no upsells, no paywalls.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-4 text-gray-500 font-semibold w-full">Feature</th>
                      <th className="px-6 py-4 text-center font-bold text-orange-600 whitespace-nowrap">Free</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-400 whitespace-nowrap">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                        <td className="px-6 py-3.5 text-gray-700">{row.feature}</td>
                        <td className="px-6 py-3.5 text-center">
                          {row.free === true ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300 text-lg leading-none">—</span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.pro === true ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : row.pro === 'soon' ? (
                            <span className="inline-flex items-center bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                              Coming Soon
                            </span>
                          ) : (
                            <span className="text-gray-300 text-lg leading-none">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
                Frequently asked questions
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <AnimatedSection key={faq.q} delay={i * 60}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                      {faq.githubLink && (
                        <>
                          {' '}
                          <a
                            href="https://github.com/formbharat/formbharat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 font-semibold hover:underline"
                          >
                            See our GitHub ↗
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="bg-gray-900 py-16 px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Join 1,000+ Indian businesses building for free
            </h2>
            <p className="text-gray-400 mb-8">
              No credit card. No limits. Start collecting responses in minutes.
            </p>
            <Link href="/builder">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 h-auto text-base shadow-lg">
                Start Free <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </Link>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  )
}
