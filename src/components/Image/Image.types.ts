import type { ImageProps } from 'next/image';
import { HTMLAttributes } from 'react';

export interface IImage extends ImageProps {
  fallbackSrc?: string;
}
