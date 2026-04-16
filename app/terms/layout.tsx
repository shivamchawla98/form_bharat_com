import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'FormBharat terms of service. Review the terms and conditions for using our form builder platform.',
  alternates: {
    canonical: 'https://formbharat.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | FormBharat',
    description: 'Terms and conditions for using the FormBharat platform.',
    url: 'https://formbharat.com/terms',
    type: 'website',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
