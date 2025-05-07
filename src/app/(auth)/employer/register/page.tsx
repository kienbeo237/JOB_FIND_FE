import Link from "next/link"
import { ArrowLeft, Eye, Upload } from "lucide-react"

export default function EmployerRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="mr-2" size={18} />
          <span>Quay lại</span>
        </Link>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký tài khoản nhà tuyển dụng</h1>
          <p className="text-gray-600 mb-6">
            Cùng tạo dựng lợi thế cho doanh nghiệp trước hàng triệu ứng viên tiềm năng
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-dashed border-emerald-300 rounded-lg p-6 flex flex-col items-center justify-center bg-emerald-50">
              <Upload size={32} className="text-emerald-500 mb-2" />
              <h3 className="text-center text-emerald-700 font-medium mb-1">Tải lên logo công ty</h3>
              <p className="text-xs text-center text-gray-500 mb-2">File PNG, JPEG dưới 1 MB</p>
              <button className="mt-2 px-4 py-2 bg-white border border-emerald-500 text-emerald-600 rounded-md text-sm hover:bg-emerald-50 transition-colors">
                Chọn file
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">Thu hút sự quan tâm của ứng viên</p>
            </div>

            <div className="border border-dashed border-emerald-300 rounded-lg p-6 flex flex-col items-center justify-center bg-emerald-50">
              <Upload size={32} className="text-emerald-500 mb-2" />
              <h3 className="text-center text-emerald-700 font-medium mb-1">Tải lên đăng ký kinh doanh công ty</h3>
              <p className="text-xs text-center text-gray-500 mb-2">File PNG, JPEG dưới 1 MB</p>
              <button className="mt-2 px-4 py-2 bg-white border border-emerald-500 text-emerald-600 rounded-md text-sm hover:bg-emerald-50 transition-colors">
                Chọn file
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Có thể cập nhật sau, khi cấp phát, tài khoản của bạn được định danh uy tín
              </p>
            </div>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 mb-8">
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Thông tin nhà tuyển dụng</h2>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên doanh nghiệp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company-name"
                  placeholder="Công ty TNHH Example"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Mã số thuế doanh nghiệp
                </label>
                <input
                  type="text"
                  id="tax-id"
                  placeholder="0123456789"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên mong muốn hiển thị, rút gọn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="display-name"
                  placeholder="Example Company"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Ngành nghề
                </label>
                <input
                  type="text"
                  id="industry"
                  placeholder="Công nghệ thông tin, Bán lẻ, v.v."
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Hà Nội"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="employee-count" className="block text-sm font-medium text-gray-700 mb-1">
                  Quy mô nhân sự
                </label>
                <input
                  type="text"
                  id="employee-count"
                  placeholder="Từ 50 - 100 Nhân viên"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Ngân sách tuyển dụng hàng năm
                </label>
                <input
                  type="text"
                  id="budget"
                  placeholder="200.000.000 - 500.000.000 triệu VNĐ"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="recruitment-needs" className="block text-sm font-medium text-gray-700 mb-1">
                  Nhu cầu tuyển dụng cho doanh nghiệp
                </label>
                <input
                  type="text"
                  id="recruitment-needs"
                  placeholder="cho công ty/ chuỗi/ tập đoàn"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 mb-8">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Thông tin đăng nhập</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên người phụ trách <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Danh xưng
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Anh/chị"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Chức vụ
                </label>
                <input
                  type="text"
                  id="position"
                  placeholder="Trưởng phòng/ giám đốc/ nhân viên"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="0912345678"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email đăng nhập, xác thực <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@company.com"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">(Email công ty định danh nhanh hơn)</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <Eye size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <Eye size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Bằng việc đăng ký tài khoản, bạn đã đồng ý với{" "}
                <Link href="/terms" className="text-emerald-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-emerald-600 hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                của chúng tôi.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Đăng ký
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Bạn đã có tài khoản?{" "}
                <Link href="/employer/login" className="text-emerald-600 hover:text-emerald-700">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
