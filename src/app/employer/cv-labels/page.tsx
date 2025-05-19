"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Tags } from "lucide-react"

const CVLabelsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const labels = [
    {
      id: 1,
      name: "Ưu tiên",
      color: "green",
      updatedAt: "12/03/2025",
      totalCVs: 0,
      unviewedCVs: 0,
      isDefault: true,
    },
    {
      id: 2,
      name: "Từ tiếp nhận",
      color: "red",
      updatedAt: "12/03/2025",
      totalCVs: 0,
      unviewedCVs: 0,
      isDefault: false,
    },
    {
      id: 3,
      name: "bankxxxxxk",
      color: "yellow",
      updatedAt: "12/03/2025",
      totalCVs: 0,
      unviewedCVs: 0,
      isDefault: false,
    },
  ]

  const filteredLabels = labels.filter((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Tags className="h-6 w-6 text-teal-600" />
          <h1 className="text-xl font-bold text-teal-700">Quản lý nhãn CV</h1>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Tạo và quản lý các nhãn để phân loại CV. Gắn nhãn vào CV giúp bạn dễ dàng theo dõi và tìm kiếm những ứng viên
          phù hợp.
        </p>

        <div className="relative w-full md:w-64 mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex justify-end mb-4">
          <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            <Plus size={16} className="mr-2" />
            Tạo nhãn mới
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr className="border-t border-b">
                <th className="px-4 py-3 font-medium">Tên nhãn</th>
                <th className="px-4 py-3 font-medium">Thời gian cập nhật</th>
                <th className="px-4 py-3 font-medium">Tổng số CV</th>
                <th className="px-4 py-3 font-medium">CV chưa xem</th>
                <th className="px-4 py-3 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabels.map((label) => (
                <tr key={label.id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full bg-${label.color}-500 mr-2`}></span>
                      {label.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">{label.updatedAt}</td>
                  <td className="px-4 py-3">{label.totalCVs}</td>
                  <td className="px-4 py-3">{label.unviewedCVs}</td>
                  <td className="px-4 py-3 text-right">
                    {!label.isDefault && (
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CVLabelsPage
