'use client';

import { type FC as ReactFC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search as SearchIcon } from 'lucide-react';

const Search: ReactFC = () => {
  return (
    <div>
      <motion.div
        className="cursor-pointer pr-3"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        <SearchIcon size={24} />
      </motion.div>
      <AnimatePresence>
        <motion.div className="top absolute bg-foreground shadow-floating"></motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Search;
