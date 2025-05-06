'use client';

import { forwardRef } from 'react';
import { useLottie } from 'lottie-react';
import { motion } from 'motion/react';

import loaderLottie from '@/assets/lotties/manganest_loader_lottie.json';

import { ILoaderLocal } from './Loader.types';
import { cn } from '@/lib/utils';

const Local = forwardRef<Omit<HTMLDivElement, 'ref'>, ILoaderLocal>(
  ({ className, backdropClassName }, ref) => {
    const { View: Loader } = useLottie({ animationData: loaderLottie, loop: true });
    return (
      <motion.div
        key="loader"
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, display: 'flex', visibility: 'visible' }}
        animate={{ opacity: 1, scale: 1, display: 'flex', visibility: 'visible' }}
        exit={{ opacity: 0, scale: 0.9, display: 'none', visibility: 'hidden' }}
        transition={{ duration: 0.3 }}
        className={cn('flex w-full justify-center', backdropClassName)}
      >
        <div
          className={cn(
            'flex h-full w-full items-center justify-center overflow-hidden',
            className,
          )}
        >
          {Loader}
        </div>
      </motion.div>
    );
  },
);

export default Local;
