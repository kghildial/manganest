import React from 'react';

import PagiantedView from '../../widgets/PaginatedView';

import { getManga } from '@/lib/manga.server';
import { getDeviceTypeFromUA } from '../api/utils';

const LatestUpdated = async () => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoISO = weekAgo.toISOString().split('.')[0];

  const { isMobile, isTablet } = await getDeviceTypeFromUA();
  const paginationLimit = isMobile ? 5 : isTablet ? 14 : 15;

  const { data: latestUpdatedMangas, total: totalResults } = await getManga({
    includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
    order: {
      updatedAt: 'desc',
    },
    contentRating: ['safe', 'suggestive'],
    hasAvailableChapters: true,
    updatedAtSince: weekAgoISO,
    limit: paginationLimit,
    offset: 0,
  });

  return (
    <div className="relative flex flex-col md:mt-24">
      <h1 className="mb-5 xl:mb-0">Latest Updated</h1>
      <PagiantedView
        initialData={latestUpdatedMangas}
        totalResults={totalResults}
        paginationLimit={paginationLimit}
        mangaFetchOptions={{
          includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
          order: {
            updatedAt: 'desc',
          },
          contentRating: ['safe', 'suggestive'],
          hasAvailableChapters: true,
          limit: paginationLimit,
        }}
      />
    </div>
  );
};

export default LatestUpdated;
