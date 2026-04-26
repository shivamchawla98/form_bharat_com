'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Search, FileText, Users, Calendar, ShoppingCart, Briefcase, MessageSquare, ClipboardList, Award, Phone, Mail, ArrowRight } from 'lucide-react'
import { formTemplates } from '@/lib/templates-data'
import AnimatedSection from '@/components/AnimatedSection'

const iconMap: any = {
  MessageSquare, Calendar, Briefcase, ShoppingCart, Mail, ClipboardList, Users, Phone, Award, FileText
}

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleUseTemplate = (templateId: string) => {
    const template = formTemplates.find(t => t.id === templateId)
    if (template) {
      localStorage.setItem('selected-template', JSON.stringify(template))
      router.push('/builder')
    }
  }

  const categories = ['All', 'Business', 'Events', 'HR', 'Sales', 'Support', 'Research', 'Marketing']

  const filteredTemplates = formTemplates
    .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
    .filter(t => searchQuery === '' || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-orange-50 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">Templates</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 leading-[1.1]">
            Start in seconds,<br />
            <span className="text-orange-500">not hours</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Professionally designed templates for every use case. Customize and go live in minutes.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTemplates.map((template, i) => {
              const Icon = iconMap[template.icon] || FileText
              return (
                <AnimatedSection key={template.id} delay={i * 40}>
                  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{template.title}</h3>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">{template.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{template.fields.length} fields</span>
                      <button
                        onClick={() => handleUseTemplate(template.id)}
                        className="text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
                      >
                        Use template <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No templates found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-orange-500">
        <div className="container mx-auto max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Can&apos;t find what you need?</h2>
            <p className="text-orange-100 mb-8">Describe it in plain English — AI builds it in 10 seconds.</p>
            <Link href="/builder">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 rounded-xl shadow-md">
                Create custom form <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
