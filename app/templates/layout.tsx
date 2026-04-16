import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Form Templates - Free Indian Business Templates',
  description: 'Browse 50+ free form templates for Indian businesses: contact forms, surveys, event registrations, feedback forms, quizzes, and more. Ready to customize.',
  keywords: ['form templates', 'Indian business templates', 'free form templates', 'survey templates', 'contact form template', 'event registration form'],
  alternates: {
    canonical: 'https://formbharat.com/templates',
  },
  openGraph: {
    title: 'Free Form Templates for Indian Businesses | FormBharat',
    description: '50+ ready-to-use templates: contact forms, surveys, event registrations, feedback, quizzes, and more.',
    url: 'https://formbharat.com/templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Form Templates | FormBharat',
    description: '50+ ready-to-use templates for Indian businesses.',
  },
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children
}
