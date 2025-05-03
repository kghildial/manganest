'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const Logo = () => {
  return (
    <Link href="/" className="flex-1 text-center">
      <motion.h1
        className="text-4xl/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Manganest
      </motion.h1>
    </Link>
  );
};

export default Logo;
