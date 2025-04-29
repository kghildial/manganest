'use client';

import React, { type FC as ReactFC } from 'react';
import { motion } from 'motion/react';

import { ITag } from './Tag.types';
import { cn } from '@/lib/utils';

const Motion: ReactFC<ITag> = ({ text, className, onClick = () => {} }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-xs bg-secondary_bg1 px-2 py-1 font-ui text-xs/3 font-medium transition-colors hover:bg-accent_tint',
        className,
      )}
      onClick={onClick}
    >
      {text}
    </motion.div>
  );
};

export default Motion;
