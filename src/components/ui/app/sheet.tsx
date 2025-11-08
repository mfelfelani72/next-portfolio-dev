"use client"

import * as React from "react"
import { cn } from "@/libs/cn"

interface SheetProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: "left" | "right" | "top" | "bottom"
}

const SheetContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

const Sheet: React.FC<SheetProps> = ({ children, open, onOpenChange }) => {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild = false }) => {
  const { setOpen } = React.useContext(SheetContext)

  return (
    <div onClick={() => setOpen(true)} className="cursor-pointer">
      {children}
    </div>
  )
}

const SheetContent: React.FC<SheetContentProps> = ({ 
  children, 
  className,
  side = "left" 
}) => {
  const { open, setOpen } = React.useContext(SheetContext)

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setOpen(false)}
      />
      
      {/* Sheet Content */}
      <div
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          {
            "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left": side === "left",
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right": side === "right",
            "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top": side === "top",
            "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom": side === "bottom",
          },
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

const SheetClose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setOpen } = React.useContext(SheetContext)

  return (
    <div onClick={() => setOpen(false)} className="cursor-pointer">
      {children}
    </div>
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
}