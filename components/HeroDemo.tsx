'use client'

import { useState, useEffect } from 'react'
import { Sparkles, MessageSquare, Link as LinkIcon, Star, ChevronDown, Check, IndianRupee } from 'lucide-react'

// ─── Scenario data ────────────────────────────────────────────────────────────

type FieldType = 'text' | 'phone' | 'rating' | 'textarea' | 'dropdown' | 'file' | 'payment'

interface Field {
  label: string
  type: FieldType
  ratingValue?: number
  dropdownHint?: string
  amount?: string
}

interface Scenario {
  prompt: string
  title: string
  accent: 'orange' | 'blue' | 'purple'
  fields: Field[]
}

const SCENARIOS: Scenario[] = [
  {
    prompt: 'Customer feedback form for my restaurant',
    title: 'Restaurant Feedback',
    accent: 'orange',
    fields: [
      { label: 'Your Name',      type: 'text' },
      { label: 'Overall Rating', type: 'rating',   ratingValue: 4 },
      { label: 'Food Quality',   type: 'rating',   ratingValue: 5 },
      { label: 'Your Comments',  type: 'textarea' },
    ],
  },
  {
    prompt: 'Job application form for a software engineer',
    title: 'Software Engineer — Application',
    accent: 'blue',
    fields: [
      { label: 'Full Name',    type: 'text' },
      { label: 'Phone Number', type: 'phone' },
      { label: 'Current Role', type: 'text' },
      { label: 'Resume',       type: 'file' },
    ],
  },
  {
    prompt: 'Workshop registration form with UPI payment',
    title: 'Weekend Workshop — Registration',
    accent: 'purple',
    fields: [
      { label: 'Participant Name', type: 'text' },
      { label: 'T-Shirt Size',     type: 'dropdown', dropdownHint: 'S / M / L / XL' },
      { label: 'Meal Preference',  type: 'dropdown', dropdownHint: 'Veg / Non-Veg' },
      { label: 'Registration Fee', type: 'payment',  amount: '₹499' },
    ],
  },
]

// ─── Animation state machine ───────────────────────────────────────────────────

type Phase = 'typing' | 'generating' | 'fields' | 'sharing' | 'pause'

function useDemo() {
  const [idx,       setIdx]       = useState(0)
  const [phase,     setPhase]     = useState<Phase>('typing')
  const [chars,     setChars]     = useState(0)
  const [visible,   setVisible]   = useState(0)
  const [showShare, setShowShare] = useState(false)
  const sc = SCENARIOS[idx]

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (chars < sc.prompt.length) {
        t = setTimeout(() => setChars(c => c + 1), 38)
      } else {
        t = setTimeout(() => setPhase('generating'), 650)
      }
    } else if (phase === 'generating') {
      t = setTimeout(() => { setPhase('fields'); setVisible(0) }, 1900)
    } else if (phase === 'fields') {
      if (visible < sc.fields.length) {
        t = setTimeout(() => setVisible(v => v + 1), 390)
      } else {
        t = setTimeout(() => setPhase('sharing'), 350)
      }
    } else if (phase === 'sharing') {
      setShowShare(true)
      t = setTimeout(() => setPhase('pause'), 250)
    } else {
      // pause — hold so the user can read, then cycle
      t = setTimeout(() => {
        setIdx(i => (i + 1) % SCENARIOS.length)
        setPhase('typing')
        setChars(0)
        setVisible(0)
        setShowShare(false)
      }, 3400)
    }
    return () => clearTimeout(t)
  }, [phase, chars, visible, sc])

  return { sc, idx, phase, typedText: sc.prompt.slice(0, chars), visible, showShare }
}

// ─── Individual field renderers ────────────────────────────────────────────────

const STAR_COLOR: Record<string, string> = {
  orange: 'text-orange-400',
  blue:   'text-blue-400',
  purple: 'text-purple-400',
}
const PAY_BG: Record<string, string> = {
  orange: 'bg-orange-500',
  blue:   'bg-blue-500',
  purple: 'bg-purple-500',
}

