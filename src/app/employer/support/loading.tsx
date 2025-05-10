import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  )
}
