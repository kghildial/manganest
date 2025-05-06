'use client';

import { motion } from 'motion/react';
import { useMemo, useState, type FC as ReactFC } from 'react';

import Tag from '@/components/Tag';
import MetaCardLayout from '@/widgets/MetaCardLayout';

import { ICreatorData } from './MangaDetails.types';
import FullDetailsModal from './FullDetailsModal';

const CreatorData: ReactFC<ICreatorData> = ({ title, description, authors, artists }) => {
  const [showModal, setShowModal] = useState(false);

  const creatorLimit = useMemo(() => 3, []);
  const descWordLimit = useMemo(() => 100, []);
  const descToShow = useMemo(() => {
    const descWords = description.split(' ');
    if (descWords.length > descWordLimit) return descWords.slice(0, descWordLimit + 1).join(' ');
  }, [description, descWordLimit]);

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
      {authors && (
        <MetaCardLayout title="Authors">
          {(authors.length > creatorLimit ? authors.slice(0, creatorLimit) : authors).map(
            author =>
              author?.attributes?.name && (
                <Tag.Static
                  key={author.id}
                  text={author.attributes.name}
                  className="bg-secondary_bg2"
                />
              ),
          )}
          {authors.length > creatorLimit && (
            <Tag.Motion
              key="authors_more"
              text="..."
              className="bg-secondary_bg2"
              onClick={() => {
                setShowModal(true);
              }}
            />
          )}
        </MetaCardLayout>
      )}
      {artists && (
        <MetaCardLayout title="Artists">
          {(artists.length > creatorLimit ? artists.slice(0, creatorLimit) : artists).map(
            artist =>
              artist?.attributes?.name && (
                <Tag.Static
                  key={artist.id}
                  text={artist.attributes.name}
                  className="bg-secondary_bg2"
                />
              ),
          )}
          {artists.length > creatorLimit && (
            <Tag.Motion
              key="artists_more"
              text="..."
              className="bg-secondary_bg2"
              onClick={() => setShowModal(true)}
            />
          )}
        </MetaCardLayout>
      )}
      {descToShow && descToShow !== '' && (
        <p className="mb-5 hidden font-body font-medium md:block">
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
      )}
    </>
  );
};

export default CreatorData;
