import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye } from "lucide-react"

export default function CandidateLoginPage() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-green-500 mb-8">
          <ArrowLeft className="mr-2" size={18} />
          <span>Quay lại trang chủ</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Người tìm việc đăng nhập</h1>
            <p className="text-gray-600 mb-6">Đăng nhập để tìm kiếm cơ hội việc làm mới</p>

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
                <span>Đăng nhập với Google</span>
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M13.8926 12.8906L14.3359 10H11.5625V8.125C11.5625 7.33418 11.95 6.5625 13.1922 6.5625H14.4531V4.10156C14.4531 4.10156 13.3088 3.90625 12.2146 3.90625C9.93047 3.90625 8.4375 5.29063 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8785C9.47287 20.0405 10.5271 20.0405 11.5625 19.8785V12.8906H13.8926Z"
                    fill="white"
                  />
                </svg>
                <span>Đăng nhập với Facebook</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 absolute w-full"></div>
              <span className="bg-white px-4 text-sm text-gray-500 relative">Hoặc</span>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.6667 3.33337H3.33334C2.41667 3.33337 1.67501 4.08337 1.67501 5.00004L1.66667 15C1.66667 15.9167 2.41667 16.6667 3.33334 16.6667H16.6667C17.5833 16.6667 18.3333 15.9167 18.3333 15V5.00004C18.3333 4.08337 17.5833 3.33337 16.6667 3.33337ZM16.6667 6.66671L10 10.8334L3.33334 6.66671V5.00004L10 9.16671L16.6667 5.00004V6.66671Z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu
                  </label>
                  <Link href="/candidate/forgot-password" className="text-sm text-green-500 hover:text-green-600">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-md py-3 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 6.66663H14.1667V5.00004C14.1667 2.70004 12.3 0.833374 10 0.833374C7.70001 0.833374 5.83334 2.70004 5.83334 5.00004V6.66663H5.00001C4.08334 6.66663 3.33334 7.41663 3.33334 8.33329V16.6666C3.33334 17.5833 4.08334 18.3333 5.00001 18.3333H15C15.9167 18.3333 16.6667 17.5833 16.6667 16.6666V8.33329C16.6667 7.41663 15.9167 6.66663 15 6.66663ZM10 14.1666C9.08334 14.1666 8.33334 13.4166 8.33334 12.5C8.33334 11.5833 9.08334 10.8333 10 10.8333C10.9167 10.8333 11.6667 11.5833 11.6667 12.5C11.6667 13.4166 10.9167 14.1666 10 14.1666ZM12.5833 6.66663H7.41667V5.00004C7.41667 3.57504 8.57501 2.41663 10 2.41663C11.425 2.41663 12.5833 3.57504 12.5833 5.00004V6.66663Z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <Eye size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Đăng nhập
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link href="/candidate/register" className="text-blue-500 hover:text-blue-600">
                  Đăng ký ngay
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
