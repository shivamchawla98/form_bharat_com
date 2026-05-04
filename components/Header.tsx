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
  Users, PartyPopper, Heart,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { clearSession } from '@/lib/getToken'

// ─── Data ─────────────────────────────────────────────────────────────────────

const solutionItems = [
  { href: '/solutions/lead-generation',   icon: Target,        title: 'Lead Generation',     desc: 'Capture and qualify leads from web, WhatsApp, and offline events.' },
  { href: '/solutions/customer-feedback', icon: MessageSquare, title: 'Customer Feedback',    desc: 'NPS, CSAT, and product feedback — automated and trackable.' },
  { href: '/solutions/event-registration',icon: CalendarCheck, title: 'Event Registration',   desc: 'Registrations with built-in UPI and card payment collection.' },
  { href: '/solutions/job-applications',  icon: Briefcase,     title: 'Job Applications',     desc: 'Structured hiring forms with resume upload and auto-screening.' },
  { href: '/solutions/order-forms',       icon: ShoppingBag,   title: 'Order & Booking Forms',desc: 'Take orders and appointments online — with or without payment.' },
  { href: '/solutions/payment-collection',icon: IndianRupee,   title: 'Payment Collection',   desc: 'UPI + card payments collected directly inside your form.' },
]

const industryItems = [
  { href: '/industries/restaurants-food',    icon: UtensilsCrossed, title: 'Restaurants' },
  { href: '/industries/healthcare-clinics',  icon: Stethoscope,     title: 'Healthcare'  },
  { href: '/industries/education-coaching',  icon: GraduationCap,   title: 'Education'   },
  { href: '/industries/real-estate',         icon: Building2,       title: 'Real Estate' },
  { href: '/industries/retail-ecommerce',    icon: ShoppingCart,    title: 'Retail'      },
  { href: '/industries/hr-recruitment',      icon: Users,           title: 'HR & Hiring' },
  { href: '/industries/events-weddings',     icon: PartyPopper,     title: 'Events'      },
  { href: '/industries/nonprofits',          icon: Heart,           title: 'Non-profits' },
]

const resourcePillars = [
  { slug: 'lead-generation',      icon: Target,        title: 'Lead Generation',    desc: 'Capture & qualify leads from Indian markets.' },
  { slug: 'surveys-feedback',     icon: BarChart2,     title: 'Surveys & Feedback', desc: 'Measure CSAT, NPS, and employee satisfaction.' },
  { slug: 'form-design',          icon: Layers,        title: 'Form Design',        desc: 'Multi-step, mobile-first, high-converting forms.' },
  { slug: 'business-forms-india', icon: Building2,     title: 'Business Forms',     desc: 'India-specific forms built for SMBs.' },
  { slug: 'whatsapp-forms',       icon: MessageCircle, title: 'WhatsApp Forms',     desc: 'Collect responses directly via WhatsApp.' },
  { slug: 'form-analytics',       icon: TrendingUp,    title: 'Form Analytics',     desc: 'Improve completion rates with response data.' },
]

// ─── Dropdown panel shell ──────────────────────────────────────────────────────

