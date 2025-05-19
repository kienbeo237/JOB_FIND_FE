"use client"

import type React from "react"

import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <>{children}</>
}
