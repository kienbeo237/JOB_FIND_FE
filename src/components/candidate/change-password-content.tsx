"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const ChangePasswordContent = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div>
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-teal-600 mb-6">Cài đặt tài khoản</h2>
          <p className="text-gray-600 mb-6">Cập nhật thông tin tài khoản</p>

          <div className="space-y-4">
            <h3 className="font-medium">Thay đổi mật khẩu đăng nhập</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu hiện tại"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <ul className="text-xs text-gray-500 mt-1 space-y-1 pl-4">
                  <li>• Mật khẩu mới bao gồm từ 6 đến 25 ký tự</li>
                  <li>• Bao gồm chữ thường và ít nhất một chữ số</li>
                </ul>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700 w-32">Cập nhật</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePasswordContent
