"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    title: "Tạo hồ sơ miễn phí – Khám phá hàng ngàn cơ hội việc làm!",
    subtitle: "Ứng tuyển dễ dàng – Bắt đầu hành trình nghề nghiệp của bạn hôm nay!",
    image: "/placeholder.svg?height=600&width=1200",
    ctaText: "Đăng tuyển ngay",
    ctaSecondary: "Tìm hiểu thêm",
  },
  {
    id: 2,
    title: "Kết nối với nhà tuyển dụng hàng đầu",
    subtitle: "Tìm kiếm cơ hội nghề nghiệp phù hợp với bạn",
    image: "/placeholder.svg?height=600&width=1200",
    ctaText: "Tìm việc ngay",
    ctaSecondary: "Xem nhà tuyển dụng",
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = () => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))
  }

  const prev = () => {
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1))
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-400">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-400/80 z-10"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex h-full items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.h1
                  key={`title-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p
                  key={`subtitle-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white/90 md:text-xl"
                >
                  {slides[current].subtitle}
                </motion.p>
              </div>
              <motion.div
                key={`cta-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90">
                  {slides[current].ctaText}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-emerald-600 hover:bg-white/20">
                  {slides[current].ctaSecondary}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 10000)
            }}
            className={cn("h-2 w-2 rounded-full bg-white/50 transition-all", current === i && "w-4 bg-white")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-4 z-20 flex items-center md:left-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/40"
          onClick={() => {
            prev()
            setIsAutoPlaying(false)
            setTimeout(() => setIsAutoPlaying(true), 10000)
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 z-20 flex items-center md:right-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/40"
          onClick={() => {
            next()
            setIsAutoPlaying(false)
            setTimeout(() => setIsAutoPlaying(true), 10000)
          }}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  )
}
