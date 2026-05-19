import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Form Building Guides for Indian Businesses | FormBharat Resources',
  description: 'Step-by-step guides on WhatsApp forms, lead generation, surveys, and AI form building — written for Indian SMEs and startups. Free templates included.',
  keywords: [
    'AI form generation guide', 'form builder guide India', 'online forms India',
    'WhatsApp lead generation', 'survey best practices', 'form design tips',
    'business forms India', 'AI form prompts', 'generate form with AI India',
  ],
  alternates: {
    canonical: 'https://formbharat.com/resources',
  },
  openGraph: {
    title: 'Free Form Building Guides for Indian Businesses | FormBharat',
    description: 'Step-by-step guides on WhatsApp forms, lead generation, surveys, and AI form building — written for Indian SMEs and startups. Free templates included.',
    url: 'https://formbharat.com/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | FormBharat',
    description: 'Free guides on AI forms, lead generation, WhatsApp marketing, and more for Indian businesses.',
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
