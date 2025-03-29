import React, { type FC as ReactFC } from 'react';

import { ITag } from './Tag.types';
import { cn } from '@/lib/utils';

const Tag: ReactFC<ITag> = ({ text, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xs bg-secondary_bg1 px-2 py-1 font-ui text-xs/3 font-medium',
        className,
      )}
    >
      {text}
    </div>
  );
};

export default Tag;
