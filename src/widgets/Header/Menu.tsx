'use client';

import { useEffect, useState } from 'react';
import { Equal, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { scrollToElement } from '@/lib/utils';

const Menu = () => {
  const [trigger, setTrigger] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTrigger(false);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {trigger ? (
          <motion.div
            key="X"
            whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.8, transition: { type: 'spring', stiffness: 300 } }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'tween' }}
          >
            <X size={36} className="cursor-pointer pl-3" onClick={() => setTrigger(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="Equal"
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.9, transition: { type: 'spring', stiffness: 300 } }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'tween' }}
          >
            <Equal size={36} className="cursor-pointer pl-3" onClick={() => setTrigger(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {trigger && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { type: 'tween' } }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
            className="absolute left-0 top-[79px] ml-[2.5vw] flex w-[95vw] justify-between rounded-sm bg-accent_tint px-8 py-5 shadow-floating xl:ml-0 xl:w-full"
          >
            <motion.h4
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="cursor-pointer font-heading text-xl text-background"
              onClick={() => {
                setTrigger(false);
                const el = document.getElementById('trending');

                if (el) {
                  scrollToElement(el);
                } else {
                  router.push('/#trending');
                }
              }}
            >
              Trending
            </motion.h4>
            <motion.h4
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="cursor-pointer font-heading text-xl text-background"
              onClick={() => {
                setTrigger(false);

                const el = document.getElementById('latest');

                if (el) {
                  scrollToElement(el);
                } else {
                  router.push('/#latest');
                }
              }}
            >
              Latest
            </motion.h4>
            <motion.h4
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="cursor-pointer font-heading text-xl text-background"
              onClick={() => {
                setTrigger(false);
                router.push('/about');
              }}
            >
              About
            </motion.h4>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
