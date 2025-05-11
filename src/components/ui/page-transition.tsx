'use client';

import type React from 'react';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    return () => {};
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-12 w-12">
                <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-emerald-200"></div>
                <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-emerald-700 font-medium">Đang tải...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
}
