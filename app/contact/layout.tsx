import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - FormBharat Support',
  description: 'Get in touch with the FormBharat team. Reach us via email, WhatsApp, or the contact form. We respond within 24 hours on business days.',
  keywords: ['contact FormBharat', 'form builder support', 'customer support India', 'WhatsApp support'],
  alternates: {
    canonical: 'https://formbharat.com/contact',
  },
  openGraph: {
    title: 'Contact FormBharat - We Respond Within 24 Hours',
    description: 'Reach us via email, WhatsApp, or contact form. Friendly support from the FormBharat team.',
    url: 'https://formbharat.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact FormBharat',
    description: 'Reach us via email, WhatsApp, or contact form.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
