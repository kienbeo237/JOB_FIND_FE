"use client"
import { Mail, Phone, MapPin, Upload } from "lucide-react"
import type React from "react"

import { useState } from "react"

export default function EmployerSupportPage() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-bold text-teal-700 mb-6">Chuyên viên chăm sóc khách hàng</h1>

        <h2 className="text-lg font-medium mb-4">Liên hệ trực tuyến</h2>
        <p className="text-sm text-gray-600 mb-6">
          Trong trường hợp khẩn cấp bạn có thắc mắc hoặc cần tư vấn những vấn đề về dịch vụ, tài khoản nhà tuyển dụng.
          Vui lòng liên hệ trực tiếp đến chuyên viên chăm sóc tài khoản nhà tuyển dụng.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Support Staff Card */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg p-4 flex text-white">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <img
                  src="/placeholder.svg?key=ive9c"
                  alt="Support Staff"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-teal-100 mb-1">Nhân viên CSKH</div>
              <h3 className="font-medium">Thanh Vân</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-2" />
                  <span>Support@job3s.com.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2" />
                  <span>1900 86 61</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2" />
                  <span>+84 24 3333 3933</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <span className="text-xs">
                    Tòa nhà số 15 - 17 phố Ngọc Khánh, phường Giảng Võ, quận Ba Đình, TP. Hà Nội
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hotline Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <img src="/job3s-logo.png" alt="Job3s Logo" className="w-14 h-14 object-contain" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Hotline</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-2 text-teal-600" />
                  <span>Support@job3s.com.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-teal-600" />
                  <span>1900 86 61</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-teal-600" />
                  <span>+84 24 3333 3933</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2 text-teal-600" />
                  <span className="text-xs">
                    Tòa nhà số 15 - 17 phố Ngọc Khánh, phường Giảng Võ, quận Ba Đình, TP. Hà Nội
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Gửi yêu cầu tư vấn</h2>
          <p className="text-sm text-gray-600 mb-6">
            Trong trường hợp bạn muốn được nhận tư vấn giải đáp thông tin qua địa chỉ email.
            <br />
            Vui lòng nhập thông tin cần tư vấn.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Bạn đang thắc mắc?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Nội dung bạn muốn góp ý hoặc yêu cầu"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chọn tệp <span className="text-red-500">*</span>
              </label>
              <div
                className={`border border-dashed ${
                  dragActive ? "border-teal-500 bg-teal-50" : "border-gray-300"
                } rounded-md p-8 text-center relative`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {selectedFile ? (
                      <>
                        <span className="font-medium text-teal-600">{selectedFile.name}</span>
                        <br />
                        <span className="text-xs">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB - Nhấp để thay đổi
                        </span>
                      </>
                    ) : (
                      <>
                        Kéo & thả tệp của bạn vào đây
                        <br />
                        hoặc chọn trong máy tính
                      </>
                    )}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Gửi yêu cầu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
