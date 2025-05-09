"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function CreateUserSettings() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="bg-green-600 text-white font-medium py-2 px-4 rounded-md inline-block mb-6">
        Tạo người dùng phụ
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold uppercase">Thông tin truy cập</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input id="email" placeholder="vuduc0510@gmail.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">
              Tỉnh / Thành phố <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn Tỉnh / Thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Mật khẩu <span className="text-red-500">*</span>
            </Label>
            <Input id="password" type="password" placeholder="••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">
              Quận / Huyện <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn Quận / Huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoankiem">Hoàn Kiếm</SelectItem>
                <SelectItem value="dongda">Đống Đa</SelectItem>
                <SelectItem value="caugiay">Cầu Giấy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullname">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input id="fullname" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input id="phone" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Chức vụ</Label>
            <Input id="position" placeholder="" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="activate" />
          <Label htmlFor="activate" className="font-medium">
            Kích hoạt user
          </Label>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Cho phép thực hiện các thao tác sau:</h3>

          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="text-blue-600">
              Bỏ chọn tất cả
            </Button>
            <span className="text-gray-400">|</span>
            <Button variant="outline" size="sm" className="text-blue-600">
              Chọn tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="perm1" />
              <Label htmlFor="perm1">Cho phép đăng tuyển tuyển dụng</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm2" />
              <Label htmlFor="perm2">Cho phép tạm dừng/kích hoạt tuyển dụng</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm3" />
              <Label htmlFor="perm3">Xếp loại hồ sơ cho ứng viên</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm4" />
              <Label htmlFor="perm4">Thay đổi trạng thái ứng viên</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm5" />
              <Label htmlFor="perm5">Cho phép cập nhật tin đăng tuyển</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm6" />
              <Label htmlFor="perm6">Cho phép liên hệ ứng viên</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm7" />
              <Label htmlFor="perm7">Xóa hồ sơ mục trực tuyến</Label>
            </div>
          </div>
        </div>

        <div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Tạo Ngay</Button>
        </div>
      </div>
    </div>
  )
}