function FieldPreview({ field, accent, delay }: { field: Field; accent: string; delay: number }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mb-1">{field.label}</p>

      {field.type === 'rating' && (
        <div className="flex gap-1 py-0.5">
          {[1, 2, 3, 4, 5].map(n => (
            <Star
              key={n}
              className={`w-4 h-4 transition-colors ${n <= (field.ratingValue ?? 3) ? `${STAR_COLOR[accent]} fill-current` : 'text-gray-200'}`}
            />
          ))}
        </div>
      )}

      {field.type === 'textarea' && (
        <div className="h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 space-y-1.5">
          <div className="w-3/4 h-1.5 bg-gray-200 rounded-full" />
          <div className="w-1/2 h-1.5 bg-gray-100 rounded-full" />
        </div>
      )}

      {field.type === 'phone' && (
        <div className="h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center px-3 gap-2">
          <span className="text-[10px] text-gray-400 font-medium">+91</span>
          <div className="w-px h-3 bg-gray-200" />
          <div className="w-24 h-1.5 bg-gray-200 rounded-full" />
        </div>
      )}

      {field.type === 'dropdown' && (
        <div className="h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center px-3 justify-between">
          <span className="text-[10px] text-gray-300">{field.dropdownHint}</span>
          <ChevronDown className="w-3 h-3 text-gray-300" />
        </div>
      )}

      {field.type === 'file' && (
        <div className="h-9 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
          <span className="text-[10px] text-gray-300">Drop file or click to upload</span>
        </div>
      )}

      {field.type === 'payment' && (
        <div className={`h-8 rounded-lg ${PAY_BG[accent]} flex items-center justify-center gap-1.5`}>
          <IndianRupee className="w-3 h-3 text-white" />
          <span className="text-[11px] font-semibold text-white">Pay {field.amount} via UPI / Card</span>
        </div>
      )}

      {field.type === 'text' && (
        <div className="h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center px-3">
          <div className="w-24 h-1.5 bg-gray-200 rounded-full" />
        </div>
      )}
    </div>
  )
}

// ─── Generating skeleton ───────────────────────────────────────────────────────

function GeneratingSkeleton() {
  return (
    <div className="space-y-3 py-1">
      <div className="h-4 w-40 bg-gray-200 rounded-full animate-pulse" />
      {[0, 1, 2, 3].map(n => (
        <div key={n} className="space-y-1.5" style={{ animationDelay: `${n * 120}ms` }}>
          <div className="h-2 w-14 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  )
}

// ─── Dot indicators ────────────────────────────────────────────────────────────

const DOT_ACTIVE = ['bg-orange-500', 'bg-blue-500', 'bg-purple-500']

function ScenarioDots({ current }: { current: number }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {SCENARIOS.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? `${DOT_ACTIVE[i]} w-5` : 'bg-gray-300 w-1.5'}`}
        />
      ))}
    </div>
  )
}

// ─── Label badge inside the AI strip ──────────────────────────────────────────

const STATUS_STYLE: Record<Phase, string> = {
  typing:     'hidden',
  generating: 'bg-orange-50 text-orange-500 border border-orange-100',
  fields:     'bg-green-50 text-green-600 border border-green-100',
  sharing:    'bg-green-50 text-green-600 border border-green-100',
  pause:      'bg-green-50 text-green-600 border border-green-100',
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function HeroDemo() {
  const { sc, idx, phase, typedText, visible, showShare } = useDemo()

  return (
    <div className="w-full select-none">
      {/* Browser chrome */}
      <div className="bg-[#f0f0f0] rounded-t-2xl px-4 py-2.5 flex items-center gap-3 border border-gray-200 border-b-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-400 font-mono tracking-tight">formbharat.com/builder</span>
        </div>
      </div>

      {/* App window */}
      <div className="bg-white border border-gray-200 rounded-b-2xl shadow-xl overflow-hidden">

        {/* AI prompt strip */}
        <div className="flex items-start gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-white border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="flex-1 min-h-[2.25rem]">
            <p className="text-[10px] text-gray-400 font-medium mb-0.5 uppercase tracking-widest">AI Prompt</p>
            <p className="text-[13px] text-gray-800 leading-snug font-medium">
              {typedText || <span className="text-gray-300 font-normal">Describe your form...</span>}
              {phase === 'typing' && (
                <span className="animate-cursor ml-px inline-block w-0.5 h-3.5 bg-orange-500 align-middle" />
              )}
            </p>
          </div>

          {/* Status badge */}
          {phase !== 'typing' && (
            <div className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[phase]}`}>
              {phase === 'generating' ? (
                <><Sparkles className="w-2.5 h-2.5 animate-spin" /> Generating...</>
              ) : (
                <><Check className="w-2.5 h-2.5" /> Done in 2s</>
              )}
            </div>
          )}
        </div>

        {/* Form preview area */}
        <div className="px-4 py-4 min-h-[230px]">
          {phase === 'typing' && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-8">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-xs text-gray-300 font-medium">Your form will appear here</p>
            </div>
          )}

          {phase === 'generating' && <GeneratingSkeleton />}

          {(phase === 'fields' || phase === 'sharing' || phase === 'pause') && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 animate-fade-in-up leading-tight">{sc.title}</h3>
              {sc.fields.slice(0, visible).map((field, i) => (
                <FieldPreview key={`${idx}-${i}`} field={field} accent={sc.accent} delay={0} />
              ))}
            </div>
          )}
        </div>

        {/* Share bar — slides in when form is complete */}
        <div
          className={`px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center gap-2 transition-all duration-500 ${
            showShare ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button className="flex items-center gap-1.5 bg-[#25D366] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-sm">
            <MessageSquare className="w-3 h-3" />
            Share on WhatsApp
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg">
            <LinkIcon className="w-3 h-3" />
            Copy link
          </button>
          <span className="text-[10px] text-green-500 font-semibold ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Live
          </span>
        </div>
      </div>

      <ScenarioDots current={idx} />
    </div>
  )
}
