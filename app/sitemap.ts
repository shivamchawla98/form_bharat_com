import { MetadataRoute } from 'next'
import { pillars } from '@/lib/resources'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://formbharat.com'
  
  // Static pages with their priority and change frequency
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Help articles
  const helpArticles = [
    'getting-started',
    'create-form',
    'use-templates',
    'collect-responses',
    'view-analytics',
    'export-data',
    'whatsapp-share',
    'webhook-setup',
    'email-notifications',
    'multi-step-forms',
    'account-setup',
    'troubleshooting',
  ].map((slug) => ({
    url: `${baseUrl}/help/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Solutions
  const solutionsPages = [
    { url: `${baseUrl}/solutions`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/solutions/lead-generation`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/customer-feedback`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/event-registration`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/job-applications`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/order-forms`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/payment-collection`, priority: 0.8, changeFrequency: 'monthly' as const },
  ].map(p => ({ ...p, lastModified: new Date() }))

  // Industries
  const industriesPages = [
    { url: `${baseUrl}/industries`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/industries/restaurants-food`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/healthcare-clinics`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/education-coaching`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/real-estate`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/retail-ecommerce`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/hr-recruitment`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/events-weddings`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/industries/nonprofits`, priority: 0.8, changeFrequency: 'monthly' as const },
  ].map(p => ({ ...p, lastModified: new Date() }))

  // Resources hub
  const resourcesHub = [
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Resources pillar pages
  const resourcesPillars = pillars.map((pillar) => ({
    url: `${baseUrl}/resources/${pillar.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Resources articles
  const resourcesArticles = pillars.flatMap((pillar) =>
    pillar.articles.map((article) => ({
      url: `${baseUrl}/resources/${pillar.slug}/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [
    ...staticPages,
    ...solutionsPages,
    ...industriesPages,
    ...helpArticles,
    ...resourcesHub,
    ...resourcesPillars,
    ...resourcesArticles,
  ]
}
