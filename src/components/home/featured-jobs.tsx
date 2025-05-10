"use client"
import Link from "next/link"
import Image from "next/image"

const featuredJobs = [
  {
    id: 1,
    title: "Tuyển dụng: Lập trình viên Frontend React",
    company: "TechSolify",
    description: "Mức lương hấp dẫn, môi trường sáng tạo",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    bgColor: "from-[#9b87f5]/90",
  },
  {
    id: 2,
    title: "Tuyển dụng: Digital Marketing Executive",
    company: "BeeMedia",
    description: "Đãi ngộ cao, phát triển cùng đội nhóm trẻ trung",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    bgColor: "from-[#F97316]/80",
  },
]

export default function FeaturedJobs() {
  return (
    <section className="container px-4 mx-auto mt-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredJobs.map((job) => (
          <Link
            key={job.id}
            href={`/viec-lam/${job.id}`}
            className="relative rounded-lg overflow-hidden shadow-lg group transition-transform hover:scale-[1.015] block"
          >
            <Image
              src={job.image || "/placeholder.svg"}
              alt={`Banner quảng cáo tuyển dụng của ${job.company}`}
              width={800}
              height={200}
              className="w-full h-[200px] object-cover"
            />
            <div
              className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${job.bgColor} via-transparent py-4 px-6`}
            >
              <div className="text-white font-semibold text-lg">{job.title}</div>
              <div className="text-sm text-white/90 mt-1">
                {job.company} - {job.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
