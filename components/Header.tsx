'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Menu, X, LogOut, ChevronDown, ArrowRight,
  Target, BarChart2, Layers, Building2, MessageCircle, TrendingUp,
  MessageSquare, CalendarCheck, Briefcase, ShoppingBag, IndianRupee,
  UtensilsCrossed, Stethoscope, GraduationCap, ShoppingCart,
  Users, PartyPopper, Heart, Sparkles, Zap,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { clearSession } from '@/lib/getToken'

// ─── Nav data ────────────────────────────────────────────────────────────────

const solutionItems = [
  {
    href: '/solutions/lead-generation',
    icon: Target,
    gradient: 'from-orange-500 to-amber-400',
    bg: 'bg-orange-50',
    title: 'Lead Generation',
    desc: 'Capture leads from web, WhatsApp & events',
  },
  {
    href: '/solutions/customer-feedback',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50',
    title: 'Customer Feedback',
    desc: 'NPS, CSAT, and product feedback forms',
  },
  {
    href: '/solutions/event-registration',
    icon: CalendarCheck,
    gradient: 'from-purple-500 to-violet-400',
    bg: 'bg-purple-50',
    title: 'Event Registration',
    desc: 'Registrations with built-in payment',
  },
  {
    href: '/solutions/job-applications',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-teal-400',
    bg: 'bg-emerald-50',
    title: 'Job Applications',
    desc: 'Structured hiring & screening forms',
  },
  {
    href: '/solutions/order-forms',
    icon: ShoppingBag,
    gradient: 'from-amber-500 to-yellow-400',
    bg: 'bg-amber-50',
    title: 'Order & Booking Forms',
    desc: 'Orders and appointments — online or offline',
  },
  {
    href: '/solutions/payment-collection',
    icon: IndianRupee,
    gradient: 'from-green-500 to-emerald-400',
    bg: 'bg-green-50',
    title: 'Payment Collection',
    desc: 'UPI + card payments inside your forms',
  },
]

const industryItems = [
  {
    href: '/industries/restaurants-food',
    icon: UtensilsCrossed,
    gradient: 'from-orange-500 to-red-400',
    title: 'Restaurants & Food',
    desc: 'Orders, feedback, reservations',
  },
  {
    href: '/industries/healthcare-clinics',
    icon: Stethoscope,
    gradient: 'from-red-500 to-rose-400',
    title: 'Healthcare & Clinics',
    desc: 'Patient forms & appointments',
  },
  {
    href: '/industries/education-coaching',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-indigo-400',
    title: 'Education & Coaching',
    desc: 'Admissions, fees & feedback',
  },
  {
    href: '/industries/real-estate',
    icon: Building2,
    gradient: 'from-emerald-500 to-green-400',
    title: 'Real Estate',
    desc: 'Leads, site visits & surveys',
  },
  {
    href: '/industries/retail-ecommerce',
    icon: ShoppingCart,
    gradient: 'from-purple-500 to-fuchsia-400',
    title: 'Retail & E-commerce',
    desc: 'Orders, returns & signups',
  },
  {
    href: '/industries/hr-recruitment',
    icon: Users,
    gradient: 'from-indigo-500 to-blue-400',
    title: 'HR & Recruitment',
    desc: 'Applications & onboarding',
  },
  {
    href: '/industries/events-weddings',
    icon: PartyPopper,
    gradient: 'from-pink-500 to-rose-400',
    title: 'Events & Weddings',
    desc: 'RSVPs, vendor forms & payments',
  },
  {
    href: '/industries/nonprofits',
    icon: Heart,
    gradient: 'from-rose-500 to-pink-400',
    title: 'NGOs & Non-profits',
    desc: 'Volunteers & donations',
  },
]

