"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import CandidateHeader from "@/components/candidate/header"

export default function AppliedJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState([])

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl font-medium mb-6">Việc làm đã ứng tuyển</h1>

        <Card>
          <CardContent className="p-6">
            {appliedJobs.length > 0 ? (
              <div className="space-y-4">
                {/* Job list would go here */}
                <p>Danh sách việc làm đã ứng tuyển</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Image
                  src="/empty-state-illustration.png"
                  alt="Không có dữ liệu"
                  width={100}
                  height={100}
                  className="mb-4"
                />
                <p className="text-gray-600 mb-4">Bạn chưa ứng tuyển công việc nào</p>
                <Button className="bg-green-500 hover:bg-green-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Tìm việc ngay
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
