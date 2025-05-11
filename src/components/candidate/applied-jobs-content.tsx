"use client"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const AppliedJobsContent = () => {
  const appliedJobs = [
    {
      id: 1,
      company: "CÔNG TY TNHH THƯƠNG MẠI NAMAGRO",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 16 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "16 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "05/04/2025",
    },
    {
      id: 2,
      company: "CÔNG TY CỔ PHẦN ỨNG DỤNG VÀ PHÁT TRIỂN CÔNG NGHỆ THÔNG TIN - CN NHANH TP HỒ CHÍ MINH",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 16 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "16 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "30/03/2025",
    },
    {
      id: 3,
      company: "CÔNG TY TNHH CJ EMERALD",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 16 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "16 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "11/04/2025",
    },
    {
      id: 4,
      company: "CÔNG TY CỔ PHẦN CHAM CHAM HOSPITALITY",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 17 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "17 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "11/04/2025",
    },
    {
      id: 5,
      company: "CÔNG TY CỔ PHẦN CHAM CHAM HOSPITALITY",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 17 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "17 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "11/04/2025",
    },
    {
      id: 6,
      company: "CÔNG TY CỔ PHẦN CHAM CHAM HOSPITALITY",
      logo: "/generic-company-logo.png",
      position: "Tuyển Kế toán tổng hợp thu nhập 17 - 20 triệu VNĐ tại Hồ Chí Minh",
      location: "Hồ Chí Minh",
      salary: "17 - 20 triệu",
      experience: "Chưa có kinh nghiệm",
      status: "NTD chưa xem hồ sơ",
      submissionDate: "14/03/2025",
      submittedDate: "11/04/2025",
    },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
        <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
        Việc làm đã ứng tuyển
      </h2>

      <div className="bg-white rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 text-left font-medium">STT</th>
                <th className="py-3 px-4 text-left font-medium">Công ty</th>
                <th className="py-3 px-4 text-left font-medium">Vị trí tuyển dụng</th>
                <th className="py-3 px-4 text-center font-medium">Ngày ứng tuyển</th>
                <th className="py-3 px-4 text-center font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job, index) => (
                <tr key={job.id} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-left">{index + 1}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-10 h-10 mr-3 object-contain"
                      />
                      <div>
                        <div className="font-medium">{job.company}</div>
                        <div className="text-xs text-gray-500 mt-1">Hạn nộp: {job.submittedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-teal-700">{job.position}</div>
                      <div className="flex flex-col mt-1">
                        <span className="text-xs text-gray-500">
                          {job.location} • {job.salary}
                        </span>
                        <span className="text-xs text-gray-500">{job.experience}</span>
                        <span className="text-xs text-gray-500">Trạng thái: {job.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{job.submissionDate}</td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AppliedJobsContent
