"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, FileEdit, Download, Plus } from "lucide-react"
import CandidateHeader from "@/components/candidate/header"

export default function CVManagementPage() {
  const [cvs, setCvs] = useState([
    {
      id: 1,
      name: "Vũ Văn Đức - Hotel Manager.pdf",
      lastUpdated: "23.03.2023",
    },
    {
      id: 2,
      name: "Mr. Đức - Quản lý khách sạn 2023.pdf",
      lastUpdated: "20.01.2023",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Quản lý CV</h1>
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Tạo CV mới
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Danh sách CV của bạn</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên CV
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cập nhật gần nhất
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cvs.map((cv) => (
                    <tr key={cv.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cv.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{cv.lastUpdated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <FileEdit className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {cvs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Bạn chưa có CV nào</p>
                <Button className="bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo CV mới
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
