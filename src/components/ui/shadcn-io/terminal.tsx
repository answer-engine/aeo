"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const Terminal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-lg border bg-zinc-950 px-4 pb-6 pt-4 font-mono text-sm text-zinc-100 shadow-2xl",
      className
    )}
    {...props}
  >
    <div className="mb-4 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
    </div>
    <div className="space-y-1">
      {children}
    </div>
  </div>
))
Terminal.displayName = "Terminal"

interface TypingAnimationProps extends Omit<HTMLMotionProps<"span">, "children"> {
  delay?: number
  duration?: number
  children: React.ReactNode
}

const TypingAnimation = React.forwardRef<HTMLSpanElement, TypingAnimationProps>(
  ({ delay = 0, duration = 50, children, className, ...props }, ref) => {
    const [displayedText, setDisplayedText] = React.useState("")
    const fullText = String(children)

    React.useEffect(() => {
      let intervalId: NodeJS.Timeout | null = null
      
      const timer = setTimeout(() => {
        let currentIndex = 0
        intervalId = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setDisplayedText(fullText.slice(0, currentIndex))
            currentIndex++
          } else {
            if (intervalId) clearInterval(intervalId)
          }
        }, duration)
      }, delay)

      return () => {
        clearTimeout(timer)
        if (intervalId) clearInterval(intervalId)
      }
    }, [delay, duration, fullText])

    return (
      <motion.span
        ref={ref}
        className={cn("block", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay / 1000, duration: 0.1 }}
        {...props}
      >
        {displayedText}
        {displayedText.length < fullText.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block"
          >
            ▋
          </motion.span>
        )}
      </motion.span>
    )
  }
)
TypingAnimation.displayName = "TypingAnimation"

interface AnimatedSpanProps extends Omit<HTMLMotionProps<"span">, "children"> {
  delay?: number
  children: React.ReactNode
}

const AnimatedSpan = React.forwardRef<HTMLSpanElement, AnimatedSpanProps>(
  ({ delay = 0, children, className, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={cn("block", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay / 1000, duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)
AnimatedSpan.displayName = "AnimatedSpan"

export { Terminal, TypingAnimation, AnimatedSpan }

