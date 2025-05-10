import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <LoadingSpinner size="lg" />
      <span className="ml-2 text-gray-500">Đang tải dữ liệu dịch vụ...</span>
    </div>
  )
}
