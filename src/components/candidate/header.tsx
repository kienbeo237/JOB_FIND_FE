import Link from "next/link"
import { Bell, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const CandidateHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-orange-500">JobFind.vn</span>
            </Link>
            <nav className="ml-10 flex items-center space-x-6">
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Việc làm</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Tạo CV</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Công ty</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Cẩm nang</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Công cụ</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-orange-500">
                  <span>Hành trình xanh</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-orange-500">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-orange-500">
              <MessageSquare className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">VĐ</div>
                <span className="text-sm font-medium text-gray-700">Ứng viên</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            <Button className="bg-orange-500 hover:bg-orange-600">Nhà tuyển dụng</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CandidateHeader
