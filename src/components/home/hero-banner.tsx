"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Kết nối với nhà tuyển dụng hàng đầu",
    subtitle: "Xây dựng sự nghiệp vững chắc với các công ty uy tín",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    bgColor: "bg-gradient-to-r from-jobfind-light/30 to-jobfind/30",
  },
  {
    id: 2,
    title: "Tạo hồ sơ miễn phí – Khám phá hàng ngàn cơ hội việc làm!",
    subtitle: "Ứng tuyển dễ dàng – Bắt đầu hành trình nghề nghiệp của bạn hôm nay!",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    bgColor: "bg-gradient-to-r from-jobfind/30 to-jobfind-light/30",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className={`absolute inset-0 ${slide.bgColor} mix-blend-multiply`}></div>
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Banner ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-[1350px] w-full mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 rounded-full z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 rounded-full z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
