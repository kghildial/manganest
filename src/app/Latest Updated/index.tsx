import React from 'react';

import PagiantedView from './PaginatedView';

import { getManga } from '@/lib/manga';

const LatestUpdated = async () => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoISO = weekAgo.toISOString().split('.')[0];

  const { data: latestUpdatedMangas, total: totalResults } = await getManga({
    includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
    order: {
      updatedAt: 'desc',
    },
    contentRating: ['safe', 'suggestive'],
    hasAvailableChapters: true,
    updatedAtSince: weekAgoISO,
    limit: 15,
    offset: 0,
  });

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="mb-5 lg:mb-0">Latest Updated</h1>
      <PagiantedView initialData={latestUpdatedMangas} totalResults={totalResults} />
    </div>
  );
};

export default LatestUpdated;
