import { MetadataRoute } from 'next'
import glob from 'fast-glob'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aeo.dev'

  // Get all MDX pages
  const pages = await glob('**/*.mdx', { cwd: 'src/app' })
  
  // Generate URLs from pages
  const routes = pages.map((filename) => {
    const path = '/' + filename.replace(/(^|\/)page\.mdx$/, '')
    return {
      url: `${baseUrl}${path === '/' ? '' : path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1.0 : 0.8,
    }
  })

  // Add homepage explicitly
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...routes.filter((route) => route.url !== baseUrl),
  ]

  return sitemapEntries
}
