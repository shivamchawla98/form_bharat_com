import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center - Guides, Tutorials & Support',
  description: 'Learn how to create forms, use templates, collect responses, integrate WhatsApp, and more. Browse our comprehensive help articles and tutorials.',
  keywords: ['FormBharat help', 'form builder tutorial', 'how to create form', 'form builder guide', 'WhatsApp form tutorial'],
  alternates: {
    canonical: 'https://formbharat.com/help',
  },
  openGraph: {
    title: 'Help Center - Guides & Tutorials | FormBharat',
    description: 'Learn how to create forms, use templates, and integrate WhatsApp with our help articles.',
    url: 'https://formbharat.com/help',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center | FormBharat',
    description: 'Guides, tutorials, and support for FormBharat users.',
  },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children
}
