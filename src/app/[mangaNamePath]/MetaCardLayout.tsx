import { FC as ReactFC } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { IMetaCardLayout } from './MangaDetails.types';

const MetaCardLayout: ReactFC<IMetaCardLayout> = ({ title, children }) => (
  <Card className="max-w-[30%] px-5 py-2">
    <CardTitle className="mb-2 font-title text-xl/6">{title}</CardTitle>
    <CardContent className="flex flex-wrap gap-1">{children}</CardContent>
  </Card>
);

export default MetaCardLayout;
