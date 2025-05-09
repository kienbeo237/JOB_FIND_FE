import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'white';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'default',
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        {
          'h-4 w-4 border-2': size === 'sm',
          'h-8 w-8 border-[3px]': size === 'md',
          'h-12 w-12 border-4': size === 'lg',
          'text-muted-foreground': color === 'default',
          'text-emerald-500': color === 'primary',
          'text-white': color === 'white',
        },
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
