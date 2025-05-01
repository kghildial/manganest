import React, { memo, type FC as ReactFC } from 'react';

import { ITag } from './Tag.types';
import { cn } from '@/lib/utils';

const Static: ReactFC<ITag> = ({ text, className, onClick }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xs bg-secondary_bg1 px-2 py-1 font-ui text-xs/3 font-medium',
        className,
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default memo(Static);
