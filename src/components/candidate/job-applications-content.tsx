"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, PlusCircle, Save, Edit, Wand2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const JobApplicationsContent = () => {
  const [coverLetterText, setCoverLetterText] = useState("")
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Thư xin việc đã lưu
        </h2>
        <div className="flex justify-end mb-4">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <PlusCircle className="h-4 w-4 mr-2" /> Tạo thư xin việc
          </Button>
        </div>

        {!selectedCoverLetter ? (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="flex flex-col items-center text-center py-12">
                <img src="/empty-state-illustration.png" alt="Không có thư xin việc" className="w-40 h-40 mb-6" />
                <p className="text-gray-600">Bạn chưa tạo thư xin việc nào</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Thư xin việc của tôi</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" /> Lưu
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">{selectedCoverLetter}</div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Tạo thư xin việc mới
        </h2>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="manual">Soạn thảo thủ công</TabsTrigger>
                <TabsTrigger value="ai">Gợi ý bằng AI</TabsTrigger>
              </TabsList>

              <TabsContent value="manual">
                <Textarea
                  placeholder="Nhập nội dung thư xin việc của bạn tại đây..."
                  className="min-h-[300px] mb-4"
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu thư xin việc</Button>
                </div>
              </TabsContent>

              <TabsContent value="ai">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium mb-2">Thông tin cần thiết</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm mb-1">Vị trí ứng tuyển</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Ví dụ: Kế toán trưởng" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Công ty</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Ví dụ: Công ty TNHH XYZ"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Kỹ năng nổi bật</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Ví dụ: Excel, Phân tích báo cáo tài chính"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Kinh nghiệm làm việc</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Ví dụ: 5 năm kinh nghiệm trong lĩnh vực kế toán"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Tạo thư xin việc với AI
                  </Button>

                  <div className="border rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-2">Bản nháp được tạo bởi AI</h3>
                    <div className="bg-white border rounded-lg p-4 min-h-[200px]">
                      <p className="text-gray-400 italic">
                        Thư xin việc sẽ hiển thị ở đây sau khi bạn nhấn nút "Tạo thư xin việc với AI"
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">Chỉnh sửa</Button>
                      <Button>Lưu thư xin việc</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Thư xin việc đã thích
        </h2>
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="text-teal-600 border-teal-600">
            <Search className="h-4 w-4 mr-2" />
            Tham khảo
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center py-12">
              <img src="/empty-state-illustration.png" alt="Không có thư xin việc yêu thích" className="w-40 h-40 mb-6" />
              <p className="text-gray-600">Bạn chưa thích thư xin việc nào</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobApplicationsContent
