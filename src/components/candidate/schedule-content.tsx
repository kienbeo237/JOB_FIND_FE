"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, PlusCircle, Download, Upload, Eye, Edit, FileText, Trash2, User, Video, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function ScheduleContent() {
  const [viewingCV, setViewingCV] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("templates")

  const templateColors = [
    { color: "bg-orange-500", name: "Mẫu CV Chuyên nghiệp" },
    { color: "bg-blue-400", name: "Mẫu CV Sáng tạo" },
    { color: "bg-yellow-400", name: "Mẫu CV Đa năng" },
    { color: "bg-green-500", name: "Mẫu CV Tối giản" },
    { color: "bg-purple-500", name: "Mẫu CV Hiện đại" },
  ]

  const userCVs = [
    {
      id: 1,
      name: "CV Marketing Manager 2024",
      template: "Professional",
      lastUpdated: "23.03.2024",
      previewImage: "/professional-resume-template.png",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      name: "CV Tiếng Anh",
      template: "Modern",
      lastUpdated: "15.04.2024",
      previewImage: "/modern-resume-template.png",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]

  const cvData = [
    {
      hasVideo: true,
      videoUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      avatar: "/professional-headshot.png",
    },
    {
      hasAudio: true,
      audioUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      avatar: "/professional-headshot-female.png",
    },
  ]

  const downloadTemplate = (index: number) => {
    setDownloading(true)
    setSelectedTemplate(index)

    setTimeout(() => {
      setDownloading(false)
      toast.success("Mẫu CV đã được tải xuống thành công")

      const link = document.createElement("a")
      link.href = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      link.download = `${templateColors[index].name}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000)
  }

  const downloadCV = (cv: any) => {
    setDownloading(true)

    setTimeout(() => {
      setDownloading(false)
      toast.success("CV đã được tải xuống thành công")

      const link = document.createElement("a")
      link.href = cv.pdfUrl
      link.download = `${cv.name}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Sơ yếu lý lịch đã lưu
        </h2>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <p className="text-gray-600">Tài liệu hồ sơ, hoặc tạo mới CV cực nhanh trên JobFind.vn</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 h-auto">
              <PlusCircle className="h-4 w-4 mr-2" /> Tạo sơ yếu lý lịch
            </Button>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 py-2 h-auto">
              <Upload className="h-4 w-4 mr-2" /> Tải lên
            </Button>
          </div>
        </div>

        {userCVs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {userCVs.map((cv) => (
              <Card key={cv.id} className="overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img
                        src={cv.previewImage || "/placeholder.svg"}
                        alt={cv.name}
                        className="absolute w-full h-full object-cover opacity-20"
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="bg-white/90 rounded-lg shadow-sm p-4 w-[70%] aspect-[3/4] flex flex-col">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2 overflow-hidden">
                              <img
                                src={cv.previewImage || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="text-xs font-semibold mb-1">Họ và tên</h3>
                            <div className="h-1 w-full bg-gray-200 mb-2"></div>
                            <div className="h-1 w-3/4 mx-auto bg-gray-200 mb-4"></div>
                          </div>
                          <div className="flex-1 px-2">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="mb-2">
                                <div className="h-1 w-full bg-gray-200 mb-1"></div>
                                <div className="h-1 w-3/4 bg-gray-200"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{cv.name}</h3>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>Mẫu: {cv.template}</span>
                        <span>Cập nhật: {cv.lastUpdated}</span>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 h-10 px-3 border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-sm"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Xem
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{cv.name}</DialogTitle>
                            </DialogHeader>
                            <div className="h-full overflow-auto">
                              <iframe src={cv.pdfUrl} className="w-full h-full border-0" title={cv.name} />
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setViewingCV(false)}
                                className="h-10 px-4 border-gray-300 hover:border-orange-500 hover:bg-orange-50"
                              >
                                Đóng
                              </Button>
                              <Button
                                onClick={() => downloadCV(cv)}
                                disabled={downloading}
                                className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                {downloading ? "Đang tải..." : "Tải xuống"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          className="flex-1 h-10 px-3 border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Sửa
                        </Button>
                        <Button
                          variant="default"
                          className="flex-1 h-10 px-3 bg-orange-500 hover:bg-orange-600 text-white text-sm"
                          onClick={() => downloadCV(cv)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Tải
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="flex flex-col items-center text-center py-12">
                <img src="/empty-state-illustration.png" alt="Không có sơ yếu lý lịch" className="w-40 h-40 mb-6" />
                <p className="text-gray-600">Bạn chưa tạo sơ yếu lý lịch nào</p>
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 h-auto">
                    <FileText className="h-4 w-4 mr-2" /> Tạo mới sơ yếu lý lịch
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 py-2 h-auto">
                    <Download className="h-4 w-4 mr-2" /> Tải về mẫu để chỉnh sửa
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 py-2 h-auto">
                    <Upload className="h-4 w-4 mr-2" /> Tải lên nội dung hoàn chỉnh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mb-6">
        <Tabs defaultValue="templates" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-teal-600 flex items-center">
              <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
              {activeTab === "templates" ? "Mẫu sơ yếu lý lịch có sẵn" : "Thư viện media"}
            </h2>
            <TabsList>
              <TabsTrigger value="templates">Mẫu CV</TabsTrigger>
              <TabsTrigger value="media">Thư viện media</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="templates" className="mt-0">
            <div className="flex justify-end mb-4">
              <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 py-2 h-auto">
                <Search className="h-4 w-4 mr-2" />
                Tham khảo thêm
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {templateColors.map((template, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="text-center mb-3 font-medium">{template.name}</h3>
                  <div
                    className={`h-48 cursor-pointer border-2 rounded-md overflow-hidden ${
                      selectedTemplate === index ? "border-orange-500" : "border-gray-200 hover:border-orange-500"
                    } transition-colors shadow-sm hover:shadow-md mb-4`}
                    onClick={() => setSelectedTemplate(index)}
                  >
                    <div className={`w-full h-full ${template.color}`}></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-10 px-4 border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-sm"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem trước
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                        </DialogHeader>
                        <div className="h-full overflow-auto">
                          <iframe
                            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                            className="w-full h-full border-0"
                            title={template.name}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      className="w-full h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm"
                      onClick={() => downloadTemplate(index)}
                      disabled={downloading && selectedTemplate === index}
                    >
                      {downloading && selectedTemplate === index ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin mr-2">⟳</span> Đang tải
                        </span>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-blue-500" />
                    Video giới thiệu
                  </h3>
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                    {cvData[0].hasVideo ? (
                      <video
                        src={cvData[0].videoUrl}
                        controls
                        poster={cvData[0].avatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">Chưa có video</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Video giới thiệu bản thân (30s)</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:border-blue-500 hover:bg-blue-50 py-2 h-auto"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Thay đổi
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 h-auto">
                        <Upload className="h-4 w-4 mr-1" />
                        Tải lên
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Mic className="h-5 w-5 mr-2 text-purple-500" />
                    Audio giới thiệu
                  </h3>
                  <div className="bg-gray-100 p-4 rounded-md mb-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                      <img
                        src={cvData[1].avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {cvData[1].hasAudio ? (
                      <audio src={cvData[1].audioUrl} controls className="w-full" />
                    ) : (
                      <p className="text-gray-500">Chưa có audio</p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Audio giới thiệu bản thân (30s)</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:border-purple-500 hover:bg-purple-50 py-2 h-auto"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Thay đổi
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 h-auto"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Tải lên
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-orange-500" />
                    Ảnh chân dung
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[
                      "/professional-headshot-1.png",
                      "/professional-headshot-2.png",
                      "/professional-headshot-3.png",
                      "/professional-headshot-4.png",
                    ].map((img, i) => (
                      <div key={i} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Profile ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 h-auto">
                      <Upload className="h-4 w-4 mr-2" />
                      Tải ảnh mới
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
