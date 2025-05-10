"use client"

import type React from "react"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, text = "Đang tải...", children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50 transition-opacity duration-200">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-2" />
          <p className="text-sm font-medium text-gray-700">{text}</p>
        </div>
      )}
    </div>
  )
}

export default LoadingOverlay
