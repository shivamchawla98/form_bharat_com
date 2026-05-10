'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const DEMO_SCENARIOS = [
  {
    prompt: 'Customer feedback form for my restaurant...',
    title: 'Restaurant Feedback',
    fields: [
      { label: 'Full Name', hint: 'Short text' },
      { label: 'Overall Rating', hint: 'Rating 1–5 ★' },
      { label: 'Food Quality', hint: 'Rating 1–5 ★' },
      { label: 'Comments', hint: 'Long text' },
    ],
  },
  {
    prompt: 'Job application form for a software engineer...',
    title: 'Job Application',
    fields: [
      { label: 'Full Name', hint: 'Short text' },
      { label: 'Email Address', hint: 'Email' },
      { label: 'Years of Experience', hint: 'Number' },
      { label: 'Resume Upload', hint: 'File upload' },
    ],
  },
  {
    prompt: 'Event registration for a weekend workshop...',
    title: 'Workshop Registration',
    fields: [
      { label: 'Participant Name', hint: 'Short text' },
      { label: 'Phone Number', hint: 'Phone (India)' },
      { label: 'T-Shirt Size', hint: 'Dropdown' },
      { label: 'Payment', hint: 'UPI / Card' },
    ],
  },
]

function useFormDemo() {
  const [scenario, setScenario] = useState(0)
  const [phase, setPhase]       = useState<'typing' | 'generating' | 'fields' | 'pause'>('typing')
  const [chars, setChars]       = useState(0)
  const [visible, setVisible]   = useState(0)
  const current = DEMO_SCENARIOS[scenario]

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (chars < current.prompt.length) t = setTimeout(() => setChars(c => c + 1), 48)
      else t = setTimeout(() => setPhase('generating'), 700)
    } else if (phase === 'generating') {
      t = setTimeout(() => { setPhase('fields'); setVisible(0) }, 1600)
    } else if (phase === 'fields') {
      if (visible < current.fields.length) t = setTimeout(() => setVisible(v => v + 1), 350)
      else t = setTimeout(() => setPhase('pause'), 400)
    } else {
      t = setTimeout(() => {
        setScenario(s => (s + 1) % DEMO_SCENARIOS.length)
        setPhase('typing'); setChars(0); setVisible(0)
      }, 3200)
    }
    return () => clearTimeout(t)
  }, [phase, chars, visible, current])

  return { phase, text: current.prompt.slice(0, chars), visible, title: current.title, fields: current.fields }
}

export default function HeroDemo() {
  const demo = useFormDemo()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {/* Terminal */}
      <div className="bg-gray-950 rounded-2xl p-5 font-mono text-sm min-h-[220px]">
        <div className="flex gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <p className="text-gray-500 text-xs mb-2">$ describe your form</p>
        <p className="text-green-400 leading-relaxed min-h-[3rem]">
          {demo.text}
          {demo.phase === 'typing' && <span className="animate-cursor">▊</span>}
        </p>
        {demo.phase !== 'typing' && (
          <div className="mt-4 flex items-center gap-2 text-orange-400 text-xs">
            <Sparkles className={`h-3 w-3 ${demo.phase === 'generating' ? 'animate-spin' : ''}`} />
            {demo.phase === 'generating' ? 'Generating your form...' : '✓ Form generated in 2s'}
          </div>
        )}
      </div>

      {/* Form preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 min-h-[220px] shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="text-xs font-medium text-gray-600">{demo.title}</span>
          {(demo.phase === 'fields' || demo.phase === 'pause') && (
            <span className="ml-auto text-xs text-green-600 font-medium">✓ Ready</span>
          )}
        </div>
        <div className="space-y-2.5">
          {demo.fields.slice(0, demo.visible).map((f, i) => (
            <div key={i} className="animate-fade-in-up">
              <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wide">{f.label}</p>
              <div className="h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center px-3">
                <span className="text-[10px] text-gray-300">{f.hint}</span>
              </div>
            </div>
          ))}
          {demo.phase === 'generating' && (
            <div className="space-y-2">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-7 rounded-lg bg-gray-100 animate-pulse" style={{ animationDelay: `${n * 100}ms` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
