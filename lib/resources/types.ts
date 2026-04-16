export interface ContentSection {
  heading: string
  body: string
  list?: string[]
}

export interface FAQ {
  q: string
  a: string
}

export interface Article {
  slug: string
  title: string
  description: string
  readTime: string
  publishDate: string
  tags: string[]
  intro: string
  sections: ContentSection[]
  faq: FAQ[]
  cta: { heading: string; body: string }
}

export interface Pillar {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  tagline: string
  articles: Article[]
}
