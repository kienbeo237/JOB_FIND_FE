"use client"

import { Shield, Building2, BadgeDollarSign, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Shield className="h-6 w-6 text-emerald-600" />,
      title: "Trusted & Quality job",
      description: "Tất cả các tin tuyển dụng đều được kiểm duyệt kỹ lưỡng để đảm bảo chất lượng.",
    },
    {
      id: 2,
      icon: <Building2 className="h-6 w-6 text-emerald-600" />,
      title: "Top companies",
      description: "Kết nối với các công ty hàng đầu trong và ngoài nước.",
    },
    {
      id: 3,
      icon: <BadgeDollarSign className="h-6 w-6 text-emerald-600" />,
      title: "No extra charge",
      description: "Tìm kiếm và ứng tuyển việc làm hoàn toàn miễn phí, không giới hạn số lượng.",
    },
    {
      id: 4,
      icon: <Globe className="h-6 w-6 text-emerald-600" />,
      title: "International jobs",
      description: "Cơ hội việc làm từ các công ty đa quốc gia trên toàn thế giới.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side with images */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-12">
                {/* Grid of images inside the specified structure */}
                <div className="h-[500px] grid grid-cols-2 grid-rows-2 gap-4">
                  {/* Large image in the top-left (spans 2 rows) */}
                  <div className="row-span-2 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/professional-team-meeting.png"
                      alt="Professional team meeting"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Medium image in the top-right */}
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/team-collaboration.png"
                      alt="Team collaboration"
                      width={300}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Medium image in the bottom-right */}
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/modern-workspace.png"
                      alt="Modern workspace"
                      width={300}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side with content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tại Sao Lựa Chọn JobFind</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Những cơ hội việc làm đều đang được săn đón nhiều nhất trên JobFind. Còn chần chờ gì nữa mà không đăng
                ký với chúng tôi ngay hôm nay!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="space-y-2">
                  <div className="inline-flex items-center justify-center bg-emerald-600/5 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-sm text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm">Tạo tài khoản ngay</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
