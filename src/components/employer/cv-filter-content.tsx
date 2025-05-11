'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Bookmark,
  Eye,
  Lock,
  Download,
  FileText,
  CreditCard,
  Video,
  AudioLines,
  Calendar,
  Briefcase,
  GraduationCap,
  MapPin,
  Tag,
  Star,
  Award,
  Languages,
  ThumbsUp,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CVFilterContent = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Nguyễn Thị Mai Anh',
      avatar: '/diverse-woman-avatar.png',
      experience: '2 năm',
      education: 'Đại học Ngoại thương',
      status: 'Đang tìm việc',
      location: 'Hà Nội',
      skills: ['Marketing', 'Content', 'Social Media', 'English'],
      phone: '098******123',
      email: 'ma***@gmail.com',
      contactUnlocked: false,
      hasVideo: false,
      hasAudio: false,
      cvDetails: {
        summary:
          'Chuyên viên Marketing với 2 năm kinh nghiệm trong lĩnh vực digital marketing, có khả năng phân tích thị trường và xây dựng chiến lược marketing hiệu quả.',
        workExperience: [
          {
            title: 'Marketing Executive',
            company: 'Công ty ABC',
            period: '03/2023 - Hiện tại',
            description:
              'Quản lý và thực hiện các chiến dịch marketing online. Phát triển nội dung cho website và mạng xã hội. Phân tích dữ liệu và đưa ra các đề xuất cải thiện hiệu suất chiến dịch. Tăng lượng truy cập website 45% trong 6 tháng.',
          },
          {
            title: 'Marketing Intern',
            company: 'Công ty XYZ',
            period: '06/2022 - 02/2023',
            description:
              'Hỗ trợ team marketing trong các hoạt động hàng ngày. Viết bài cho blog và mạng xã hội. Tham gia tổ chức sự kiện offline.',
          },
        ],
        education: [
          {
            degree: 'Cử nhân Marketing',
            school: 'Đại học Ngoại thương',
            year: '2017 - 2021',
            gpa: '3.6/4.0',
          },
        ],
        certificates: [
          'Google Digital Marketing Certificate (2022)',
          'Facebook Blueprint Certification (2023)',
        ],
        languages: [
          { name: 'Tiếng Việt', level: 'Bản ngữ' },
          { name: 'Tiếng Anh', level: 'IELTS 7.0' },
        ],
        projects: [
          {
            name: 'Chiến dịch quảng cáo sản phẩm X',
            description:
              'Lên kế hoạch và triển khai chiến dịch marketing tích hợp, bao gồm SEO, quảng cáo Google và Facebook, email marketing. Kết quả: Tăng 35% lượng khách hàng mới trong 3 tháng.',
          },
        ],
      },
    },
    {
      id: 2,
      name: 'Trần Công Minh',
      avatar: '/man-avatar.png',
      experience: '3 năm',
      education: 'Đại học Bách Khoa',
      status: 'Đang tìm việc',
      location: 'Hà Nội',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express'],
      phone: '097******789',
      email: 'mi***@gmail.com',
      contactUnlocked: false,
      hasVideo: true,
      videoUrl: 'https://example.com/candidate_video.mp4',
      hasAudio: false,
      cvDetails: {
        summary:
          'Lập trình viên Frontend với 3 năm kinh nghiệm, chuyên về React và các công nghệ JavaScript hiện đại. Đã phát triển nhiều dự án web responsive với trải nghiệm người dùng tốt.',
        workExperience: [
          {
            title: 'Frontend Developer',
            company: 'Tech Solutions',
            period: '01/2022 - Hiện tại',
            description:
              'Phát triển và duy trì các ứng dụng web với React, Redux. Tối ưu hóa hiệu suất ứng dụng, cải thiện tốc độ tải trang 40%. Làm việc trong môi trường Agile, phối hợp chặt chẽ với đội ngũ backend và thiết kế.',
          },
          {
            title: 'Junior Web Developer',
            company: 'Digital Agency',
            period: '05/2020 - 12/2021',
            description:
              'Xây dựng giao diện người dùng sử dụng HTML, CSS, JavaScript. Phát triển các tính năng tương tác cho website thương mại điện tử.',
          },
        ],
        education: [
          {
            degree: 'Kỹ sư Công nghệ thông tin',
            school: 'Đại học Bách Khoa Hà Nội',
            year: '2016 - 2020',
            gpa: '3.7/4.0',
          },
        ],
        certificates: [
          'Meta Front-End Developer Professional Certificate (2022)',
          'AWS Certified Developer – Associate (2023)',
        ],
        languages: [
          { name: 'Tiếng Việt', level: 'Bản ngữ' },
          { name: 'Tiếng Anh', level: 'Thành thạo' },
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description:
              'Xây dựng giao diện người dùng cho nền tảng thương mại điện tử sử dụng React, Redux, và Material UI. Tích hợp với payment gateway và phát triển giỏ hàng thông minh.',
          },
          {
            name: 'Dashboard Analytics',
            description:
              'Phát triển dashboard phân tích dữ liệu với các biểu đồ tương tác sử dụng D3.js và React. Tối ưu hóa hiệu suất và thời gian tải.',
          },
        ],
      },
    },
    {
      id: 3,
      name: 'Lê Thị Tuyết Châu',
      avatar: '/woman-designer-avatar.png',
      experience: '4 năm',
      education: 'Đại học FPT',
      status: 'Đang tìm việc',
      location: 'Hà Nội',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      phone: '096******456',
      email: 'ch***@gmail.com',
      contactUnlocked: false,
      hasVideo: false,
      hasAudio: true,
      audioUrl: 'https://example.com/candidate_audio.mp3',
      cvDetails: {
        summary:
          'UI/UX Designer với 4 năm kinh nghiệm thiết kế sản phẩm số, chuyên về thiết kế giao diện người dùng thân thiện và tối ưu trải nghiệm người dùng dựa trên nghiên cứu và phân tích.',
        workExperience: [
          {
            title: 'Senior UI/UX Designer',
            company: 'Creative Digital',
            period: '04/2021 - Hiện tại',
            description:
              'Thiết kế giao diện người dùng cho các ứng dụng di động và web. Thực hiện nghiên cứu người dùng và tạo user personas. Phát triển design system cho công ty. Làm việc trực tiếp với khách hàng để hiểu nhu cầu và chuyển thành thiết kế có thể triển khai.',
          },
          {
            title: 'UI Designer',
            company: 'Tech Innovations',
            period: '06/2019 - 03/2021',
            description:
              'Thiết kế giao diện cho website và ứng dụng di động. Tạo wireframes, mockups và prototypes. Cộng tác với developers để đảm bảo thiết kế được triển khai chính xác.',
          },
        ],
        education: [
          {
            degree: 'Cử nhân Thiết kế đồ họa',
            school: 'Đại học FPT',
            year: '2015 - 2019',
            gpa: '3.8/4.0',
          },
        ],
        certificates: [
          'Google UX Design Professional Certificate (2022)',
          'Interaction Design Foundation UX Certificate (2021)',
        ],
        languages: [
          { name: 'Tiếng Việt', level: 'Bản ngữ' },
          { name: 'Tiếng Anh', level: 'TOEIC 850' },
        ],
        projects: [
          {
            name: 'Redesign ứng dụng ngân hàng',
            description:
              'Thực hiện nghiên cứu người dùng, tạo user flows và redesign toàn bộ ứng dụng ngân hàng mobile. Kết quả: Tăng 30% người dùng hoàn thành giao dịch và giảm 25% số lượng tickets hỗ trợ.',
          },
          {
            name: 'Thiết kế nền tảng học trực tuyến',
            description:
              'Thiết kế UX/UI cho nền tảng học trực tuyến, bao gồm dashboard học viên, hệ thống quản lý khóa học và diễn đàn thảo luận.',
          },
        ],
      },
    },
  ]);

  const [showCVDialog, setShowCVDialog] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );
  const [showPaywallDialog, setShowPaywallDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const searchCount = 9816;

  const handleViewCV = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowCVDialog(true);
  };

  const handleUnlockContact = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowPaywallDialog(true);
  };

  const confirmUnlockContact = () => {
    if (selectedCandidateId) {
      setCandidates(
        candidates.map(candidate =>
          candidate.id === selectedCandidateId
            ? { ...candidate, contactUnlocked: true }
            : candidate
        )
      );
      setShowPaywallDialog(false);
    }
  };

  const handleViewVideo = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowVideoDialog(true);
  };

  const handleViewAudio = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowAudioDialog(true);
  };

  const filteredCandidates =
    activeTab === 'all'
      ? candidates
      : activeTab === 'video'
      ? candidates.filter(c => c.hasVideo)
      : activeTab === 'audio'
      ? candidates.filter(c => c.hasAudio)
      : candidates;

  const selectedCandidate = selectedCandidateId
    ? candidates.find(c => c.id === selectedCandidateId)
    : null;

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tìm ứng viên</h2>

          <div className="mb-4">
            <Input placeholder="Nhập từ khóa tìm kiếm..." className="w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ngành nghề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">CNTT</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Tài chính</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Cấp bậc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Mới tốt nghiệp</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-orange-500 hover:bg-orange-600">
              Tìm kiếm
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mức lương" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowrange">5-10 triệu</SelectItem>
                <SelectItem value="midrange">10-20 triệu</SelectItem>
                <SelectItem value="highrange">Trên 20 triệu</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Kinh nghiệm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Chưa có KN</SelectItem>
                <SelectItem value="1year">1 năm</SelectItem>
                <SelectItem value="2years">2 năm</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Học vấn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="university">Đại học</SelectItem>
                <SelectItem value="college">Cao đẳng</SelectItem>
                <SelectItem value="highschool">THPT</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Hình thức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Toàn thời gian</SelectItem>
                <SelectItem value="parttime">Bán thời gian</SelectItem>
                <SelectItem value="remote">Từ xa</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Lọc nâng cao
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-2">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Tất cả ứng viên
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Có video giới thiệu
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <AudioLines className="w-4 h-4" />
                Có audio giới thiệu
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-green-600 mb-6">
          Tuyển dụng {searchCount.toLocaleString('vi-VN')} ứng viên đi làm ngay
        </h2>

        <div className="space-y-5">
          {filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24 rounded-full border-2 border-gray-100 shadow-sm">
                    <AvatarImage
                      src={candidate.avatar || '/placeholder.svg'}
                      alt={candidate.name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg font-medium">
                      {candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2 flex justify-center gap-1">
                    {candidate.hasVideo && (
                      <Button
                        onClick={() => handleViewVideo(candidate.id)}
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    )}
                    {candidate.hasAudio && (
                      <Button
                        onClick={() => handleViewAudio(candidate.id)}
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <AudioLines className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8 rounded-full"
                          >
                            <Bookmark className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-800 min-w-16">
                              Kinh nghiệm:
                            </span>
                            <span className="text-gray-600">
                              {candidate.experience}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-800 min-w-16">
                              Học vấn:
                            </span>
                            <span className="text-gray-600">
                              {candidate.education}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-800 min-w-16">
                              Địa điểm:
                            </span>
                            <span className="text-blue-600 font-medium px-2 py-0.5 rounded-full text-xs bg-blue-50">
                              {candidate.location}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2 mt-1.5 sm:mt-0">
                          <p className="text-sm text-gray-700 flex items-start gap-2">
                            <Tag className="w-4 h-4 text-gray-500 mt-1" />
                            <span className="font-medium text-gray-800 min-w-16 mt-0.5">
                              Kỹ năng:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills
                                ?.slice(0, 3)
                                .map((skill, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              {candidate.skills.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  +{candidate.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </p>
                          <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-800 min-w-16">
                              Trạng thái:
                            </span>
                            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                              {candidate.status}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {candidate.cvDetails.summary}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm">
                          <FileText className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-500">
                            {candidate.contactUnlocked ? (
                              <span>
                                Email:{' '}
                                <span className="text-blue-600">
                                  {candidate.email.replace('***', 'uyenvien')}
                                </span>
                              </span>
                            ) : (
                              <span>
                                Email:{' '}
                                <span className="text-gray-400">
                                  {candidate.email}
                                </span>
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Lock className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-500">
                            {candidate.contactUnlocked ? (
                              <span>
                                SĐT:{' '}
                                <span className="text-blue-600">
                                  {candidate.phone.replace('******', '222333')}
                                </span>
                              </span>
                            ) : (
                              <span>
                                SĐT:{' '}
                                <span className="text-gray-400">
                                  {candidate.phone}
                                </span>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleViewCV(candidate.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 h-auto text-xs rounded-md flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Xem CV
                        </Button>

                        {candidate.contactUnlocked ? (
                          <Button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 h-auto text-xs rounded-md flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            Tải CV
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUnlockContact(candidate.id)}
                            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 h-auto text-xs rounded-md flex items-center gap-1"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Mở liên hệ
                          </Button>
                        )}

                        {candidate.hasVideo && (
                          <Button
                            onClick={() => handleViewVideo(candidate.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 h-auto text-xs rounded-md flex items-center gap-1"
                          >
                            <Video className="w-3.5 h-3.5" />
                            Xem video
                          </Button>
                        )}

                        {candidate.hasAudio && (
                          <Button
                            onClick={() => handleViewAudio(candidate.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 h-auto text-xs rounded-md flex items-center gap-1"
                          >
                            <AudioLines className="w-3.5 h-3.5" />
                            Nghe audio
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-green-500 text-white font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
              3
            </button>
            <span className="px-2">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
              394
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
              395
            </button>
            <button className="px-2 py-1 flex items-center justify-center rounded-md hover:bg-gray-100">
              &gt;
            </button>
          </nav>
        </div>
      </div>

      {/* CV Viewer Dialog */}
      <Dialog open={showCVDialog} onOpenChange={setShowCVDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CV của {selectedCandidate?.name}</DialogTitle>
            <DialogDescription>
              Thông tin liên hệ đã được ẩn đi. Mở khóa thông tin để xem thông
              tin đầy đủ.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="border-b pb-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-32 w-32 rounded-full border-2 border-gray-100">
                  <AvatarImage
                    src={selectedCandidate?.avatar || '/placeholder.svg'}
                    alt={selectedCandidate?.name}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xl font-medium">
                    {selectedCandidate?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedCandidate?.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedCandidate?.skills && selectedCandidate.skills[0]}{' '}
                    {selectedCandidate?.skills &&
                    selectedCandidate.skills.includes('UI/UX')
                      ? 'Designer'
                      : 'Developer'}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCandidate?.hasVideo && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        <Video className="h-3 w-3" />
                        Có video giới thiệu
                      </span>
                    )}
                    {selectedCandidate?.hasAudio && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        <AudioLines className="h-3 w-3" />
                        Có audio giới thiệu
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center text-sm text-gray-600">
                      {selectedCandidate?.contactUnlocked ? (
                        <span>
                          Email:{' '}
                          <span className="text-blue-600">
                            {selectedCandidate?.email.replace(
                              '***',
                              'uyenvien'
                            )}
                          </span>
                        </span>
                      ) : (
                        <div className="flex items-center">
                          <span>
                            Email:{' '}
                            <span className="text-gray-400">
                              {selectedCandidate?.email}
                            </span>
                          </span>
                          <Lock className="h-4 w-4 ml-2 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      {selectedCandidate?.contactUnlocked ? (
                        <span>
                          SĐT:{' '}
                          <span className="text-blue-600">
                            {selectedCandidate?.phone.replace(
                              '******',
                              '222333'
                            )}
                          </span>
                        </span>
                      ) : (
                        <div className="flex items-center">
                          <span>
                            SĐT:{' '}
                            <span className="text-gray-400">
                              {selectedCandidate?.phone}
                            </span>
                          </span>
                          <Lock className="h-4 w-4 ml-2 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Tóm tắt</h3>
                <p className="mt-2 text-gray-600">
                  {selectedCandidate?.cvDetails.summary}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-500" />
                Kinh nghiệm làm việc
              </h3>
              <div className="space-y-5">
                {selectedCandidate?.cvDetails.workExperience.map(
                  (exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {exp.title}
                          </h4>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {exp.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gray-500" />
                Học vấn
              </h3>
              <div className="space-y-4">
                {selectedCandidate?.cvDetails.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                Kỹ năng
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate?.skills?.map(skill => (
                  <span
                    key={skill}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {selectedCandidate?.cvDetails.certificates &&
              selectedCandidate.cvDetails.certificates.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-gray-500" />
                    Chứng chỉ
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedCandidate.cvDetails.certificates.map(
                      (cert, index) => (
                        <li key={index} className="text-gray-600">
                          {cert}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {selectedCandidate?.cvDetails.languages &&
              selectedCandidate.cvDetails.languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Languages className="h-5 w-5 text-gray-500" />
                    Ngoại ngữ
                  </h3>
                  <div className="space-y-2">
                    {selectedCandidate.cvDetails.languages.map(
                      (lang, index) => (
                        <div key={index} className="flex items-center">
                          <span className="min-w-32 text-gray-700">
                            {lang.name}:
                          </span>
                          <span className="text-gray-600">{lang.level}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {selectedCandidate?.cvDetails.projects &&
              selectedCandidate.cvDetails.projects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-gray-500" />
                    Dự án nổi bật
                  </h3>
                  <div className="space-y-4">
                    {selectedCandidate.cvDetails.projects.map(
                      (project, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-200 pl-4"
                        >
                          <h4 className="font-medium text-gray-900">
                            {project.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {project.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div className="order-2 sm:order-1">
              {!selectedCandidate?.contactUnlocked && (
                <Button
                  onClick={() => {
                    setShowCVDialog(false);
                    handleUnlockContact(selectedCandidate?.id || 0);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Mở khóa thông tin liên hệ
                </Button>
              )}
            </div>
            <div className="flex gap-3 order-1 sm:order-2">
              <DialogClose asChild>
                <Button variant="outline">Đóng</Button>
              </DialogClose>
              {selectedCandidate?.contactUnlocked && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Tải CV
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Paywall Dialog */}
      <Dialog open={showPaywallDialog} onOpenChange={setShowPaywallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mở khóa thông tin liên hệ</DialogTitle>
            <DialogDescription>
              Bạn sẽ dùng 1 credit để mở khóa thông tin liên hệ của ứng viên này
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">Bạn hiện có</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-bold">15 credits</span>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto"
                  onClick={() => {
                    setShowPaywallDialog(false);
                  }}
                >
                  Mua thêm
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium">Thông tin sẽ được mở khóa:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-20">Email:</span>
                  <span className="text-gray-900 font-medium">
                    {selectedCandidate?.email.replace(
                      '***',
                      'uyenvien@gmail.com'
                    )}
                  </span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-20">Số điện thoại:</span>
                  <span className="text-gray-900 font-medium">
                    {selectedCandidate?.phone.replace('******', '222333')}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={confirmUnlockContact}
            >
              Xác nhận mở khóa (-1 credit)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Video giới thiệu của {selectedCandidate?.name}
            </DialogTitle>
            <DialogDescription>
              Xem video giới thiệu của ứng viên
            </DialogDescription>
          </DialogHeader>

          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {/* Video player simulation */}
            <div className="h-full w-full flex flex-col items-center justify-center text-white p-6">
              <Video className="h-16 w-16 mb-4 opacity-70" />
              <p className="text-center mb-4">
                Video giới thiệu của {selectedCandidate?.name}
              </p>
              <p className="text-sm text-center text-gray-400">
                Video này đang được mô phỏng cho mục đích trình diễn
              </p>
              <div className="mt-6 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                <div className="bg-white h-full w-1/3"></div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <button className="p-2 rounded-full hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-skip-back"
                  >
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" x2="5" y1="19" y2="5"></line>
                  </svg>
                </button>
                <button className="p-3 rounded-full bg-white text-black hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-skip-forward"
                  >
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" x2="19" y1="5" y2="19"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Đóng
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleViewCV(selectedCandidate?.id || 0)}
            >
              Xem CV đầy đủ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Audio Dialog */}
      <Dialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Audio giới thiệu của {selectedCandidate?.name}
            </DialogTitle>
            <DialogDescription>
              Nghe audio giới thiệu của ứng viên
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-14 w-14 rounded-full">
                <AvatarImage
                  src={selectedCandidate?.avatar || '/placeholder.svg'}
                  alt={selectedCandidate?.name}
                />
                <AvatarFallback>
                  {selectedCandidate?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedCandidate?.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedCandidate?.skills && selectedCandidate.skills[0]}{' '}
                  {selectedCandidate?.skills &&
                  selectedCandidate.skills.includes('UI/UX')
                    ? 'Designer'
                    : 'Developer'}
                </p>
              </div>
            </div>

            {/* Audio player simulation */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-purple-600 h-full w-1/2"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">1:30</span>
                <div className="flex items-center gap-4">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-rewind"
                    >
                      <polygon points="11 19 2 12 11 5 11 19"></polygon>
                      <polygon points="22 19 13 12 22 5 22 19"></polygon>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-pause"
                    >
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-fast-forward"
                    >
                      <polygon points="13 19 22 12 13 5 13 19"></polygon>
                      <polygon points="2 19 11 12 2 5 2 19"></polygon>
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-500">3:05</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Nội dung giới thiệu
              </h4>
              <p className="text-sm text-gray-600">
                "Xin chào, tôi là {selectedCandidate?.name}. Tôi có{' '}
                {selectedCandidate?.experience} kinh nghiệm làm việc trong lĩnh
                vực {selectedCandidate?.skills && selectedCandidate.skills[0]}.
                Tôi đã tốt nghiệp {selectedCandidate?.education} và đang tìm
                kiếm cơ hội mới để phát triển sự nghiệp..."
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Đóng
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleViewCV(selectedCandidate?.id || 0)}
            >
              Xem CV đầy đủ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CVFilterContent;
