'use client';
import NxtLink from 'next/link';
import type { ReactNode, FC as ReactFC } from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';

interface ILink extends Omit<HTMLMotionProps<'div'>, 'children'> {
  href: string;
  children: ReactNode | string;
}

const Link: ReactFC<ILink> = ({
  href,
  initial,
  layout,
  animate,
  exit,
  whileHover,
  whileFocus,
  whileTap,
  children,
  className,
}) => {
  return (
    <motion.div
      initial={initial}
      layout={layout}
      animate={animate}
      exit={exit}
      whileHover={whileHover}
      whileFocus={whileFocus}
      whileTap={whileTap}
      className="flex items-center justify-center"
    >
      <NxtLink href={href} className={className}>
        {children}
      </NxtLink>
    </motion.div>
  );
};

export default Link;
