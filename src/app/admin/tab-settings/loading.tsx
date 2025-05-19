import { Skeleton } from "@/components/ui/skeleton"

export default function TabSettingsLoading() {
  return (
    <div className="container mx-auto py-6">
      <Skeleton className="h-8 w-64 mb-6" />

      <div className="space-y-8">
        <Skeleton className="h-12 w-full mb-8" />

        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
