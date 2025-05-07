import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye } from "lucide-react"

export default function CandidateRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-green-500 mb-8">
          <ArrowLeft className="mr-2" size={18} />
          <span>Quay lại trang chủ</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Người tìm việc đăng ký</h1>
            <p className="text-gray-600 mb-6">Tạo tài khoản để tìm kiếm cơ hội việc làm mới</p>

            <div className="flex space-x-2 mb-6">
              <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-l-md font-medium">
                Người tìm việc
              </button>
              <Link
                href="/employer/register"
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md font-medium text-center hover:bg-gray-300 transition-colors"
              >
                Nhà tuyển dụng
              </Link>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6422C13.9589 13.6064 12.1245 15 10 15C7.23858 15 5 12.7614 5 9.99996C5 7.23854 7.23858 5 10 5C11.2843 5 12.4565 5.48797 13.3589 6.28548L15.8422 3.80215C14.2922 2.32555 12.2456 1.42329 10 1.42329C5.25858 1.42329 1.42857 5.25329 1.42857 9.99471C1.42857 14.7361 5.25858 18.5666 10 18.5666C14.7414 18.5666 18.5714 14.7361 18.5714 9.99471C18.5714 9.41796 18.4143 8.87273 18.1711 8.36788Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M2.62891 6.12353L5.5114 8.12942C6.25696 6.29942 7.9812 5 10.0003 5C11.2845 5 12.4567 5.48797 13.3591 6.28548L15.8425 3.80215C14.2925 2.32555 12.2458 1.42329 10.0003 1.42329C6.8394 1.42329 4.10511 3.35942 2.62891 6.12353Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M9.99954 18.5778C12.1991 18.5778 14.2071 17.7078 15.7421 16.2778L13.0351 13.9833C12.1488 14.6417 10.9936 15.0012 9.99954 15C7.88397 15 6.05583 13.6167 5.36583 11.6889L2.53711 13.8944C4.00126 16.7056 6.76269 18.5778 9.99954 18.5778Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M18.1713 8.36788H17.5002V8.33329H10.0002V11.6666H14.6424C14.3202 12.5891 13.7491 13.3891 13.0335 13.9833L13.0346 13.9827L15.7413 16.2772C15.5335 16.4683 18.5713 14.1666 18.5713 9.99996C18.5713 9.42321 18.4141 8.87273 18.1713 8.36788Z"
                    fill="#1976D2"
                  />
                </svg>
                <span>Đăng ký bằng Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 absolute w-full"></div>
              <span className="bg-white px-4 text-sm text-gray-500 relative">hoặc</span>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Họ và tên của bạn"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hãy dùng tên thật. Nhà tuyển dụng có thể thấy tên khi xem hồ sơ
                  </p>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Danh xưng
                  </label>
                  <select
                    id="title"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Anh/chị">Anh/chị</option>
                    <option value="Anh">Anh</option>
                    <option value="Chị">Chị</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Số điện thoại của bạn"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email đăng nhập, xác thực <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                      <Eye size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                      <Eye size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Tôi đồng ý với{" "}
                  <Link href="/terms" className="text-blue-500 hover:underline">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link href="/privacy" className="text-blue-500 hover:underline">
                    Chính sách bảo mật
                  </Link>{" "}
                  của JobFind.vn
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Đăng ký
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link href="/candidate/login" className="text-blue-500 hover:text-blue-600">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg hidden md:block">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Hỗ trợ ứng viên</h2>
            <div className="mb-6">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Hỗ trợ ứng viên"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
            </div>
            <div className="space-y-4">
              <p className="text-blue-800 font-medium">Hơn 1 triệu ứng viên tìm được việc làm mơ ước.</p>
              <p className="text-blue-800 font-medium">Hãy xây dựng một hồ sơ thật nổi bật.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
