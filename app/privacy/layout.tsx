import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FormBharat privacy policy. Learn how we collect, use, and protect your personal data in compliance with Indian data protection laws.',
  alternates: {
    canonical: 'https://formbharat.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | FormBharat',
    description: 'How FormBharat collects, uses, and protects your personal data.',
    url: 'https://formbharat.com/privacy',
    type: 'website',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
