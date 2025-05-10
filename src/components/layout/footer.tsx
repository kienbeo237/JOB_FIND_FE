import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">
                JobFind<span className="text-emerald-500">.vn</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6">Nền tảng kết nối nhà tuyển dụng và người tìm việc hàng đầu Việt Nam.</p>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Tầng 12, Tòa nhà Innovation, 123 Nguyễn Đình Chiểu, Quận 1, TP.HCM</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">📞</span>
                <span>Hotline: 1900 1234 56</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>Email: contact@jobfind.vn</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-300 hover:text-white">
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-gray-300 hover:text-white">
                  Cập nhật CV
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-300 hover:text-white">
                  Công ty
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Cẩm nang
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho ứng viên</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white">
                  Quản lý hồ sơ
                </Link>
              </li>
              <li>
                <Link href="/saved-jobs" className="text-gray-300 hover:text-white">
                  Việc làm đã lưu
                </Link>
              </li>
              <li>
                <Link href="/applied-jobs" className="text-gray-300 hover:text-white">
                  Việc làm đã ứng tuyển
                </Link>
              </li>
              <li>
                <Link href="/career-guide" className="text-gray-300 hover:text-white">
                  Hướng dẫn tìm việc
                </Link>
              </li>
              <li>
                <Link href="/salary-tool" className="text-gray-300 hover:text-white">
                  Công cụ tính lương
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho nhà tuyển dụng</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/employer/post-job" className="text-gray-300 hover:text-white">
                  Đăng tin tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/employer/search-candidates" className="text-gray-300 hover:text-white">
                  Tìm ứng viên
                </Link>
              </li>
              <li>
                <Link href="/employer/pricing" className="text-gray-300 hover:text-white">
                  Bảng giá dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/employer/resources" className="text-gray-300 hover:text-white">
                  Tài liệu & hướng dẫn
                </Link>
              </li>
              <li>
                <Link href="/employer/contact" className="text-gray-300 hover:text-white">
                  Liên hệ tư vấn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 JobFind.vn. Tất cả các quyền được bảo lưu.</p>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Điều khoản sử dụng
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Chính sách bảo mật
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
              Sơ đồ trang
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
