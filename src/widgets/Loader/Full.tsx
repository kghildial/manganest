'use client';

import { useLottie } from 'lottie-react';
import { motion } from 'motion/react';
import { type FC as ReactFC } from 'react';

import loaderLottie from '@/assets/lotties/manganest_loader_lottie.json';

import { ILoaderFull } from './Loader.types';
import { cn } from '@/lib/utils';

const Full: ReactFC<ILoaderFull> = ({ className }) => {
  const { View: Loader } = useLottie({ animationData: loaderLottie, loop: true });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.2 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={cn(
        'fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-background',
        className,
      )}
    >
      {Loader}
    </motion.div>
  );
};

export default Full;
