import type { HTMLAttributes, ReactNode, RefObject } from 'react';

import { IManga } from '@/types/manga';
import { AutoplayType } from 'embla-carousel-autoplay';

export interface ICarouselControls extends HTMLAttributes<HTMLDivElement> {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface ICarousel {
  template: (data: IManga, index: number) => ReactNode;
  data: IManga[];
  controlsClassName?: string;
}
