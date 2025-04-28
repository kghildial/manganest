'use client';

import { useEffect, useState, type FC as ReactFC } from 'react';

import { IRouteTransitionWrapper } from '@/types/utils.types';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';

const RouteTransitionWrapper: ReactFC<IRouteTransitionWrapper> = ({ children }) => {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showContent && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteTransitionWrapper;
