import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Sparkles, MessageCircle, Zap, IndianRupee } from 'lucide-react'

interface IndustryData {
  headline: string
  sub: string
  badge: string
  accentColor: string   // tailwind color name e.g. 'orange'
  useCases: string[]
  formFields: string[]
}

const industries: Record<string, IndustryData> = {
  'restaurants-food': {
    headline: 'Forms That Work as Hard as Your Kitchen',
    sub: 'From takeaway orders to staff hiring — manage it all without pen and paper.',
    badge: 'Restaurants & Food',
    accentColor: 'orange',
    useCases: [
      'Online order forms with UPI payment',
      'Table reservation & pre-order',
      'Customer feedback after dining',
      'Staff application & hiring form',
      'Supplier enquiry form',
      'Daily inventory checklist',
    ],
    formFields: ['Customer Name', 'Phone', 'Items Ordered', 'Quantity', 'Special Instructions', 'UPI Payment'],
  },
  'healthcare-clinics': {
    headline: 'Paperless Patient Forms for Modern Clinics',
    sub: 'Save time at reception, reduce errors, and give patients a smoother experience.',
    badge: 'Healthcare & Clinics',
    accentColor: 'red',
    useCases: [
      'New patient registration',
      'Appointment booking form',
      'Medical history intake',
      'Prescription / referral request',
      'Patient satisfaction survey',
      'Staff availability form',
    ],
    formFields: ['Patient Name', 'Date of Birth', 'Phone Number', 'Chief Complaint', 'Medical History', 'Insurance Details'],
  },
  'education-coaching': {
    headline: 'Run Your Institute Without the Paperwork',
    sub: 'Admissions, fees, attendance, and feedback — all digital, all organised.',
    badge: 'Education & Coaching',
    accentColor: 'blue',
    useCases: [
      'Student admission form',
      'Fee collection with UPI',
      'Course enquiry form',
      'Parent feedback form',
      'Online test & quiz form',
      'Staff hiring form',
    ],
    formFields: ['Student Name', 'Class / Grade', 'Parent Name', 'Phone Number', 'Course Interest', 'Fee Payment (UPI)'],
  },
  'real-estate': {
    headline: 'Close More Deals. Fewer Phone Calls.',
    sub: 'Capture property enquiries, book site visits, and qualify buyers — automatically.',
    badge: 'Real Estate & Brokers',
    accentColor: 'emerald',
    useCases: [
      'Property enquiry lead form',
      'Site visit booking',
      'Buyer preference survey',
      'Rental application form',
      'NRI buyer form',
      'Agent onboarding form',
    ],
    formFields: ['Full Name', 'Phone', 'Budget (₹)', 'Location Preference', 'BHK Configuration', 'Preferred Visit Date'],
  },
  'retail-ecommerce': {
    headline: 'Sell More. Returns Less. Customers Happier.',
    sub: 'Custom order forms, return requests, and loyalty signups — no code needed.',
    badge: 'Retail & E-commerce',
    accentColor: 'purple',
    useCases: [
      'Custom order form with payment',
      'Product return / exchange request',
      'Customer review collection',
      'Loyalty program signup',
      'Wholesale / bulk order form',
      'Pre-launch waitlist form',
    ],
    formFields: ['Customer Name', 'Order Number', 'Product', 'Size / Variant', 'Delivery Address', 'UPI Payment'],
  },
  'hr-recruitment': {
    headline: 'Hire Smarter. Onboard Faster.',
    sub: 'From job posting to day-one paperwork — FormBharat handles every HR form.',
    badge: 'HR & Recruitment',
    accentColor: 'indigo',
    useCases: [
      'Job application form with resume upload',
      'Employee onboarding checklist',
      'Payroll details collection',
      'Leave & attendance form',
      'Exit interview survey',
      'Performance review form',
    ],
    formFields: ['Applicant Name', 'Phone', 'Current CTC (LPA)', 'Expected CTC', 'Notice Period', 'Resume Upload'],
  },
  'events-weddings': {
    headline: 'Every RSVP. Every Rupee. All in One Place.',
    sub: 'Run flawless events with digital registrations, vendor bookings, and payment collection.',
    badge: 'Events & Weddings',
    accentColor: 'pink',
    useCases: [
      'RSVP & guest registration',
      'Vendor quote request',
      'Attendee meal preference',
      'Event feedback form',
      'Speaker / performer application',
      'Ticket payment collection',
    ],
    formFields: ['Guest Name', 'Phone', 'Number of Guests', 'Meal Preference', 'RSVP Status', 'Ticket Payment'],
  },
  'nonprofits': {
    headline: 'More Impact. Less Administration.',
    sub: 'Volunteer signups, beneficiary intake, and donation receipts — all without a developer.',
    badge: 'NGOs & Non-profits',
    accentColor: 'rose',
    useCases: [
      'Volunteer registration form',
      'Beneficiary intake form',
      'Donation acknowledgement',
      'Event participation form',
      'Grant application form',
      'Impact survey',
    ],
    formFields: ['Volunteer Name', 'Phone', 'Skills / Availability', 'Area of Interest', 'ID Proof Upload', 'Emergency Contact'],
  },
}

