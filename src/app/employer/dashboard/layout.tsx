import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Nhà Tuyển Dụng | JobFind.vn",
  description: "Quản lý tuyển dụng và ứng viên của bạn",
}

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
