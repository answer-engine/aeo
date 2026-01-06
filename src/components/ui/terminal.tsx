import * as React from "react"
import { cn } from "@/lib/utils"

const Terminal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-lg border bg-zinc-950 px-4 pb-6 pt-4 font-mono text-sm text-zinc-100 shadow-2xl",
      className
    )}
    {...props}
  />
))
Terminal.displayName = "Terminal"

const TerminalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 flex items-center gap-2", className)}
    {...props}
  />
))
TerminalHeader.displayName = "TerminalHeader"

const TerminalTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
TerminalTitle.displayName = "TerminalTitle"

const TerminalControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-1.5", className)}
    {...props}
  />
))
TerminalControls.displayName = "TerminalControls"

const TerminalControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-2.5 w-2.5 rounded-full bg-zinc-600", className)}
    {...props}
  />
))
TerminalControl.displayName = "TerminalControl"

const TerminalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
TerminalBody.displayName = "TerminalBody"

const TerminalPrompt = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
TerminalPrompt.displayName = "TerminalPrompt"

const TerminalCommand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-zinc-100", className)}
    {...props}
  />
))
TerminalCommand.displayName = "TerminalCommand"

const TerminalOutput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-zinc-400", className)}
    {...props}
  />
))
TerminalOutput.displayName = "TerminalOutput"

export {
  Terminal,
  TerminalHeader,
  TerminalTitle,
  TerminalControls,
  TerminalControl,
  TerminalBody,
  TerminalPrompt,
  TerminalCommand,
  TerminalOutput,
}

