"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import CandidateHeader from "@/components/candidate/header"

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([])

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl font-medium mb-6">Việc làm đã lưu</h1>

        <Card>
          <CardContent className="p-6">
            {savedJobs.length > 0 ? (
              <div className="space-y-4">
                {/* Job list would go here */}
                <p>Danh sách việc làm đã lưu</p>
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
                <p className="text-gray-600 mb-4">Bạn chưa lưu việc làm nào</p>
                <Button className="bg-green-500 hover:bg-green-600">
                  <Bookmark className="h-4 w-4 mr-2" />
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
