import type { ReactNode, FC as ReactFC } from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';

interface IButton extends HTMLMotionProps<'button'> {
  children: ReactNode;
}

const Button: ReactFC<IButton> = ({
  children,
  whileHover,
  whileTap,
  animate,
  transition,
  ...props
}) => {
  return (
    <motion.button
      whileHover={whileHover ?? { scale: 1.05 }}
      whileTap={whileTap ?? { scale: 0.95 }}
      animate={animate ?? { scale: 1 }}
      transition={transition ?? { type: 'spring', stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
