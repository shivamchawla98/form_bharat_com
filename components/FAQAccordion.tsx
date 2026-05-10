'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'Is FormBharat really free?',
    a: 'Yes — 100% free during early access. Unlimited forms, unlimited responses, all features included. Early access users will be grandfathered into a generous free tier when we introduce paid plans.',
  },
  {
    q: 'How does the AI form generator work?',
    a: 'Describe your form in plain English — e.g. "customer feedback form for a restaurant with star ratings". Our AI understands your intent and generates all fields, labels, and structure in under 10 seconds.',
  },
  {
    q: 'Do I need coding skills?',
    a: 'Not at all. If you can type, you can build a form. FormBharat is designed for everyone — from kirana store owners to startup founders.',
  },
  {
    q: 'How do respondents fill out my form?',
    a: 'Every form gets a unique public link. Share it via WhatsApp, email, or embed it on your website. No login needed for respondents.',
  },
  {
    q: 'Can I collect UPI / card payments?',
    a: 'Yes. Add a Payment field to your form and respondents can pay via UPI, cards, or net banking through Razorpay — integrated directly into the form submission.',
  },
  {
    q: 'Where is my data stored?',
    a: 'All data is stored on Supabase PostgreSQL. We never sell or share your data. Export everything as CSV at any time.',
  },
]

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full text-left py-4 flex items-center justify-between gap-4 text-sm md:text-base font-medium text-gray-800 hover:text-orange-600 transition-colors"
        onClick={onToggle}
      >
        {q}
        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0', paddingBottom: open ? '1rem' : '0' }}
      >
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6">
      {FAQ_ITEMS.map((item, i) => (
        <FAQItem
          key={i}
          q={item.q}
          a={item.a}
          open={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  )
}

// Export for use in JSON-LD generation
export { FAQ_ITEMS }
