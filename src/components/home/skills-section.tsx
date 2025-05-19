"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

const BLOG_TABS = [
  { key: "cam-nang", label: "CẨM NANG" },
  { key: "bao-chi", label: "BÁO CHÍ" },
  { key: "su-kien", label: "SỰ KIỆN" },
]

const TAG_COLORS: Record<string, string> = {
  "Kỹ năng": "bg-emerald-50 text-emerald-600",
  "CV & Hồ sơ": "bg-teal-50 text-teal-700",
  "Thị trường": "bg-blue-50 text-blue-700",
  "Sự kiện": "bg-yellow-50 text-yellow-700",
  "Giao lưu": "bg-indigo-50 text-indigo-700",
  Workshop: "bg-violet-50 text-violet-700",
  "Tin tức": "bg-pink-50 text-pink-700",
  "Phỏng vấn": "bg-orange-50 text-orange-700",
}

const blogArticles = [
  {
    id: 1,
    title: "Quản Lý Thời Gian Hiệu Quả Cho Nhân Viên Công Nghệ",
    description: "Các chiến lược và công cụ giúp lập trình viên quản lý thời gian và tăng năng suất làm việc.",
    image: "/placeholder.svg?key=cs41e",
    date: "02/05/2025",
    duration: "4 phút đọc",
    tag: "Kỹ năng",
    tab: "cam-nang",
  },
  {
    id: 2,
    title: "LinkedIn Profile: Cách Xây Dựng Hồ Sơ Chuyên Nghiệp",
    description: "Hướng dẫn chi tiết để tạo một hồ sơ LinkedIn thu hút nhà tuyển dụng trong ngành công nghệ.",
    image: "/professional-linkedin-profile.png",
    date: "10/05/2025",
    duration: "5 phút đọc",
    tag: "CV & Hồ sơ",
    tab: "cam-nang",
  },
  {
    id: 3,
    title: "10 Kỹ năng mềm cần thiết cho người đi làm năm 2025",
    description: "Phát triển các kỹ năng mềm quan trọng cho công việc và sự phát triển nghề nghiệp trong kỷ nguyên số.",
    image: "/soft-skills-concept.png",
    date: "25/04/2025",
    duration: "5 phút đọc",
    tag: "Kỹ năng",
    tab: "cam-nang",
  },
  {
    id: 4,
    title: "Làm thế nào để viết CV gây ấn tượng với nhà tuyển dụng",
    description: "Những mẹo viết CV hiệu quả để nổi bật và gây ấn tượng với nhà tuyển dụng trong quá trình xin việc.",
    image: "/resume-writing-concept.png",
    date: "15/04/2025",
    duration: "6 phút đọc",
    tag: "CV & Hồ sơ",
    tab: "cam-nang",
  },
  {
    id: 5,
    title: "Xu hướng tuyển dụng ngành IT năm 2025",
    description: "Khám phá những xu hướng và cơ hội tuyển dụng mới nhất trong ngành công nghệ thông tin năm 2025.",
    image: "/it-recruitment-trends.png",
    date: "08/04/2025",
    duration: "7 phút đọc",
    tag: "Thị trường",
    tab: "cam-nang",
  },
  {
    id: 6,
    title: "Tổng hợp tin tức công nghệ nổi bật tháng 5/2025",
    description: "Cập nhật những tin tức mới nhất về công nghệ, sản phẩm và xu hướng trong tháng 5/2025.",
    image: "/tech-news-collage.png",
    date: "01/05/2025",
    duration: "8 phút đọc",
    tag: "Tin tức",
    tab: "bao-chi",
  },
  {
    id: 7,
    title: "Các công ty công nghệ hàng đầu Việt Nam năm 2025",
    description: "Danh sách và phân tích về các công ty công nghệ hàng đầu tại Việt Nam trong năm 2025.",
    image: "/vietnam-tech-companies.png",
    date: "20/04/2025",
    duration: "6 phút đọc",
    tag: "Thị trường",
    tab: "bao-chi",
  },
  {
    id: 8,
    title: "Báo cáo thị trường việc làm IT quý 2/2025",
    description: "Phân tích chi tiết về thị trường việc làm IT tại Việt Nam trong quý 2 năm 2025.",
    image: "/it-job-market-report.png",
    date: "15/04/2025",
    duration: "9 phút đọc",
    tag: "Thị trường",
    tab: "bao-chi",
  },
  {
    id: 9,
    title: "Phỏng vấn CEO công ty ABC về chiến lược phát triển",
    description: "Cuộc phỏng vấn độc quyền với CEO công ty ABC về chiến lược phát triển và tuyển dụng.",
    image: "/ceo-interview.png",
    date: "10/04/2025",
    duration: "10 phút đọc",
    tag: "Phỏng vấn",
    tab: "bao-chi",
  },
  {
    id: 10,
    title: "Tin tức mới nhất về thị trường việc làm IT tại Việt Nam",
    description: "Cập nhật những tin tức mới nhất về thị trường việc làm IT tại Việt Nam trong tháng 4/2025.",
    image: "/vietnam-it-job-market.png",
    date: "05/04/2025",
    duration: "5 phút đọc",
    tag: "Tin tức",
    tab: "bao-chi",
  },
  {
    id: 11,
    title: "Hội thảo Công nghệ AI 2025 tại Hà Nội",
    description: "Thông tin chi tiết về hội thảo Công nghệ AI 2025 sẽ diễn ra tại Hà Nội vào tháng 6/2025.",
    image: "/ai-conference.png",
    date: "01/05/2025",
    duration: "3 phút đọc",
    tag: "Sự kiện",
    tab: "su-kien",
  },
  {
    id: 12,
    title: "Workshop Kỹ năng phỏng vấn cho sinh viên IT",
    description: "Thông tin về workshop kỹ năng phỏng vấn dành cho sinh viên IT sắp tốt nghiệp.",
    image: "/interview-workshop.png",
    date: "25/04/2025",
    duration: "4 phút đọc",
    tag: "Workshop",
    tab: "su-kien",
  },
  {
    id: 13,
    title: "Ngày hội việc làm IT 2025 tại TP.HCM",
    description: "Thông tin chi tiết về ngày hội việc làm IT 2025 sẽ diễn ra tại TP.HCM vào tháng 5/2025.",
    image: "/job-fair.png",
    date: "20/04/2025",
    duration: "3 phút đọc",
    tag: "Sự kiện",
    tab: "su-kien",
  },
  {
    id: 14,
    title: "Giao lưu với chuyên gia tuyển dụng hàng đầu",
    description: "Buổi giao lưu trực tuyến với các chuyên gia tuyển dụng hàng đầu trong ngành công nghệ.",
    image: "/recruitment-experts.png",
    date: "15/04/2025",
    duration: "4 phút đọc",
    tag: "Giao lưu",
    tab: "su-kien",
  },
  {
    id: 15,
    title: "Triển lãm Công nghệ 4.0 tại Đà Nẵng",
    description: "Thông tin về triển lãm Công nghệ 4.0 sẽ diễn ra tại Đà Nẵng vào tháng 7/2025.",
    image: "/technology-exhibition.png",
    date: "10/04/2025",
    duration: "3 phút đọc",
    tag: "Sự kiện",
    tab: "su-kien",
  },
]

