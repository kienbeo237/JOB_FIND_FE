import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'white';
  className?: string;
}

export function LoadingDots({
  size = 'md',
  color = 'default',
  className,
}: LoadingDotsProps) {
  return (
    <div
      className={cn('flex items-center space-x-1', className)}
      role="status"
      aria-label="loading"
    >
      <div
        className={cn('animate-pulse rounded-full', {
          'h-1 w-1': size === 'sm',
          'h-2 w-2': size === 'md',
          'h-3 w-3': size === 'lg',
          'bg-muted-foreground': color === 'default',
          'bg-emerald-500': color === 'primary',
          'bg-white': color === 'white',
        })}
      />
      <div
        className={cn('animate-pulse rounded-full animation-delay-200', {
          'h-1 w-1': size === 'sm',
          'h-2 w-2': size === 'md',
          'h-3 w-3': size === 'lg',
          'bg-muted-foreground': color === 'default',
          'bg-emerald-500': color === 'primary',
          'bg-white': color === 'white',
        })}
      />
      <div
        className={cn('animate-pulse rounded-full animation-delay-500', {
          'h-1 w-1': size === 'sm',
          'h-2 w-2': size === 'md',
          'h-3 w-3': size === 'lg',
          'bg-muted-foreground': color === 'default',
          'bg-emerald-500': color === 'primary',
          'bg-white': color === 'white',
        })}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
