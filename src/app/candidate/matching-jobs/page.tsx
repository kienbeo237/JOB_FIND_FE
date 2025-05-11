"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PuzzleIcon } from "lucide-react"
import CandidateHeader from "@/components/candidate/header"

export default function MatchingJobsPage() {
  const [matchingJobs, setMatchingJobs] = useState([])

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl font-medium mb-6">Việc làm phù hợp</h1>

        <Card>
          <CardContent className="p-6">
            {matchingJobs.length > 0 ? (
              <div className="space-y-4">
                {/* Job list would go here */}
                <p>Danh sách việc làm phù hợp</p>
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
                <p className="text-gray-600 mb-4">Chưa tìm thấy việc làm phù hợp với yêu cầu tìm kiếm của bạn</p>
                <Button className="bg-green-500 hover:bg-green-600">
                  <PuzzleIcon className="h-4 w-4 mr-2" />
                  Cập nhật thông tin
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
