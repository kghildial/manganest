import React, { forwardRef, useRef } from 'react';

import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ICarouselControls } from './Carousel.types';
import { cn } from '@/lib/utils';

const CarouselControls = forwardRef<HTMLDivElement, ICarouselControls>(
  (
    { className, onMouseEnter, onMouseLeave, showOnlyProgress, onClick = () => {} },
    progressNode,
  ) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
      <div
        className={cn('flex h-6 items-center gap-x-2', className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!showOnlyProgress && (
          <CarouselPrevious
            ref={prevRef}
            className="group static left-auto top-auto h-6 w-6 translate-y-0 rounded-xs border-accent_tint bg-accent_tint_20 hover:bg-accent_tint"
            iconClassName="text-accent group-hover:text-background"
            onClick={onClick}
          />
        )}
        <div className="opcaity-50 relative block h-1 flex-1 rounded-xs bg-accent_tint_20">
          <div ref={progressNode} className="left-0 top-0 h-1 w-0 rounded-xs bg-accent_tint"></div>
        </div>
        {!showOnlyProgress && (
          <CarouselNext
            ref={nextRef}
            className="group static left-auto top-auto h-6 w-6 translate-y-0 rounded-xs border-accent_tint bg-accent_tint_20 hover:bg-accent_tint"
            iconClassName="text-accent group-hover:text-background"
            onClick={onClick}
          />
        )}
      </div>
    );
  },
);

CarouselControls.displayName = 'CarouselControls';

export default CarouselControls;
