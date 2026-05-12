'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return

    setStatus('loading')
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      } else {
        setStatus('success')
        setMessage(data.message || 'You\'re on the list!')
        setEmail('')
      }
    } catch {
      setStatus('error')
      setMessage('Could not connect. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2.5 text-green-700 bg-green-50 border border-green-200 rounded-xl px-5 py-3">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
        <span className="text-sm font-medium">{message} We&apos;ll let you know when new features ship.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 rounded-xl border-gray-200 flex-1 text-sm"
        disabled={status === 'loading'}
        required
      />
      <Button
        type="submit"
        disabled={status === 'loading' || !email.trim()}
        className="h-11 px-5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm whitespace-nowrap shrink-0"
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>Get updates <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>
        )}
      </Button>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-1 sm:absolute sm:bottom-0 sm:translate-y-full">{message}</p>
      )}
    </form>
  )
}
