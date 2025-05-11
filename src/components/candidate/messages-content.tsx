"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const MessagesContent = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)

  const conversations = [
    {
      id: 1,
      name: "Công ty TNHH ABC",
      avatar: "/abstract-colorful-shapes.png",
      lastMessage: "Chào bạn, chúng tôi đã nhận được CV của bạn...",
      time: "10:30",
      isOnline: true,
      unread: 2,
    },
    {
      id: 2,
      name: "Công ty Cổ phần XYZ",
      avatar: "/whimsical-forest-twilight.png",
      lastMessage: "Cảm ơn bạn đã quan tâm đến vị trí Kế toán trưởng tại công ty chúng tôi.",
      time: "Hôm qua",
      isOnline: false,
      unread: 0,
    },
    {
      id: 3,
      name: "Nguyễn Văn A (Giám đốc nhân sự)",
      avatar: "/nva-soldiers.png",
      lastMessage: "Bạn có thể tham gia phỏng vấn vào thứ 5 tuần này được không?",
      time: "10/04",
      isOnline: true,
      unread: 0,
    },
  ]

  const messages = [
    {
      id: 1,
      senderId: "company",
      text: "Chào bạn, chúng tôi đã nhận được CV của bạn cho vị trí Kế toán trưởng.",
      time: "10:15",
    },
    {
      id: 2,
      senderId: "company",
      text: "Chúng tôi rất ấn tượng với kinh nghiệm của bạn và muốn mời bạn tham gia phỏng vấn.",
      time: "10:16",
    },
    {
      id: 3,
      senderId: "user",
      text: "Chào công ty, cảm ơn vì đã xem xét hồ sơ của tôi. Tôi rất vui khi nhận được phản hồi tích cực.",
      time: "10:20",
    },
    {
      id: 4,
      senderId: "company",
      text: "Bạn có thể cho chúng tôi biết bạn rảnh vào những thời gian nào trong tuần tới để chúng tôi sắp xếp lịch phỏng vấn?",
      time: "10:25",
    },
    {
      id: 5,
      senderId: "user",
      text: "Tôi có thể tham gia phỏng vấn vào thứ 3 hoặc thứ 5 tuần sau, từ 9h đến 17h.",
      time: "10:30",
    },
  ]

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input className="pl-10" placeholder="Tìm kiếm tin nhắn" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium">Tin nhắn</h2>
          </div>

          <ScrollArea className="h-[calc(100vh-330px)]">
            {conversations.length > 0 ? (
              <div className="divide-y">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedConversation === conversation.id ? "bg-gray-50" : ""}`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="ml-2 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <img src="/empty-inbox.png" alt="Không có tin nhắn" className="w-24 h-24 mb-4" />
                <p className="text-gray-500 text-sm">Không có tin nhắn nào</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <Card className="h-[calc(100vh-200px)]">
          {selectedConversation ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conversations[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{conversations[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{conversations[0].name}</h3>
                    <p className="text-xs text-green-500">Trực tuyến</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.senderId === "user"
                            ? "bg-teal-500 text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span
                          className={`text-xs ${message.senderId === "user" ? "text-teal-100" : "text-gray-500"} block text-right mt-1`}
                        >
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Nhập tin nhắn..." className="flex-1" />
                  <Button size="icon" className="rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <img src="/select-conversation.png" alt="Không có tin nhắn" className="w-32 h-32 mx-auto mb-4" />
                <p className="text-gray-500">Chọn một cuộc trò chuyện để xem nội dung</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MessagesContent
