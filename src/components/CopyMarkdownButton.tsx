'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Clipboard, Check } from 'lucide-react'
import { Button } from './ui/button'

export function CopyMarkdownButton() {
  const pathname = usePathname()
  const [mdxContent, setMdxContent] = useState<string>('')
  const [copied, setCopied] = useState(false)

  // Don't show on home page
  useEffect(() => {
    // Don't fetch on home page
    if (pathname === '/') {
      return
    }

    // Map pathname to MDX file path
    const mdxPath = `${pathname.replace(/\/$/, '')}/page.mdx`
    
    // Fetch the MDX content from API route
    fetch(`/api/mdx?path=${encodeURIComponent(mdxPath)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch MDX content')
        }
        return response.json()
      })
      .then(({ content }) => {
        setMdxContent(content)
      })
      .catch((error) => {
        console.error('Failed to fetch MDX content:', error)
      })
  }, [pathname])

  const handleCopy = async () => {
    if (!mdxContent) return
    
    try {
      await navigator.clipboard.writeText(mdxContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  // Don't show on home page or if content hasn't loaded
  if (pathname === '/' || !mdxContent) {
    return null
  }

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="icon"
      className="absolute top-16 right-0 z-10 border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      title={copied ? 'Copied!' : 'Copy Markdown'}
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
    </Button>
  )
}