export default function SkillsSection() {
  const [tab, setTab] = React.useState("cam-nang")
  const router = useRouter()

  const getTagColor = (tag: string) => TAG_COLORS[tag] || "bg-gray-100 text-gray-700"

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-[2.3rem] font-extrabold text-emerald-600 mb-2">Góc Cẩm Nang, Báo Chí &amp; Sự Kiện</h2>
          <div className="text-gray-500 text-lg">
            Cập nhật tri thức, tin tức và sự kiện công nghệ mới nhất dành cho bạn
          </div>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="flex flex-col">
          <TabsList className="mx-auto gap-3 bg-transparent mb-6">
            {BLOG_TABS.map((t) => (
              <TabsTrigger
                key={t.key}
                value={t.key}
                className="flex items-center gap-2 px-5 py-2 text-[1.04rem] rounded-full font-semibold border border-gray-200 bg-white shadow hover:bg-emerald-50 focus:bg-emerald-50 aria-selected:bg-emerald-600 aria-selected:text-white transition"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {BLOG_TABS.map((t) => (
            <TabsContent key={t.key} value={t.key} className="focus:outline-none">
              <div
                className="
                  grid gap-7
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                "
              >
                {blogArticles
                  .filter((blog) => blog.tab === t.key)
                  .slice(0, 5)
                  .map((blog) => (
                    <div
                      key={blog.id}
                      className="rounded-2xl bg-white shadow group flex flex-col overflow-hidden hover:shadow-xl transition duration-200 border border-gray-100 min-h-[340px]"
                    >
                      <div className="aspect-w-16 aspect-h-10 w-full h-[160px] overflow-hidden flex-shrink-0">
                        <img
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          style={{ borderRadius: "12px 12px 0 0" }}
                        />
                      </div>
                      <div className="flex flex-col flex-1 justify-between p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getTagColor(blog.tag)}`}>
                            {blog.tag}
                          </span>
                          <span className="text-xs text-gray-400">{blog.date}</span>
                        </div>
                        <div className="font-bold text-base text-gray-900 mb-2 line-clamp-2 min-h-[40px] flex items-start">
                          {blog.title}
                        </div>
                        <div className="text-gray-600 text-xs mb-3 line-clamp-2 min-h-[32px] flex items-start">
                          {blog.description}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-gray-400 text-xs">{blog.duration}</span>
                          <button
                            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-50 text-emerald-600 font-semibold text-xs hover:bg-emerald-600 hover:text-white transition-colors"
                            onClick={() => router.push(`/blog/${blog.id}`)}
                          >
                            Đọc tiếp
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
