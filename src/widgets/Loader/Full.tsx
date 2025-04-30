import { type FC as ReactFC } from 'react';
import { useLottie } from 'lottie-react';

import loaderLottie from '@/assets/lotties/manganest_loader_lottie.json';

import { ILoaderFull } from './Loader.types';
import { cn } from '@/lib/utils';

const Full: ReactFC<ILoaderFull> = ({ className }) => {
  const { View: Loader } = useLottie({ animationData: loaderLottie, loop: true });
  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>{Loader}</div>
  );
};

export default Full;
