"use client"

import { useState } from "react"
import { Search, Filter, Download, Star, Tag, Check, Mail, Phone, MapPin, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const CandidatesPage = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [showLabelDialog, setShowLabelDialog] = useState(false)
  const [showCVDialog, setShowCVDialog] = useState(false)
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)

  const sampleCV = {
    name: "Nguyễn Văn A",
    jobTitle: "Frontend Developer",
    email: "ng***@gmail.com",
    phone: "09********",
    address: "Quận 1, TP. Hồ Chí Minh",
    experience: [
      {
        company: "Công ty ABC",
        position: "Senior Frontend Developer",
        period: "06/2020 - Hiện tại",
        description:
          "Phát triển và duy trì các ứng dụng web sử dụng React, TypeScript và GraphQL. Tối ưu hóa hiệu suất và trải nghiệm người dùng. Hợp tác với đội ngũ backend để phát triển API. Hướng dn các thành viên mới trong team.",
      },
      {
        company: "Công ty XYZ",
        position: "Frontend Developer",
        period: "01/2018 - 05/2020",
        description:
          "Phát triển giao diện người dùng cho các ứng dụng web thương mại điện tử. Sử dụng Vue.js, Nuxt.js và REST API. Tham gia vào quá trình thiết kế và triển khai các tính năng mới.",
      },
    ],
    education: {
      university: "Đại học Công nghệ Thông tin",
      degree: "Cử nhân Khoa học Máy tính",
      graduationYear: "2017",
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "Vue.js",
      "HTML5",
      "CSS3",
      "SASS",
      "Git",
      "GraphQL",
      "REST API",
    ],
  }

  const labels = [
    { id: 1, name: "Frontend", color: "blue" },
    { id: 2, name: "Backend", color: "green" },
    { id: 3, name: "Design", color: "purple" },
    { id: 4, name: "Marketing", color: "orange" },
    { id: 5, name: "HR", color: "pink" },
  ]

  const candidates = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      position: "Frontend Developer",
      applyDate: "04-03-2024",
      status: "interviewed",
      rating: 4,
      labels: [1, 3],
      avatar: "NVA",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      position: "UI/UX Designer",
      applyDate: "01-03-2024",
      status: "pending",
      rating: 3,
      labels: [3],
      avatar: "TTB",
    },
    {
      id: 3,
      name: "Lê Hoàng C",
      email: "lehoangc@example.com",
      position: "Backend Developer",
      applyDate: "28-02-2024",
      status: "rejected",
      rating: 2,
      labels: [2],
      avatar: "LHC",
    },
    {
      id: 4,
      name: "Phạm Minh D",
      email: "phaminhd@example.com",
      position: "Product Manager",
      applyDate: "25-02-2024",
      status: "hired",
      rating: 5,
      labels: [4, 5],
      avatar: "PMD",
    },
  ]

  const handleOpenLabelDialog = (candidateId: number) => {
    setSelectedCandidateId(candidateId)
    setShowLabelDialog(true)
  }

  const handleViewCV = (candidateId: number) => {
    setSelectedCandidateId(candidateId)
    setShowCVDialog(true)
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    )
  }

  const renderCandidateStatus = (status: string) => {
    switch (status) {
      case "interviewed":
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Đã phỏng vấn</span>
      case "pending":
        return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Chờ phỏng vấn</span>
      case "rejected":
        return <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-xs">Từ chối</span>
      case "hired":
        return <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs">Đã tuyển</span>
      default:
        return null
    }
  }

  const getLabelById = (labelId: number) => {
    return labels.find((label) => label.id === labelId)
  }

  const renderLabelColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
      pink: "bg-pink-100 text-pink-800",
    }

    return colorMap[color] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h1 className="text-xl font-bold text-teal-700 mb-4 sm:mb-6">Quản lý CV ứng viên</h1>

        <div className="mb-4 sm:mb-6 border-b pb-1 overflow-x-auto">
          <div className="flex flex-nowrap min-w-max">
            <button
              className={`px-3 sm:px-4 py-2 ${
                activeTab === "all"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả ứng viên
            </button>
            <button
              className={`px-3 sm:px-4 py-2 ${
                activeTab === "new"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Ứng viên mới
            </button>
            <button
              className={`px-3 sm:px-4 py-2 ${
                activeTab === "interviewed"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("interviewed")}
            >
              Đã phỏng vấn
            </button>
            <button
              className={`px-3 sm:px-4 py-2 ${
                activeTab === "saved"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Đã lưu
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4 sm:mb-6">
          <div className="w-full md:w-96">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={18} className="text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, kỹ năng hoặc vị trí"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <Filter size={18} className="mr-2" />
              Bộ lọc
            </button>
          </div>

          <div className="w-full md:w-auto md:ml-auto">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <Download size={18} className="mr-2" />
              Xuất dữ liệu
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-left text-sm bg-gray-50">
                <tr className="border-t border-b">
                  <th className="px-4 py-3 font-medium">Ứng viên</th>
                  <th className="px-4 py-3 font-medium">Vị trí ứng tuyển</th>
                  <th className="px-4 py-3 font-medium">Ngày nộp CV</th>
                  <th className="px-4 py-3 font-medium">Nhãn</th>
                  <th className="px-4 py-3 font-medium">Đánh giá</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${
                            candidate.id % 4 === 0
                              ? "bg-green-100 text-green-600"
                              : candidate.id % 3 === 0
                                ? "bg-amber-100 text-amber-600"
                                : candidate.id % 2 === 0
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-blue-100 text-blue-600"
                          } flex items-center justify-center mr-3`}
                        >
                          {candidate.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-gray-500">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{candidate.position}</td>
                    <td className="px-4 py-3 text-sm">{candidate.applyDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {candidate.labels.map((labelId) => {
                          const label = getLabelById(labelId)
                          return label ? (
                            <span
                              key={labelId}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${renderLabelColor(
                                label.color,
                              )}`}
                            >
                              {label.name}
                            </span>
                          ) : null
                        })}
                        <button
                          onClick={() => handleOpenLabelDialog(candidate.id)}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <Tag size={10} className="mr-1" />
                          Gán nhãn
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{renderRatingStars(candidate.rating)}</td>
                    <td className="px-4 py-3 text-sm">{renderCandidateStatus(candidate.status)}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
                        onClick={() => handleViewCV(candidate.id)}
                      >
                        Xem CV
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <nav className="flex text-sm">
          <button className="px-3 py-1 border border-gray-300 rounded-l-md">Trước</button>
          <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-50 text-blue-600">1</button>
          <button className="px-3 py-1 border-t border-b border-gray-300">2</button>
          <button className="px-3 py-1 border-t border-b border-gray-300">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded-r-md">Sau</button>
        </nav>
      </div>

      <Dialog open={showLabelDialog} onOpenChange={setShowLabelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Gán nhãn CV</DialogTitle>
            <DialogDescription>Chọn nhãn để gán cho CV ứng viên này</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4 max-h-60 overflow-auto">
            {labels.map((label) => (
              <div key={label.id} className="flex items-center space-x-2">
                <div className={`flex-shrink-0 p-2 rounded ${renderLabelColor(label.color)}`}>
                  <Check size={14} />
                </div>
                <div className="flex-grow">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="flex flex-row gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="button">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCVDialog} onOpenChange={setShowCVDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CV của {sampleCV.name}</DialogTitle>
            <DialogDescription>Thông tin liên hệ đã được ẩn đi. Lưu CV để xem thông tin đầy đủ.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold">{sampleCV.name}</h2>
              <p className="text-lg text-gray-700">{sampleCV.jobTitle}</p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{sampleCV.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{sampleCV.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{sampleCV.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Kinh nghiệm làm việc</h3>
              <div className="space-y-4">
                {sampleCV.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Học vấn</h3>
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{sampleCV.education.degree}</h4>
                    <p className="text-gray-600">{sampleCV.education.university}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Tốt nghiệp {sampleCV.education.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Kỹ năng</h3>
              <div className="flex flex-wrap gap-2">
                {sampleCV.skills.map((skill) => (
                  <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
            <Button>Lưu CV</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CandidatesPage
