"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    id: 1,
    title: "Quản Lý Thời Gian Hiệu Quả Cho Nhân Viên Công Nghệ",
    category: "Kỹ năng",
    date: "02/05/2025",
    image: "/placeholder.svg?height=200&width=400",
    excerpt: "Các chiến lược và công cụ giúp lập trình viên quản lý thời gian và tăng năng suất làm việc.",
    readTime: "4 phút đọc",
  },
  {
    id: 2,
    title: "LinkedIn Profile: Cách Xây Dựng Hồ Sơ Chuyên Nghiệp",
    category: "CV & Hồ sơ",
    date: "10/05/2025",
    image: "/placeholder.svg?height=200&width=400",
    excerpt: "Hướng dẫn chi tiết để tạo một hồ sơ LinkedIn thu hút nhà tuyển dụng trong ngành công nghệ.",
    readTime: "5 phút đọc",
  },
  {
    id: 3,
    title: "10 Kỹ năng mềm cần thiết cho người đi làm năm 2025",
    category: "Kỹ năng",
    date: "25/04/2025",
    image: "/placeholder.svg?height=200&width=400",
    excerpt: "Phát triển các kỹ năng mềm quan trọng cho công việc và sự phát triển nghề nghiệp trong kỷ nguyên số.",
    readTime: "5 phút đọc",
  },
  {
    id: 4,
    title: "Làm thế nào để viết CV gây ấn tượng với nhà tuyển dụng",
    category: "CV & Hồ sơ",
    date: "15/04/2025",
    image: "/placeholder.svg?height=200&width=400",
    excerpt: "Những mẹo viết CV hiệu quả để nổi bật và gây ấn tượng với nhà tuyển dụng trong quá trình xin việc.",
    readTime: "6 phút đọc",
  },
  {
    id: 5,
    title: "Xu hướng tuyển dụng ngành IT năm 2025",
    category: "Thị trường",
    date: "08/04/2025",
    image: "/placeholder.svg?height=200&width=400",
    excerpt: "Khám phá những xu hướng và cơ hội tuyển dụng mới nhất trong ngành công nghệ thông tin năm 2025.",
    readTime: "7 phút đọc",
  },
]

export default function SkillsSection() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Góc Cẩm Nang, Báo Chí & Sự Kiện</h2>
          <p className="text-gray-600">Cập nhật tri thức, tin tức và sự kiện công nghệ mới nhất dành cho bạn</p>
        </motion.div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md bg-white p-1 shadow-sm">
          <Button variant="ghost" className="rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
            CẨM NANG
          </Button>
          <Button variant="ghost" className="rounded-md">
            BÁO CHÍ
          </Button>
          <Button variant="ghost" className="rounded-md">
            SỰ KIỆN
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-white/90 text-emerald-600 hover:bg-white">{article.category}</Badge>
                  <span className="ml-2 text-xs text-white bg-black/50 px-2 py-1 rounded">{article.date}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2 hover:text-emerald-600">
                  <Link href={`/cam-nang/${article.id}`}>{article.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
                <Button variant="link" size="sm" className="text-emerald-600 p-0" asChild>
                  <Link href={`/cam-nang/${article.id}`} className="flex items-center">
                    Đọc tiếp <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
          Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
