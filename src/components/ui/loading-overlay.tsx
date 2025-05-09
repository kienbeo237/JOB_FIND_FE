'use client';

import type React from 'react';

import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isLoading?: boolean;
  text?: string;
  fullScreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function LoadingOverlay({
  isLoading = true,
  text = 'Đang tải...',
  fullScreen = false,
  className,
  children,
}: LoadingOverlayProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShow(true);
      }, 300);
    } else {
      setShow(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!isLoading && !show) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}

      <div
        className={cn(
          'flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300',
          show ? 'opacity-100' : 'opacity-0',
          fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10',
          className
        )}
      >
        <LoadingSpinner size="lg" color="primary" />
        {text && <p className="mt-4 text-emerald-700 font-medium">{text}</p>}
      </div>
    </div>
  );
}
