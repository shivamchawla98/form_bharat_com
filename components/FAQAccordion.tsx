'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/faq-data'

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

