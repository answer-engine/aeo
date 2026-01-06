import glob from 'fast-glob'
import { type Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'
import {
  WebsiteSchema,
  OrganizationSchema,
} from '@/components/StructuredData'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aeo.dev'),
  title: {
    template: '%s | AEO.dev - Answer Engine Optimization',
    default: 'AEO.dev - Answer Engine Optimization Knowledge Base',
  },
  description:
    'The complete knowledge base for Answer Engine Optimization (AEO). Learn how to optimize your content for AI-powered search engines like ChatGPT, Perplexity, Google AI Overviews, and more.',
  openGraph: {
    title: 'AEO.dev - Answer Engine Optimization Knowledge Base',
    description:
      'The complete knowledge base for Answer Engine Optimization (AEO). Learn how to optimize your content for AI-powered search engines.',
    url: 'https://aeo.dev',
    siteName: 'AEO.dev',
    images: [
      {
        url: '/images/website.png',
        width: 1200,
        height: 630,
        alt: 'AEO.dev - Answer Engine Optimization Knowledge Base',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEO.dev - Answer Engine Optimization Knowledge Base',
    description:
      'The complete knowledge base for Answer Engine Optimization (AEO). Learn how to optimize your content for AI-powered search engines.',
    images: ['/images/website.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K8TTQ6HM');`}
        </Script>
      </head>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8TTQ6HM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <WebsiteSchema />
        <OrganizationSchema />
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
