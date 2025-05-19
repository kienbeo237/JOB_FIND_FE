import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>

      <Skeleton className="h-12 w-full mb-8" />

      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="grid gap-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />

          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
