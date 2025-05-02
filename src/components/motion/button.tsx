'use client';

import { type ReactNode, type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Button as ShadCNBtn, type ButtonProps } from '@/components/ui/button';
import { type HTMLMotionProps, motion } from 'motion/react';

interface IButton
  extends Omit<ButtonProps, keyof ComponentPropsWithoutRef<'button'>>,
    HTMLMotionProps<'button'> {
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      asChild,
      variant,
      className,
      onClick,
      whileHover,
      whileTap,
      animate,
      transition,
      ...props
    },
    ref,
  ) => {
    return (
      <ShadCNBtn asChild ref={ref} variant={variant} className={className} onClick={onClick}>
        <motion.button
          whileHover={whileHover ?? { scale: 1.05 }}
          whileTap={whileTap ?? { scale: 0.95 }}
          animate={animate ?? { scale: 1 }}
          transition={transition ?? { type: 'spring', stiffness: 300 }}
          {...props}
        >
          {children}
        </motion.button>
      </ShadCNBtn>
    );
  },
);

export default Button;
