import type { Metadata } from 'next'

const articleMeta: Record<string, { title: string; description: string }> = {
  'getting-started': {
    title: 'Getting Started with FormBharat',
    description: 'A complete guide to creating your first form on FormBharat. Sign up, build, share, and collect responses in minutes.',
  },
  'create-form': {
    title: 'How to Create a Form',
    description: 'Step-by-step tutorial on creating forms with FormBharat. Learn about fields, validation, and customization.',
  },
  'use-templates': {
    title: 'Using Form Templates',
    description: 'Save time by using ready-made form templates for Indian businesses. Customize and deploy in minutes.',
  },
  'whatsapp-share': {
    title: 'How to Share Your Form on WhatsApp — Step-by-Step Guide',
    description: 'Share your FormBharat form link on WhatsApp in seconds. Works on personal WhatsApp, WhatsApp Business, and WhatsApp groups — no extra app needed.',
  },
  'collect-responses': {
    title: 'Collecting Form Responses',
    description: 'Everything you need to know about collecting, managing, and analyzing form responses in FormBharat.',
  },
  'webhook-setup': {
    title: 'Setting Up Webhooks',
    description: 'Integrate FormBharat with your tools using webhooks. Send form data to any endpoint in real-time.',
  },
  'view-analytics': {
    title: 'How to View Your Form Analytics — Submissions, Views & Drop-offs',
    description: 'See exactly how your form is performing — total views, submissions, completion rate, and where people drop off. Built into every FormBharat form.',
  },
  'export-data': {
    title: 'Exporting Form Data',
    description: 'Export form responses to CSV, Excel, or JSON. Keep your data backed up and portable.',
  },
  'email-notifications': {
    title: 'Set Up Email Notifications for Form Submissions — FormBharat',
    description: 'Get an email alert every time someone fills your form. Set up instant notifications in under 2 minutes — works with Gmail, Outlook, and any email.',
  },
  'multi-step-forms': {
    title: 'Creating Multi-Step Forms',
    description: 'Build multi-step forms to increase completion rates. Split long forms into digestible pages.',
  },
  'account-setup': {
    title: 'Account Setup Guide — FormBharat',
    description: 'Set up your FormBharat account in minutes. Add your business name, logo, and notification preferences so your forms look professional from day one.',
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    description: 'Common issues and solutions for FormBharat users. Find quick fixes for form creation and submission problems.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const meta = articleMeta[id]

  if (!meta) {
    return {
      title: 'Help Article',
      description: 'FormBharat help center article.',
    }
  }

  const url = `https://formbharat.com/help/${id}`

  return {
    title: `${meta.title} | Help Center`,
    description: meta.description,
    keywords: ['FormBharat', 'form builder India', ...meta.description.split(' ').filter((w) => w.length > 5).slice(0, 5)],
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.title} | FormBharat Help`,
      description: meta.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | FormBharat Help`,
      description: meta.description,
    },
  }
}

export default function HelpArticleLayout({ children }: { children: React.ReactNode }) {
  return children
}
