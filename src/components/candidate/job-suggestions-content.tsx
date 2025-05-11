import { Button } from "@/components/ui/button"
import { Search, Bookmark } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const JobSuggestionsContent = () => {
  const suggestedJobs = [
    {
      id: 1,
      position: "Tuyển Kế toán trưởng thu nhập Thỏa thuận tại Hà Nội",
      company: "CÔNG TY TNHH CHARTERIS GLOBAL",
      logo: "/abstract-cg-artwork.png",
      location: "Hà Nội",
      deadline: "Còn 23 ngày để ứng tuyển",
      salary: "Thỏa thuận",
      experience: "Kinh nghiệm: 5 - 10 năm",
      date: "05/04/2025",
    },
    {
      id: 2,
      position: "Tuyển Kế toán trưởng thu nhập 20 - 25 triệu VNĐ tại Hà Nội",
      company: "CÔNG TY TNHH SÔNG HỒNG VIỆT",
      logo: "/abstract-geometric-shv.png",
      location: "Hà Nội",
      deadline: "Còn 24 ngày để ứng tuyển",
      salary: "20 - 25 triệu",
      experience: "Kinh nghiệm: 5 - 10 năm",
      date: "06/04/2025",
    },
  ]

  return (
    <>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-6 -mx-4 md:-mx-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Input placeholder="Vị trí tuyển dụng" className="h-10" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button className="whitespace-nowrap">
                  <Search className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tìm kiếm việc làm gợi ý</h2>
          <p className="text-gray-600 mb-6">
            Khám phá cơ hội việc làm được gợi ý dựa trên mong muốn, kinh nghiệm và kỹ năng của bạn. Đơn lý sự nghiệp
            thành công với công việc phù hợp nhất dành cho bạn!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-16 h-16 object-contain rounded border p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-teal-700 hover:text-teal-600 transition-colors mb-1">
                        <a href="#">{job.position}</a>
                      </h3>
                      <p className="text-sm font-medium">{job.company}</p>
                      <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-600 mt-2">
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-500">{job.experience}</span>
                        <span className="text-gray-500">{job.deadline}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Ứng tuyển</Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Lưu tin
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Việc làm được tìm kiếm nhiều nhất</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Biên Phiên Dịch</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Tư Vấn/Phân Tích Chuyên Môn</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Software Engineering</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Bảo Hiểm</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Hành Chính</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Dịch Vụ Khách Hàng/Chăm Sóc Khách Hàng</span>
              </div>
              <div className="bg-white rounded p-2 text-center hover:bg-blue-100 transition-colors">
                <span className="text-sm">Công Nghệ Xây Dựng/Cầu Tạo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobSuggestionsContent
