'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenSquare, Plus } from 'lucide-react';

export default function ProfileContent() {
  return (
    <div className="mb-6">
      <Card className="mb-8">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-green-600">Thông tin cá nhân</CardTitle>
          <Button variant="ghost" size="sm" className="text-green-600">
            <PenSquare className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {[
                { label: 'Họ và tên', value: 'Vũ Đức' },
                { label: 'Giới tính', value: 'Nam' },
                { label: 'Ngày sinh', value: 'Chưa cập nhật', muted: true },
                {
                  label: 'Tình trạng hôn nhân',
                  value: 'Chưa cập nhật',
                  muted: true,
                },
                { label: 'Số điện thoại', value: 'Chưa cập nhật', muted: true },
              ].map(({ label, value, muted }, i) => (
                <div className="mb-4" key={i}>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className={muted ? 'text-gray-500' : ''}>{value}</p>
                </div>
              ))}
            </div>
            <div>
              {[
                { label: 'Email', value: '0510vuduc@gmail.com' },
                { label: 'Địa chỉ', value: 'Chưa cập nhật', muted: true },
                {
                  label: 'Nhóm ngành nghề',
                  value: 'Kế toán/Kiểm toán/Thuế',
                  muted: true,
                },
                { label: 'Vị trí', value: 'Chưa cập nhật', muted: true },
                {
                  label: 'Trình độ học vấn',
                  value: 'Chưa cập nhật',
                  muted: true,
                },
              ].map(({ label, value, muted }, i) => (
                <div className="mb-4" key={i}>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className={muted ? 'text-gray-500' : ''}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Sở thích',
            desc: 'Không có sở thích nào',
            button: 'Thêm sở thích',
          },
          {
            title: 'Mục tiêu',
            desc: 'Chưa có mục tiêu',
            button: 'Thêm mục tiêu',
          },
          {
            title: 'Học vấn',
            desc: 'Thêm thông tin học vấn của bạn',
            button: 'Thêm học vấn',
          },
          {
            title: 'Chứng chỉ',
            desc: 'Bạn có thể thêm thông tin chứng chỉ để chứng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm chứng chỉ',
          },
          {
            title: 'Ngôn ngữ',
            desc: 'Bạn có thể thêm thông tin cá nhân để chúng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm ngôn ngữ',
          },
          {
            title: 'Kỹ năng',
            desc: 'Bạn có thể thêm thông tin cá nhân để chúng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm kỹ năng',
          },
          {
            title: 'Kinh nghiệm',
            desc: 'Bạn có thể thêm thông tin kinh nghiệm để chứng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm kinh nghiệm',
          },
          {
            title: 'Giải thưởng',
            desc: 'Bạn có thể nổi bật hơn trong CV bằng cách thêm nhiều minh chứng hoặc kể về mô tả dự án',
            button: 'Thêm giải thưởng',
          },
          {
            title: 'Dự án',
            desc: 'Bạn có thể thêm thông tin cá nhân để chứng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm dự án',
          },
          {
            title: 'Hoạt động xã hội và tình nguyện',
            desc: 'Bạn có thể thêm thông tin hoạt động xã hội và tình nguyện để chứng tôi hoàn thành hồ sơ của bạn',
            button: 'Thêm hoạt động',
          },
        ].map(({ title, desc, button }, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <p className="text-gray-500 mb-4">{desc}</p>
              <Button variant="outline" size="sm" className="text-green-600">
                <Plus className="h-4 w-4 mr-2" />
                {button}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
