'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Heart, Users, Target, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Built for <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Indian Businesses</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            FormBharat is on a mission to make form building simple, accessible, and powerful for every Indian business.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                We believe every business deserves access to powerful tools without breaking the bank. 
                That's why we're building FormBharat - a form builder that's free, powerful, and made specifically for India.
              </p>
              <p className="text-base md:text-lg text-gray-600">
                From small shops to growing startups, we're helping Indian businesses collect feedback, 
                manage registrations, and grow their operations - all for free.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{n:'10,000+',l:'Businesses to empower'},{n:'2 min',l:'To build a form'},{n:'Free',l:'Forever, no catch'},{n:'🇮🇳',l:'Made in India'}].map(s=>(
                <div key={s.l} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{s.n}</div>
                  <div className="text-sm text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Target className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">India First</CardTitle>
                  <CardDescription>
                    Built with Indian businesses in mind - from WhatsApp integration to Razorpay support.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-5 w-5 text-pink-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Always Free</CardTitle>
                  <CardDescription>
                    No hidden costs. Early access users get premium features free forever.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">User Focused</CardTitle>
                  <CardDescription>
                    Every feature we build is driven by feedback from real Indian businesses.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Fast & Simple</CardTitle>
                  <CardDescription>
                    Create forms in minutes, not hours. No training required.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Story */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Why We Built FormBharat</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                As developers and entrepreneurs in India, we've seen firsthand how expensive and complicated 
                form building tools can be. International tools often don't cater to Indian needs - no UPI 
                payments, no WhatsApp integration, no regional language support.
              </p>
              <p className="text-gray-600 mb-4">
                We built FormBharat to change that. A tool that understands the Indian market, supports 
                the platforms Indians actually use (WhatsApp, UPI), and is accessible to businesses of all sizes.
              </p>
              <p className="text-gray-600">
                Today, we're in early access and completely free. Our goal is to empower 10,000+ Indian 
                businesses in our first year, and we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Join Us on This Journey</h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
              Be part of India's form building revolution
            </p>
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Create Your First Form
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
