'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, Omit<HTMLMotionProps<'div'>, 'ref'>>(
  ({ className, layout, initial, animate, exit, ...props }, ref) => (
    <motion.div
      layout={layout}
      initial={initial}
      animate={animate}
      exit={exit}
      ref={ref}
      className={cn('rounded-sm bg-secondary_bg1 text-foreground', className)}
      {...props}
    />
  ),
);
Card.displayName = 'MotionCard';

const CardHeader = React.forwardRef<HTMLDivElement, Omit<HTMLMotionProps<'div'>, 'ref'>>(
  ({ className, layout, initial, animate, exit, ...props }, ref) => (
    <motion.div
      layout={layout}
      initial={initial}
      animate={animate}
      exit={exit}
      ref={ref}
      className={cn('flex flex-col', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'MotionCardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, Omit<HTMLMotionProps<'div'>, 'ref'>>(
  ({ className, layout, initial, animate, exit, ...props }, ref) => (
    <motion.div
      layout={layout}
      initial={initial}
      animate={animate}
      exit={exit}
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  ),
);
CardContent.displayName = 'MotionCardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
