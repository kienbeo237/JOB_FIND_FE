"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Globe, DollarSign, Building } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-10 w-10 text-emerald-600" />,
    title: "Trusted & Quality job",
    description: "Tất cả các tin tuyển dụng đều được kiểm duyệt kỹ lưỡng để đảm bảo chất lượng.",
  },
  {
    icon: <Building className="h-10 w-10 text-emerald-600" />,
    title: "Top companies",
    description: "Kết nối với các công ty hàng đầu trong và ngoài nước.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-emerald-600" />,
    title: "No extra charge",
    description: "Tìm kiếm và ứng tuyển việc làm hoàn toàn miễn phí, không giới hạn số lượng.",
  },
  {
    icon: <Globe className="h-10 w-10 text-emerald-600" />,
    title: "International jobs",
    description: "Cơ hội việc làm từ các công ty đa quốc gia trên toàn thế giới.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="mb-12 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Tại Sao Lựa Chọn JobFind</h2>
            <p className="text-gray-600 mb-6">
              Những cơ hội việc làm đều đang được săn đón nhiều nhất trên JobFind. Còn chần chờ gì nữa mà không đăng ký
              với chúng tôi ngay hôm nay!
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Tạo tài khoản ngay
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden h-48 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Job seeker"
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=150&width=300"
                  alt="Interview"
                  width={300}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden h-32 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=150&width=300"
                  alt="Office"
                  width={300}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Customer service"
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
