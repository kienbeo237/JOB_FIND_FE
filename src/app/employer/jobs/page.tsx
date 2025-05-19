"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Clock, Edit, Trash2, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "TP. Hồ Chí Minh",
    department: "Engineering",
    postedDate: "10/11/2023",
    expiryDate: "10/12/2023",
    applicants: 18,
    status: "active",
  },
  {
    id: 2,
    title: "Product Manager",
    location: "TP. Hồ Chí Minh",
    department: "Product",
    postedDate: "08/11/2023",
    expiryDate: "08/12/2023",
    applicants: 12,
    status: "active",
  },
  {
    id: 3,
    title: "UX Designer",
    location: "TP. Hồ Chí Minh",
    department: "Design",
    postedDate: "05/11/2023",
    expiryDate: "05/12/2023",
    applicants: 9,
    status: "active",
  },
  {
    id: 4,
    title: "Backend Developer",
    location: "TP. Hồ Chí Minh",
    department: "Engineering",
    postedDate: "01/11/2023",
    expiryDate: "01/12/2023",
    applicants: 8,
    status: "active",
  },
  {
    id: 5,
    title: "HR Manager",
    location: "TP. Hồ Chí Minh",
    department: "Human Resources",
    postedDate: "25/10/2023",
    expiryDate: "25/11/2023",
    applicants: 5,
    status: "expired",
  },
  {
    id: 6,
    title: "Finance Specialist",
    location: "TP. Hồ Chí Minh",
    department: "Finance",
    postedDate: "20/10/2023",
    expiryDate: "20/11/2023",
    applicants: 7,
    status: "expired",
  },
  {
    id: 7,
    title: "Marketing Coordinator",
    location: "Hà Nội",
    department: "Marketing",
    postedDate: "15/10/2023",
    expiryDate: "15/11/2023",
    applicants: 4,
    status: "expired",
  },
]

export default function JobsPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobsData.filter((job) => {
    const matchesFilter = filter === "all" || job.status === filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
            Đang hiển thị
          </span>
        )
      case "expired":
        return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Hết hạn</span>
      case "draft":
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Bản nháp</span>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Quản lý tin tuyển dụng</h1>

        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/employer/jobs/create">
            <Plus size={18} className="mr-2" />
            Đăng tin mới
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo chức danh, phòng ban, địa điểm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === "all" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === "active" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đang hiển thị
            </button>
            <button
              onClick={() => setFilter("expired")}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === "expired" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Hết hạn
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-sm bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Chức danh</th>
                <th className="px-6 py-3 font-medium">Đăng ngày</th>
                <th className="px-6 py-3 font-medium">Hết hạn</th>
                <th className="px-6 py-3 font-medium">Ứng viên</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="text-sm hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-medium text-blue-600 text-sm">{job.title}</h3>
                      <div className="text-gray-500 text-xs mt-1">
                        <span>{job.department}</span>
                        <span className="mx-1">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {job.postedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {job.expiryDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium">{job.applicants}</span>
                  </td>
                  <td className="px-6 py-4">{renderStatusBadge(job.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                        title="Xóa tin"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto text-gray-300 mb-4 w-12 h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 7h-4a2 2 0 0 1-2-2V1"></path>
                <rect x="2" y="3" width="16" height="18" rx="2"></rect>
                <path d="M18 21V8"></path>
                <path d="M2 8h16"></path>
                <path d="M2 14h16"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy tin tuyển dụng</h3>
            <p className="text-gray-500 mb-6 text-sm">
              {searchTerm
                ? "Không có tin tuyển dụng nào phù hợp với tìm kiếm của bạn"
                : "Bạn chưa có tin tuyển dụng nào trong danh mục này"}
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/employer/jobs/create">
                <Plus size={18} className="mr-2" />
                Đăng tin mới
              </Link>
            </Button>
          </div>
        )}
      </div>

      {filteredJobs.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{filteredJobs.length}</span> trong tổng số{" "}
            <span className="font-medium">{jobsData.length}</span> tin tuyển dụng
          </div>

          <div className="flex space-x-1">
            <button
              className="px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Trước
            </button>
            <button className="px-3 py-1.5 border border-orange-500 rounded bg-orange-500 text-white font-medium">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-500 hover:bg-gray-50">
              Tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
