'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Download,
  Upload,
  FileText,
  ImageIcon,
  Video,
  Mic,
  Camera,
  PlayCircle,
  PlusCircle,
  Calendar,
  Eye,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CVManagementContent() {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    idNumber: '',
    cccd: '',
    email: '',
    introduction: '',
  });

  const cvs = [
    {
      id: 1,
      name: 'Vũ Văn Đức - Hotel Manager.pdf',
      lastUpdated: '23.03.2023',
      pdfUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      id: 2,
      name: 'Mr. Đức - Quản lý khách sạn 2025.pdf',
      lastUpdated: '20.01.2023',
      pdfUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ];

  const downloadCV = (cv: any) => {
    toast.promise(
      new Promise(resolve => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = cv.pdfUrl;
          link.download = `${cv.name}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve(true);
        }, 1000);
      }),
      {
        loading: 'Đang tải CV...',
        success: 'CV đã được tải xuống thành công!',
        error: 'Lỗi khi tải CV',
      }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type: string) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(
        `${
          type === 'cv' ? 'CV' : type === 'video' ? 'Video' : 'Audio'
        } đã được tải lên thành công`
      );
    }, 1500);
  };

  const handlePhotoSelect = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    toast.success('Đã chọn ảnh chân dung thành công');
  };

  const photoOptions = [
    '/portrait-photo-1.png',
    '/diverse-portrait-study.png',
    '/portrait-photo-3.png',
    '/portrait-photo-4.png',
  ];

  const templateColors = [
    {
      color: 'bg-orange-500',
      name: 'Mẫu 1',
      pdfUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      color: 'bg-blue-200',
      name: 'Mẫu 2',
      pdfUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      color: 'bg-yellow-300',
      name: 'Mẫu 3',
      pdfUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-orange-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-orange-600 mr-2"></span>
          Các CV hiện tại
        </h2>

        {cvs.length > 0 ? (
          <div className="space-y-4">
            {cvs.map(cv => (
              <div
                key={cv.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center">
                  <FileText className="text-orange-500 mr-3" />
                  <span>{cv.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Cập nhật gần nhất: {cv.lastUpdated}
                  </span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{cv.name}</DialogTitle>
                        </DialogHeader>
                        <div className="h-full overflow-auto">
                          <iframe
                            src={cv.pdfUrl}
                            className="w-full h-full border-0"
                            title={cv.name}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => downloadCV(cv)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Tải xuống
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col items-center text-center py-12">
                <img
                  src="/empty-state-concept.png"
                  alt="Không có CV"
                  className="w-40 h-40 mb-6"
                />
                <p className="text-gray-600">Bạn chưa tải lên CV nào</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-orange-600 mb-4 flex items-center">
          <span className="inline-block w-2 h-5 bg-orange-600 mr-2"></span>
          Tải lên hoặc tạo mới CV cực nhanh trên Jobfind.vn
        </h2>

        <div className="flex flex-wrap gap-4 mb-4">
          <Button
            variant={activeTab === 'upload' ? 'default' : 'outline'}
            className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-300"
            onClick={() => setActiveTab('upload')}
          >
            <Download className="h-4 w-4 mr-2" />
            Tải ngay CV
          </Button>
          <Button
            variant={activeTab === 'create' ? 'default' : 'outline'}
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
            onClick={() => setActiveTab('create')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Tạo mới CV
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeTab === 'upload' && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập tên CV mới...
                  </label>
                  <Input type="text" placeholder="Nhập tên CV mới..." />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-700 mb-2">
                      Kéo & thả file CV vào đây
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Hỗ trợ: PDF, DOCX, DOC (Max: 5MB)
                    </p>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleFileUpload('cv')}
                      disabled={uploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? 'Đang tải lên...' : 'Chọn file'}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    disabled={uploading}
                    className="bg-orange-500 hover:bg-orange-600 min-w-40"
                  >
                    {uploading ? 'Đang xử lý...' : 'Tải lên'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-medium mb-3">Ảnh chân dung rõ mặt</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      (PNG, JPG, dưới 1MB)
                    </p>

                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-white shadow-md">
                      {selectedPhoto ? (
                        <img
                          src={selectedPhoto || '/placeholder.svg'}
                          alt="Selected profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-blue-500" />
                      )}
                    </div>

                    <div className="w-full">
                      <div className="mb-4 text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chọn ảnh có sẵn:
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {photoOptions.map((photo, index) => (
                            <div
                              key={index}
                              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                                selectedPhoto === photo
                                  ? 'border-blue-500'
                                  : 'border-transparent'
                              }`}
                              onClick={() => handlePhotoSelect(photo)}
                            >
                              <img
                                src={photo || '/placeholder.svg'}
                                alt={`Option ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {selectedPhoto === photo && (
                                <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      Phù hợp với mọi CV
                    </p>
                    <Button variant="outline" className="mt-auto">
                      <Camera className="h-4 w-4 mr-2" />
                      Chụp ảnh
                    </Button>
                    <Button className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-medium mb-3">
                      Video giới thiệu bản thân 30 giây
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      (MP4, dưới 2MB)
                    </p>
                    <div className="w-full aspect-video bg-emerald-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                      <Video className="h-12 w-12 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Được ưu tiên hiển thị kết quả tìm hồ sơ để gây ấn tượng
                      cao với nhà tuyển dụng
                    </p>
                    <Button variant="outline" className="mt-auto">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Quay Video
                    </Button>
                    <Button
                      className="mt-2"
                      onClick={() => handleFileUpload('video')}
                      disabled={uploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-medium mb-3">
                      Audio giới thiệu bản thân
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      (Mp3, dưới 2MB)
                    </p>
                    <div className="w-full bg-purple-100 rounded-md flex flex-col items-center justify-center py-4 px-2 mb-4">
                      <div className="w-24 h-24 rounded-full bg-purple-200 mb-4 overflow-hidden">
                        {selectedPhoto ? (
                          <img
                            src={selectedPhoto || '/placeholder.svg'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Mic className="h-12 w-12 text-purple-500 w-full h-full p-6" />
                        )}
                      </div>
                      <div className="w-full bg-white rounded-full h-8 flex items-center justify-center">
                        <p className="text-gray-400 text-xs">Chưa có audio</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Thân thiện với nhà tuyển dụng, nhất là vị trí sales, MC,
                      phát thanh viên
                    </p>
                    <Button variant="outline" className="mt-auto">
                      <Mic className="h-4 w-4 mr-2" />
                      Ghi âm
                    </Button>
                    <Button
                      className="mt-2"
                      onClick={() => handleFileUpload('audio')}
                      disabled={uploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-lg font-medium mb-6">Thông tin cá nhân</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ tên của bạn
                      </label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Họ tên đầy đủ của bạn"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày tháng năm sinh
                      </label>
                      <div className="flex items-center border rounded-md border-input bg-background">
                        <Input
                          className="border-0"
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                        />
                        <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giới tính
                      </label>
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            className="mr-2"
                            checked={formData.gender === 'male'}
                            onChange={() =>
                              setFormData(prev => ({ ...prev, gender: 'male' }))
                            }
                          />
                          <label htmlFor="male">Nam</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            className="mr-2"
                            checked={formData.gender === 'female'}
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                gender: 'female',
                              }))
                            }
                          />
                          <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tình trạng
                      </label>
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="single"
                            name="maritalStatus"
                            className="mr-2"
                            checked={formData.maritalStatus === 'single'}
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                maritalStatus: 'single',
                              }))
                            }
                          />
                          <label htmlFor="single">Độc thân</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="married"
                            name="maritalStatus"
                            className="mr-2"
                            checked={formData.maritalStatus === 'married'}
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                maritalStatus: 'married',
                              }))
                            }
                          />
                          <label htmlFor="married">Kết hôn</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số CMND
                      </label>
                      <Input
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        placeholder="Nhập số chứng minh nhân dân"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số CCCD
                      </label>
                      <Input
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleInputChange}
                        placeholder="Nếu không có để trống"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email nhận kết quả{' '}
                      <span className="text-gray-500">
                        (những bài kiểm tra)
                      </span>
                    </label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới thiệu bản thân{' '}
                      <span className="text-gray-500">(tối đa 500 từ)</span>
                    </label>
                    <textarea
                      className="w-full h-24 p-2 border rounded-md border-input bg-background"
                      placeholder="Giới thiệu về bản thân để chúng tôi hiểu bạn hơn."
                      name="introduction"
                      value={formData.introduction}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-6">
                  * Chọn mẫu CV bên dưới để lưu CV
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {templateColors.map((template, index) => (
                    <div key={index} className="flex flex-col">
                      <h4 className="text-center mb-2">{template.name}</h4>
                      <div
                        className={`h-48 cursor-pointer border-2 rounded-md overflow-hidden ${
                          selectedTemplate === index
                            ? 'border-orange-500'
                            : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedTemplate(index)}
                      >
                        <div
                          className={`w-full h-full ${template.color}`}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Xem trước
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{template.name}</DialogTitle>
                            </DialogHeader>
                            <div className="h-full overflow-auto">
                              <iframe
                                src={template.pdfUrl}
                                className="w-full h-full border-0"
                                title={template.name}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(index);
                            toast.success(`Đã áp dụng ${template.name}`);
                          }}
                        >
                          Áp dụng
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success('Đã lưu thông tin');
                    }}
                  >
                    Lưu lại
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success('CV đã được hoàn thành và lưu lại');
                    }}
                  >
                    Hoàn thành
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
