import type { ImageProps } from 'next/image';

export interface IImage extends ImageProps {
  fallbackSrc?: string;
}
