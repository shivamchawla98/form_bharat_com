import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

interface SolutionData {
  headline: string
  sub: string
  badge: string
  color: string        // tailwind color name e.g. 'orange'
  features: string[]
  steps: string[]
  formFields: string[]
}

const solutions: Record<string, SolutionData> = {
  'lead-generation': {
    headline: 'Turn Visitors Into Leads — Automatically',
    sub: 'Build high-converting lead capture forms in minutes. Embed on your website, share on WhatsApp, or collect at offline events.',
    badge: 'Lead Generation',
    color: 'orange',
    features: [
      'Conditional logic to qualify leads',
      'Instant email + WhatsApp notification',
      'Google Sheets sync',
      'Embed on any website',
      'Multi-step forms for higher completion',
      'UTM tracking fields',
    ],
    steps: [
      'Build your lead form in 2 minutes with AI',
      'Share the link on WhatsApp, website, or print a QR code',
      'Leads land in your dashboard + notify you instantly',
    ],
    formFields: ['Full Name', 'Phone Number', 'City', 'Budget Range', 'Product Interest', 'Preferred Contact Time'],
  },
  'customer-feedback': {
    headline: 'Understand Your Customers Better',
    sub: 'Collect structured feedback with NPS, star ratings, and open-ended questions. See trends at a glance.',
    badge: 'Customer Feedback',
    color: 'blue',
    features: [
      'NPS & star rating fields',
      'Anonymous submission option',
      'Auto-email on negative ratings',
      'CSV export for analysis',
      'Multi-language support (coming soon)',
      'Real-time response dashboard',
    ],
    steps: [
      'Design a feedback form (or use AI)',
      'Share via WhatsApp, email, or QR code at checkout',
      'Track NPS and satisfaction trends in your dashboard',
    ],
    formFields: [
      'Overall Satisfaction ★★★★★',
      'What did we do well?',
      'What could be improved?',
      'Would you recommend us?',
      'Your contact (optional)',
    ],
  },
  'event-registration': {
    headline: 'Fill Every Seat at Your Event',
    sub: 'Accept registrations, collect payments, and send confirmations — all from one form.',
    badge: 'Event Registration',
    color: 'purple',
    features: [
      'UPI + card payment collection',
      'Automated confirmation emails',
      'Capacity limits & waitlists',
      'QR code for offline promotion',
      'T-shirt size, diet, session choice fields',
      'WhatsApp event reminders',
    ],
    steps: [
      'Create your registration form with payment field',
      'Share QR code on posters and WhatsApp',
      'Attendees register and pay — you get notified instantly',
    ],
    formFields: ['Participant Name', 'Email Address', 'Phone Number', 'Session Choice', 'T-Shirt Size', 'Payment (UPI / Card)'],
  },
  'job-applications': {
    headline: 'Hire Faster With Structured Applications',
    sub: 'Replace messy email threads with clean application forms. Screen candidates automatically.',
    badge: 'Job Applications',
    color: 'emerald',
    features: [
      'Resume / CV file upload',
      'Conditional screening questions',
      'Auto-email to applicants',
      'Webhook to your ATS',
      'Multi-step application flow',
      'Custom thank-you message',
    ],
    steps: [
      'Build a job application form in minutes',
      'Share on LinkedIn, WhatsApp groups, and job boards',
      'Review applications in your dashboard — export to CSV',
    ],
    formFields: ['Full Name', 'Email', 'Phone', 'Current CTC (LPA)', 'Expected CTC', 'Resume Upload', 'Why do you want this role?'],
  },
  'order-forms': {
    headline: 'Take Orders Online Without a Website',
    sub: 'A simple order form is all you need. Customers fill it on WhatsApp or your link — you get orders instantly.',
    badge: 'Order & Booking Forms',
    color: 'amber',
    features: [
      'Dropdown for products / services',
      'Quantity and custom options',
      'UPI payment field',
      'Automated order confirmation',
      'Delivery address collection',
      'QR code for in-store orders',
    ],
    steps: [
      'List your products and add a payment field',
      'Share on WhatsApp or print QR code',
      'Orders come in with payment — no calls needed',
    ],
    formFields: ['Customer Name', 'Phone Number', 'Product / Service', 'Quantity', 'Delivery Address', 'Payment (UPI)'],
  },
  'payment-collection': {
    headline: 'Collect Payments Right Inside Your Form',
    sub: 'No separate payment link. No third-party checkout. Just add a payment field and your customers pay via UPI or card.',
    badge: 'Payment Collection',
    color: 'green',
    features: [
      'Razorpay-powered UPI + cards',
      'Fixed or custom payment amounts',
      'Instant payment confirmation',
      'Auto-receipt via email',
      'Works with any form type',
      'No extra fees from FormBharat',
    ],
    steps: [
      'Add a Payment field to any form',
      'Set your Razorpay keys in settings',
      'Customers pay inline — you get paid instantly',
    ],
    formFields: ['Payer Name', 'Email / Phone', 'Purpose of Payment', 'Amount', 'UPI / Card Payment', 'Notes'],
  },
}

