'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export function Mermaid({ chart }: { chart: string }) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !mermaidRef.current) return

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    const element = mermaidRef.current

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#00D697',
        primaryTextColor: '#fff',
        primaryBorderColor: '#00D697',
        lineColor: '#00D697',
        secondaryColor: '#006100',
        tertiaryColor: '#fff',
        background: 'transparent',
        mainBkgColor: '#18181b',
        textColor: '#fff',
        border1: '#00D697',
        border2: '#00D697',
        noteBkgColor: '#18181b',
        noteTextColor: '#fff',
        noteBorderColor: '#00D697',
      },
    })

    element.id = id
    element.className = 'mermaid'
    element.textContent = chart

    mermaid
      .run({
        nodes: [element],
      })
      .then(() => {
        setError(null)
      })
      .catch((err) => {
        console.error('Mermaid rendering error:', err)
        setError('Failed to render diagram')
      })
  }, [chart, isMounted])

  if (!isMounted) {
    return (
      <div className="my-8 w-full overflow-x-auto">
        <div className="text-zinc-400">Loading diagram...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="my-8 w-full overflow-x-auto">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="my-8 w-full overflow-x-auto">
      <div ref={mermaidRef} className="mermaid w-full" />
    </div>
  )
}

