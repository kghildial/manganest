import React from 'react';

import Motion from '@/components/motion';

const Sandbox = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Motion.Card
        animate={{ rotate: 360 }}
        className="h-[300px] w-[300px] rounded-sm bg-pink-600"
      ></Motion.Card>
    </div>
  );
};

export default Sandbox;
