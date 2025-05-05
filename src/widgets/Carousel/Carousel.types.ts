import type { HTMLAttributes, ReactNode } from 'react';

import { IManga } from '@/types/manga.types';

export interface ICarouselControls extends HTMLAttributes<HTMLDivElement> {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  showOnlyProgress: boolean;
}

interface ITemplate {
  entry: IManga;
  index: number;
  activeSlide: number;
}

export interface ICarousel {
  template: (args: ITemplate) => ReactNode;
  data: IManga[];
  controlsClassName?: string;
  fade?: boolean;
  showControls?: boolean;
  pauseOnHover?: boolean;
  pauseOnControlsHover?: boolean;
  showOnlyProgress?: boolean;
}
