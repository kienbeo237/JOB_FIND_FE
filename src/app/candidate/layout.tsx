"use client"

import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import ProfileContent from "../../components/candidate/profile-content"
import CVManagementContent from "../../components/candidate/cv-management-content"
import CreateCVContent from "../../components/candidate/create-cv-content"
import JobApplicationsContent from "../../components/candidate/job-applications-content"
import ScheduleContent from "../../components/candidate/schedule-content"
import VideoContent from "../../components/candidate/video-content"
import AudioContent from "../../components/candidate/audio-content"
import AppliedJobsContent from "../../components/candidate/applied-jobs-content"
import SavedJobsContent from "../../components/candidate/saved-jobs-content"
import FollowingCompaniesContent from "../../components/candidate/following-companies-content"
import MatchingJobsContent from "../../components/candidate/matching-jobs-content"
import JobSuggestionsContent from "../../components/candidate/job-suggestions-content"
import MessagesContent from "../../components/candidate/messages-content"
import ChangePasswordContent from "../../components/candidate/change-password-content"

export default function CandidateLayout({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleSetActiveTab = (e: any) => {
      setIsLoading(true)
      setTimeout(() => {
        setActiveTab(e.detail)
        setIsLoading(false)
      }, 500)
    }

    window.addEventListener("setActiveTab", handleSetActiveTab)
    return () => {
      window.removeEventListener("setActiveTab", handleSetActiveTab)
    }
  }, [])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )
    }

    switch (activeTab) {
      case "profile":
        return <ProfileContent />
      case "cv-management":
        return <CVManagementContent />
      case "create-cv":
        return <CreateCVContent />
      case "job-applications":
        return <JobApplicationsContent />
      case "schedule":
        return <ScheduleContent />
      case "video":
        return <VideoContent />
      case "audio":
        return <AudioContent />
      case "applied-jobs":
        return <AppliedJobsContent />
      case "saved-jobs":
        return <SavedJobsContent />
      case "matching-jobs":
        return <MatchingJobsContent />
      case "job-suggestions":
        return <JobSuggestionsContent />
      case "following-companies":
        return <FollowingCompaniesContent />
      case "messages":
        return <MessagesContent />
      case "change-password":
        return <ChangePasswordContent />
      default:
        return children
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs transform bg-white transition duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:z-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 md:hidden">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  VĐ
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Vũ Đức</p>
                  <p className="text-xs text-gray-500">Ứng viên</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="space-y-1 px-2">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "dashboard",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "dashboard"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                  </svg>
                  Tổng quan
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "profile",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "profile"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Thông tin cá nhân
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "cv-management",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "cv-management"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  Quản lý CV
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "create-cv",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "create-cv"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Tạo mới CV
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "job-applications",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "job-applications"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Thư xin việc
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "schedule",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "schedule"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Sơ yếu lý lịch
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "video",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "video"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Video giới thiệu
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "audio",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "audio"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  Audio giới thiệu
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "applied-jobs",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "applied-jobs"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  Việc làm đã ứng tuyển
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "saved-jobs",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "saved-jobs"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  Việc làm đã lưu
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "matching-jobs",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "matching-jobs"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  Việc làm phù hợp
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "job-suggestions",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "job-suggestions"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Việc làm gợi ý
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "following-companies",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "following-companies"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  Công ty đang theo dõi
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "messages",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "messages"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Tin nhắn
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("setActiveTab", {
                        detail: "change-password",
                      })
                      window.dispatchEvent(event)
                      setMobileMenuOpen(false)
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-md group w-full text-left ${
                    activeTab === "change-password"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Đổi mật khẩu
                </button>
              </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  VĐ
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Vũ Đức</p>
                  <p className="text-xs text-gray-500">Ứng viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <main className="flex-1 overflow-auto">
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200 py-2 sm:py-4 px-3 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="md:hidden -ml-0.5 -mt-0.5 h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-none">
                    {activeTab === "profile"
                      ? "Thông tin cá nhân"
                      : activeTab === "cv-management"
                        ? "Quản lý CV"
                        : activeTab === "create-cv"
                          ? "Tạo mới CV"
                          : activeTab === "job-applications"
                            ? "Thư xin việc"
                            : activeTab === "schedule"
                              ? "Sơ yếu lý lịch"
                              : activeTab === "video"
                                ? "Video giới thiệu"
                                : activeTab === "audio"
                                  ? "Audio giới thiệu"
                                  : activeTab === "applied-jobs"
                                    ? "Việc làm đã ứng tuyển"
                                    : activeTab === "saved-jobs"
                                      ? "Việc làm đã lưu"
                                      : activeTab === "matching-jobs"
                                        ? "Việc làm phù hợp"
                                        : activeTab === "job-suggestions"
                                          ? "Việc làm gợi ý"
                                          : activeTab === "following-companies"
                                            ? "Công ty đang theo dõi"
                                            : activeTab === "messages"
                                              ? "Tin nhắn"
                                              : activeTab === "change-password"
                                                ? "Đổi mật khẩu"
                                                : "Tổng quan"}
                  </h1>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <button className="inline-flex items-center p-1.5 sm:px-3 sm:py-1.5 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="hidden sm:inline">Thông báo</span>
                  </button>
                  <button className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-1.5 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                    <span className="hidden sm:inline">Tìm việc</span>
                    <span className="sm:hidden">Tìm</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            <div className="container mx-auto py-8 px-4 md:px-6">{renderContent()}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
