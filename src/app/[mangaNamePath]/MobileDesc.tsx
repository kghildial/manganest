'use client';

import { motion } from 'motion/react';
import { useMemo, useState, type FC as ReactFC } from 'react';

import FullDetailsModal from './FullDetailsModal';

import { IMobDesc } from './MangaDetails.types';

const MobDesc: ReactFC<IMobDesc> = ({ title, description, authors, artists }) => {
  const descWordLimit = useMemo(() => 20, []);
  const descToShow = useMemo(() => {
    const descWords = description.split(' ');
    if (descWords.length > descWordLimit) return descWords.slice(0, descWordLimit + 1).join(' ');
  }, [description, descWordLimit]);

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FullDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        description={description}
        authors={authors}
        artists={artists}
      />
      <p className="mb-5 font-body font-medium md:hidden">
        {descToShow}...
        <motion.span
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block cursor-pointer text-foreground_tint_60 hover:text-accent"
          onClick={() => setShowModal(true)}
        >
          &nbsp; Read More
        </motion.span>
      </p>
    </>
  );
};

export default MobDesc;
