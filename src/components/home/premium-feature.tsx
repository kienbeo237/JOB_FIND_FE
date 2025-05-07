"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PremiumFeature() {
  return (
    <section className="mb-12 bg-emerald-600 rounded-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Bứt phá tuyển dụng cùng JobFind</h2>
            <p className="text-white/90 mb-6">
              Tìm ứng viên chất lượng, xây dựng thương hiệu tuyển dụng & tối ưu hiệu quả - tất cả trên một nền tảng.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-emerald-600 hover:bg-white/90">Đăng tuyển ngay</Button>
              <Button variant="outline" className="border-white text-emerald-600 hover:bg-white/20">
                Tìm hiểu thêm
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-emerald-400 text-white hover:bg-emerald-500">PREMIUM</Badge>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="JobFind Solutions"
            width={500}
            height={400}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <div className="font-bold text-xl mb-1">JobFind Solutions</div>
            <div className="flex items-center gap-2">
              <span>Trusted by</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="font-semibold">Tỉ lệ tuyển dụng</span>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-white rounded-full w-24"></div>
                <span>98.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