const resourcePillars = [
  {
    slug: 'lead-generation',
    icon: Target,
    gradient: 'from-orange-500 to-amber-400',
    title: 'Lead Generation',
    desc: 'Capture & qualify leads from Indian markets',
  },
  {
    slug: 'surveys-feedback',
    icon: BarChart2,
    gradient: 'from-blue-500 to-cyan-400',
    title: 'Surveys & Feedback',
    desc: 'Measure CSAT, NPS, and employee satisfaction',
  },
  {
    slug: 'form-design',
    icon: Layers,
    gradient: 'from-purple-500 to-violet-400',
    title: 'Form Design',
    desc: 'Multi-step, mobile-first, high-converting forms',
  },
  {
    slug: 'business-forms-india',
    icon: Building2,
    gradient: 'from-emerald-500 to-teal-400',
    title: 'Business Forms',
    desc: 'India-specific forms for SMBs',
  },
  {
    slug: 'whatsapp-forms',
    icon: MessageCircle,
    gradient: 'from-green-500 to-emerald-400',
    title: 'WhatsApp Forms',
    desc: 'Collect responses via WhatsApp',
  },
  {
    slug: 'form-analytics',
    icon: TrendingUp,
    gradient: 'from-pink-500 to-rose-400',
    title: 'Form Analytics',
    desc: 'Improve completion rates with data',
  },
]

// ─── Reusable mega menu item ──────────────────────────────────────────────────

function MegaMenuItem({
  href,
  icon: Icon,
  gradient,
  title,
  desc,
  onClick,
}: {
  href: string
  icon: React.ElementType
  gradient: string
  title: string
  desc: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-150"
    >
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-150`}>
        <Icon className="w-4 h-4 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
            {title}
          </p>
          <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0 ml-1" />
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
      </div>
    </Link>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const megaMenuRef = useRef<HTMLDivElement>(null)
  const resourcesBtnRef = useRef<HTMLButtonElement>(null)
  const solutionsMenuRef = useRef<HTMLDivElement>(null)
  const solutionsBtnRef = useRef<HTMLButtonElement>(null)
  const industriesMenuRef = useRef<HTMLDivElement>(null)
  const industriesBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node
      if (megaMenuRef.current && !megaMenuRef.current.contains(t) && resourcesBtnRef.current && !resourcesBtnRef.current.contains(t)) setResourcesOpen(false)
      if (solutionsMenuRef.current && !solutionsMenuRef.current.contains(t) && solutionsBtnRef.current && !solutionsBtnRef.current.contains(t)) setSolutionsOpen(false)
      if (industriesMenuRef.current && !industriesMenuRef.current.contains(t) && industriesBtnRef.current && !industriesBtnRef.current.contains(t)) setIndustriesOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => { setResourcesOpen(false); setSolutionsOpen(false); setIndustriesOpen(false) }

  const handleLogout = () => {
    clearSession()
    setIsLoggedIn(false)
    router.push('/')
  }

  const navLinkClass = "px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
  const megaTriggerClass = (open: boolean) =>
    `flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${open ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`

  return (
    <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-3.5">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Logo href="/" size="md" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">

            <Link href="/features" className={navLinkClass}>Features</Link>

            {/* ── Solutions ── */}
            <div className="relative">
              <button ref={solutionsBtnRef} onClick={() => { setSolutionsOpen(v => !v); setResourcesOpen(false); setIndustriesOpen(false) }} className={megaTriggerClass(solutionsOpen)}>
                Solutions
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsOpen && (
                <div ref={solutionsMenuRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">Solutions</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Pick the right workflow for your need</p>
                      </div>
                    </div>
                    <Link href="/solutions" onClick={() => setSolutionsOpen(false)} className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-3 grid grid-cols-2 gap-1">
                    {solutionItems.map(item => (
                      <MegaMenuItem key={item.href} {...item} onClick={() => setSolutionsOpen(false)} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Industries ── */}
            <div className="relative">
              <button ref={industriesBtnRef} onClick={() => { setIndustriesOpen(v => !v); setResourcesOpen(false); setSolutionsOpen(false) }} className={megaTriggerClass(industriesOpen)}>
                Industries
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {industriesOpen && (
                <div ref={industriesMenuRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">Industries</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Forms tailored to your business type</p>
                      </div>
                    </div>
                    <Link href="/industries" onClick={() => setIndustriesOpen(false)} className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* 4-column grid */}
                  <div className="p-3 grid grid-cols-4 gap-1">
                    {industryItems.map(item => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIndustriesOpen(false)}
                          className="group flex flex-col items-center text-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all duration-150"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-150`}>
                            <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">{item.title}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{item.desc}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link href="/templates" className={navLinkClass}>Templates</Link>
            <Link href="/pricing" className={navLinkClass}>Pricing</Link>

            {/* ── Resources ── */}
            <div className="relative">
              <button ref={resourcesBtnRef} onClick={() => { setResourcesOpen(v => !v); setSolutionsOpen(false); setIndustriesOpen(false) }} className={megaTriggerClass(resourcesOpen)}>
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {resourcesOpen && (
                <div ref={megaMenuRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">Resources</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">In-depth guides for Indian businesses</p>
                      </div>
                    </div>
                    <Link href="/resources" onClick={() => setResourcesOpen(false)} className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                      Browse all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-3 grid grid-cols-2 gap-1">
                    {resourcePillars.map(p => (
                      <MegaMenuItem key={p.slug} href={`/resources/${p.slug}`} icon={p.icon} gradient={p.gradient} title={p.title} desc={p.desc} onClick={() => setResourcesOpen(false)} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className={navLinkClass}>About</Link>

          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">My Forms</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                  <LogOut className="h-4 w-4 mr-1.5" />Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">Login</Button>
                </Link>
                <Link href="/builder">
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-sm shadow-orange-200 border-0">
                    Start Free →
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-0.5">

            <Link href="/features" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Features</Link>

            {/* Mobile solutions */}
            <button onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)} className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full text-left">
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolutionsOpen && (
              <div className="ml-2 space-y-0.5 border-l-2 border-orange-100 pl-3">
                {solutionItems.map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => { setMobileMenuOpen(false); setMobileSolutionsOpen(false) }}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      {item.title}
                    </Link>
                  )
                })}
                <Link href="/solutions" onClick={() => { setMobileMenuOpen(false); setMobileSolutionsOpen(false) }} className="flex items-center gap-1 px-2 py-2 text-sm font-semibold text-orange-600">
                  All solutions <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Mobile industries */}
            <button onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)} className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full text-left">
              Industries
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileIndustriesOpen && (
              <div className="ml-2 space-y-0.5 border-l-2 border-indigo-100 pl-3">
                {industryItems.map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => { setMobileMenuOpen(false); setMobileIndustriesOpen(false) }}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      {item.title}
                    </Link>
                  )
                })}
                <Link href="/industries" onClick={() => { setMobileMenuOpen(false); setMobileIndustriesOpen(false) }} className="flex items-center gap-1 px-2 py-2 text-sm font-semibold text-indigo-600">
                  All industries <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <Link href="/templates" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
            <Link href="/pricing" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>

            {/* Mobile resources */}
            <button onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)} className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full text-left">
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileResourcesOpen && (
              <div className="ml-2 space-y-0.5 border-l-2 border-purple-100 pl-3">
                {resourcePillars.map(p => {
                  const Icon = p.icon
                  return (
                    <Link key={p.slug} href={`/resources/${p.slug}`} onClick={() => { setMobileMenuOpen(false); setMobileResourcesOpen(false) }}
                      className="flex items-center gap-2.5 px-2 py-2 text-sm text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      {p.title}
                    </Link>
                  )
                })}
                <Link href="/resources" onClick={() => { setMobileMenuOpen(false); setMobileResourcesOpen(false) }} className="flex items-center gap-1 px-2 py-2 text-sm font-semibold text-purple-600">
                  All guides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <Link href="/about" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">My Forms</Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-center" onClick={() => { handleLogout(); setMobileMenuOpen(false) }}>
                    <LogOut className="h-4 w-4 mr-2" />Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-0">
                      Start Free →
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