function colorClasses(color: string) {
  const map: Record<string, { bg: string; text: string; border: string; badge: string; circle: string; checkBg: string }> = {
    orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200', badge: 'bg-orange-50 border-orange-200 text-orange-600',   circle: 'bg-orange-500',  checkBg: 'bg-orange-50'  },
    red:     { bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-200',    badge: 'bg-red-50 border-red-200 text-red-600',             circle: 'bg-red-500',     checkBg: 'bg-red-50'     },
    blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200',   badge: 'bg-blue-50 border-blue-200 text-blue-600',          circle: 'bg-blue-500',    checkBg: 'bg-blue-50'    },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-50 border-emerald-200 text-emerald-600', circle: 'bg-emerald-500', checkBg: 'bg-emerald-50' },
    purple:  { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-200', badge: 'bg-purple-50 border-purple-200 text-purple-600',     circle: 'bg-purple-500',  checkBg: 'bg-purple-50'  },
    indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-200', badge: 'bg-indigo-50 border-indigo-200 text-indigo-600',     circle: 'bg-indigo-500',  checkBg: 'bg-indigo-50'  },
    pink:    { bg: 'bg-pink-50',    text: 'text-pink-600',    border: 'border-pink-200',   badge: 'bg-pink-50 border-pink-200 text-pink-600',           circle: 'bg-pink-500',    checkBg: 'bg-pink-50'    },
    rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-200',   badge: 'bg-rose-50 border-rose-200 text-rose-600',           circle: 'bg-rose-500',    checkBg: 'bg-rose-50'    },
  }
  return map[color] ?? map['orange']
}

const differentiators = [
  {
    icon: Sparkles,
    title: 'Free, forever',
    desc: 'All features. No credit card. Early access users keep premium features free for life — no catch.',
  },
  {
    icon: MessageCircle,
    title: 'Share on WhatsApp',
    desc: 'One tap to share your form with customers, students, or applicants on WhatsApp. No app download needed.',
  },
  {
    icon: IndianRupee,
    title: 'UPI payments built-in',
    desc: 'Accept UPI and card payments directly inside your form. Powered by Razorpay. No separate payment link.',
  },
]

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = industries[slug]

  if (!data) {
    notFound()
  }

  const c = colorClasses(data.accentColor)

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

      {/* Use cases */}
      <section className="py-16 md:py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Use cases</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              What you can do with FormBharat
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.useCases.map((useCase, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3 h-full">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${c.checkBg}`}>
                    <Check className={`w-3.5 h-3.5 ${c.text}`} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{useCase}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample form fields */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Sample template</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Sample form fields
            </h2>
            <p className="text-gray-500 text-base">
              A typical {data.badge.toLowerCase()} form on FormBharat looks like this. Every field is customisable.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap gap-2.5">
                {data.formFields.map((field) => (
                  <span
                    key={field}
                    className="inline-flex items-center bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl"
                  >
                    {field}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                + Add any custom fields. Set required / optional. Reorder by drag. Goes live instantly.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why FormBharat differentiators */}
      <section className="py-16 md:py-20 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Why us</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Why Indian {data.badge.toLowerCase()} businesses choose FormBharat
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <AnimatedSection key={d.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base mb-2">{d.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
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
              Start building for free today
            </h2>
            <p className="text-gray-400 mb-8">
              No credit card. No setup. Your first form can be live in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/builder">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 rounded-xl shadow-md">
                  Build your form free <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/industries">
                <Button size="lg" variant="outline" className="px-8 rounded-xl border-white/30 text-white hover:bg-white/10">
                  See all industries
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
