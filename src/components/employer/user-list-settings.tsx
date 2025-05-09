"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UserListSettingsProps {
  onCreateUser: () => void
}

const users = [
  {
    id: 1,
    creationDate: "26/12/2024",
    email: "vuduc0510@gmail.com",
    name: "CV",
    role: "Tất cả quyền",
    status: "active",
    type: "Chính",
  },
  {
    id: 2,
    creationDate: "15/04/2025",
    email: "nguyenvan@gmail.com",
    name: "Nguyễn Văn A",
    role: "Đăng tin, xem CV",
    status: "active",
    type: "Phụ",
  },
  {
    id: 3,
    creationDate: "20/04/2025",
    email: "phamthi@gmail.com",
    name: "Phạm Thị B",
    role: "Xem CV",
    status: "inactive",
    type: "Phụ",
  },
]

const selectedUser = {
  name: "CV",
  email: "vuduc0510@gmail.com",
  phone: "0912345678",
  position: "Quản trị viên",
  address: "Hà Nội, Việt Nam",
}

const permissions = [
  "Đăng tuyển tuyển dụng",
  "Tạm dừng/kích hoạt tuyển dụng",
  "Xếp loại hồ sơ cho ứng viên",
  "Thay đổi trạng thái ứng viên",
  "Cập nhật tin đăng tuyển",
  "Liên hệ ứng viên",
  "Xóa hồ sơ mục trực tuyến",
]

export function UserListSettings({ onCreateUser }: UserListSettingsProps) {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <h2 className="text-xl font-bold tracking-tight text-green-700">Danh sách người dùng phụ trách</h2>

      <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
        Quý khách có thể tạo tối đa 5 user(s). Để có thể tạo thêm nhiều user phụ và nhiều thông tin công ty con, vui
        lòng liên hệ với chúng tôi.
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">NGÀY TẠO</TableHead>
              <TableHead className="font-medium">EMAIL</TableHead>
              <TableHead className="font-medium">HỌ VÀ TÊN</TableHead>
              <TableHead className="font-medium">TÁC VỤ</TableHead>
              <TableHead className="font-medium">TRẠNG THÁI</TableHead>
              <TableHead className="font-medium">LOẠI USER</TableHead>
              <TableHead className="font-medium">HÀNH ĐỘNG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.creationDate}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {user.status === "active" ? "Kích hoạt" : "Không kích hoạt"}
                  </Badge>
                </TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-blue-500 h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="text-xl font-bold tracking-tight mt-8">Thông tin chi tiết người dùng</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-green-700 mb-4">Thông tin cá nhân</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Họ và tên:</div>
                <div>{selectedUser.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Email:</div>
                <div>{selectedUser.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Điện thoại:</div>
                <div>{selectedUser.phone}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Chức vụ:</div>
                <div>{selectedUser.position}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Địa chỉ:</div>
                <div>{selectedUser.address}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-green-700 mb-4">Quyền hạn</h3>
            <ul className="list-disc pl-5 space-y-2">
              {permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onCreateUser}>
          Tạo người dùng phụ
        </Button>
      </div>
    </div>
  )
}
