import React, { type FC as ReactFC } from 'react';
import { ILayoutWrapper } from './LayoutWrapper.types';
import { cn } from '@/lib/utils';

const LayoutWrapper: ReactFC<ILayoutWrapper> = ({ children, className }) => (
  <div className="mt-8 flex justify-center xl:mt-14">
    <div className={cn('mt-16 w-[95vw] max-w-[1440px] xl:w-[90vw] 2xl:w-[80vw]', className)}>
      {children}
    </div>
  </div>
);

export default LayoutWrapper;
