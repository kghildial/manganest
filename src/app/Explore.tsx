'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LucideChevronsDown } from 'lucide-react';

import { scrollToElement } from '@/lib/utils';

const Explore = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="hidden animate-bounce cursor-pointer flex-col items-center xl:flex"
          onClick={() => {
            const el = document.querySelector('#latest');

            if (el) scrollToElement(el);

            setIsVisible(false);
          }}
        >
          <h6>Explore</h6>
          <LucideChevronsDown size={24} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Explore;
