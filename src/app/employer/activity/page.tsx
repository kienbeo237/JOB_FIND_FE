"use client"
import { Calendar, Filter, Clock, FileText, User, MessageSquare, CreditCard, CheckCircle } from "lucide-react"

export default function EmployerActivityPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-bold text-teal-700 mb-6">Lịch sử hoạt động</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-64">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Calendar size={18} className="text-gray-500" />
              </span>
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <Filter size={18} className="mr-2" />
              Loại hoạt động
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 pb-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FileText size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Đăng tin tuyển dụng mới</p>
                <p className="text-sm text-gray-600 mt-1">Vị trí: Senior React Developer</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>04-03-2024, 10:25 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4 pb-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-green-500"></div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <User size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Nhận hồ sơ ứng viên mới</p>
                <p className="text-sm text-gray-600 mt-1">Ứng viên: Nguyễn Nam - Senior React Developer</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>04-03-2024, 02:45 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 pb-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <MessageSquare size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Liên hệ với ứng viên</p>
                <p className="text-sm text-gray-600 mt-1">Đã gửi email phỏng vấn cho Nguyễn Nam</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>05-03-2024, 09:15 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 pb-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange-500"></div>
            <div className="flex items-start">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <CreditCard size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Mua gói dịch vụ</p>
                <p className="text-sm text-gray-600 mt-1">Đã mua gói Job VIP2</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>05-03-2024, 11:30 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-teal-500 pl-4 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-teal-500"></div>
            <div className="flex items-start">
              <div className="bg-teal-100 p-2 rounded-full mr-3">
                <CheckCircle size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Hoàn tất phỏng vấn</p>
                <p className="text-sm text-gray-600 mt-1">Cập nhật trạng thái cho Nguyễn Nam: Đã phỏng vấn</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>06-03-2024, 04:20 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Xem thêm hoạt động</button>
        </div>
      </div>
    </div>
  )
}
