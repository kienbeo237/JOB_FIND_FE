"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const jobCategories = [
  { id: "all", label: "Tất cả" },
  { id: "banking", label: "Ngân hàng" },
  { id: "realestate", label: "Bất động sản" },
  { id: "it", label: "IT - Phần mềm" },
  { id: "construction", label: "Xây dựng" },
  { id: "metaverse", label: "Metaverse" },
  { id: "finance", label: "Tài chính" },
  { id: "retail", label: "Bán lẻ - Hàng tiêu dùng" },
  { id: "production", label: "Sản xuất" },
  { id: "blockchain", label: "Blockchain & Cryptocurrency" },
  { id: "fintech", label: "Fintech" },
]

const jobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "Metacorp",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    urgent: true,
  },
  {
    id: 2,
    title: "Team Leader",
    company: "Amazon",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    urgent: true,
  },
  {
    id: 3,
    title: "Scrum Master",
    company: "Jira",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    urgent: true,
  },
  {
    id: 4,
    title: "Project Manager",
    company: "Netflix",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://cdn.worldvectorlogo.com/logos/netflix-4.svg",
    urgent: true,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "McDonalds",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2560px-McDonald%27s_Golden_Arches.svg.png",
    urgent: true,
  },
  {
    id: 6,
    title: "Software Tester",
    company: "Dell",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.svg/2560px-Dell_Logo.svg.png",
    urgent: true,
  },
  {
    id: 7,
    title: "Technical Leader",
    company: "Microsoft",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    urgent: true,
  },
  {
    id: 8,
    title: "Software Developer",
    company: "Meta",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    urgent: true,
  },
  {
    id: 9,
    title: "Project Manager",
    company: "McDonalds",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2560px-McDonald%27s_Golden_Arches.svg.png",
    urgent: true,
  },
  {
    id: 10,
    title: "Software Tester",
    company: "Canon",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Canon_logo_2022.svg/2560px-Canon_logo_2022.svg.png",
    urgent: true,
  },
  {
    id: 11,
    title: "Project Manager",
    company: "Amazon",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    urgent: true,
  },
  {
    id: 12,
    title: "Scrum Master",
    company: "Jira",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    urgent: true,
  },
  {
    id: 13,
    title: "Software Developer",
    company: "Meta",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    urgent: true,
  },
  {
    id: 14,
    title: "UI/UX Designer",
    company: "McDonalds",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2560px-McDonald%27s_Golden_Arches.svg.png",
    urgent: true,
  },
  {
    id: 15,
    title: "Technical Leader",
    company: "Microsoft",
    location: "Thanh Xuan Trung, Hanoi",
    salary: "23.000.000 vnđ",
    tags: ["all", "it"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    urgent: true,
  },
]

export default function UrgentJobs() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600">Việc Làm Tuyển Gấp</h2>
          <Link href="/viec-lam/gap" className="text-green-500 hover:underline flex items-center text-sm">
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {jobCategories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 rounded-full border border-gray-200 hover:border-green-500 whitespace-nowrap text-xs ${category.id === "all" ? "bg-green-500 text-white border-green-500" : ""}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 relative"
            >
              <Badge variant="destructive" className="absolute top-2 right-2 z-10 bg-[#ea384c] text-white">
                Urgent
              </Badge>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-md p-2">
                    <Image
                      src={job.logo || "/placeholder.svg"}
                      alt={job.company}
                      width={120}
                      height={120}
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
    </section>
  )
}
