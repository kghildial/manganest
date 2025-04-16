import React, { type FC as ReactFC } from 'react';
import { ILayoutWrapper } from './LayoutWrapper.types';
import { cn } from '@/lib/utils';

const LayoutWrapper: ReactFC<ILayoutWrapper> = ({ children, className }) => (
  <div className={cn('w-[95vw] max-w-[1440px] lg:w-[80vw]', className)}>{children}</div>
);

export default LayoutWrapper;
