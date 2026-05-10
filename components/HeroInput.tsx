'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { GuestAIGenerator } from '@/components/GuestAIGenerator'

const CHIPS: [string, string][] = [
  ['Feedback form',     'Customer feedback form for a restaurant with ratings for food and service'],
  ['Event registration','Event registration form for a tech conference'],
  ['Job application',   'Job application form for a software engineer position'],
  ['Order form',        'Product order form for a handmade jewelry business'],
]

export default function HeroInput() {
  const { toast } = useToast()
  const [description, setDescription] = useState('')
  const [showModal, setShowModal]     = useState(false)

  const handleGenerate = () => {
    if (!description.trim() || description.length < 10) {
      toast({ title: 'Please describe your form', description: 'Enter at least 10 characters', variant: 'destructive' })
      return
    }
    const token = localStorage.getItem('token')
    if (token) {
      localStorage.setItem('ai_generated_form_description', description)
      window.location.href = '/builder?ai=generated&new=true&generate=true'
      return
    }
    setShowModal(true)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <textarea
            id="hero-input"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your form... e.g. Customer feedback form for a restaurant with ratings for food and service"
            className="w-full min-h-[88px] text-sm md:text-[15px] bg-transparent text-gray-900 placeholder-gray-400 outline-none resize-none leading-relaxed"
            maxLength={500}
          />
        </div>

        <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 font-medium">Try:</span>
          {CHIPS.map(([label, full]) => (
            <button
              key={label}
              onClick={() => setDescription(full)}
              className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-300 rounded-full transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="px-5 py-4">
          <Button
            onClick={handleGenerate}
            disabled={!description.trim() || description.length < 10}
            className="w-full h-11 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors rounded-xl"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Form — It&apos;s Free
          </Button>
        </div>
      </div>

      <GuestAIGenerator open={showModal} onOpenChange={setShowModal} initialDescription={description} />
    </>
  )
}
