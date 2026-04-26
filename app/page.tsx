'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Shield, TrendingUp, Users, Smartphone, BarChart3, Globe, MessageSquare, PartyPopper, Briefcase, Target, ShoppingCart, Ticket, ClipboardList, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useToast } from '@/components/ui/use-toast'
import { GuestAIGenerator } from '@/components/GuestAIGenerator'

export default function Home() {
  const { toast } = useToast()
  const [aiDescription, setAIDescription] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section — AI input front and center */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 md:mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                🔓 Open Source • Free Forever
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Create any form in{' '}
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                10 seconds with AI
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
              Describe what you need in plain English — AI builds a complete form instantly. Built for Indian businesses.
            </p>
          </div>

          {/* AI Input — in the hero */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-orange-500 animate-pulse flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">AI Form Generator</span>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
              </div>
              <textarea
                value={aiDescription}
                onChange={(e) => setAIDescription(e.target.value)}
                placeholder="E.g., Customer feedback form for my restaurant with food quality and service ratings..."
                className="w-full min-h-[100px] md:min-h-[110px] text-base p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none"
                maxLength={500}
              />

              {/* Example chips */}
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {[
                  'Restaurant feedback',
                  'Event registration',
                  'Job application',
                  'Order form',
                  'Student enrollment',
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setAIDescription(
                      ['Customer feedback form for my restaurant with food quality and service ratings',
                       'Event registration form for a tech conference',
                       'Job application form for software engineer position',
                       'Product order form for handmade jewelry business',
                       'Student enrollment form for online courses'][index]
                    )}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-orange-100 hover:text-orange-700 text-gray-600 rounded-full transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => {
                  if (!aiDescription.trim() || aiDescription.length < 10) {
                    toast({
                      title: 'Please describe your form',
                      description: 'Enter at least 10 characters to generate a form',
                      variant: 'destructive',
                    })
                    return
                  }
                  const token = localStorage.getItem('token')
                  if (token) {
                    localStorage.setItem('ai_generated_form_description', aiDescription)
                    window.location.href = '/builder?ai=generated&new=true&generate=true'
                    return
                  }
                  setShowAuthModal(true)
                }}
                disabled={!aiDescription.trim() || aiDescription.length < 10}
                size="lg"
                className="w-full h-12 text-base bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Form Free
              </Button>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span>Powered by AWS Bedrock · 5–10 sec</span>
                <span>No credit card required</span>
              </div>
            </div>

            {/* Secondary actions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500">
              <span>Prefer to build manually?</span>
              <div className="flex gap-3">
                <Link href="/builder" className="font-medium text-orange-600 hover:text-orange-700 underline underline-offset-2">
                  Start from scratch
                </Link>
                <span>·</span>
                <Link href="/templates" className="font-medium text-orange-600 hover:text-orange-700 underline underline-offset-2">
                  Browse templates
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>100% Open Source</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal for AI Generation */}
      <GuestAIGenerator 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        initialDescription={aiDescription}
      />

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">100%</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Free Early Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-1 md:mb-2">10s</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">AI Form Generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">∞</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Unlimited Forms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">🇮🇳</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Built for India</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Everything You Need</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Powerful features designed specifically for Indian small businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* AI Feature — highlighted */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50 hover:border-orange-300 transition h-full md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 mx-auto">
                  ✨ NEW
                </div>
                <CardTitle>AI Form Generator</CardTitle>
                <CardDescription>
                  Describe your form in plain English. AI builds a complete, professional form in 10 seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <CardTitle>Drag &amp; Drop Builder</CardTitle>
                <CardDescription>
                  Create forms in minutes with our intuitive visual builder. No coding needed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-pink-600" />
                  </div>
                </div>
                <CardTitle>WhatsApp Integration</CardTitle>
                <CardDescription>
                  Share forms and collect responses via WhatsApp - the #1 platform in India.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Understand your responses with charts, trends, and actionable insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is encrypted and secure. GDPR compliant with Indian data hosting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle>Custom Branding</CardTitle>
                <CardDescription>
                  Add your logo, colors, and domain to make forms truly yours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Get instant notifications when someone submits your form.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4">Perfect for Every Business</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-4">
              From customer feedback to event registrations - we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Customer Feedback', icon: MessageSquare, desc: 'NPS surveys, reviews, complaints', color: 'bg-gray-100' },
              { title: 'Event Registration', icon: PartyPopper, desc: 'Webinars, conferences, meetups', color: 'bg-orange-100' },
              { title: 'Job Applications', icon: Briefcase, desc: 'Hiring, internships, freelance', color: 'bg-amber-100' },
              { title: 'Lead Generation', icon: Target, desc: 'Contact forms, quotes, demos', color: 'bg-red-100' },
              { title: 'Order Forms', icon: ShoppingCart, desc: 'Product orders, bookings, services', color: 'bg-gray-100' },
              { title: 'Surveys & Polls', icon: BarChart3, desc: 'Market research, voting, opinions', color: 'bg-blue-100' },
              { title: 'Support Tickets', icon: Ticket, desc: 'Help desk, bug reports, requests', color: 'bg-yellow-100' },
              { title: 'Registrations', icon: ClipboardList, desc: 'Course signup, membership, subscriptions', color: 'bg-orange-100' },
            ].map((useCase, i) => {
              const IconComponent = useCase.icon
              return (
                <Card key={i} className="text-center hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex justify-center mb-3">
                      <div className={`w-16 h-16 ${useCase.color} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="h-8 w-8 text-gray-700" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription className="text-sm">{useCase.desc}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl md:rounded-2xl p-6 md:p-12 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Ready to Get Started?</h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
              Join thousands of Indian businesses creating beautiful forms
            </p>
            <Link href="/builder" className="inline-block w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                Create Your First Form - It's Free!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
