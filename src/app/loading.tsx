'use client';

import { useLottie } from 'lottie-react';
import loaderLottie from '@/assets/lotties/manganest_loader_lottie.json';

const Loading = () => {
  const { View: Loader } = useLottie({ animationData: loaderLottie, loop: true });
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      {Loader}
    </div>
  );
};

export default Loading;
