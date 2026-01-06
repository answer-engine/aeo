'use client'

import { usePathname } from 'next/navigation'
import { Pencil } from 'lucide-react'

const GITHUB_REPO = 'AEOdev/aeo.dev'
const GITHUB_BRANCH = 'main'

export function EditOnGitHub() {
  const pathname = usePathname()
  
  // Convert pathname to file path
  const getFilePath = () => {
    if (pathname === '/') {
      return 'src/app/page.mdx'
    }
    return `src/app${pathname}/page.mdx`
  }
  
  const editUrl = `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${getFilePath()}`
  
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
    >
      <Pencil className="h-3 w-3" />
      Edit this page on GitHub
    </a>
  )
}

