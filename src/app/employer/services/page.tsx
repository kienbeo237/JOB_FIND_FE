"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const EmployerActiveServicesPage = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("")

  const services = [
    {
      id: 1,
      orderId: "#269",
      name: "Job VIP3",
      createdDate: "13-03-2025",
      quantity: 1,
      status: "active",
      credits: 500,
    },
    {
      id: 2,
      orderId: "#270",
      name: "CV Search PRO",
      createdDate: "15-03-2025",
      quantity: 1,
      status: "active",
      credits: 300,
    },
    {
      id: 3,
      orderId: "#271",
      name: "Job POPULAR",
      createdDate: "20-03-2025",
      quantity: 2,
      status: "unused",
      credits: 200,
    },
    {
      id: 4,
      orderId: "#272",
      name: "Banner VIP1",
      createdDate: "01-04-2025",
      quantity: 1,
      status: "expired",
      credits: 700,
    },
  ]

  const filteredServices = services.filter((service) => {
    if (
      activeTab !== "all" &&
      ((activeTab === "unused" && service.status !== "unused") ||
        (activeTab === "active" && service.status !== "active") ||
        (activeTab === "expired" && service.status !== "expired"))
    ) {
      return false
    }

    if (searchQuery && !service.orderId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (selectedService && service.name !== selectedService) {
      return false
    }

    return true
  })

  const hasServices = filteredServices.length > 0

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-bold text-teal-700 mb-6">Dịch vụ của tôi</h1>

        <div className="mb-6 border-b pb-1">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === "all"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === "unused"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("unused")}
            >
              Chưa sử dụng
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === "active"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Đang sử dụng
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === "expired"
                  ? "border-b-2 border-teal-600 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("expired")}
            >
              Đã hết hạn
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Mã đơn"
                className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="w-full md:w-64">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Gói dịch vụ</option>
              <option value="Job POPULAR">JOB POPULAR</option>
              <option value="Job VIP1">JOB VIP1</option>
              <option value="Job VIP2">JOB VIP2</option>
              <option value="Job VIP3">JOB VIP3</option>
              <option value="CV Search PRO">CV Search PRO</option>
              <option value="Banner VIP1">Banner VIP1</option>
            </select>
          </div>

          <div>
            <Button
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              onClick={() => {
                setSearchQuery("")
                setSelectedService("")
                setActiveTab("all")
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        {hasServices ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-left text-sm bg-gray-50">
                <tr className="border-t border-b">
                  <th className="px-4 py-3 font-medium">STT</th>
                  <th className="px-4 py-3 font-medium">Mã đơn</th>
                  <th className="px-4 py-3 font-medium">Tên dịch vụ</th>
                  <th className="px-4 py-3 font-medium">Số lượng</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium">Điểm Credits</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr key={service.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{service.orderId}</td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-blue-600">{service.name}</p>
                        <p className="text-xs text-gray-500">Ngày tạo đơn: {service.createdDate}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{service.quantity}</td>
                    <td className="px-4 py-3 text-sm">
                      {service.status === "active" && (
                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Còn hiệu lực
                        </span>
                      )}
                      {service.status === "unused" && (
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Chưa sử dụng</span>
                      )}
                      {service.status === "expired" && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Đã hết hạn</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-blue-600">{service.credits} credits</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <img src="/no-services-found.png" alt="No Services" className="w-32 h-32 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không tìm thấy dịch vụ nào</h3>
            <p className="text-gray-500 mb-4">Bạn chưa có dịch vụ nào hoặc không có dịch vụ phù hợp với tìm kiếm</p>
            <Button
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              asChild
            >
              <Link href="/employer/packages">Mua dịch vụ</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployerActiveServicesPage
