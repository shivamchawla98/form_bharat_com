import type { Metadata } from 'next'

async function fetchForm(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formbharat.com'
    const res = await fetch(`${baseUrl}/api/forms/${id}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const form = await fetchForm(id)

  if (!form) {
    return {
      title: 'Form',
      description: 'Fill out this form on FormBharat.',
      robots: { index: false, follow: false },
    }
  }

  const title = form.title || 'Form'
  const description = form.description || `Fill out "${title}" on FormBharat.`
  const url = `https://formbharat.com/f/${id}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | FormBharat`,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | FormBharat`,
      description,
    },
  }
}

export default function PublicFormLayout({ children }: { children: React.ReactNode }) {
  return children
}
