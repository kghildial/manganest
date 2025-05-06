import { FC as ReactFC } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { IMetaCardLayout } from './MetaCardLayout.types';

const MetaCardLayout: ReactFC<IMetaCardLayout> = ({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
}) => (
  <Card className={cn('w-full px-3 pb-2 pt-1 md:w-fit md:px-5 md:py-2', className)}>
    <CardTitle className={cn('mb-1 font-title text-base md:mb-3 md:text-xl/6', titleClassName)}>
      {title}
    </CardTitle>
    <CardContent className={cn('flex flex-wrap gap-2 text-xs md:text-base', contentClassName)}>
      {children}
    </CardContent>
  </Card>
);

export default MetaCardLayout;
