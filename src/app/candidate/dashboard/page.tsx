import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Eye, Download, Edit, Upload, Building, ChevronRight } from "lucide-react"

export default function CandidateDashboard() {
  return (
    <div>
      {/* Profile Section */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-700 text-white flex items-center justify-center text-3xl sm:text-4xl font-medium rounded-md mx-0">
              VD
            </div>
            <div className="flex-1 mt-3 sm:mt-0 text-left">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900">VŨ ĐỨC</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Chưa cập nhật</p>
              <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">0510vuduc@gmail.com</p>
              <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Chưa cập nhật</p>
              <p className="text-sm sm:text-base text-gray-600">Chưa cập nhật</p>
              <div className="mt-3 sm:mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 text-xs sm:text-sm"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="mb-2 sm:mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-600 font-medium text-sm sm:text-base">18%</span>
                <span className="text-gray-600 text-xs sm:text-sm">Tỉ lệ hoàn thiện hồ sơ</span>
              </div>
              <Progress value={18} className="h-1.5 sm:h-2 bg-gray-200" indicatorClassName="bg-red-500" />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-blue-50 p-2 sm:p-3 rounded-md">
                <div className="text-blue-600 text-center text-base sm:text-xl font-medium">0</div>
                <div className="text-blue-600 text-center text-[10px] sm:text-xs">Lượt xem hồ sơ trong tháng</div>
              </div>
              <div className="bg-green-50 p-2 sm:p-3 rounded-md">
                <div className="text-green-600 text-center text-base sm:text-xl font-medium">0</div>
                <div className="text-green-600 text-center text-[10px] sm:text-xs">Lượt xem hồ sơ trong tuần</div>
              </div>
              <div className="bg-yellow-50 p-2 sm:p-3 rounded-md">
                <div className="text-yellow-600 text-center text-base sm:text-xl font-medium">0</div>
                <div className="text-yellow-600 text-center text-[10px] sm:text-xs">Lượt xem hồ sơ trong năm</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV Section */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-medium text-gray-700">CV của bạn</h2>
            <Link href="/candidate/cv-management" className="text-green-600 hover:underline text-sm flex items-center">
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <h3 className="text-2xl font-bold mb-4">Các CV hiện tại</h3>

          <div className="flex justify-end mb-4 space-x-2">
            <Button className="bg-orange-500 hover:bg-orange-600">Tạo mới CV</Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Tải lên CV
            </Button>
          </div>

          <div className="border rounded-md overflow-hidden mb-6">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cập nhật gần nhất
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Vũ Văn Đức - Hotel Manager.pdf</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">23.03.2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mr. Đức - Quản lý khách sạn 2023.pdf</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">20.01.2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-md text-center">
              <h3 className="font-medium text-lg mb-2">Ảnh chân dung</h3>
              <p className="text-sm text-gray-600 mb-1">(PNG, JP, dưới 1MB)</p>
              <p className="text-sm text-gray-600 mb-6">Phù hợp với mọi CV</p>
              <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300">
                Tải lên
              </Button>
            </div>

            <div className="bg-green-50 p-6 rounded-md text-center">
              <h3 className="font-medium text-lg mb-2">Video giới thiệu</h3>
              <p className="text-sm text-gray-600 mb-1">(MP4, dưới 2MB)</p>
              <p className="text-sm text-gray-600 mb-6">Tạo ấn tượng với nhà tuyển dụng</p>
              <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300">
                Tải lên
              </Button>
            </div>

            <div className="bg-purple-50 p-6 rounded-md text-center">
              <h3 className="font-medium text-lg mb-2">Audio giới thiệu</h3>
              <p className="text-sm text-gray-600 mb-1">(MP3, dưới 2MB)</p>
              <p className="text-sm text-gray-600 mb-6">Thân thiện với nhà tuyển dụng</p>
              <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300">
                Tải lên
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Việc làm đã ứng tuyển</h3>
              <Link href="/candidate/applied-jobs" className="text-green-600 hover:underline text-sm flex items-center">
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <img src="/empty-state-illustration.png" alt="Không có dữ liệu" className="w-32 h-32 mb-4" />
              <p className="text-gray-600 mb-4">Bạn chưa ứng tuyển công việc nào</p>
              <Button className="bg-green-500 hover:bg-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Tìm việc ngay
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Công ty đang theo dõi</h3>
              <Link
                href="/candidate/following-companies"
                className="text-green-600 hover:underline text-sm flex items-center"
              >
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <img src="/empty-state-illustration.png" alt="Không có dữ liệu" className="w-32 h-32 mb-4" />
              <p className="text-gray-600 mb-4">Bạn chưa theo dõi công ty nào</p>
              <Button className="bg-green-500 hover:bg-green-600">
                <Building className="h-4 w-4 mr-2" />
                Khám phá công ty
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Việc làm phù hợp</h3>
              <Link
                href="/candidate/matching-jobs"
                className="text-green-600 hover:underline text-sm flex items-center"
              >
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <img src="/empty-state-illustration.png" alt="Không có dữ liệu" className="w-32 h-32 mb-4" />
              <p className="text-gray-600 mb-4">Chưa tìm thấy việc làm phù hợp với yêu cầu tìm kiếm của bạn</p>
              <Button className="bg-green-500 hover:bg-green-600">Cập nhật thông tin</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Việc làm đã lưu</h3>
              <Link href="/candidate/saved-jobs" className="text-green-600 hover:underline text-sm flex items-center">
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <img src="/empty-state-illustration.png" alt="Không có dữ liệu" className="w-32 h-32 mb-4" />
              <p className="text-gray-600 mb-4">Bạn chưa lưu việc làm nào</p>
              <Button className="bg-green-500 hover:bg-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Tìm việc ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
