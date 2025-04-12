import React from 'react';

import PagiantedView from './PaginatedView';

import { getManga } from '@/lib/manga';
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
    <div className="flex flex-col md:mt-24">
      <h1 className="mb-5 lg:mb-0">Latest Updated</h1>
      <PagiantedView
        initialData={latestUpdatedMangas}
        totalResults={totalResults}
        paginationLimit={paginationLimit}
      />
    </div>
  );
};

export default LatestUpdated;
