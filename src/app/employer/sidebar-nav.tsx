"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  FileText,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  FileCheck,
  MessageSquare,
  History,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Tổng quan",
    href: "/employer/dashboard",
    icon: BarChart,
  },
  {
    title: "Cài đặt tài khoản",
    href: "/employer/settings",
    icon: Settings,
  },
  {
    title: "Gói & mua",
    href: "/employer/packages",
    icon: ShoppingCart,
  },
  {
    title: "Giỏ hàng & thanh toán",
    href: "/employer/cart",
    icon: Truck,
  },
  {
    title: "Theo dõi đơn hàng",
    href: "/employer/orders",
    icon: History,
  },
  {
    title: "Dịch vụ còn hiệu lực",
    href: "/employer/services",
    icon: FileCheck,
  },
  {
    title: "Quản lý tin đăng",
    href: "/employer/job-posts",
    icon: FileText,
  },
  {
    title: "Quản lý CV ứng viên",
    href: "/employer/candidates",
    icon: Users,
  },
  {
    title: "Tin nhắn",
    href: "/employer/messages",
    icon: MessageSquare,
  },
  {
    title: "Hỗ trợ",
    href: "/employer/support",
    icon: HelpCircle,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium",
            pathname === item.href
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
