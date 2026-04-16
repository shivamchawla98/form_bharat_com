import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - Form Builder with WhatsApp & Indian Templates',
  description: 'Discover powerful features: drag-and-drop builder, WhatsApp integration, multi-step forms, Indian templates, real-time analytics, webhooks, and more. Free forever.',
  keywords: ['form builder features', 'WhatsApp forms', 'drag and drop form', 'multi-step forms', 'form analytics India', 'webhook integration'],
  alternates: {
    canonical: 'https://formbharat.com/features',
  },
  openGraph: {
    title: 'Features - Powerful Form Builder for Indian Businesses | FormBharat',
    description: 'Drag-and-drop builder, WhatsApp integration, Indian templates, multi-step forms, real-time analytics, and webhooks - all free.',
    url: 'https://formbharat.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features | FormBharat',
    description: 'WhatsApp forms, Indian templates, multi-step forms, analytics - all free.',
  },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