// Map color name to Tailwind classes
function colorClasses(color: string) {
  const map: Record<string, { bg: string; text: string; badge: string; border: string; circle: string }> = {
    orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  badge: 'bg-orange-50 border-orange-200 text-orange-600',  border: 'border-orange-200', circle: 'bg-orange-500' },
    blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    badge: 'bg-blue-50 border-blue-200 text-blue-600',        border: 'border-blue-200',   circle: 'bg-blue-500'   },
    purple:  { bg: 'bg-purple-50',  text: 'text-purple-600',  badge: 'bg-purple-50 border-purple-200 text-purple-600',  border: 'border-purple-200', circle: 'bg-purple-500' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-50 border-emerald-200 text-emerald-600', border: 'border-emerald-200', circle: 'bg-emerald-500' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   badge: 'bg-amber-50 border-amber-200 text-amber-600',    border: 'border-amber-200',  circle: 'bg-amber-500'  },
    green:   { bg: 'bg-green-50',   text: 'text-green-600',   badge: 'bg-green-50 border-green-200 text-green-600',    border: 'border-green-200',  circle: 'bg-green-500'  },
  }
  return map[color] ?? map['orange']
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = solutions[slug]

  if (!data) {
    notFound()
  }

  const c = colorClasses(data.color)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className={`${c.bg} pt-16 md:pt-24 pb-14 md:pb-20 px-4`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`inline-flex items-center gap-1.5 bg-white border ${c.border} ${c.text} text-xs font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm`}>
            <Sparkles className="w-3.5 h-3.5" />
            {data.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            {data.headline}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            {data.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-sm px-8 rounded-xl">
                Start free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8 rounded-xl border-gray-200 hover:border-orange-300">
                See templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Three steps to results</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow text-center h-full">
                  <div className={`w-9 h-9 rounded-full ${c.circle} text-white font-bold text-sm flex items-center justify-center mx-auto mb-4`}>
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">What you get</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">What you can collect</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.features.map((feat, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${c.bg}`}>
                    <Check className={`w-3.5 h-3.5 ${c.text}`} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{feat}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample form fields */}
      <section className="py-16 md:py-20 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Sample template</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Sample form fields</h2>
            <p className="text-gray-500 text-base">
              Here's what a typical {data.badge.toLowerCase()} form looks like. You can customise every field.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2.5">
                {data.formFields.map((field) => (
                  <span
                    key={field}
                    className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
                  >
                    {field}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                + Add any custom fields you need. Drag to reorder. Set as required or optional.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 md:py-28 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-400 mb-8">
              Free during early access. No credit card. No setup fee. Works on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/builder">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 rounded-xl shadow-md">
                  Build your form free <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="px-8 rounded-xl border-white/30 text-white hover:bg-white/10">
                  See all solutions
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
