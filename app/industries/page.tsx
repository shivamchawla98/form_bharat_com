import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  UtensilsCrossed, Stethoscope, GraduationCap, Building2,
  ShoppingCart, Users, PartyPopper, Heart,
  ArrowRight, Sparkles, Zap, MessageCircle,
} from 'lucide-react'

const industries = [
  {
    slug: 'restaurants-food',
    title: 'Restaurants & Food',
    desc: 'Order forms, feedback, reservations, and staff applications.',
    icon: UtensilsCrossed,
    bg: 'bg-orange-50',
    color: 'text-orange-600',
  },
  {
    slug: 'healthcare-clinics',
    title: 'Healthcare & Clinics',
    desc: 'Patient registration, appointment booking, and consent forms.',
    icon: Stethoscope,
    bg: 'bg-red-50',
    color: 'text-red-600',
  },
  {
    slug: 'education-coaching',
    title: 'Education & Coaching',
    desc: 'Admission forms, student feedback, and fee collection.',
    icon: GraduationCap,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate & Brokers',
    desc: 'Property enquiries, site visit bookings, and buyer surveys.',
    icon: Building2,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    desc: 'Order forms, returns, product feedback, and loyalty signups.',
    icon: ShoppingCart,
    bg: 'bg-purple-50',
    color: 'text-purple-600',
  },
  {
    slug: 'hr-recruitment',
    title: 'HR & Recruitment',
    desc: 'Job applications, onboarding, exit surveys, and timesheets.',
    icon: Users,
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
  },
  {
    slug: 'events-weddings',
    title: 'Events & Weddings',
    desc: 'RSVP forms, vendor bookings, attendee registrations, and payments.',
    icon: PartyPopper,
    bg: 'bg-pink-50',
    color: 'text-pink-600',
  },
  {
    slug: 'nonprofits',
    title: 'NGOs & Non-profits',
    desc: 'Volunteer registration, donation tracking, and beneficiary forms.',
    icon: Heart,
    bg: 'bg-rose-50',
    color: 'text-rose-600',
  },
]

const whyCards = [
  {
    icon: Sparkles,
    bg: 'bg-orange-50',
    color: 'text-orange-500',
    title: 'Free forever',
    desc: 'Every feature. Zero cost. No surprise upgrades. Early access users get premium features free for life.',
  },
  {
    icon: MessageCircle,
    bg: 'bg-green-50',
    color: 'text-green-500',
    title: 'India-first design',
    desc: 'WhatsApp sharing, UPI payments, and Indian language support — built the way India actually works.',
  },
  {
    icon: Zap,
    bg: 'bg-amber-50',
    color: 'text-amber-500',
    title: 'AI-powered',
    desc: 'Describe your form in plain English. AI builds it in 10 seconds — no template-hunting needed.',
  },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-orange-50 pt-16 md:pt-24 pb-14 md:pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Industries
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            Forms built for{' '}
            <span className="text-orange-500">your industry</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            From kirana stores to coaching centres — FormBharat has industry-specific templates, fields, and workflows that actually match how your business runs.
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

      {/* Industries grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Choose your industry
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Click on your industry to see ready-made form templates, use cases, and field suggestions built for businesses like yours.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <AnimatedSection key={ind.slug} delay={i * 50}>
                  <Link href={`/industries/${ind.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${ind.bg}`}>
                        <Icon className={`w-5 h-5 ${ind.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{ind.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">{ind.desc}</p>
                      <div className={`mt-3 text-xs font-semibold ${ind.color} flex items-center gap-1`}>
                        See forms <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why FormBharat strip */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Why choose us</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Why Indian businesses choose FormBharat
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <AnimatedSection key={card.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow h-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.bg}`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
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
              Build your first form in 2 minutes
            </h2>
            <p className="text-gray-400 mb-8">
              Free. No credit card. Works on WhatsApp. Built for India.
            </p>
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 rounded-xl shadow-md">
                Get started free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
