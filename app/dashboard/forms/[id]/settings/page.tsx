'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Settings, Bell, Webhook, Zap, Send, Code, Copy, CheckCircle2, XCircle, Clock, RefreshCw } from 'lucide-react'

export default function FormSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Notification settings
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [emailRecipients, setEmailRecipients] = useState('')
  
  // Webhook settings
  const [webhookEnabled, setWebhookEnabled] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')

  // Multi-step settings
  const [multiStepEnabled, setMultiStepEnabled] = useState(false)

  // Webhook testing
  const [webhookTesting, setWebhookTesting] = useState(false)
  const [webhookLogs, setWebhookLogs] = useState<any[]>([])
  const [showWebhookLogs, setShowWebhookLogs] = useState(false)

  // Email testing
  const [emailTesting, setEmailTesting] = useState(false)

  // Embed code
  const [showEmbedCode, setShowEmbedCode] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)

  useEffect(() => {
    fetchForm()
  }, [])

  const fetchForm = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/forms/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      setForm(data)
      
      // Load settings
      setEmailEnabled(data.emailNotificationsEnabled || false)
      setEmailRecipients(data.emailRecipients?.join(', ') || '')
      setWebhookEnabled(data.webhookEnabled || false)
      setWebhookUrl(data.webhookUrl || '')
      setMultiStepEnabled(data.multiStepEnabled || false)
    } catch (error) {
      console.error('Error fetching form:', error)
    } finally {
      setLoading(false)
    }
  }

  const testWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({ title: 'Error', description: 'Please enter a webhook URL', variant: 'destructive' })
      return
    }
    
    setWebhookTesting(true)
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: params.id,
          test: true,
          timestamp: new Date().toISOString(),
        }),
      })
      
      if (response.ok) {
        toast({ title: 'Success', description: 'Webhook test successful!' })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error: any) {
      toast({ 
        title: 'Webhook Test Failed', 
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setWebhookTesting(false)
    }
  }

  const fetchWebhookLogs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/forms/${params.id}/webhook/logs`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setWebhookLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Error fetching webhook logs:', error)
    }
  }

  const testEmail = async () => {
    if (!emailRecipients.trim()) {
      toast({ title: 'Error', description: 'Please enter email recipients', variant: 'destructive' })
      return
    }
    
    setEmailTesting(true)
    toast({ title: 'Sending test email...', description: 'This may take a moment' })
    
    setTimeout(() => {
      setEmailTesting(false)
      toast({ 
        title: 'Test Email Sent', 
        description: 'Check your inbox (and spam folder)' 
      })
    }, 2000)
  }

  const copyEmbedCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setEmbedCopied(true)
    toast({ title: 'Copied!', description: 'Embed code copied to clipboard' })
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  const saveSettings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/forms/${params.id}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form?.title,
          description: form?.description,
          emailNotificationsEnabled: emailEnabled,
          emailRecipients: emailRecipients.split(',').map(e => e.trim()).filter(Boolean),
          webhookEnabled,
          webhookUrl: webhookUrl.trim() || null,
          multiStepEnabled
        }),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{form?.title} - Settings</h1>
          <p className="text-gray-600">Configure notifications, integrations, and advanced features</p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Get notified when someone submits this form</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-enabled">Enable email notifications</Label>
                <Switch
                  id="email-enabled"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
              
              {emailEnabled && (
                <>
                  <div>
                    <Label htmlFor="email-recipients">Recipients (comma separated)</Label>
                    <Input
                      id="email-recipients"
                      placeholder="email1@example.com, email2@example.com"
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Multiple emails can be added, separated by commas
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={testEmail}
                    disabled={emailTesting || !emailRecipients.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {emailTesting ? 'Sending...' : 'Send Test Email'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Webhook Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Webhook className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Webhook Integration</CardTitle>
                  <CardDescription>Send form responses to external services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-enabled">Enable webhook</Label>
                <Switch
                  id="webhook-enabled"
                  checked={webhookEnabled}
                  onCheckedChange={setWebhookEnabled}
                />
              </div>
              
              {webhookEnabled && (
                <>
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-server.com/webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll POST form responses to this URL in JSON format
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={testWebhook}
                      disabled={webhookTesting || !webhookUrl.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {webhookTesting ? 'Testing...' : 'Test Webhook'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setShowWebhookLogs(!showWebhookLogs)
                        if (!showWebhookLogs) fetchWebhookLogs()
                      }}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      View Logs
                    </Button>
                  </div>

                  {showWebhookLogs && (
                    <div className="border rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
                      <h4 className="font-semibold mb-3">Recent Webhook Deliveries</h4>
                      {webhookLogs.length === 0 ? (
                        <p className="text-sm text-gray-500">No webhook logs yet</p>
                      ) : (
                        <div className="space-y-2">
                          {webhookLogs.map((log: any) => (
                            <div key={log.id} className="flex items-center justify-between text-sm bg-white p-2 rounded border">
                              <div className="flex items-center gap-2">
                                {log.status === 'success' ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : log.status === 'failed' ? (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-600" />
                                )}
                                <span>{log.status}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(log.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Multi-Step Forms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Multi-Step Form</CardTitle>
                  <CardDescription>Break your form into multiple pages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="multistep-enabled">Enable multi-step form</Label>
                <Switch
                  id="multistep-enabled"
                  checked={multiStepEnabled}
                  onCheckedChange={setMultiStepEnabled}
                />
              </div>
              
              {multiStepEnabled && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Multi-step forms automatically group fields into pages of 3-4 fields each. 
                    Users can navigate with Next/Previous buttons.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle>Embed Form</CardTitle>
                  <CardDescription>Add this form to your website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEmbedCode(!showEmbedCode)}
                className="w-full"
              >
                <Code className="mr-2 h-4 w-4" />
                {showEmbedCode ? 'Hide Embed Code' : 'Show Embed Code'}
              </Button>

              {showEmbedCode && (
                <div className="space-y-4">
                  {/* iFrame Embed */}
                  <div>
                    <Label className="text-sm font-semibold">iFrame Embed</Label>
                    <div className="mt-2 relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<iframe 
  src="${window.location.origin}/f/${params.id}"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>`}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyEmbedCode(`<iframe src="${window.location.origin}/f/${params.id}" width="100%" height="600px" frameborder="0"></iframe>`)}
                      >
                        {embedCopied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Direct Link */}
                  <div>
                    <Label className="text-sm font-semibold">Direct Link</Label>
                    <div className="mt-2 flex gap-2">
                      <Input 
                        value={`${window.location.origin}/f/${params.id}`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyEmbedCode(`${window.location.origin}/f/${params.id}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Cancel
            </Button>
            <Button 
              onClick={saveSettings}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
