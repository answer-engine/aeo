import Script from 'next/script'

interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  const id = `structured-data-${JSON.stringify(data).slice(0, 20).replace(/[^a-z0-9]/gi, '')}`

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AEO.dev',
    description:
      'The complete knowledge base for Answer Engine Optimization (AEO). Learn how to optimize your content for AI-powered search engines.',
    url: 'https://aeo.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aeo.dev?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <StructuredData data={schema} />
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AEO.dev',
    url: 'https://aeo.dev',
    description:
      'Answer Engine Optimization Knowledge Base - helping developers and content creators optimize for AI-powered search engines',
    founder: {
      '@type': 'Person',
      name: 'Pouya Nafisi',
      url: 'https://github.com/pouyanafisi',
    },
    sameAs: [
      'https://github.com/AEOdev',
    ],
  }

  return <StructuredData data={schema} />
}

interface TechArticleSchemaProps {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}

export function TechArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: TechArticleSchemaProps) {
  const baseUrl = 'https://aeo.dev'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: fullUrl,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: 'AEO.dev',
      url: baseUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Pouya Nafisi',
      url: 'https://github.com/pouyanafisi',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  }

  return <StructuredData data={schema} />
}

// Helper component to easily add TechArticle schema to MDX pages
// Usage in MDX pages - just add: <PageSchema title="..." description="..." pathname="/path" />
// No import needed - it's exported from mdx.tsx
// Returns null - schema is injected via useEffect for client-side, but for static generation
// we'll need to handle this differently
export function PageSchema({
  title,
  description,
  pathname,
}: {
  title: string
  description: string
  pathname: string
}) {
  // For now, return null to avoid build errors
  // Schema will be added via a different method
  if (typeof window === 'undefined') {
    // Server-side: inject via head
    return null
  }

  // Client-side: inject script
  if (typeof window !== 'undefined') {
    const baseUrl = 'https://aeo.dev'
    const fullUrl = pathname.startsWith('http') ? pathname : `${baseUrl}${pathname}`

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: title,
      description,
      url: fullUrl,
      publisher: {
        '@type': 'Organization',
        name: 'AEO.dev',
        url: baseUrl,
      },
      author: {
        '@type': 'Person',
        name: 'Pouya Nafisi',
        url: 'https://github.com/pouyanafisi',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
    }

    const scriptId = `schema-${pathname.replace(/\//g, '-')}`
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }

  return null
}
