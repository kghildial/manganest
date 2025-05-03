'use client';

import NxtImg from 'next/image';
import { motion } from 'motion/react';
import { type FC as ReactFC, useMemo, useState } from 'react';

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
  const hasClick = useMemo(() => typeof onClick === 'function', [onClick]);

  return hasClick ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
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
    </motion.div>
  ) : (
    <NxtImg
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      unoptimized={unoptimized}
      className={className}
      onError={() => setImgSrc(fallbackSrc ?? FallbackImg)}
    />
  );
};

export default Image;
