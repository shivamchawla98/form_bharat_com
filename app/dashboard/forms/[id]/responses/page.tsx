'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Download, BarChart3, Calendar, Loader2, FileText } from 'lucide-react'
import { getValidToken } from '@/lib/getToken'

function ResponsesContent() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormAndResponses()
  }, [])

  const fetchFormAndResponses = async () => {
    try {
      const token = await getValidToken()
      if (!token) {
        router.push('/auth/login')
        return
      }

      const [formRes, responsesRes] = await Promise.all([
        fetch(`/api/forms/${params.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/forms/${params.id}/responses`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ])

      if (!formRes.ok || !responsesRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const formData = await formRes.json()
      const responsesData = await responsesRes.json()

      setForm(formData)
      setResponses(responsesData)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load responses',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const exportToPDF = () => {
    // Inject a temporary print stylesheet then call print
    const styleId = 'pdf-print-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `
        @media print {
          body * { visibility: hidden; }
          #pdf-print-area, #pdf-print-area * { visibility: visible; }
          #pdf-print-area { position: absolute; inset: 0; padding: 32px; }
          header, nav, button, .no-print { display: none !important; }
          .pdf-response-card { page-break-inside: avoid; margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
          .pdf-response-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 4px; }
          .pdf-response-date { font-size: 12px; color: #6b7280; margin-bottom: 12px; }
          .pdf-field { border-left: 3px solid #f97316; padding-left: 12px; margin-bottom: 10px; }
          .pdf-field-label { font-size: 11px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; }
          .pdf-field-value { font-size: 13px; color: #111827; margin-top: 2px; }
          .pdf-header { margin-bottom: 24px; border-bottom: 2px solid #f97316; padding-bottom: 12px; }
          .pdf-form-title { font-size: 20px; font-weight: 800; color: #111827; }
          .pdf-meta { font-size: 12px; color: #6b7280; margin-top: 4px; }
          @page { margin: 20mm; size: A4; }
        }
      `
      document.head.appendChild(style)
    }
    window.print()
  }

  const exportToCSV = () => {
    if (responses.length === 0) return

    const headers = form.fields.map((f: any) => f.label)
    const rows = responses.map((r: any) => 
      form.fields.map((f: any) => {
        const value = r.data[f.id]
        return Array.isArray(value) ? value.join(', ') : value || ''
      })
    )

    const csv = [
      headers.join(','),
      ...rows.map((row: any) => row.map((cell: string) => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title.replace(/\s+/g, '_')}_responses.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'Responses exported successfully!',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading responses...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 font-medium">Form not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
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

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-1">{form.title}</h1>
          {form.description && (
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{form.description}</p>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-sm md:text-base text-gray-500">
              Total: {responses.length} {responses.length === 1 ? 'response' : 'responses'}
            </p>
            {responses.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={exportToCSV} variant="outline" size="sm" className="text-xs md:text-sm no-print">
                  <Download className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                  Export CSV
                </Button>
                <Button onClick={exportToPDF} variant="outline" size="sm" className="text-xs md:text-sm no-print">
                  <FileText className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                  Export PDF
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {responses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
                <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Total Responses</CardTitle>
                <BarChart3 className="h-4 md:h-5 w-4 md:w-5 text-orange-500" />
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="text-2xl md:text-3xl font-bold">{responses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
                <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Latest Response</CardTitle>
                <Calendar className="h-4 md:h-5 w-4 md:w-5 text-pink-500" />
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="text-base md:text-lg font-semibold">
                  {new Date(responses[0]?.createdAt).toLocaleDateString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(responses[0]?.createdAt).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
                <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Form Fields</CardTitle>
                <BarChart3 className="h-4 md:h-5 w-4 md:w-5 text-green-500" />
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="text-2xl md:text-3xl font-bold">{form.fields?.length || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Responses List */}
        {responses.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No responses yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Share your form to start collecting responses. Copy the form link from your dashboard.
              </p>
              <Link href="/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div id="pdf-print-area">
            {/* PDF-only header */}
            <div className="pdf-header hidden print:block">
              <div className="pdf-form-title">{form.title}</div>
              <div className="pdf-meta">{responses.length} responses · Exported {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>

            <div className="space-y-4">
              {responses.map((response, idx) => (
                <div key={response.id} className="pdf-response-card">
                  {/* Screen view */}
                  <Card className="hover:shadow-md transition-shadow print:hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Response #{responses.length - idx}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(response.createdAt).toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
                        {form.fields.map((field: any) => {
                          const value = response.data[field.id]
                          if (!value && value !== 0 && value !== false) return null
                          return (
                            <div key={field.id} className="border-l-4 border-orange-300 pl-4 py-2">
                              <div className="text-sm font-semibold text-gray-700 mb-1">{field.label}</div>
                              <div className="text-gray-900">{Array.isArray(value) ? value.join(', ') : String(value)}</div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Print view */}
                  <div className="hidden print:block">
                    <div className="pdf-response-title">Response #{responses.length - idx}</div>
                    <div className="pdf-response-date">{new Date(response.createdAt).toLocaleString('en-IN')}</div>
                    {form.fields.map((field: any) => {
                      const value = response.data[field.id]
                      if (!value && value !== 0 && value !== false) return null
                      return (
                        <div key={field.id} className="pdf-field">
                          <div className="pdf-field-label">{field.label}</div>
                          <div className="pdf-field-value">{Array.isArray(value) ? value.join(', ') : String(value)}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function ResponsesPage() {
  return (
    <ProtectedRoute>
      <ResponsesContent />
    </ProtectedRoute>
  )
}
