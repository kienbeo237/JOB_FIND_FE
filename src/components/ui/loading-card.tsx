import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LoadingCardProps {
  hasImage?: boolean
  lines?: number
  imageHeight?: number
  className?: string
}

export function LoadingCard({ hasImage = true, lines = 3, imageHeight = 48, className }: LoadingCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
        {hasImage && <Skeleton className="h-12 w-12 rounded-md" />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}
