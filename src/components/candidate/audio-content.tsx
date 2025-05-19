"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Pause, Play, Save, Trash2, StopCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

const AudioContent = () => {
  const [hasAudio, setHasAudio] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(hasAudio ? "listen" : "record")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
      setPlaybackTime(0)
    })

    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current) {
        setPlaybackTime(audioRef.current.currentTime)
      }
    })

    const savedAudio = localStorage.getItem("candidateAudioIntro")
    if (savedAudio) {
      try {
        const audioData = JSON.parse(savedAudio)
        if (audioData.url) {
          setAudioUrl(audioData.url)
          setHasAudio(true)
        }
      } catch (e) {
        console.error("Error reading saved audio:", e)
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {})
        audioRef.current.removeEventListener("timeupdate", () => {})
      }
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        })
        const url = URL.createObjectURL(audioBlob)

        setAudioBlob(audioBlob)
        setAudioUrl(url)
        setHasAudio(true)

        try {
          localStorage.setItem("candidateAudioIntro", JSON.stringify({ url }))
        } catch (e) {
          console.error("Error saving audio to localStorage:", e)
        }

        setActiveTab("listen")

        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          if (prevTime >= 45) {
            stopRecording()
            return prevTime
          }
          return prevTime + 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Lỗi",
        description: "Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      toast({
        title: "Thành công",
        description: "Đã ghi âm xong!",
      })
    }
  }

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)

      timerRef.current = setInterval(() => {
        if (audioRef.current) {
          setPlaybackTime(audioRef.current.currentTime)
        }
      }, 100)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const deleteAudio = () => {
    setHasAudio(false)
    setAudioBlob(null)
    setAudioUrl(null)
    setPlaybackTime(0)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    localStorage.removeItem("candidateAudioIntro")
    toast({
      title: "Thành công",
      description: "Đã xóa audio thành công",
    })
    setActiveTab("record")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > 1048576) {
        toast({
          title: "Lỗi",
          description: "File vượt quá 1 MB. Vui lòng chọn file nhỏ hơn.",
        })
        return
      }

      if (!file.type.startsWith("audio/")) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file audio.",
        })
        return
      }

      const url = URL.createObjectURL(file)
      setAudioUrl(url)
      setHasAudio(true)

      const tempAudio = new Audio(url)
      tempAudio.onloadedmetadata = () => {
        if (tempAudio.duration > 45) {
          toast({
            title: "Lỗi",
            description: "File audio vượt quá 45 giây. Vui lòng chọn file ngắn hơn.",
          })
          setAudioUrl(null)
          setHasAudio(false)
          return
        }

        try {
          localStorage.setItem("candidateAudioIntro", JSON.stringify({ url }))
          toast({
            title: "Thành công",
            description: "File audio đã được tải lên thành công!",
          })

          setActiveTab("listen")
        } catch (e) {
          console.error("Error saving audio to localStorage:", e)
        }
      }
    }
  }

  const saveChanges = () => {
    toast({
      title: "Thành công",
      description: "Lưu thay đổi thành công!",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const uploadInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <Tabs defaultValue={hasAudio ? "listen" : "record"} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="record" className="flex-1">
                Ghi âm
              </TabsTrigger>
              <TabsTrigger value="listen" className="flex-1" disabled={!hasAudio}>
                Nghe lại
              </TabsTrigger>
            </TabsList>

            <TabsContent value="record">
              <div className="bg-purple-100 rounded-lg p-6 text-center mb-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-2">Ghi âm giới thiệu bản thân trong 45 giây</h2>
                <p className="text-purple-700 text-sm">(Không quá 1 MB)</p>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Audio giới thiệu giúp nhà tuyển dụng hiểu thêm về khả năng giao tiếp và độ tự tin của bạn. Hãy chuẩn bị
                trước nội dung và thực hiện trong môi trường yên tĩnh để có chất lượng âm thanh tốt nhất.
              </p>

              {isRecording && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-red-600 font-medium">Đang ghi âm...</span>
                    </div>
                    <span className="text-red-600 font-medium">{formatTime(recordingTime)} / 0:45</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(recordingTime / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-6">
                {!isRecording ? (
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 min-w-32" onClick={startRecording}>
                    <Mic className="h-4 w-4 mr-2" />
                    Bắt đầu ghi âm
                  </Button>
                ) : (
                  <Button className="bg-red-500 text-white hover:bg-red-600 min-w-32" onClick={stopRecording}>
                    <StopCircle className="h-4 w-4 mr-2" />
                    Dừng ghi âm
                  </Button>
                )}

                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  ref={uploadInputRef}
                  onChange={handleFileUpload}
                />
                <Button variant="outline" className="min-w-32" onClick={() => uploadInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Tải lên file sẵn có
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="listen">
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className="h-20 w-20 rounded-full bg-purple-200 flex items-center justify-center cursor-pointer hover:bg-purple-300 transition-colors"
                      onClick={isPlaying ? pauseAudio : playAudio}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-purple-700" />
                      ) : (
                        <Play className="h-8 w-8 text-purple-700" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all"
                        style={{
                          width: audioRef.current?.duration
                            ? `${(playbackTime / audioRef.current.duration) * 100}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatTime(playbackTime)}</span>
                      <span>{audioRef.current?.duration ? formatTime(audioRef.current.duration) : "0:45"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={deleteAudio}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa audio
                  </Button>
                  <Button onClick={saveChanges}>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AudioContent
