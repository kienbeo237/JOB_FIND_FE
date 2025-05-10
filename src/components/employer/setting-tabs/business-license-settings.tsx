"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, FileText, Globe, Info, Upload, Building, Hash } from "lucide-react"

export function BusinessLicenseSettings() {
  const [licenseImage, setLicenseImage] = useState<string | null>(null)
  const [businessData, setBusinessData] = useState({
    companyName: "Công ty TNHH Edward Vũ",
    taxId: "0222355771342",
    website: "www.edwardvu.vn",
    recruitmentBudget: "Chọn ngân sách (dưới 100tr VND/ 100-200/...)",
    businessType: "Chọn loại hình (công ty/ chuỗi, tập đoàn/ đại lý)",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (less than 1MB)
      if (file.size > 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 1MB.")
        return
      }

      // Check file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Chỉ chấp nhận file JPEG hoặc PNG.")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setLicenseImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-teal-600">Giấy phép kinh doanh</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin giấy phép kinh doanh của doanh nghiệp</p>
      </div>

      {/* Info notification */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Thông tin giấy phép kinh doanh được sử dụng để xác thực danh tính doanh nghiệp
            </p>
          </div>
        </div>
      </div>

      {/* License Image Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-medium text-teal-600">Hình ảnh giấy phép kinh doanh</h3>
        </div>

        <div className="flex space-x-3">
          <Button variant="default" className="bg-teal-500 hover:bg-teal-600">
            Ảnh GPKD đã tải
          </Button>
          <Button
            variant="default"
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => fileInputRef.current?.click()}
          >
            Cập nhật file mới
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleFileUpload}
          />
        </div>

        {/* License image preview */}
        {licenseImage ? (
          <div className="border rounded-md p-4">
            <img src={licenseImage || "/placeholder.svg"} alt="Giấy phép kinh doanh" className="max-h-64 mx-auto" />
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0 text-amber-500">
                <Info className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  Tải lên ảnh chụp rõ giấy phép kinh doanh dạng Jpeg, Png, không quá 1MB
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="h-4 w-4 mr-2" />
            Chụp ngay
          </Button>
          <Button
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Tải lên file sẵn có
          </Button>
          <input
            type="file"
            ref={cameraInputRef}
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Business Registration Information */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-medium text-teal-600">Thông tin đăng ký kinh doanh của doanh nghiệp</h3>
        </div>
        <p className="text-sm text-gray-500 italic">(Thông tin xuất hóa đơn VAT)</p>

        <div className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Tên doanh nghiệp{" "}
              <span className="text-red-500" title="Bắt buộc">
                *
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Building className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                value={businessData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
          </div>

          {/* Tax ID */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Mã số thuế doanh nghiệp{" "}
              <span className="text-red-500" title="Bắt buộc">
                *
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Hash className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                value={businessData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Website doanh nghiệp</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                value={businessData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
          </div>

          {/* Recruitment Budget */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Ngân sách tuyển dụng hàng năm{" "}
              <span className="text-red-500" title="Bắt buộc">
                *
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <Select
                value={businessData.recruitmentBudget}
                onValueChange={(value) => handleInputChange("recruitmentBudget", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Chọn ngân sách (dưới 100tr VND/ 100-200/...)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Chọn ngân sách (dưới 100tr VND/ 100-200/...)</SelectItem>
                  <SelectItem value="100-200">100-200 triệu VND</SelectItem>
                  <SelectItem value="200-500">200-500 triệu VND</SelectItem>
                  <SelectItem value="over-500">Trên 500 triệu VND</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Nhu cầu tuyển dụng cho doanh nghiệp </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                <Building className="h-4 w-4 text-gray-400" />
              </div>
              <Select
                value={businessData.businessType}
                onValueChange={(value) => handleInputChange("businessType", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Chọn loại hình (công ty/ chuỗi, tập đoàn/ đại lý)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Công ty</SelectItem>
                  <SelectItem value="corporation">Chuỗi, tập đoàn</SelectItem>
                  <SelectItem value="agency">Đại lý</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
            Xem trước
          </Button>
          <Button variant="default" className="bg-teal-500 hover:bg-teal-600">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  )
}
