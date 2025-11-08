"use client"

import * as React from "react"
import { cn } from "@/libs/cn"

interface CollapseProps {
  children: React.ReactNode
  isOpen: boolean
  className?: string
}

const Collapse: React.FC<CollapseProps> = ({ children, isOpen, className }) => {
  const [height, setHeight] = React.useState(0)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      ref={contentRef}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        className
      )}
      style={{ height: isOpen ? `${height}px` : "0px" }}
    >
      {children}
    </div>
  )
}

export { Collapse }