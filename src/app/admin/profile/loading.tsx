import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card Skeleton */}
        <div className="md:col-span-1 border rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Skeleton className="h-5 w-40 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-6 space-y-6">
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-72 mb-6" />
            </div>

            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-3">
                <Skeleton className="h-6 w-32" />
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-16 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
