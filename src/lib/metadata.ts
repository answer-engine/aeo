import { type Metadata } from 'next'

/**
 * Helper function to generate OpenGraph and Twitter metadata for documentation pages
 */
export function generatePageMetadata({
  title,
  description,
  pathname,
}: {
  title: string
  description: string
  pathname: string
}): Metadata {
  const baseUrl = 'https://aeo.dev'
  const fullUrl = `${baseUrl}${pathname}`
  const fullTitle = `${title} - AEO.dev`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'AEO.dev',
      images: [
        {
          url: '/images/website.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/images/website.png'],
    },
  }
}
