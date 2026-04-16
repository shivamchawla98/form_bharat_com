import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source Form Builder - Free & Self-Hostable',
  description: 'FormBharat is 100% open source. Contribute on GitHub, self-host for free, and join a transparent community-driven form builder built for India.',
  keywords: ['open source form builder', 'self-hosted forms', 'GitHub form builder', 'free form builder India', 'MIT license forms', 'community-driven'],
  alternates: {
    canonical: 'https://formbharat.com/open-source',
  },
  openGraph: {
    title: 'Open Source Form Builder - Free & Self-Hostable | FormBharat',
    description: 'FormBharat is 100% open source. Contribute on GitHub, self-host for free, and join a transparent community-driven form builder built for India.',
    url: 'https://formbharat.com/open-source',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Form Builder | FormBharat',
    description: 'FormBharat is 100% open source. Contribute on GitHub, self-host for free.',
  },
}

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
  return children
}
