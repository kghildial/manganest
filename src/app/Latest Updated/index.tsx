import { getManga } from '@/lib/manga';
import React from 'react';

const LatestUpdated = async () => {
  const latestUpdatedMangas = await getManga({
    includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
    order: {
      updatedAt: 'desc',
    },
    contentRating: ['safe', 'suggestive'],
    hasAvailableChapters: true,
    limit: 15,
    offset: 0,
  });
};

export default LatestUpdated;
