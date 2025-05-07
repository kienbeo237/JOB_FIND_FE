"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

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
    isUrgent: true,
  },
  {
    id: 2,
    title: "Team Leader",
    company: "Amazon",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isUrgent: true,
  },
  {
    id: 3,
    title: "Scrum Master",
    company: "Jira",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isUrgent: true,
  },
  {
    id: 4,
    title: "Project Manager",
    company: "Netflix",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isUrgent: true,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "McDonalds",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isUrgent: true,
  },
  {
    id: 6,
    title: "Software Tester",
    company: "Dell",
    logo: "/placeholder.svg?height=80&width=80",
    salary: "23.000.000 vnđ",
    location: "Thanh Xuan Trung, Hanoi",
    category: "it",
    isUrgent: true,
  },
]

export default function UrgentJobs() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredJobs = activeTab === "all" ? jobs : jobs.filter((job) => job.category === activeTab)

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-900"
        >
          Việc Làm Tuyển Gấp
        </motion.h2>
        <Link href="/viec-lam/gap" className="flex items-center text-emerald-600 hover:underline">
          Xem tất cả
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex w-full overflow-x-auto space-x-2 bg-transparent p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                activeTab === category.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-gray-200 bg-white hover:border-emerald-600/50 hover:text-emerald-600",
              )}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/viec-lam/${job.id}`}>
                  <Card className="group overflow-hidden transition-all hover:border-emerald-600/50 hover:shadow-md">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                      <div className="h-12 w-12 overflow-hidden rounded border bg-gray-100">
                        <Image
                          src={job.logo || "/placeholder.svg"}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-emerald-600">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      {job.isUrgent && <Badge className="bg-red-500 hover:bg-red-600">Urgent</Badge>}
                    </CardHeader>
                    <CardContent className="grid gap-2 p-4 pt-0 text-sm">
                      <div className="font-medium text-red-500">{job.salary}</div>
                      <div className="text-muted-foreground">{job.location}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
