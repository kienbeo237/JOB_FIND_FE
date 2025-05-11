import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';

export default function EmployerLoginPage() {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8"
        >
          <ArrowLeft className="mr-2" size={18} />
          <span>Quay lại</span>
        </Link>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng nhập tài khoản Nhà tuyển dụng
          </h1>
          <p className="text-gray-600 mb-6">
            Cùng tạo dựng lợi thế cho Doanh nghiệp từ hàng triệu ứng viên tiềm
            năng.
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="example@company.com"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <Link
                  href="/employer/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              Hỗ trợ nhà tuyển dụng
            </h2>
            <div className="space-y-2">
              <h3 className="text-emerald-700 font-medium">
                Tìm kiếm nhân tài qua hồ sơ đã đăng, đăng cấp
              </h3>
              <p className="text-gray-600 text-sm">
                Tìm kiếm nhân tài qua hồ sơ đã đăng, đăng cấp. Lựa chọn tối ưu
                với hồ sơ video, audio.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Bạn là nhà tuyển dụng?{' '}
              <Link
                href="/employer/register"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
