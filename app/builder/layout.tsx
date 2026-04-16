import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Form Builder',
  description: 'Create beautiful forms with drag-and-drop. Free form builder for Indian businesses.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return children
}
