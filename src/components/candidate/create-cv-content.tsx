'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Camera,
  Calendar,
  CheckCircle2,
  Upload,
  Sparkles,
  ImageIcon,
  Video,
  Mic,
  PlayCircle,
  Plus,
  X,
  RefreshCw,
  Square,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const formSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  birthDate: z.string().min(1, 'Vui lòng chọn ngày sinh'),
  gender: z.string(),
  maritalStatus: z.string(),
  idNumber: z.string().optional(),
  citizenIdNumber: z.string().optional(),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  introduction: z.string().optional(),

  province: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  streetAddress: z.string().optional(),

  education: z
    .array(
      z.object({
        degree: z.string().optional(),
        school: z.string().optional(),
        major: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),

  experience: z
    .array(
      z.object({
        company: z.string().optional(),
        position: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        currentlyWorking: z.boolean().optional(),
        reasonForLeaving: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),

  skills: z
    .array(
      z.object({
        name: z.string().optional(),
        level: z.string().optional(),
      })
    )
    .optional(),

  foundVia: z.array(z.string()).optional(),
  otherSource: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCVContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [audioDialogOpen, setAudioDialogOpen] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<number | null>(
    null
  );

  const photoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const photoStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      birthDate: '',
      gender: 'Nam',
      maritalStatus: 'Độc thân',
      idNumber: '',
      citizenIdNumber: '',
      email: '',
      phone: '',
      introduction: '',
      province: '',
      district: '',
      ward: '',
      streetAddress: '',
      education: [
        {
          degree: '',
          school: '',
          major: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      experience: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          reasonForLeaving: '',
          description: '',
        },
      ],
      skills: [{ name: '', level: 'Beginner' }],
      foundVia: [],
      otherSource: '',
    },
  });

  const handleAddEducation = () => {
    const currentEducation = form.getValues().education || [];
    form.setValue('education', [
      ...currentEducation,
      {
        degree: '',
        school: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleAddExperience = () => {
    const currentExperience = form.getValues().experience || [];
    form.setValue('experience', [
      ...currentExperience,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        reasonForLeaving: '',
        description: '',
      },
    ]);
  };

  const handleAddSkill = () => {
    const currentSkills = form.getValues().skills || [];
    form.setValue('skills', [
      ...currentSkills,
      { name: '', level: 'Beginner' },
    ]);
  };

  const handleSubmit = (values: FormValues) => {
    toast({
      title: 'CV đã được tạo',
      description: 'CV của bạn đã được tạo thành công.',
    });
  };

  const handleAIGenerate = () => {
    toast({
      title: 'Trợ lý AI',
      description: 'AI đang phân tích thông tin của bạn để nâng cao CV...',
    });
  };

  const startPhotoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      photoStreamRef.current = stream;

      if (photoRef.current) {
        photoRef.current.srcObject = stream;
      }

      setPhotoDialogOpen(true);

      toast({
        title: 'Camera đã được bật',
        description: 'Hãy tạo điểm chụp ảnh tốt nhất và nhấn chụp ảnh.',
      });
    } catch (err) {
      console.error('Không thể truy cập camera:', err);
      toast({
        title: 'Lỗi truy cập camera',
        description: 'Vui lòng cho phép truy cập camera và thử lại.',
        variant: 'destructive',
      });
    }
  };

  const capturePhoto = () => {
    if (photoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');

      if (context) {
        canvasRef.current.width = photoRef.current.videoWidth;
        canvasRef.current.height = photoRef.current.videoHeight;

        context.drawImage(
          photoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const photoData = canvasRef.current.toDataURL('image/png');
        setPhotoPreview(photoData);

        toast({
          title: 'Đã chụp ảnh thành công',
          description: 'Ảnh đã được chụp và lưu vào hồ sơ của bạn.',
        });
      }
    }
  };

  const closePhotoDialog = () => {
    if (photoStreamRef.current) {
      photoStreamRef.current.getTracks().forEach(track => track.stop());
      photoStreamRef.current = null;
    }
    setPhotoDialogOpen(false);
  };

  const startVideoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);
        setVideoPreview(videoUrl);

        setIsRecording(false);
        setRecordingTime(0);
        if (recordingInterval !== null) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }

        toast({
          title: 'Đã quay video thành công',
          description: 'Video đã được quay và lưu vào hồ sơ của bạn.',
        });
      };

      setVideoDialogOpen(true);

      toast({
        title: 'Camera đã được bật',
        description: 'Hãy nhấn nút quay để bắt đầu ghi video.',
      });
    } catch (err) {
      console.error('Không thể truy cập camera hoặc microphone:', err);
      toast({
        title: 'Lỗi truy cập thiết bị',
        description:
          'Vui lòng cho phép truy cập camera và microphone, sau đó thử lại.',
        variant: 'destructive',
      });
    }
  };

  const toggleVideoRecording = () => {
    if (!isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
        setIsRecording(true);

        const interval = window.setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        setRecordingInterval(interval);

        toast({
          title: 'Đang quay video',
          description:
            'Nói rõ và tự nhiên, giới thiệu bản thân trong khoảng 30 giây.',
        });
      }
    } else {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();

        if (recordingInterval !== null) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }
      }
    }
  };

  const closeVideoDialog = () => {
    if (
      isRecording &&
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (recordingInterval !== null) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }

    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      videoStreamRef.current = null;
    }

    setIsRecording(false);
    setVideoDialogOpen(false);
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(blob);
        setAudioPreview(audioUrl);

        setIsRecording(false);
        setRecordingTime(0);
        if (recordingInterval !== null) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }

        toast({
          title: 'Đã ghi âm thành công',
          description: 'Audio đã được ghi và lưu vào hồ sơ của bạn.',
        });
      };

      setAudioDialogOpen(true);

      toast({
        title: 'Microphone đã được bật',
        description: 'Hãy nhấn nút ghi âm để bắt đầu.',
      });
    } catch (err) {
      console.error('Không thể truy cập microphone:', err);
      toast({
        title: 'Lỗi truy cập microphone',
        description: 'Vui lòng cho phép truy cập microphone và thử lại.',
        variant: 'destructive',
      });
    }
  };

  const toggleAudioRecording = () => {
    if (!isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
        setIsRecording(true);

        const interval = window.setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        setRecordingInterval(interval);

        toast({
          title: 'Đang ghi âm',
          description:
            'Nói rõ và tự nhiên, giới thiệu bản thân trong khoảng 30 giây.',
        });
      }
    } else {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();

        if (recordingInterval !== null) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }
      }
    }
  };

  const closeAudioDialog = () => {
    if (
      isRecording &&
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (recordingInterval !== null) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }

    setIsRecording(false);
    setAudioDialogOpen(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Xây dựng CV chuyên nghiệp để nổi bật với nhà tuyển dụng. Công cụ AI
          của chúng tôi có thể giúp tối ưu hóa nội dung của bạn.
        </p>
        <div className="flex space-x-4">
          <Button onClick={handleAIGenerate} className="flex items-center">
            <Sparkles className="mr-2 h-4 w-4" />
            Trợ lý AI
          </Button>
          <Button variant="outline" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            Tải lên CV có sẵn
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Photo Card */}
        <Card className="bg-blue-50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h3 className="font-medium mb-3">Ảnh chân dung rõ mặt</h3>
            <p className="text-sm text-gray-600 mb-4">(PNG, JP, dưới 1MB)</p>
            <div className="w-32 h-32 bg-blue-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview || '/placeholder.svg'}
                  alt="Ảnh hồ sơ"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">Phù hợp với mọi CV</p>
            <Button
              variant="outline"
              className="mt-auto"
              onClick={startPhotoCapture}
            >
              <Camera className="h-4 w-4 mr-2" />
              Chụp ảnh
            </Button>
            <Button className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên
            </Button>
          </CardContent>
        </Card>

        {/* Video Card */}
        <Card className="bg-emerald-50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h3 className="font-medium mb-3">
              Video giới thiệu bản thân 30 giây
            </h3>
            <p className="text-sm text-gray-600 mb-4">(MP4, dưới 2MB)</p>
            <div className="w-32 h-32 bg-emerald-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
              {videoPreview ? (
                <video
                  src={videoPreview}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <Video className="h-12 w-12 text-emerald-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Được ưu tiên hiển thị kết quả tìm hồ sơ để gây ấn tượng cao với
              nhà tuyển dụng
            </p>
            <Button
              variant="outline"
              className="mt-auto"
              onClick={startVideoCapture}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Quay Video
            </Button>
            <Button className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên
            </Button>
          </CardContent>
        </Card>

        {/* Audio Card */}
        <Card className="bg-purple-50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h3 className="font-medium mb-3">Audio giới thiệu bản thân</h3>
            <p className="text-sm text-gray-600 mb-4">(Mp3, dưới 2MB)</p>
            <div className="w-32 h-32 bg-purple-100 rounded-md flex items-center justify-center mb-4">
              {audioPreview ? (
                <div className="w-full flex flex-col items-center">
                  <Mic className="h-12 w-12 text-purple-500 mb-2" />
                  <audio
                    src={audioPreview}
                    controls
                    className="w-full max-w-[120px]"
                  />
                </div>
              ) : (
                <Mic className="h-12 w-12 text-purple-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Thân thiện với nhà tuyển dụng, nhất là vị trí sales, MC, phát
              thanh viên
            </p>
            <Button
              variant="outline"
              className="mt-auto"
              onClick={startAudioCapture}
            >
              <Mic className="h-4 w-4 mr-2" />
              Ghi âm
            </Button>
            <Button className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên
            </Button>
          </CardContent>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Tabs
            defaultValue="personal"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="address">Địa chỉ</TabsTrigger>
              <TabsTrigger value="education">Học vấn</TabsTrigger>
              <TabsTrigger value="experience">Kinh nghiệm làm việc</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    Nhập thông tin cơ bản của bạn mà nhà tuyển dụng sẽ thấy đầu
                    tiên
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ tên của bạn</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Họ tên đầy đủ của bạn"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày tháng năm sinh</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md border-input bg-background">
                              <Input
                                className="border-0"
                                type="date"
                                {...field}
                              />
                              <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giới tính</FormLabel>
                          <div className="flex space-x-6">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="male"
                                value="Nam"
                                checked={field.value === 'Nam'}
                                onChange={() => field.onChange('Nam')}
                                className="mr-2"
                              />
                              <label htmlFor="male">Nam</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="female"
                                value="Nữ"
                                checked={field.value === 'Nữ'}
                                onChange={() => field.onChange('Nữ')}
                                className="mr-2"
                              />
                              <label htmlFor="female">Nữ</label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tình trạng</FormLabel>
                          <div className="flex space-x-6">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="single"
                                value="Độc thân"
                                checked={field.value === 'Độc thân'}
                                onChange={() => field.onChange('Độc thân')}
                                className="mr-2"
                              />
                              <label htmlFor="single">Độc thân</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="married"
                                value="Kết hôn"
                                checked={field.value === 'Kết hôn'}
                                onChange={() => field.onChange('Kết hôn')}
                                className="mr-2"
                              />
                              <label htmlFor="married">Kết hôn</label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số CMND</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nhập số chứng minh nhân dân"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="citizenIdNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số CCCD</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nếu không có để trống"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email nhận kết quả{' '}
                            <span className="text-gray-500">
                              (những bài kiểm tra)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Email của bạn" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại của bạn</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Số điện thoại liên hệ"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="introduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới thiệu bản thân</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Giới thiệu về bản thân để chúng tôi hiểu bạn hơn."
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">
                    Lưu nháp
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('address')}>
                    Tiếp: Địa chỉ
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Địa chỉ</CardTitle>
                  <CardDescription>
                    Thông tin về nơi bạn đang sinh sống
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Địa chỉ tạm trú hiện nay</FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Tỉnh, thành" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hanoi">Hà Nội</SelectItem>
                                <SelectItem value="hcm">
                                  TP. Hồ Chí Minh
                                </SelectItem>
                                <SelectItem value="danang">Đà Nẵng</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Quận, huyện" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="q1">Quận 1</SelectItem>
                                <SelectItem value="q2">Quận 2</SelectItem>
                                <SelectItem value="q3">Quận 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Phường, xã" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="p1">Phường 1</SelectItem>
                                <SelectItem value="p2">Phường 2</SelectItem>
                                <SelectItem value="p3">Phường 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Số nhà, Tên đường/Ấp/Thôn"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveTab('personal')}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab('education')}
                  >
                    Tiếp: Học vấn
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Học vấn</CardTitle>
                  <CardDescription>
                    Thêm thông tin về học vấn của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormLabel>Bằng cấp</FormLabel>

                    {form.getValues().education?.map((_, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-4 border rounded-md bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bằng cấp</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn bằng cấp" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="thpt">THPT</SelectItem>
                                    <SelectItem value="trungcap">
                                      Trung cấp
                                    </SelectItem>
                                    <SelectItem value="caodang">
                                      Cao đẳng
                                    </SelectItem>
                                    <SelectItem value="daihoc">
                                      Đại học
                                    </SelectItem>
                                    <SelectItem value="thacsi">
                                      Thạc sĩ
                                    </SelectItem>
                                    <SelectItem value="tiensi">
                                      Tiến sĩ
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`education.${index}.school`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên trường</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Tên trường đã học"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`education.${index}.major`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chuyên ngành</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Chuyên ngành đã học"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Từ</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`education.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Đến</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`education.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mô tả</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Mô tả chi tiết về quá trình học tập"
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center"
                      onClick={handleAddEducation}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thông tin học vấn
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveTab('address')}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab('experience')}
                  >
                    Tiếp: Kinh nghiệm làm việc
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Kinh nghiệm làm việc</CardTitle>
                  <CardDescription>
                    Thêm thông tin về kinh nghiệm làm việc của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormLabel>Nơi làm việc</FormLabel>

                    {form.getValues().experience?.map((_, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-4 border rounded-md bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`experience.${index}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên công ty</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Tên công ty đã làm việc"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`experience.${index}.position`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vị trí làm việc</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Vị trí công việc"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`experience.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Từ</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`experience.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Đến</FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    {...field}
                                    disabled={
                                      form.getValues().experience?.[index]
                                        .currentlyWorking
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`experience.${index}.currentlyWorking`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Tôi vẫn đang làm việc tại đây
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {!form.getValues().experience?.[index]
                          .currentlyWorking && (
                          <FormField
                            control={form.control}
                            name={`experience.${index}.reasonForLeaving`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lý do nghỉ việc</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Lý do nghỉ việc"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name={`experience.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mô tả công việc</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Mô tả chi tiết về trách nhiệm và thành tựu tại vị trí này"
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center"
                      onClick={handleAddExperience}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm kinh nghiệm làm việc
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveTab('education')}
                  >
                    Quay lại
                  </Button>
                  <Button type="submit">Hoàn thành CV</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>

      {/* Photo capture dialog */}
      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chụp ảnh hồ sơ</DialogTitle>
            <DialogDescription>
              Điều chỉnh camera để có ảnh chân dung rõ nét
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="relative bg-black rounded-md overflow-hidden">
              <video
                ref={photoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex space-x-2 justify-center">
              <Button onClick={capturePhoto}>
                <Camera className="h-4 w-4 mr-2" />
                Chụp ảnh
              </Button>
              {photoPreview && (
                <Button variant="outline" onClick={() => setPhotoPreview(null)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Chụp lại
                </Button>
              )}
            </div>
            {photoPreview && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Ảnh đã chụp:</h4>
                <div className="bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={photoPreview || '/placeholder.svg'}
                    alt="Ảnh vừa chụp"
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closePhotoDialog}>
              <X className="h-4 w-4 mr-2" />
              Huỷ
            </Button>
            <Button disabled={!photoPreview} onClick={closePhotoDialog}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sử dụng ảnh này
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video recording dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Video giới thiệu bản thân</DialogTitle>
            <DialogDescription>
              Quay một video ngắn giới thiệu về bạn
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="relative bg-black rounded-md overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={!isRecording}
                className="w-full h-64 object-cover"
              />
              {isRecording && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md flex items-center text-sm">
                  <span className="animate-pulse mr-1">⚫</span>
                  {formatTime(recordingTime)}
                </div>
              )}
            </div>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={toggleVideoRecording}
                variant={isRecording ? 'destructive' : 'default'}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Dừng quay
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Bắt đầu quay
                  </>
                )}
              </Button>
              {videoPreview && !isRecording && (
                <Button variant="outline" onClick={() => setVideoPreview(null)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              )}
            </div>
            {videoPreview && !isRecording && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Video đã quay:</h4>
                <div className="bg-gray-100 rounded-md overflow-hidden">
                  <video src={videoPreview} controls className="w-full" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeVideoDialog}>
              <X className="h-4 w-4 mr-2" />
              Huỷ
            </Button>
            <Button
              disabled={!videoPreview || isRecording}
              onClick={closeVideoDialog}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sử dụng video này
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Audio recording dialog */}
      <Dialog open={audioDialogOpen} onOpenChange={setAudioDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ghi âm giới thiệu bản thân</DialogTitle>
            <DialogDescription>
              Tạo một đoạn ghi âm giới thiệu về bạn
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-100 rounded-md overflow-hidden p-6 flex flex-col items-center justify-center min-h-[200px]">
              <Mic
                className={`h-24 w-24 ${
                  isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'
                }`}
              />
              {isRecording && (
                <div className="mt-4 text-center">
                  <div className="text-xl font-bold">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-sm text-gray-500">Đang ghi âm...</p>
                </div>
              )}
              {!isRecording && audioPreview && (
                <div className="w-full mt-4">
                  <audio
                    ref={audioRef}
                    src={audioPreview}
                    controls
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={toggleAudioRecording}
                variant={isRecording ? 'destructive' : 'default'}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Dừng ghi âm
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Bắt đầu ghi âm
                  </>
                )}
              </Button>
              {audioPreview && !isRecording && (
                <Button variant="outline" onClick={() => setAudioPreview(null)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Ghi lại
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeAudioDialog}>
              <X className="h-4 w-4 mr-2" />
              Huỷ
            </Button>
            <Button
              disabled={!audioPreview || isRecording}
              onClick={closeAudioDialog}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sử dụng audio này
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
