"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PostJobForm = () => {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("premium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Đăng tin thành công",
      description: "Tin tuyển dụng của bạn đã được đăng thành công",
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Đăng tin</h1>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Lựa chọn dịch vụ đăng tin còn hiệu lực</h2>

          <div className="bg-gray-50 rounded-md overflow-hidden mb-4">
            <table className="min-w-full">
              <thead className="text-left bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Tin</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Số lượng</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Lựa chọn</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Còn lại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-indigo-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">Tin PREMIUM (tháng)</p>
                      <a href="#" className="text-sm text-green-600 hover:underline">
                        Xem mẫu tin
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">
                    <RadioGroup defaultValue="premium" value={selectedPlan} onValueChange={setSelectedPlan}>
                      <RadioGroupItem value="premium" id="premium" className="text-green-600" />
                    </RadioGroup>
                  </td>
                  <td className="px-4 py-3">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">Tin SUITE (Tháng)</p>
                      <a href="#" className="text-sm text-green-600 hover:underline">
                        Xem mẫu tin
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">
                    <RadioGroup defaultValue="premium" value={selectedPlan} onValueChange={setSelectedPlan}>
                      <RadioGroupItem value="suite" id="suite" className="text-green-600" />
                    </RadioGroup>
                  </td>
                  <td className="px-4 py-3">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">Tin PREMIUM+ (Quý)</p>
                      <a href="#" className="text-sm text-green-600 hover:underline">
                        Xem mẫu tin
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">
                    <RadioGroup defaultValue="premium" value={selectedPlan} onValueChange={setSelectedPlan}>
                      <RadioGroupItem value="premium_plus" id="premium_plus" className="text-green-600" disabled />
                    </RadioGroup>
                  </td>
                  <td className="px-4 py-3">0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            <div className="w-3/4">
              <Button className="bg-green-600 hover:bg-green-700">Áp dụng</Button>
            </div>
            <div className="w-1/4 border rounded-md p-4 bg-white">
              <p className="text-center font-bold text-green-600">PREMIUM (tháng)</p>
              <p className="text-center text-sm mt-2">Đăng tin tuyển dụng cơ bản</p>
              <p className="text-center text-sm">Hiển thị trên trang ngành nghề 30 ngày</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-base font-semibold flex items-center">
                  Tiêu đề tin tuyển dụng
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input id="title" placeholder="VP nhân viên kinh doanh" />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-semibold flex items-center">
                  Ngành nghề quan tâm
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select defaultValue="accounting">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Kế toán/ kiểm toán/ thuế</SelectItem>
                    <SelectItem value="it">Công nghệ thông tin</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-gray-500 text-xs mt-1">(tối đa 3 và chọn)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-base font-semibold flex items-center">
                    Địa điểm làm việc
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select defaultValue="hanoi">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn địa điểm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level" className="text-base font-semibold flex items-center">
                    Cấp bậc
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select defaultValue="staff">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn cấp bậc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff">Nhân viên</SelectItem>
                      <SelectItem value="senior">Nhân viên cao cấp</SelectItem>
                      <SelectItem value="manager">Quản lý</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="salary" className="text-base font-semibold flex items-center">
                  Mức lương
                </Label>
                <Select defaultValue="range">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức lương" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="range">80 - 120 triệu VND</SelectItem>
                    <SelectItem value="negotiable">Thương lượng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edu" className="text-base font-medium">
                    Học vấn
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Không lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">Đại học</SelectItem>
                      <SelectItem value="college">Cao đẳng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-base font-medium">
                    Giới tính
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Không lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="any">Không yêu cầu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="exp" className="text-base font-medium">
                    Kinh nghiệm
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Không lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Chưa có kinh nghiệm</SelectItem>
                      <SelectItem value="1year">1 năm</SelectItem>
                      <SelectItem value="2years">2 năm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold flex items-center">
                  Mô tả công việc
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500 mr-2">Soạn Mô Tả</span>
                  <span className="text-sm text-blue-600">Gợi ý AI</span>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="flex bg-gray-100 border-b p-2">
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">
                      <span className="sr-only">Bold</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 12H14C16.2091 12 18 10.2091 18 8C18 5.79086 16.2091 4 14 4H6V12ZM6 12H15C17.2091 12 19 13.7909 19 16C19 18.2091 17.2091 20 15 20H6V12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">
                      <span className="sr-only">Italic</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 4H10M14 20H5M15 4L9 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">
                      <span className="sr-only">Underline</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 4V12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12V4M5 20H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <Textarea
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Soạn mô tả công việc chi tiết tại đây..."
                    rows={8}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements" className="text-base font-semibold flex items-center">
                  Yêu cầu ứng tuyển
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500 mr-2">Soạn Mô Tả</span>
                  <span className="text-sm text-blue-600">Gợi ý AI</span>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="flex bg-gray-100 border-b p-2">
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">U</button>
                  </div>
                  <Textarea
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Nhập yêu cầu ứng viên tại đây..."
                    rows={8}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="benefits" className="text-base font-semibold flex items-center">
                  Quyền lợi
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500 mr-2">Soạn Mô Tả</span>
                  <span className="text-sm text-blue-600">G��i ý AI</span>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="flex bg-gray-100 border-b p-2">
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded mr-1">U</button>
                  </div>
                  <Textarea
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Nhập quyền lợi của ứng viên khi làm việc tại đây..."
                    rows={8}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Xem trước
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Đăng tin
              </Button>
              <Button type="button" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Lưu tin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PostJobForm
