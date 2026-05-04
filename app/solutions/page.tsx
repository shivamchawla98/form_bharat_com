import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Target, MessageSquare, CalendarCheck, Briefcase,
  ShoppingBag, IndianRupee, ArrowRight, Sparkles, Zap, MessageCircle,
} from 'lucide-react'

const solutions = [
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    desc: 'Capture and qualify leads from your website, WhatsApp, and offline events.',
    icon: Target,
    bg: 'bg-orange-50',
    color: 'text-orange-600',
    stat: '3× more leads',
  },
  {
    slug: 'customer-feedback',
    title: 'Customer Feedback',
    desc: 'Collect CSAT, NPS, and product feedback from customers automatically.',
    icon: MessageSquare,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    stat: '92% completion',
  },
  {
    slug: 'event-registration',
    title: 'Event Registration',
    desc: 'Registrations, payments, and attendance — all in one form.',
    icon: CalendarCheck,
    bg: 'bg-purple-50',
    color: 'text-purple-600',
    stat: 'UPI payments',
  },
  {
    slug: 'job-applications',
    title: 'Job Applications',
    desc: 'Screen applicants faster with structured application forms and auto-notifications.',
    icon: Briefcase,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    stat: '70% faster screening',
  },
  {
    slug: 'order-forms',
    title: 'Order & Booking Forms',
    desc: 'Take orders, bookings, and appointments online — with or without payment.',
    icon: ShoppingBag,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    stat: 'Works offline too',
  },
  {
    slug: 'payment-collection',
    title: 'Payment Collection',
    desc: 'Collect UPI and card payments directly inside your forms. No separate payment link needed.',
    icon: IndianRupee,
    bg: 'bg-green-50',
    color: 'text-green-600',
    stat: 'UPI + Cards',
  },
]

const steps = [
  {
    num: '1',
    title: 'Build',
    desc: 'Describe your form to our AI or pick a template. Your form is ready in under 2 minutes.',
    icon: Sparkles,
  },
  {
    num: '2',
    title: 'Share',
    desc: 'Send the link on WhatsApp, embed on your website, or print a QR code for offline events.',
    icon: MessageCircle,
  },
  {
    num: '3',
    title: 'Collect',
    desc: 'Responses, leads, and payments land in your dashboard. Get notified the moment they arrive.',
    icon: Zap,
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-orange-50 pt-16 md:pt-24 pb-14 md:pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            The right solution{' '}
            <span className="text-orange-500">for every need</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Whether you're capturing leads, taking orders, or running events — FormBharat has a ready-made solution built for Indian businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-sm px-8 rounded-xl">
                Start free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8 rounded-xl border-gray-200 hover:border-orange-300">
                Browse templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Pick your solution
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Each solution comes with pre-built templates, smart fields, and everything you need to get results fast.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {solutions.map((s, i) => {
              const Icon = s.icon
              return (
                <AnimatedSection key={s.slug} delay={i * 60}>
                  <Link href={`/solutions/${s.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg}`}>
                        <Icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{s.desc}</p>
                      <div className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>
                        {s.stat}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Three steps to results
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={step.num} delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow text-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">
                      {step.num}
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-4.5 h-4.5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 md:py-28 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start collecting in minutes
            </h2>
            <p className="text-gray-400 mb-8">
              Free during early access. No credit card. No setup fee. Built for India.
            </p>
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 rounded-xl shadow-md">
                Build your first form free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
