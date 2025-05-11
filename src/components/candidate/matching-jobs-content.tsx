import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building,
  Clock,
  Bookmark,
  ExternalLink,
  Star,
  MapPin,
  DollarSign,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MatchingJobsContent = () => {
  const suggestedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'FPT Software',
      logo: '/fpt-logo.png',
      location: 'Hà Nội',
      salary: '15 - 25 triệu',
      postedTime: '3 ngày trước',
      skills: ['ReactJS', 'TypeScript', 'Tailwind CSS'],
      matchPercent: 95,
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Viettel Digital',
      logo: '/stylized-vt.png',
      location: 'Hà Nội',
      salary: '20 - 30 triệu',
      postedTime: '1 ngày trước',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      matchPercent: 92,
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Tiki Corporation',
      logo: '/abstract-geometric-TK.png',
      location: 'Hồ Chí Minh',
      salary: '25 - 40 triệu',
      postedTime: '5 ngày trước',
      skills: ['Java', 'Spring Boot', 'Microservices'],
      matchPercent: 88,
    },
    {
      id: 4,
      title: 'Project Manager',
      company: 'Samsung Vietnam',
      logo: '/stylized-letter-ss.png',
      location: 'Bắc Ninh',
      salary: '30 - 50 triệu',
      postedTime: '2 ngày trước',
      skills: ['Agile', 'Scrum', 'JIRA'],
      matchPercent: 85,
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'VNG Corporation',
      logo: '/abstract-vng.png',
      location: 'Hồ Chí Minh',
      salary: '25 - 45 triệu',
      postedTime: '4 ngày trước',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      matchPercent: 82,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 flex items-center">
          <span className="inline-block w-2 h-5 bg-teal-600 mr-2"></span>
          Việc làm phù hợp với hồ sơ của bạn
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Dựa trên kinh nghiệm và kỹ năng trong CV của bạn, chúng tôi đề xuất
          những vị trí phù hợp nhất.
        </p>
      </div>

      <div className="space-y-4">
        {suggestedJobs.map(job => (
          <Card
            key={job.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-0">
              <div className="p-4 flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-md overflow-hidden">
                    <img
                      src={job.logo || '/placeholder.svg'}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-base md:text-lg font-medium">
                      {job.title}
                    </h3>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-200"
                      >
                        <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                        Độ phù hợp {job.matchPercent}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-y-2">
                    <div className="flex items-center text-gray-600 text-sm mr-4">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mr-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mr-4">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.postedTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-100"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-between items-center pt-3 mt-3 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        Lưu
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex"
                      >
                        <User className="h-4 w-4 mr-1" />
                        Xem nhà tuyển dụng
                      </Button>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MatchingJobsContent;
