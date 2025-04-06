import React from 'react';

import { getManga } from '@/lib/manga';

import MangaCard from '@/widgets/MangaCard';
import { IManga } from '@/types/manga';
import { timeAgo } from '@/lib/utils';

const LatestUpdated = async () => {
  const latestUpdatedMangas = (
    await getManga({
      includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
      order: {
        updatedAt: 'desc',
      },
      contentRating: ['safe', 'suggestive'],
      hasAvailableChapters: true,
      limit: 15,
      offset: 0,
    })
  ).data;

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="mb-5 lg:mb-0">Latest Updated</h1>
      <div className="my-8 flex flex-wrap justify-between gap-y-4">
        {latestUpdatedMangas.map((entry, index) => {
          let title = entry.attributes.title.en;
          if (!title) {
            title = entry.attributes.altTitles.find(entry => entry.hasOwnProperty('en'))!.en;
          }

          const chapter = entry.attributes.lastChapter;
          const timestamp = entry.attributes.updatedAt;

          const coverArt = entry.relationships.find(rel => rel.type === 'cover_art');

          return (
            <MangaCard.Compact
              key={entry.id}
              id={entry.id}
              coverArtFileName={coverArt?.attributes.fileName}
              className="w-full md:w-[calc(50%-5px)] lg:w-[calc(33%-5px)]"
              title={title}
              chapter={chapter}
              timestamp={timeAgo(new Date(timestamp), new Date())}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestUpdated;
