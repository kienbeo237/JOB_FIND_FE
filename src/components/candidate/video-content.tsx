'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VideoContent = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [savedVideo, setSavedVideo] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(
    hasVideo ? 'view' : 'create'
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedVideoUrl = localStorage.getItem('candidateIntroVideo');
    if (savedVideoUrl) {
      setSavedVideo(savedVideoUrl);
      setHasVideo(true);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'view' && !hasVideo) {
      setActiveTab('create');
    }
  }, [activeTab, hasVideo]);

  const startRecording = async () => {
    try {
      setUploadError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;

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
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setPreviewVideo(videoUrl);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        streamRef.current = null;
      };

      mediaRecorder.start(1000);
      setRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 30) {
            stopRecording();
            return 30;
          }
          return newTime;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setUploadError(
        'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của bạn.'
      );
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);

        localStorage.setItem('candidateIntroVideo', videoUrl);
        setSavedVideo(videoUrl);
        setHasVideo(true);
        setActiveTab('view');

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        streamRef.current = null;
      };
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setRecording(false);
  };

  const cancelRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setRecording(false);
    setPreviewVideo(null);
    setRecordingTime(0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Kích thước file không được vượt quá 2MB');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setUploadError('Chỉ chấp nhận file video');
      return;
    }

    let progress = 0;
    setUploadProgress(0);
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const videoUrl = URL.createObjectURL(file);
        setPreviewVideo(videoUrl);

        setTimeout(() => {
          localStorage.setItem('candidateIntroVideo', videoUrl);
          setSavedVideo(videoUrl);
          setHasVideo(true);
          setActiveTab('view');
          setPreviewVideo(null);
          setUploadProgress(0);
        }, 500);
      }
    }, 100);
  };

  const saveVideo = () => {
    if (previewVideo) {
      localStorage.setItem('candidateIntroVideo', previewVideo);
      setSavedVideo(previewVideo);
      setHasVideo(true);
      setActiveTab('view');
      setPreviewVideo(null);
    }
  };

  const discardPreview = () => {
    if (previewVideo) {
      URL.revokeObjectURL(previewVideo);
      setPreviewVideo(null);
    }
  };

  const deleteVideo = () => {
    if (savedVideo) {
      localStorage.removeItem('candidateIntroVideo');
      setSavedVideo(null);
      setHasVideo(false);
      setActiveTab('create');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <Tabs
            defaultValue={hasVideo ? 'view' : 'create'}
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full mb-6">
              <TabsTrigger value="create" className="flex-1">
                Tạo video
              </TabsTrigger>
              <TabsTrigger value="view" className="flex-1" disabled={!hasVideo}>
                Xem video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <div className="bg-orange-100 rounded-lg p-6 text-center mb-6">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Quay clip 30 giây giới thiệu bản thân tại đây
                </h2>
                <p className="text-orange-700 text-sm">(Không quá 2 MB)</p>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Video giới thiệu bản thân ngắn gọn sẽ giúp nhà tuyển dụng hiểu
                rõ hơn về bạn và tăng cơ hội được chọn vào vòng phỏng vấn. Hãy
                chuẩn bị một không gian yên tĩnh và trang phục phù hợp trước khi
                quay video.
              </p>

              {recording ? (
                <div className="space-y-6">
                  <div className="relative bg-black aspect-video rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-white text-sm font-medium">
                          {recordingTime < 10
                            ? `0:0${recordingTime}`
                            : `0:${recordingTime}`}
                          /0:30
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 min-w-32"
                      onClick={cancelRecording}
                    >
                      Hủy
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 min-w-32"
                      onClick={stopRecording}
                      disabled={recordingTime < 5}
                    >
                      {recordingTime < 30 ? 'Dừng quay' : 'Lưu video'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 min-w-32"
                    onClick={startRecording}
                  >
                    Bắt đầu quay
                  </Button>
                  <label htmlFor="video-upload">
                    <Button variant="outline" className="min-w-32" asChild>
                      <div>
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên file sẵn có
                      </div>
                    </Button>
                  </label>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              )}

              {previewVideo && !recording && (
                <div className="mt-6 space-y-4">
                  <div className="bg-black aspect-video rounded-lg overflow-hidden">
                    <video
                      src={previewVideo}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={discardPreview}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa video
                    </Button>
                    <Button onClick={saveVideo}>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu video
                    </Button>
                  </div>
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Đang tải lên... {uploadProgress}%
                  </p>
                </div>
              )}

              {uploadError && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {uploadError}
                </div>
              )}
            </TabsContent>

            <TabsContent value="view">
              <div className="space-y-6">
                <div className="bg-black aspect-video rounded-lg overflow-hidden">
                  <video
                    src={savedVideo || undefined}
                    controls
                    className="w-full h-full"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={deleteVideo}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa video
                  </Button>
                  <Button onClick={() => setActiveTab('create')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Tải lên video mới
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoContent;
