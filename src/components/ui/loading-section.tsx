import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSectionProps {
  title?: boolean
  lines?: number
  className?: string
}

export function LoadingSection({ title = true, lines = 5, className }: LoadingSectionProps) {
  return (
    <div className={className}>
      {title && (
        <div className="mb-4">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  )
}
