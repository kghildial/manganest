'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, type FC as ReactFC } from 'react';

import { IRouteTransitionWrapper } from '@/types/utils.types';

const RouteTransitionWrapper: ReactFC<IRouteTransitionWrapper> = ({ children }) => {
  const pathname = usePathname();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showContent && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="opacity-0"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteTransitionWrapper;
