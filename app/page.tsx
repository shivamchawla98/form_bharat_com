import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2, ArrowRight, MessageSquare, IndianRupee,
  ShieldCheck, Sparkles, Zap, Share2,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import HeroInput from '@/components/HeroInput'
import HeroDemo from '@/components/HeroDemo'
import FAQAccordion from '@/components/FAQAccordion'
import { FAQ_ITEMS } from '@/lib/faq-data'

export const metadata: Metadata = {
  title: {
    absolute: 'FormBharat — Free AI Form Builder for Indian Businesses',
  },
  description: 'Create beautiful forms in minutes or let AI build one in 10 seconds — free. Built for Indian businesses with WhatsApp integration, UPI payments, and AI form generation.',
  alternates: { canonical: 'https://formbharat.com' },
  openGraph: {
    title: 'FormBharat — Free AI Form Builder for Indian Businesses',
    description: 'Describe your form, AI builds it in 10 seconds. WhatsApp-native, UPI-ready, 100% free. Made for India.',
    url: 'https://formbharat.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormBharat — Free AI Form Builder for Indian Businesses',
    description: 'AI form generator + WhatsApp sharing + UPI payments. Free forever. Made in India.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      {/* ── HERO ── */}
      <section className="bg-orange-50 px-4 pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

            {/* Left: copy + prompt */}
            <div>
              <div className="flex mb-6">
                <span className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-600 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered · Open Source · Made for India
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-4">
                Create any form{' '}
                <span className="text-orange-500">in seconds</span>
                {' '}with AI
              </h1>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Describe what you need — AI builds a complete, ready-to-share form instantly. WhatsApp-native, UPI-ready.
              </p>
              <HeroInput />
              <p className="mt-4 text-xs text-gray-400">
                No credit card required · Free forever · Made in India 🇮🇳
              </p>
            </div>

            {/* Right: live product demo */}
            <div className="hidden lg:block">
              <HeroDemo />
            </div>
          </div>

          {/* Mobile demo — shown below input on small screens */}
          <div className="lg:hidden mt-10">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm text-gray-400 font-medium">You&apos;ve probably already tried one of these</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tool: 'Typeform', price: '$25/month',
                problem: 'Beautiful forms — until you hit 10 responses and the paywall appears. No UPI field. No WhatsApp button. Support has never heard of India.',
                bg: 'bg-red-50', border: 'border-red-100', tag: 'text-red-400',
              },
              {
                tool: 'Google Forms', price: 'Free',
                problem: 'Works fine for a classroom quiz. But no payments, no conditional logic, no custom branding, and a UI that hasn\'t changed since 2014.',
                bg: 'bg-yellow-50', border: 'border-yellow-100', tag: 'text-yellow-500',
              },
              {
                tool: 'JotForm', price: '$34/month',
                problem: '74 field types. 34 dollars a month to unlock half of them. Their payment integrations don\'t include Razorpay. You\'ll figure that out after you sign up.',
                bg: 'bg-slate-50', border: 'border-slate-100', tag: 'text-slate-400',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100} className="h-full">
                <div className={`rounded-2xl border p-5 flex flex-col h-full ${item.bg} ${item.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">{item.tool}</span>
                    <span className={`text-xs font-medium ${item.tag}`}>{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{item.problem}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
                    <span className="w-3 h-3 rounded-full bg-red-200 flex items-center justify-center text-red-400 font-bold text-[9px]">✕</span>
                    No UPI. No WhatsApp. No India.
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIA-FIRST ── */}
      <section className="py-20 md:py-28 px-4 bg-orange-50">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">So we built FormBharat</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Google Forms won&apos;t add UPI.<br className="hidden md:block" /> Typeform won&apos;t add WhatsApp. We did.
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm md:text-base">
              Because we&apos;re Indian. We use the same apps, pay the same way, and run the same kind of businesses you do.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100',
                badge: '500M+ users on WhatsApp', title: 'Share on WhatsApp',
                desc: 'One tap and your form goes straight to WhatsApp. Respondents fill it on their phone — no app install, no account needed.',
                detail: 'Every public form gets a WhatsApp share button automatically.',
              },
              {
                icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
                badge: 'UPI + Cards', title: 'Collect Payments Inside Forms',
                desc: 'Add a payment field and the money goes directly to your Razorpay account. No separate payment link. No extra steps.',
                detail: 'Works for event fees, order deposits, tuition, bookings — anything.',
              },
              {
                icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100',
                badge: '10K OTPs free/month', title: 'Phone OTP Verification',
                desc: 'Before a form submits, we SMS an OTP to the respondent\'s Indian number. Fake entries stop. Real responses only.',
                detail: 'Powered by Firebase. First 10,000 verifications are free.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={i} delay={i * 120}>
                  <div className={`bg-white rounded-2xl p-6 border ${item.border} hover:shadow-md transition-all duration-300 h-full`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className={`text-xs font-semibold ${item.color} ${item.bg} px-2.5 py-1 rounded-full border ${item.border}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                    <p className="text-xs text-gray-400">{item.detail}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Simple by design</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From idea to live form in 3 steps</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-orange-200" />
            {[
              { num: '1', icon: Sparkles, title: 'Describe it', desc: 'Type what you need. Something like "feedback form for my restaurant with star ratings and a comments box." That\'s all.' },
              { num: '2', icon: Zap,      title: 'AI builds it', desc: 'The AI picks the right fields, order, and labels. Done in about 10 seconds. You can edit anything after.' },
              { num: '3', icon: Share2,   title: 'Send it out', desc: 'Paste the link in WhatsApp, print a QR code, or embed it on your site. Responses land in your dashboard live.' },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-100 text-center hover:border-orange-200 hover:shadow-sm transition-all duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Honest pricing. Always.</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">No surprise bills. No credit card. Early access users get everything free, forever.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-sm mx-auto bg-white rounded-2xl border-2 border-orange-200 p-8 shadow-sm text-center">
              <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                <Sparkles className="h-3 w-3" />
                Early Access — Free Forever
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-1">₹0</div>
              <p className="text-gray-400 text-sm mb-7">per month, always</p>
              <div className="text-left space-y-3 mb-8">
                {[
                  'Unlimited forms & responses',
                  'AI Form Generator',
                  'WhatsApp sharing + QR code',
                  'Razorpay payment fields',
                  'Phone OTP verification',
                  'Conditional logic',
                  'Analytics dashboard',
                  'CSV export',
                  'Embed on your website',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/builder">
                <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl">
                  Start building free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-gray-400 mt-3">No credit card · Ready in 30 seconds</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-center text-xs text-gray-400 mt-5 max-w-sm mx-auto">
              Team plans coming in the future. Free users will be grandfathered into a generous permanent free tier.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHAT PEOPLE BUILD ── */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Real use cases</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What people are building</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm md:text-base">
              A small sample of forms created in the last 30 days.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {[
                'Restaurant feedback form',
                'Workshop registration with UPI payment',
                'Job application — delivery staff',
                'Patient appointment booking',
                'Coaching centre admission form',
                'Product order form with COD option',
                'Event RSVP + t-shirt size',
                'Staff daily attendance sheet',
                'Property site visit booking',
                'Volunteer registration — NGO',
                'Customer complaint form',
                'Vendor onboarding checklist',
                'Salon appointment booking',
                'Student fee payment form',
                'Return & exchange request',
                'Donor details collection',
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="mt-10 text-center">
            <Link href="/builder">
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl">
                Build yours — it&apos;s free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Questions? We&apos;ve got answers.</h2>
          </AnimatedSection>
          <AnimatedSection>
            <FAQAccordion />
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-28 px-4 bg-orange-500">
        <div className="container mx-auto max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your first form is one sentence away.
            </h2>
            <p className="text-orange-100 text-base md:text-lg mb-8 max-w-md mx-auto">
              Free forever. No credit card. Made in India.
            </p>
            <Link href="/builder">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 h-12 rounded-xl shadow-md">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
