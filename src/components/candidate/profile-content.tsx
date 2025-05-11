"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PenSquare, Plus } from "lucide-react"

export default function ProfileContent() {
  return (
    <div className="mb-6">
      <Card className="mb-8">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-green-600">Thông tin cá nhân</CardTitle>
          <Button variant="ghost" size="sm" className="text-green-600">
            <PenSquare className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Họ và tên</p>
                <p>Vũ Đức</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Giới tính</p>
                <p>Nam</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Ngày sinh</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Tình trạng hôn nhân</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Số điện thoại</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                <p>0510vuduc@gmail.com</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Địa chỉ</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Nhóm ngành nghề</p>
                <p className="text-gray-500">Kế toán/Kiểm toán/Thuế</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Vị trí</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Trình độ học vấn</p>
                <p className="text-gray-500">Chưa cập nhật</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sở thích</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Không có sở thích nào</p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm sở thích
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mục tiêu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Chưa có mục tiêu</p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm mục tiêu
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Học vấn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Thêm thông tin học vấn của bạn</p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm học vấn
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Chứng chỉ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin chứng chỉ để chứng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm chứng chỉ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ngôn ngữ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin cá nhân để chúng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm ngôn ngữ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kỹ năng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin cá nhân để chúng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm kỹ năng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kinh nghiệm</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin kinh nghiệm để chứng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm kinh nghiệm
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Giải thưởng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể nổi bật hơn trong CV bằng cách thêm nhiều minh chứng hoặc kể về mô tả dự án
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm giải thưởng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dự án</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin cá nhân để chứng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm dự án
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hoạt động xã hội và tình nguyện</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Bạn có thể thêm thông tin hoạt động xã hội và tình nguyện để chứng tôi hoàn thành hồ sơ của bạn
            </p>
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Thêm hoạt động
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
