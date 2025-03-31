import React, { forwardRef, type FC as ReactFC } from 'react';

import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ICarouselControls } from './Carousel.types';
import { cn } from '@/lib/utils';

const CarouselControls = forwardRef<HTMLDivElement, ICarouselControls>(
  ({ className, onMouseEnter, onMouseLeave }, progressNode) => {
    return (
      <div
        className={cn('flex items-center gap-x-2', className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <CarouselPrevious className="static left-auto top-auto translate-y-0 rounded-md border-accent_tint bg-accent_tint_20 hover:bg-accent [&_svg]:text-accent hover:[&_svg]:text-foreground" />
        <div className="opcaity-50 relative block h-1 w-[200px] rounded-xs bg-accent_tint_20">
          <div ref={progressNode} className="left-0 top-0 h-1 w-0 rounded-xs bg-accent_tint"></div>
        </div>
        <CarouselNext className="static left-auto top-auto translate-y-0 rounded-md border-accent_tint bg-accent_tint_20 hover:bg-accent hover:text-background [&_svg]:text-accent" />
      </div>
    );
  },
);

export default CarouselControls;
