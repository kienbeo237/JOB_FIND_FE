"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  FileText,
  FilePlus,
  Mail,
  Calendar,
  Video,
  AudioLines,
  Briefcase,
  Bookmark,
  PuzzleIcon,
  MessageSquare,
  Building,
  Lock,
  Search,
} from "lucide-react"

const CandidateSidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          <Link
            href="/candidate/dashboard"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/dashboard")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Tổng quan
          </Link>

          <Link
            href="/candidate/profile"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/profile")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <User className="mr-3 h-5 w-5" />
            Thông tin cá nhân
          </Link>

          <Link
            href="/candidate/cv-management"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/cv-management")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <FileText className="mr-3 h-5 w-5" />
            Quản lý CV
          </Link>

          <Link
            href="/candidate/create-cv"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/create-cv")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <FilePlus className="mr-3 h-5 w-5" />
            Tạo mới CV
          </Link>

          <Link
            href="/candidate/job-applications"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/job-applications")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Mail className="mr-3 h-5 w-5" />
            Thư xin việc
          </Link>

          <Link
            href="/candidate/schedule"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/schedule")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Calendar className="mr-3 h-5 w-5" />
            Sơ yếu lý lịch
          </Link>

          <Link
            href="/candidate/video"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/video")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Video className="mr-3 h-5 w-5" />
            Video giới thiệu
          </Link>

          <Link
            href="/candidate/audio"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/audio")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <AudioLines className="mr-3 h-5 w-5" />
            Audio giới thiệu
          </Link>

          <Link
            href="/candidate/applied-jobs"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/applied-jobs")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Briefcase className="mr-3 h-5 w-5" />
            Việc làm đã ứng tuyển
          </Link>

          <Link
            href="/candidate/saved-jobs"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/saved-jobs")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Bookmark className="mr-3 h-5 w-5" />
            Việc làm đã lưu
          </Link>

          <Link
            href="/candidate/matching-jobs"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/matching-jobs")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <PuzzleIcon className="mr-3 h-5 w-5" />
            Việc làm phù hợp
          </Link>

          <Link
            href="/candidate/job-alerts"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/job-alerts")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Search className="mr-3 h-5 w-5" />
            Việc làm gợi ý
          </Link>

          <Link
            href="/candidate/following-companies"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/following-companies")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Building className="mr-3 h-5 w-5" />
            Công ty đang theo dõi
          </Link>

          <Link
            href="/candidate/messages"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/messages")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Tin nhắn
          </Link>

          <Link
            href="/candidate/change-password"
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md group",
              isActive("/candidate/change-password")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
            )}
          >
            <Lock className="mr-3 h-5 w-5" />
            Đổi mật khẩu
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">VĐ</div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Vũ Đức</p>
            <p className="text-xs text-gray-500">Ứng viên</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateSidebar
