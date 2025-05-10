"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Search, Users, BadgeCheck, Trophy } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PremiumFeature() {
  return (
    <div className="mb-12 relative">
      <div
        className="bg-[#19bb83] absolute left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-[100vw]"
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          zIndex: -1,
        }}
      ></div>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
          {/* BÊN TRÁI: ẢNH ĐẠI DIỆN - VISUAL HIỆN ĐẠI */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-[470px] bg-white">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-[#dafcbe] text-[#19bb83] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Trophy size={14} />
                  <span>PREMIUM</span>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)] z-[2]"></div>

              <img
                src="/placeholder.svg?key=dh9zp"
                alt="Đội nhóm nhân viên vui mừng với confetti - JobFind"
                className="object-cover w-full h-[320px] md:h-[400px] lg:h-[450px] transition-all z-[1]"
                loading="lazy"
              />

              <div className="absolute bottom-0 left-0 w-full z-[3] p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white text-lg font-bold mb-1">JobFind Solutions</div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/90 text-sm">Trusted by</span>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                          F
                        </div>
                        <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                          A
                        </div>
                        <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                          G
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                  <Card className="bg-white/10 backdrop-blur-sm border-0 p-2 rounded-lg">
                    <div className="text-white text-xs font-medium">Tỉ lệ tuyển dụng</div>
                    <div className="text-white text-lg font-bold">98.7%</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* BÊN PHẢI: CONTENT */}
          <div className="flex-1 w-full flex flex-col gap-6">
            <h2 className="text-[2rem] md:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
              Bứt phá tuyển dụng cùng <span className="text-[#dafcbe]">JobFind</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium">
              Tìm ứng viên chất lượng, xây dựng thương hiệu tuyển dụng & tối ưu hiệu quả - tất cả trên một nền tảng.
            </p>
            <ul className="flex flex-col gap-4 mt-3">
              <li className="flex items-center gap-4 px-4 py-3 bg-white/15 rounded-xl shadow border border-white/20 hover:bg-white/30 transition">
                <Briefcase className="text-white bg-[#12c65c] rounded p-1 w-8 h-8" />
                <div>
                  <div className="text-base md:text-lg font-semibold text-white">Đăng tin tuyển dụng siêu tốc</div>
                  <div className="text-white/80 text-sm mt-1">Tiếp cận nhanh hàng nghìn ứng viên phù hợp</div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3 bg-white/15 rounded-xl shadow border border-white/20 hover:bg-white/30 transition">
                <Users className="text-white bg-[#1eaedb] rounded p-1 w-8 h-8" />
                <div>
                  <div className="text-base md:text-lg font-semibold text-white">Kho CV chất lượng</div>
                  <div className="text-white/80 text-sm mt-1">
                    Kết nối trực tiếp ứng viên nổi bật, tìm kiếm siêu nhanh
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3 bg-white/15 rounded-xl shadow border border-white/20 hover:bg-white/30 transition">
                <Search className="text-white bg-[#403e43] rounded p-1 w-8 h-8" />
                <div>
                  <div className="text-base md:text-lg font-semibold text-white">AI lọc hồ sơ thông minh</div>
                  <div className="text-white/80 text-sm mt-1">Tối ưu quy trình, giảm bớt thời gian sàng lọc</div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3 bg-white/15 rounded-xl shadow border border-white/20 hover:bg-white/30 transition">
                <BadgeCheck className="text-white bg-[#abecd6] rounded p-1 w-8 h-8" />
                <div>
                  <div className="text-base md:text-lg font-semibold text-white">Hỗ trợ xây dựng thương hiệu</div>
                  <div className="text-white/80 text-sm mt-1">
                    Nâng tầm hình ảnh doanh nghiệp trên thị trường việc làm
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Button className="bg-white text-[#19bb83] hover:bg-[#dafcbe] font-bold rounded-lg text-lg px-8 h-12 shadow-lg transition">
                Đăng tuyển ngay
              </Button>
              <Button
                variant="outline"
                className="border-white/40 bg-transparent text-white font-medium h-12 rounded-lg hover:bg-white/10 text-base"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
