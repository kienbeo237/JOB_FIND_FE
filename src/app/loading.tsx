import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto px-4 text-center">
        <div
          className="inline-block animate-spin rounded-full border-4 border-current border-t-transparent h-12 w-12 text-emerald-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Đang tải trang...</h2>
          <p className="text-gray-500">Vui lòng đợi trong giây lát</p>
        </div>

        <div className="w-full space-y-4 mt-8">
          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24 rounded-md bg-emerald-50" />
            <Skeleton className="h-24 rounded-md bg-emerald-50" />
            <Skeleton className="h-24 rounded-md bg-emerald-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
