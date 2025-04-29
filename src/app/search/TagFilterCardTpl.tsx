import { type FC as ReactFC } from 'react';

import Tag from '@/components/Tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { ITagFilterCardTemplate } from './Search.types';

const TagFilterCardTemplate: ReactFC<ITagFilterCardTemplate> = ({
  title,
  tags,
  className = '',
}) => {
  return (
    <Card className={cn('bg-background p-5', className)}>
      <CardHeader className="mb-5">
        <CardTitle className="font-title text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Tag.Motion key={tag.id} text={tag.attributes?.name?.en} onClick={() => {}} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TagFilterCardTemplate;
