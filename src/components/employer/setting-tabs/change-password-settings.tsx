"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ChangePasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password update logic here
    console.log("Password update submitted")
  }

  return (
    <Card className="border-none shadow-none">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold text-teal-700 mb-6">Đổi mật khẩu</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium mb-1.5">
                Mật khẩu hiện tại
              </label>
              <Input
                id="current-password"
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium mb-1.5">
                Mật khẩu mới
              </label>
              <Input
                id="new-password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và ký tự đặc biệt.
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-1.5">
                Xác nhận mật khẩu mới
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white w-[168px] mt-2">
              Cập nhật mật khẩu
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
