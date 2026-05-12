'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormBuilder } from '@/components/form-builder/FormBuilder'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { FormField } from '@/lib/types'
import { Loader2, Lock } from 'lucide-react'
import { getValidToken, storeSession } from '@/lib/getToken'

const PENDING_SAVE_KEY = 'pending_form_save'
const FORM_DRAFT_KEY = 'form_builder_draft'

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function BuilderPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [formData, setFormData] = useState<{ title: string; description: string; fields: FormField[] } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [templateData, setTemplateData] = useState<{ title: string; description: string; fields: FormField[] } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isNewForm, setIsNewForm] = useState(true)
  const [savedFormId, setSavedFormId] = useState<string | null>(null)

  useEffect(() => {
    const isAIGenerated = searchParams.get('ai') === 'generated'
    const shouldGenerate = searchParams.get('generate') === 'true'

    // Handle Supabase magic link redirect — hash contains #access_token=...
    const hash = window.location.hash
    if (hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')
      if (accessToken) {
        localStorage.setItem('token', accessToken)
        // Clean hash from URL without reload
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    // Restore saved draft (e.g. user was building and navigated away)
    if (!isAIGenerated && !searchParams.get('template')) {
      const savedDraft = localStorage.getItem(FORM_DRAFT_KEY)
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft)
          if (draft.fields?.length > 0) {
            setTemplateData(draft)
            setIsNewForm(true)
            toast({
              title: 'Draft restored',
              description: 'Your unsaved form has been restored.',
            })
          }
        } catch (_) {
          localStorage.removeItem(FORM_DRAFT_KEY)
        }
      }
    }

    if (isAIGenerated && shouldGenerate) {
      // Logged-in user from homepage: generate form now using their token
      const description = localStorage.getItem('ai_generated_form_description')
      if (description) {
        localStorage.removeItem('ai_generated_form_description')
        generateFromDescription(description)
      }
      return
    }

    if (isAIGenerated) {
      // Check if we have a pending description from magic link redirect
      const pendingDescription = localStorage.getItem('ai_form_description')
      if (pendingDescription) {
        localStorage.removeItem('ai_form_description')
        generateFromDescription(pendingDescription)
        return
      }

      // Post-OTP guest flow: form already generated, stored in localStorage
      const aiForm = localStorage.getItem('ai_generated_form')
      if (aiForm) {
        try {
          const generated = JSON.parse(aiForm)
          setTemplateData({
            title: generated.title,
            description: generated.description,
            fields: generated.fields.map((f: any, idx: number) => ({
              ...f,
              id: `field-${Date.now()}-${idx}`,
            })),
          })
          localStorage.removeItem('ai_generated_form')
          setIsNewForm(true)
          toast({
            title: '✨ AI Form Generated!',
            description: 'Customize your form and click Save when ready.',
          })
        } catch (error) {
          console.error('Error loading AI form:', error)
        }
      }
      return
    }
    
    // Check for template
    const savedTemplate = localStorage.getItem('selected-template')
    if (savedTemplate) {
      try {
        const template = JSON.parse(savedTemplate)
        setTemplateData({
          title: template.title,
          description: template.description,
          fields: template.fields
        })
        localStorage.removeItem('selected-template')
        setIsNewForm(true)
        
        toast({
          title: 'Template Loaded',
          description: `"${template.title}" template has been loaded. Customize and save it!`,
        })
      } catch (error) {
        console.error('Error loading template:', error)
      }
    }
  }, [toast, searchParams])

  const generateFromDescription = async (description: string) => {
    const token = await getValidToken()
    if (!token) return

    setIsSaving(true)
    toast({ title: '✨ Generating your form...', description: 'This usually takes 5-10 seconds' })

    try {
      const response = await fetch('/api/ai/generate-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to generate form')
      }

      const generated = await response.json()
      setTemplateData({
        title: generated.title,
        description: generated.description,
        fields: generated.fields.map((f: any, idx: number) => ({
          ...f,
          id: `field-${Date.now()}-${idx}`,
        })),
      })
      setIsNewForm(true)
      toast({ title: '✨ Form ready!', description: 'Customize it and click Save when done.' })
    } catch (error: any) {
      toast({ title: 'Generation failed', description: error.message || 'Please try again', variant: 'destructive' })
      router.push('/')
    } finally {
      setIsSaving(false)
    }
  }

  const saveForm = async (data: { title: string; description: string; fields: FormField[] }, token: string) => {
    setIsSaving(true)
    try {
      const saveResponse = await fetch('/api/forms', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json()
        throw new Error(errorData.error || 'Failed to save form')
      }

      const savedForm = await saveResponse.json()
      setSavedFormId(savedForm.id)
      setIsNewForm(false)

      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'form_saved', {
          event_category: 'engagement',
          event_label: data.title,
          value: 1,
        })
      }

      // Clear draft after successful save
      localStorage.removeItem(FORM_DRAFT_KEY)
      localStorage.removeItem(PENDING_SAVE_KEY)

      toast({
        title: 'Success',
        description: 'Form saved successfully!',
      })

      // Check if user needs to set password (email signup from AI flow)
      const userNeedsPassword = sessionStorage.getItem('needs_password') === 'true'
      if (userNeedsPassword && isNewForm) {
        sessionStorage.removeItem('needs_password')
        setShowPasswordDialog(true)
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save form',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSetPassword = async () => {
    if (!password || password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      return
    }

    try {
      const token = await getValidToken()
      const response = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) throw new Error('Failed to set password')

      toast({
        title: 'Password set! 🎉',
        description: 'Your account is now secure.',
      })

      setShowPasswordDialog(false)
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set password. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSave = async (data: { title: string; description: string; fields: FormField[] }) => {
    if (isSaving) return
    if (!data.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a form title',
        variant: 'destructive',
      })
      return
    }

    if (data.fields.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one field to your form',
        variant: 'destructive',
      })
      return
    }

    // Always persist a draft so work isn't lost on redirect/refresh
    try {
      localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(data))
    } catch (_) {}

    // Check if user is logged in
    const token = await getValidToken()
    if (token) {
      // User is logged in, save directly
      await saveForm(data, token)
    } else {
      // User not logged in, show auth dialog
      setFormData(data)
      setShowAuthDialog(true)
    }
  }

  const handleAuth = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter email and password',
        variant: 'destructive',
      })
      return
    }

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed')
      }

      // Store the authentication token
      if (result.session?.access_token) {
        storeSession(result.session.access_token, result.session.refresh_token)
      }

      // Save the form after successful auth
      if (formData) {
        const freshToken = await getValidToken()
        if (freshToken) {
          await saveForm(formData, freshToken)
          setShowAuthDialog(false)
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleGoogleAuth = async () => {
    if (!formData) return
    try {
      // Persist form data so it survives the OAuth redirect
      localStorage.setItem(PENDING_SAVE_KEY, JSON.stringify(formData))

      const response = await fetch('/api/auth/google', { method: 'POST' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No redirect URL returned')
      }
    } catch (error: any) {
      // Clean up pending save if OAuth couldn't start
      localStorage.removeItem(PENDING_SAVE_KEY)
      toast({
        title: 'Error',
        description: 'Could not start Google sign-in. Please try email instead.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <FormBuilder 
        onSave={handleSave}
        isSaving={isSaving}
        mode={isNewForm ? 'create' : 'edit'}
        initialTitle={templateData?.title}
        initialDescription={templateData?.description}
        initialFields={templateData?.fields}
      />
      
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isSignUp ? 'Sign up to save your form' : 'Login to save your form'}</DialogTitle>
            <DialogDescription>
              {isSignUp ? 'Create an account to save and manage your forms' : 'Sign in to save this form'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Google OAuth — primary, lowest friction */}
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full flex items-center gap-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-11 font-medium"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">or use email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            <Button
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              {isSignUp ? 'Sign up & Save Form' : 'Login & Save Form'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Setup Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              Secure Your Account
            </DialogTitle>
            <DialogDescription>
              Set a password to access your dashboard and manage your forms.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="new-password">Password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
              />
            </div>
            <Button
              onClick={handleSetPassword}
              disabled={!password || password !== confirmPassword || password.length < 8}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Set Password & Continue
            </Button>
            <p className="text-xs text-center text-gray-500">
              Your form has been saved. Set a password to access it anytime.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BuilderPageInner />
    </Suspense>
  )
}
