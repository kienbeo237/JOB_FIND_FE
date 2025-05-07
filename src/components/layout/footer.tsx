import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const footerLinks = [
  {
    title: "Liên kết nhanh",
    links: [
      { name: "Tìm việc làm", href: "/viec-lam" },
      { name: "Cập nhật CV", href: "/ho-so-cv" },
      { name: "Công ty", href: "/cong-ty" },
      { name: "Cẩm nang", href: "/cam-nang" },
      { name: "Liên hệ", href: "/lien-he" },
    ],
  },
  {
    title: "Dành cho ứng viên",
    links: [
      { name: "Quản lý hồ sơ", href: "/ung-vien/ho-so" },
      { name: "Việc làm đã lưu", href: "/ung-vien/viec-lam-da-luu" },
      { name: "Việc làm đã ứng tuyển", href: "/ung-vien/viec-lam-da-ung-tuyen" },
      { name: "Hướng dẫn tìm việc", href: "/ung-vien/huong-dan" },
      { name: "Công cụ tính lương", href: "/ung-vien/cong-cu" },
    ],
  },
  {
    title: "Dành cho nhà tuyển dụng",
    links: [
      { name: "Đăng tin tuyển dụng", href: "/nha-tuyen-dung/dang-tin" },
      { name: "Tìm ứng viên", href: "/nha-tuyen-dung/tim-ung-vien" },
      { name: "Bảng giá dịch vụ", href: "/nha-tuyen-dung/bang-gia" },
      { name: "Tài liệu & hướng dẫn", href: "/nha-tuyen-dung/tai-lieu" },
      { name: "Liên hệ tư vấn", href: "/nha-tuyen-dung/lien-he" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">
                JobFind<span className="text-emerald-400">.vn</span>
              </span>
            </Link>
            <p className="mb-6 text-sm">Nền tảng kết nối nhà tuyển dụng và người tìm việc hàng đầu Việt Nam.</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <span className="text-sm">Tầng 12, Tòa nhà Innovation, 123 Nguyễn Đình Chiểu, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">Hotline: 1900 1234 56</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">Email: contact@jobfind.vn</span>
              </div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-lg font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-emerald-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-sm">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <p>© 2023 JobFind.vn. Tất cả các quyền được bảo lưu.</p>
            <div className="flex gap-6">
              <Link href="/dieu-khoan" className="hover:text-emerald-400 transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="/chinh-sach" className="hover:text-emerald-400 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/so-do" className="hover:text-emerald-400 transition-colors">
                Sơ đồ trang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
