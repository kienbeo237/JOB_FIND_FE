'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export function UserLoginSettings() {
  const [formData, setFormData] = useState({
    fullName: 'Vũ Văn Đức',
    phone: '0979826968',
    email: 'duc.vu@edwardvu.vn',
    password: '••••••••',
    confirmPassword: '••••••••',
    title: 'Anh',
    position: 'Trưởng phòng/ giám đốc/ nhân viên',
    city: 'Hà Nội',
    district: 'Hai Bà Trưng',
    ward: 'Lê Đại Hành',
    address: 'P 904, Getex Tower, 52 Lê Đại Hành',
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Người dùng đăng nhập
        </h2>
        <Button variant="outline">Chỉnh sửa</Button>
      </div>

      <div className="space-y-4">
        <Card className="p-6 md:p-8">
          <CardHeader className="pb-3">
            <CardTitle>
              Trạng thái:{' '}
              <span className="text-emerald-600">Tài khoản chính</span>
            </CardTitle>
            <div className="mt-2">
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <div className="font-medium">
                    3 cấp độ định danh tài khoản doanh nghiệp:
                  </div>
                  <div>Mức 1/3: Đăng ký đầy đủ thông tin doanh nghiệp</div>
                  <div>Mức 2/3: Sử dụng email tên miền công ty hợp lý</div>
                  <div>Mức 3/3: Upload đầy đủ đăng ký kinh doanh</div>
                </AlertDescription>
              </Alert>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Họ và tên người phụ trách{' '}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Danh xưng
                </label>
                <Select defaultValue={formData.title} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Chọn danh xưng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anh">Anh</SelectItem>
                    <SelectItem value="Chị">Chị</SelectItem>
                    <SelectItem value="Ông">Ông</SelectItem>
                    <SelectItem value="Bà">Bà</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  value={formData.phone}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Chức vụ
                </label>
                <Select defaultValue={formData.position} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trưởng phòng/ giám đốc/ nhân viên">
                      Trưởng phòng/ giám đốc/ nhân viên
                    </SelectItem>
                    <SelectItem value="Giám đốc">Giám đốc</SelectItem>
                    <SelectItem value="Trưởng phòng">Trưởng phòng</SelectItem>
                    <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email đăng nhập, xác thực{' '}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  value={formData.email}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-emerald-600">
                  (Email công ty định danh nhanh hơn)
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  Thành phố (Địa chỉ nhận bưu phẩm)
                </label>
                <Select defaultValue={formData.city} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Chọn thành phố" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                    <SelectItem value="TP. Hồ Chí Minh">
                      TP. Hồ Chí Minh
                    </SelectItem>
                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="district" className="text-sm font-medium">
                  Quận, huyện
                </label>
                <Select defaultValue={formData.district} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hai Bà Trưng">Hai Bà Trưng</SelectItem>
                    <SelectItem value="Hoàn Kiếm">Hoàn Kiếm</SelectItem>
                    <SelectItem value="Đống Đa">Đống Đa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Phường, xã
                </label>
                <Select defaultValue={formData.ward} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Chọn phường/xã" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lê Đại Hành">Lê Đại Hành</SelectItem>
                    <SelectItem value="Bách Khoa">Bách Khoa</SelectItem>
                    <SelectItem value="Đồng Tâm">Đồng Tâm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Chi tiết số nhà, phường, xã
              </label>
              <Input
                id="address"
                value={formData.address}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">
                3 cấp độ định danh tài khoản doanh nghiệp
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Mức 1/3: Đăng ký đầy đủ thông tin doanh nghiệp</li>
                <li>Mức 2/3: Sử dụng email tên miền công ty hợp lý</li>
                <li>Mức 3/3: Upload đầy đủ đăng ký kinh doanh</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
