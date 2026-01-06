"use client"

import { useEffect, useState, useRef } from 'react'

interface TerminalLine {
  text: string
  type: 'command' | 'output' | 'prompt' | 'selection' | 'answer' | 'banner' | 'summary' | 'code'
  delay?: number // delay before this line starts
  typingSpeed?: number // ms per character (0 = instant)
  color?: string
}

const terminalScript: TerminalLine[] = [
  { text: '$ curl https://example.com/llms.txt', type: 'command', delay: 0, typingSpeed: 50 },
  { text: '', type: 'output', delay: 800, typingSpeed: 0 },
  { text: '# llms.txt', type: 'code', delay: 200, typingSpeed: 0, color: 'text-zinc-500' },
  { text: '# Machine-readable info for AI systems', type: 'code', delay: 100, typingSpeed: 0, color: 'text-zinc-500' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'site_name: Example Documentation', type: 'code', delay: 100, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'site_url: https://example.com', type: 'code', delay: 50, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'site_description: Complete guide to our API', type: 'code', delay: 50, typingSpeed: 0, color: 'text-cyan-400' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'llm_inference: allow', type: 'code', delay: 100, typingSpeed: 0, color: 'text-emerald-400' },
  { text: 'llm_training: allow', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: 'rag_usage: allow', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 300, typingSpeed: 0 },
  { text: '$ ', type: 'command', delay: 500, typingSpeed: 0 },
  { text: '$ cat robots.txt', type: 'command', delay: 800, typingSpeed: 50 },
  { text: '', type: 'output', delay: 600, typingSpeed: 0 },
  { text: 'User-agent: GPTBot', type: 'code', delay: 200, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'Allow: /', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'User-agent: Google-Extended', type: 'code', delay: 100, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'Allow: /', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'User-agent: PerplexityBot', type: 'code', delay: 100, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'Allow: /', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'User-agent: ClaudeBot', type: 'code', delay: 100, typingSpeed: 0, color: 'text-cyan-400' },
  { text: 'Allow: /', type: 'code', delay: 50, typingSpeed: 0, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 100, typingSpeed: 0 },
  { text: 'Sitemap: https://example.com/sitemap.xml', type: 'code', delay: 100, typingSpeed: 0, color: 'text-zinc-400' },
  { text: '', type: 'output', delay: 400, typingSpeed: 0 },
  { text: '$ ', type: 'command', delay: 500, typingSpeed: 0 },
  { text: '$ # AEO optimized! ✓', type: 'output', delay: 600, typingSpeed: 40, color: 'text-emerald-400' },
  { text: '', type: 'output', delay: 300, typingSpeed: 0 },
  { text: '$ ', type: 'command', delay: 500, typingSpeed: 0 },
]

export function InteractiveTerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color?: string }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [userHasScrolled, setUserHasScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAutoScrolling = useRef(false)

  // Detect user scroll - if they scroll away from bottom, they take control
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // If we're auto-scrolling, ignore this event
      if (isAutoScrolling.current) return

      // Check if user scrolled away from the bottom (with some tolerance)
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 30
      
      if (!isAtBottom) {
        setUserHasScrolled(true)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll to bottom (only if user hasn't taken control)
  useEffect(() => {
    if (containerRef.current && !userHasScrolled) {
      isAutoScrolling.current = true
      containerRef.current.scrollTop = containerRef.current.scrollHeight
      // Reset flag after a short delay
      requestAnimationFrame(() => {
        isAutoScrolling.current = false
      })
    }
  }, [displayedLines, currentCharIndex, userHasScrolled])

  useEffect(() => {
    if (currentLineIndex >= terminalScript.length) return

    const currentLine = terminalScript[currentLineIndex]
    const delay = currentLine.delay || 0

    const startLineTimer = setTimeout(() => {
      if (currentLine.typingSpeed && currentLine.typingSpeed > 0 && currentLine.text.length > 0) {
        // Typing animation
        setIsTyping(true)
        
        if (currentCharIndex === 0) {
          // Start new line
          setDisplayedLines(prev => [...prev, { text: '', color: currentLine.color }])
        }

        if (currentCharIndex < currentLine.text.length) {
          const charTimer = setTimeout(() => {
            setDisplayedLines(prev => {
              const newLines = [...prev]
              const lastIndex = newLines.length - 1
              newLines[lastIndex] = {
                ...newLines[lastIndex],
                text: currentLine.text.slice(0, currentCharIndex + 1)
              }
              return newLines
            })
            setCurrentCharIndex(prev => prev + 1)
          }, currentLine.typingSpeed)
          
          return () => clearTimeout(charTimer)
        } else {
          // Line complete, move to next
          setIsTyping(false)
          setCurrentCharIndex(0)
          setCurrentLineIndex(prev => prev + 1)
        }
      } else {
        // Instant display
        setDisplayedLines(prev => [...prev, { text: currentLine.text, color: currentLine.color }])
        setCurrentLineIndex(prev => prev + 1)
      }
    }, isTyping ? 0 : delay)

    return () => clearTimeout(startLineTimer)
  }, [currentLineIndex, currentCharIndex, isTyping])

  const getLineColor = (color?: string) => {
    if (color) return color
    return 'text-zinc-100'
  }

  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl">
      <div className="flex h-full flex-col">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-zinc-500">AEO Configuration Check</span>
        </div>
        
        {/* Terminal Content - no visible scrollbar */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {displayedLines.map((line, index) => (
            <div key={index} className={`${getLineColor(line.color)} whitespace-pre leading-relaxed`}>
              {line.text}
              {/* Show cursor at end of currently typing line */}
              {index === displayedLines.length - 1 && isTyping && (
                <span className="animate-pulse">▋</span>
              )}
              {/* Empty line still takes space */}
              {line.text === '' && '\u00A0'}
            </div>
          ))}
          
          {/* Blinking cursor at the end when not typing */}
          {!isTyping && currentLineIndex >= terminalScript.length && (
            <span className="animate-pulse text-zinc-100">▋</span>
          )}
        </div>
      </div>
    </div>
  )
}
