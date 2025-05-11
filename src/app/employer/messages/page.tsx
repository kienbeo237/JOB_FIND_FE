'use client';

import type React from 'react';

import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EmployerMessagesPage = () => {
  const conversations = [
    {
      id: 1,
      initial: 'T',
      name: 'Trần Văn B',
      position: 'Ứng viên',
      lastMessage: 'Tôi muốn hỏi thêm về vị trí...',
      time: '10:30',
      unread: 3,
      isActive: true,
    },
    {
      id: 2,
      initial: 'N',
      name: 'Nguyễn Thị C',
      position: 'Ứng viên',
      lastMessage: 'Cảm ơn về thông tin phỏng vấn',
      time: 'Hôm qua',
      unread: 0,
      isActive: false,
    },
    {
      id: 3,
      initial: 'L',
      name: 'Lê Minh D',
      position: 'Ứng viên',
      lastMessage: 'Tôi đã gửi CV của mình',
      time: '12/06',
      unread: 0,
      isActive: false,
    },
  ];

  const activeConversation = {
    id: 1,
    initial: 'T',
    name: 'Trần Văn B',
    position: 'Ứng viên',
    messages: [
      {
        id: 1,
        senderId: 1,
        text: 'Xin chào, tôi muốn hỏi thêm về vị trí Lập trình viên Frontend',
        time: '10:20',
        isSender: false,
      },
      {
        id: 2,
        senderId: 0,
        text: 'Chào bạn, rất vui khi bạn quan tâm đến vị trí này. Bạn có câu hỏi cụ thể gì không?',
        time: '10:25',
        isSender: true,
      },
      {
        id: 3,
        senderId: 1,
        text: 'Tôi muốn biết thêm về yêu cầu kinh nghiệm và mức lương của vị trí',
        time: '10:30',
        isSender: false,
      },
    ],
  };

  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Tin nhắn</h1>
      <p className="text-sm text-gray-500 mb-6">
        Quản lý trò chuyện với ứng viên
      </p>

      <div className="flex flex-col lg:flex-row lg:h-[600px] border border-gray-200 rounded-lg overflow-hidden">
        {/* Conversations List */}
        <div className="w-full lg:w-1/3 border-r border-gray-200">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-white"
              >
                Chưa đọc
              </TabsTrigger>
            </TabsList>

            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm tin nhắn..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <TabsContent
              value="all"
              className="m-0 overflow-y-auto h-[calc(600px-88px)]"
            >
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`flex items-start p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    conversation.isActive ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {conversation.initial}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {conversation.position}
                    </p>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="ml-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent
              value="unread"
              className="m-0 overflow-y-auto h-[calc(600px-88px)]"
            >
              {conversations
                .filter(c => c.unread > 0)
                .map(conversation => (
                  <div
                    key={conversation.id}
                    className={`flex items-start p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      conversation.isActive ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {conversation.initial}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {conversation.position}
                      </p>
                      <p className="text-xs text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Message Display */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {activeConversation.initial}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-sm">
                  {activeConversation.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {activeConversation.position}
                </p>
              </div>
            </div>
            <button className="text-green-500 text-sm font-medium">
              Hồ sơ
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {activeConversation.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.isSender ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.isSender
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span
                    className={`text-xs block mt-1 ${
                      message.isSender ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button
                className="rounded-r-md bg-green-500 text-white hover:bg-green-600"
                onClick={handleSendMessage}
              >
                <span className="hidden sm:inline mr-1">Gửi</span>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerMessagesPage;
