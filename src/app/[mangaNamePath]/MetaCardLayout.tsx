import { FC as ReactFC } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { IMetaCardLayout } from './MangaDetails.types';

const MetaCardLayout: ReactFC<IMetaCardLayout> = ({ title, children, className }) => (
  <Card className={cn('max-w-max px-3 pb-2 pt-1 md:max-w-[30%] md:px-5 md:py-2', className)}>
    <CardTitle className="mb-1 font-title text-base md:text-xl/6">{title}</CardTitle>
    <CardContent className="flex flex-wrap gap-1 text-xs md:text-base">{children}</CardContent>
  </Card>
);

export default MetaCardLayout;
