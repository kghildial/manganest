import { memo, type FC as ReactFC, useEffect, useMemo } from 'react';

import Tag from '@/components/Tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { EFiltersAction, ITagFilterCardTemplate } from './Search.types';

const TagFilterCardTemplate: ReactFC<ITagFilterCardTemplate> = ({
  tags,
  title,
  className,
  filters,
  dispathFilterAction,
}) => {
  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <Card className={cn('bg-background p-5', className)}>
      <CardHeader className="mb-5">
        <CardTitle className="font-title text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags.map(({ id, attributes }) => {
          const tagName = attributes?.name?.en;
          if (!id || !tagName) return null;

          return (
            <Tag.Motion
              key={id}
              text={attributes?.name?.en}
              className={filters.include[id] ? 'bg-accent_tint' : ''}
              onClick={() =>
                dispathFilterAction({
                  type: EFiltersAction.Include,
                  payload: { id, name: tagName },
                })
              }
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default memo(TagFilterCardTemplate);
