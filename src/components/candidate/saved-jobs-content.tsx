import { Eye, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const SavedJobsContent = () => {
  const savedJobs = [
    {
      id: 1,
      company: "CÔNG TY TNHH THƯƠNG MẠI NAMAGRO",
      logoUrl: "/generic-company-logo.png",
      position: "Tuyển Kế toán trưởng thu nhập Thỏa thuận tại Hà Nội",
      location: "Hà Nội",
      salary: "Thỏa thuận",
      experience: "5 - 10 năm",
      deadline: "05/04/2025",
      remainingDays: 23,
      dateApplied: "14/03/2025",
    },
    {
      id: 2,
      company: "CÔNG TY TNHH SÔNG HỒNG VIỆT",
      logoUrl: "/generic-company-logo.png",
      position: "Tuyển Kế toán trưởng thu nhập 20 - 25 triệu VNĐ tại Hà Nội",
      location: "Hà Nội",
      salary: "20 - 25 triệu",
      experience: "5 - 10 năm",
      deadline: "06/04/2025",
      remainingDays: 24,
      dateApplied: "14/03/2025",
    },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
        <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
        Việc làm đã lưu
      </h2>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 text-left font-medium">STT</th>
                <th className="py-3 px-4 text-left font-medium">Công ty</th>
                <th className="py-3 px-4 text-left font-medium">Vị trí tuyển dụng</th>
                <th className="py-3 px-4 text-center font-medium">Ngày lưu</th>
                <th className="py-3 px-4 text-center font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {savedJobs.length > 0 ? (
                savedJobs.map((job, index) => (
                  <tr key={job.id} className="border-t border-gray-200">
                    <td className="py-3 px-4 text-left">{index + 1}</td>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <img
                          src={job.logoUrl || "/placeholder.svg"}
                          alt={job.company}
                          className="w-8 h-8 mr-2 object-contain"
                        />
                        <span>{job.company}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      <a href="#" className="text-teal-600 hover:underline">
                        {job.position}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">
                        <span>
                          {job.location} • {job.salary}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{job.dateApplied}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded text-red-500 hover:bg-gray-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <img src="/empty-state-illustration.png" alt="Không có dữ liệu" className="w-40 h-40 mb-4" />
                      <p>Bạn chưa lưu việc làm nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default SavedJobsContent