function Panel({ ref: panelRef, children, className = '' }: { ref?: React.Ref<HTMLDivElement>; children: React.ReactNode; className?: string }) {
  return (
    <div
      ref={panelRef}
      className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function PanelHeader({ label, href, onClose }: { label: string; href: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
      <Link href={href} onClick={onClose} className="flex items-center gap-1 text-[12px] text-orange-500 hover:text-orange-600 transition-colors font-medium">
        View all <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [solutionsOpen, setSolutionsOpen]     = useState(false)
  const [industriesOpen, setIndustriesOpen]   = useState(false)
  const [resourcesOpen, setResourcesOpen]     = useState(false)
  const [mobileSolutions, setMobileSolutions] = useState(false)
  const [mobileIndustries, setMobileIndustries] = useState(false)
  const [mobileResources, setMobileResources] = useState(false)
  const [isLoggedIn, setIsLoggedIn]           = useState(false)
  const router = useRouter()

  const solutionsPanelRef  = useRef<HTMLDivElement>(null)
  const solutionsBtnRef    = useRef<HTMLButtonElement>(null)
  const industriesPanelRef = useRef<HTMLDivElement>(null)
  const industriesBtnRef   = useRef<HTMLButtonElement>(null)
  const resourcesPanelRef  = useRef<HTMLDivElement>(null)
  const resourcesBtnRef    = useRef<HTMLButtonElement>(null)

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem('token')) }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node
      if (!solutionsPanelRef.current?.contains(t) && !solutionsBtnRef.current?.contains(t))   setSolutionsOpen(false)
      if (!industriesPanelRef.current?.contains(t) && !industriesBtnRef.current?.contains(t)) setIndustriesOpen(false)
      if (!resourcesPanelRef.current?.contains(t) && !resourcesBtnRef.current?.contains(t))   setResourcesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => { clearSession(); setIsLoggedIn(false); router.push('/') }
  const closeAll = () => { setSolutionsOpen(false); setIndustriesOpen(false); setResourcesOpen(false) }

  const triggerCls = (open: boolean) =>
    `flex items-center gap-1 text-[13px] transition-colors ${open ? 'text-orange-500' : 'text-gray-500 hover:text-gray-900'}`

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-8">

        {/* Logo */}
        <Logo href="/" size="md" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1">

          <Link href="/features" className="text-[13px] text-gray-500 hover:text-orange-500 transition-colors">Features</Link>

          {/* Solutions */}
          <div className="relative">
            <button
              ref={solutionsBtnRef}
              onClick={() => { setSolutionsOpen(v => !v); setIndustriesOpen(false); setResourcesOpen(false) }}
              className={triggerCls(solutionsOpen)}
            >
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
            </button>

            {solutionsOpen && (
              <div ref={solutionsPanelRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <PanelHeader label="Solutions" href="/solutions" onClose={() => setSolutionsOpen(false)} />
                <div className="p-3 grid grid-cols-2 gap-px">
                  {solutionItems.map(({ href, icon: Icon, title, desc }) => (
                    <Link
                      key={href} href={href}
                      onClick={() => setSolutionsOpen(false)}
                      className="group flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 mt-0.5 flex-shrink-0 transition-colors" strokeWidth={1.75} />
                      <div>
                        <p className="text-[13px] font-medium text-gray-800 group-hover:text-orange-500 leading-tight">{title}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries */}
          <div className="relative">
            <button
              ref={industriesBtnRef}
              onClick={() => { setIndustriesOpen(v => !v); setSolutionsOpen(false); setResourcesOpen(false) }}
              className={triggerCls(industriesOpen)}
            >
              Industries
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {industriesOpen && (
              <div ref={industriesPanelRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[440px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <PanelHeader label="Industries" href="/industries" onClose={() => setIndustriesOpen(false)} />
                <div className="p-3 grid grid-cols-4 gap-px">
                  {industryItems.map(({ href, icon: Icon, title }) => (
                    <Link
                      key={href} href={href}
                      onClick={() => setIndustriesOpen(false)}
                      className="group flex flex-col items-center gap-2 px-2 py-3.5 rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                      <Icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-orange-500 transition-colors" strokeWidth={1.75} />
                      <span className="text-[12px] font-medium text-gray-600 group-hover:text-orange-500 leading-tight transition-colors">{title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/templates" className="text-[13px] text-gray-500 hover:text-orange-500 transition-colors">Templates</Link>
          <Link href="/pricing"   className="text-[13px] text-gray-500 hover:text-orange-500 transition-colors">Pricing</Link>

          {/* Resources */}
          <div className="relative">
            <button
              ref={resourcesBtnRef}
              onClick={() => { setResourcesOpen(v => !v); setSolutionsOpen(false); setIndustriesOpen(false) }}
              className={triggerCls(resourcesOpen)}
            >
              Resources
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesOpen && (
              <div ref={resourcesPanelRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <PanelHeader label="Resources" href="/resources" onClose={() => setResourcesOpen(false)} />
                <div className="p-3 grid grid-cols-2 gap-px">
                  {resourcePillars.map(({ slug, icon: Icon, title, desc }) => (
                    <Link
                      key={slug} href={`/resources/${slug}`}
                      onClick={() => setResourcesOpen(false)}
                      className="group flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 mt-0.5 flex-shrink-0 transition-colors" strokeWidth={1.75} />
                      <div>
                        <p className="text-[13px] font-medium text-gray-800 group-hover:text-orange-500 leading-tight">{title}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="text-[13px]">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[13px] text-gray-500 hover:text-gray-900">
                <LogOut className="h-3.5 w-3.5 mr-1.5" />Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-[13px] text-gray-600 hover:text-gray-900">Log in</Button>
              </Link>
              <Link href="/builder">
                <Button size="sm" className="text-[13px] bg-orange-500 hover:bg-orange-600 text-white shadow-none border-0 px-4">
                  Get started free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 flex flex-col">

            <MobileLink href="/features" onClick={() => setMobileOpen(false)}>Features</MobileLink>

            {/* Solutions accordion */}
            <MobileAccordion
              label="Solutions"
              open={mobileSolutions}
              onToggle={() => setMobileSolutions(v => !v)}
            >
              {solutionItems.map(({ href, icon: Icon, title }) => (
                <MobileSubLink key={href} href={href} icon={Icon} onClick={() => { setMobileOpen(false); setMobileSolutions(false) }}>
                  {title}
                </MobileSubLink>
              ))}
              <Link href="/solutions" onClick={() => { setMobileOpen(false); setMobileSolutions(false) }}
                className="flex items-center gap-1 px-2 py-2 text-[13px] font-medium text-orange-500 hover:text-orange-600">
                View all solutions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </MobileAccordion>

            {/* Industries accordion */}
            <MobileAccordion
              label="Industries"
              open={mobileIndustries}
              onToggle={() => setMobileIndustries(v => !v)}
            >
              {industryItems.map(({ href, icon: Icon, title }) => (
                <MobileSubLink key={href} href={href} icon={Icon} onClick={() => { setMobileOpen(false); setMobileIndustries(false) }}>
                  {title}
                </MobileSubLink>
              ))}
              <Link href="/industries" onClick={() => { setMobileOpen(false); setMobileIndustries(false) }}
                className="flex items-center gap-1 px-2 py-2 text-[13px] font-medium text-orange-500 hover:text-orange-600">
                View all industries <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </MobileAccordion>

            <MobileLink href="/templates" onClick={() => setMobileOpen(false)}>Templates</MobileLink>
            <MobileLink href="/pricing"   onClick={() => setMobileOpen(false)}>Pricing</MobileLink>

            {/* Resources accordion */}
            <MobileAccordion
              label="Resources"
              open={mobileResources}
              onToggle={() => setMobileResources(v => !v)}
            >
              {resourcePillars.map(({ slug, icon: Icon, title }) => (
                <MobileSubLink key={slug} href={`/resources/${slug}`} icon={Icon} onClick={() => { setMobileOpen(false); setMobileResources(false) }}>
                  {title}
                </MobileSubLink>
              ))}
              <Link href="/resources" onClick={() => { setMobileOpen(false); setMobileResources(false) }}
                className="flex items-center gap-1 px-2 py-2 text-[13px] font-medium text-orange-500 hover:text-orange-600">
                View all guides <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </MobileAccordion>

            <MobileLink href="/about"   onClick={() => setMobileOpen(false)}>About</MobileLink>
            <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>

            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full text-[13px]">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" className="w-full text-[13px] text-gray-500"
                    onClick={() => { handleLogout(); setMobileOpen(false) }}>
                    <LogOut className="h-4 w-4 mr-2" />Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full text-[13px]">Log in</Button>
                  </Link>
                  <Link href="/builder" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full text-[13px] bg-orange-500 hover:bg-orange-600 border-0">Get started free</Button>
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

// ─── Mobile helper components ─────────────────────────────────────────────────

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="px-2 py-2.5 text-[13px] text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
      {children}
    </Link>
  )
}

function MobileAccordion({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <>
      <button onClick={onToggle} className="flex items-center justify-between px-2 py-2.5 text-[13px] text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 w-full text-left transition-colors">
        {label}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-3 pl-3 border-l border-gray-100 mb-1 flex flex-col gap-0.5">
          {children}
        </div>
      )}
    </>
  )
}

function MobileSubLink({ href, icon: Icon, onClick, children }: { href: string; icon: React.ElementType; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="group flex items-center gap-2.5 px-2 py-2 text-[13px] text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" strokeWidth={1.75} />
      {children}
    </Link>
  )
}
