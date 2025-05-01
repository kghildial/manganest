'use client';

import NxtImg from 'next/image';
import { type FC as ReactFC, useState } from 'react';

import FallbackImg from '@/assets/images/image_fallback.png';

import { IImage } from './Image.types';

const Image: ReactFC<IImage> = ({
  src,
  alt,
  height,
  width,
  onClick,
  className,
  unoptimized = false,
  fallbackSrc = null,
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NxtImg
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      unoptimized={unoptimized}
      className={className}
      onError={() => setImgSrc(fallbackSrc ?? FallbackImg)}
    />
  );
};

export default Image;
