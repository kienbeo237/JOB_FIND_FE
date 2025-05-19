import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Eye, Heart, Search, ExternalLink } from "lucide-react"

const FollowingCompaniesContent = () => {
  const followedCompanies = [
    {
      id: 1,
      name: "FPT Software",
      logo: "/fpt-logo.png",
      industry: "Công nghệ thông tin",
      location: "Hà Nội, Hồ Chí Minh",
      employees: "10000+",
      jobCount: 35,
    },
    {
      id: 2,
      name: "Viettel Group",
      logo: "/stylized-vt.png",
      industry: "Viễn thông & CNTT",
      location: "Hà Nội",
      employees: "50000+",
      jobCount: 42,
    },
    {
      id: 3,
      name: "Vingroup",
      logo: "/abstract-vng.png",
      industry: "Đa ngành",
      location: "Hà Nội, Hồ Chí Minh, Đà Nẵng",
      employees: "35000+",
      jobCount: 28,
    },
    {
      id: 4,
      name: "Samsung Vietnam",
      logo: "/stylized-letter-ss.png",
      industry: "Điện tử & Công nghệ",
      location: "Bắc Ninh, Thái Nguyên",
      employees: "60000+",
      jobCount: 15,
    },
    {
      id: 5,
      name: "Techcombank",
      logo: "/abstract-geometric-TK.png",
      industry: "Tài chính & Ngân hàng",
      location: "Hà Nội, Hồ Chí Minh",
      employees: "15000+",
      jobCount: 23,
    },
  ]

  const hasCompanies = followedCompanies.length > 0

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-teal-600 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Công ty đang theo dõi ({followedCompanies.length})
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Tìm công ty
          </Button>
        </div>
      </div>

      {hasCompanies ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {followedCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md overflow-hidden">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Địa điểm</p>
                      <p className="text-sm text-gray-600">{company.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <Eye className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Quy mô</p>
                      <p className="text-sm text-gray-600">{company.employees} nhân viên</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <Building className="h-4 w-4 mr-1" />
                      Xem công ty
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {company.jobCount} việc làm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center py-12">
              <img
                src="/empty-state-illustration.png"
                alt="Không có công ty đang theo dõi"
                className="w-40 h-40 mb-6"
              />
              <p className="text-gray-600">Bạn chưa theo dõi công ty nào</p>
              <div className="mt-4">
                <Button>
                  <Building className="h-4 w-4 mr-2" />
                  Khám phá công ty
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default FollowingCompaniesContent
