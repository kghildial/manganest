'use client';

import Loader from '@/widgets/Loader';

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <Loader.Full />
    </div>
  );
};

export default Loading;
