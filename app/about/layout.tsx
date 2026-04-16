import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Made in India Form Builder',
  description: 'FormBharat is built in India, for India. Learn about our mission to empower Indian businesses with a free, open-source form builder that understands local needs.',
  keywords: ['about FormBharat', 'made in India form builder', 'Indian startup', 'form builder company', 'open source India'],
  alternates: {
    canonical: 'https://formbharat.com/about',
  },
  openGraph: {
    title: 'About FormBharat - Made in India Form Builder',
    description: 'Built in India, for India. Empowering Indian businesses with a free, open-source form builder.',
    url: 'https://formbharat.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FormBharat',
    description: 'Built in India, for India. A free, open-source form builder.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
