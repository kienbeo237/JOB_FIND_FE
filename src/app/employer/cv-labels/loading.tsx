import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <LoadingSpinner />
      <span className="ml-2 text-gray-500">Đang tải dữ liệu...</span>
    </div>
  )
}
