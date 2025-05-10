"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Bold, Italic, List, ListOrdered, AlignLeft, ChevronLeft, ChevronRight, Upload, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { LoadingOverlay } from "../../ui/loading-overlay"

export function CompanyInfoSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: "Khách sạn Lavish Centre Hanoi",
    description:
      "Lavish Centre Hanoi là khách sạn cao cấp tọa lạc tại trung tâm Hà Nội, mang đến không gian nghỉ dưỡng sang trọng và hiện đại hiện đại. Với hệ thống phòng ốc tinh tế, dịch vụ đẳng cấp và vị trí thuận lợi, khách sạn là lựa chọn lý tưởng cho du khách công tác và nghỉ dưỡng. Trải nghiệm ẩm thực đa dạng, spa thư giãn và tiện ích cao cấp ngay giữa lòng thủ đô.",
    businessSector: "Khách Sạn, Du Lịch",
    companySize: "100 - 200 nhân viên",
    province: "Hà Nội",
    district: "Hai Bà Trưng",
    ward: "Vĩnh Tuy",
    address: "505 Minh Khai",
    logo: "",
    banner: "",
  })

  const logoFileInputRef = useRef<HTMLInputElement>(null)
  const bannerFileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUploadClick = () => {
    logoFileInputRef.current?.click()
  }

  const handleBannerUploadClick = () => {
    bannerFileInputRef.current?.click()
  }

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        toast({
          title: "Lỗi tải lên",
          description: "Vui lòng chọn file JPEG hoặc PNG",
          variant: "destructive",
        })
        return
      }

      // Validate file size (500KB = 512000 bytes)
      if (file.size > 512000) {
        toast({
          title: "Lỗi tải lên",
          description: "Kích thước file phải nhỏ hơn 500KB",
          variant: "destructive",
        })
        return
      }

      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file)
      setCompanyData({ ...companyData, logo: imageUrl })

      toast({
        title: "Tải lên thành công",
        description: "Logo đã được cập nhật",
      })
    }
  }

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        toast({
          title: "Lỗi tải lên",
          description: "Vui lòng chọn file JPEG hoặc PNG",
          variant: "destructive",
        })
        return
      }

      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        toast({
          title: "Lỗi tải lên",
          description: "Kích thước file phải nhỏ hơn 1MB",
          variant: "destructive",
        })
        return
      }

      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file)
      setCompanyData({ ...companyData, banner: imageUrl })

      toast({
        title: "Tải lên thành công",
        description: "Banner đã được cập nhật",
      })
    }
  }

  const removeLogoImage = () => {
    setCompanyData({ ...companyData, logo: "" })
    if (logoFileInputRef.current) {
      logoFileInputRef.current.value = ""
    }
  }

  const removeBannerImage = () => {
    setCompanyData({ ...companyData, banner: "" })
    if (bannerFileInputRef.current) {
      bannerFileInputRef.current.value = ""
    }
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      toast({
        title: "Lưu thành công",
        description: "Thông tin công ty đã được cập nhật",
      })
    }, 1500)
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (companyData.logo) URL.revokeObjectURL(companyData.logo)
      if (companyData.banner) URL.revokeObjectURL(companyData.banner)
    }
  }, [])

  return (
    <LoadingOverlay isLoading={isSaving} text="Đang lưu thông tin...">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold text-teal-600">Thông tin công ty</h2>
          <Button
            variant="outline"
            className="bg-white text-teal-600 border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSaving}
          >
            {isEditing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Logo and Banner Section */}
          <div className="space-y-4">
            <div className="border-l-4 border-teal-500 pl-3">
              <h3 className="text-base font-medium">Logo công ty và ảnh banner</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`rounded-md p-6 text-center flex flex-col items-center justify-center h-[150px] relative ${
                  companyData.logo
                    ? "bg-white border border-teal-300"
                    : isEditing
                      ? "bg-teal-500 text-white cursor-pointer hover:bg-teal-600 transition-colors"
                      : "bg-teal-500 text-white"
                }`}
                onClick={companyData.logo || !isEditing ? undefined : handleLogoUploadClick}
              >
                {companyData.logo ? (
                  <>
                    {isEditing && (
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeLogoImage()
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={companyData.logo || "/placeholder.svg"}
                        alt="Company Logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-6 w-6 mb-2" />
                    <p className="text-sm mb-1">File Jpeg, PNG, nhỏ hơn 500kb</p>
                    <p className="font-medium mb-2">Logo công ty</p>
                    <button className="text-sm underline">Cập nhật logo</button>
                  </>
                )}
                <input
                  type="file"
                  ref={logoFileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleLogoFileChange}
                />
              </div>

              <div
                className={`rounded-md p-6 text-center flex flex-col items-center justify-center h-[150px] relative ${
                  companyData.banner
                    ? "bg-white border border-teal-300"
                    : isEditing
                      ? "bg-teal-500 text-white cursor-pointer hover:bg-teal-600 transition-colors"
                      : "bg-teal-500 text-white"
                }`}
                onClick={companyData.banner || !isEditing ? undefined : handleBannerUploadClick}
              >
                {companyData.banner ? (
                  <>
                    {isEditing && (
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeBannerImage()
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={companyData.banner || "/placeholder.svg"}
                        alt="Company Banner"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-6 w-6 mb-2" />
                    <p className="text-sm mb-1">File Png, Jpeg kích thước 1350 x 350 pixel</p>
                    <p className="text-sm mb-1">nhỏ hơn 1 MB</p>
                    <p className="font-medium mb-2">Banner công ty</p>
                    <button className="text-sm underline">Thay ảnh banner công ty</button>
                  </>
                )}
                <input
                  type="file"
                  ref={bannerFileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleBannerFileChange}
                />
              </div>
            </div>
          </div>

          {/* Company Display Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="border-l-4 border-teal-500 pl-3">
                <h3 className="text-base font-medium">Thông tin hiển thị trên trang doanh nghiệp</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Tên doanh nghiệp khi hiển thị, rút gọn
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input
                  id="companyName"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Giới thiệu công ty
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 border rounded-md p-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <select className="border-0 text-sm focus:ring-0 py-1">
                          <option>Paragraph</option>
                        </select>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Bold className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Italic className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <List className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ListOrdered className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <AlignLeft className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                        >
                          Gợi ý AI
                        </Button>
                        <Button variant="outline" size="sm">
                          Chỉnh sửa
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="description"
                      value={companyData.description}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[120px]"
                    />
                  </div>
                ) : (
                  <div className="border rounded-md p-4 bg-gray-50 min-h-[120px]">{companyData.description}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="businessSector" className="text-sm font-medium">
                      Lĩnh vực hoạt động
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Select
                    value={companyData.businessSector}
                    onValueChange={(value) => setCompanyData({ ...companyData, businessSector: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Chọn lĩnh vực" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Khách Sạn, Du Lịch">Khách Sạn, Du Lịch</SelectItem>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="companySize" className="text-sm font-medium">
                      Quy Mô
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Select
                    value={companyData.companySize}
                    onValueChange={(value) => setCompanyData({ ...companyData, companySize: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dưới 50 nhân viên">Dưới 50 nhân viên</SelectItem>
                      <SelectItem value="50 - 100 nhân viên">50 - 100 nhân viên</SelectItem>
                      <SelectItem value="100 - 200 nhân viên">100 - 200 nhân viên</SelectItem>
                      <SelectItem value="Trên 200 nhân viên">Trên 200 nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="province" className="text-sm font-medium">
                      Tỉnh, Thành phố
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Select
                    value={companyData.province}
                    onValueChange={(value) => setCompanyData({ ...companyData, province: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                      <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                      <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="district" className="text-sm font-medium">
                      Quận, Huyện
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Select
                    value={companyData.district}
                    onValueChange={(value) => setCompanyData({ ...companyData, district: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hai Bà Trưng">Hai Bà Trưng</SelectItem>
                      <SelectItem value="Hoàn Kiếm">Hoàn Kiếm</SelectItem>
                      <SelectItem value="Đống Đa">Đống Đa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="ward" className="text-sm font-medium">
                      Phường, Xã
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Select
                    value={companyData.ward}
                    onValueChange={(value) => setCompanyData({ ...companyData, ward: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vĩnh Tuy">Vĩnh Tuy</SelectItem>
                      <SelectItem value="Bạch Mai">Bạch Mai</SelectItem>
                      <SelectItem value="Quỳnh Lôi">Quỳnh Lôi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Địa chỉ cụ thể số nhà, tên đường phố
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Input
                    id="address"
                    value={companyData.address}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        address: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">Xem trước</Button>
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Đang lưu..." : "Lưu"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}
