"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "banking", name: "Ngân hàng" },
  { id: "realestate", name: "Bất động sản" },
  { id: "it", name: "IT - Phần mềm" },
  { id: "construction", name: "Xây dựng" },
  { id: "metaverse", name: "Metaverse" },
  { id: "finance", name: "Tài chính" },
  { id: "retail", name: "Bán lẻ - Hàng tiêu dùng" },
  { id: "blockchain", name: "Blockchain & Cryptocurrency" },
  { id: "fintech", name: "Fintech" },
]

const jobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "Metacorp",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
  {
    id: 2,
    title: "Team Leader",
    company: "Amazon",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
  {
    id: 3,
    title: "Scrum Master",
    company: "Jira",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
  {
    id: 4,
    title: "Project Manager",
    company: "Netflix",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "McDonalds",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
  {
    id: 6,
    title: "Software Tester",
    company: "Dell",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isHot: true,
  },
]

export default function HotJobs() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredJobs = activeTab === "all" ? jobs : jobs.filter((job) => job.category === activeTab)

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600">Việc Làm Hot Trong Tuần</h2>
          <Link href="/viec-lam/hot" className="text-green-500 hover:underline flex items-center text-sm">
            Xem tất cả
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="relative mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-3 py-1 rounded-full border border-gray-200 hover:border-green-500 whitespace-nowrap text-xs ${
                  category.id === activeTab ? "bg-green-500 text-white border-green-500" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 relative"
              >
                {job.isHot && <Badge className="absolute top-2 right-2 z-10 bg-[#ea384c] text-white">Hot</Badge>}
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-md p-2">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h3 className="font-semibold text-xl truncate">{job.title}</h3>
                      <p className="text-gray-600 text-base">{job.company}</p>
                      <p className="text-[#ea384c] font-medium text-base">{job.salary}</p>
                      <p className="text-gray-600 text-base">{job.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
