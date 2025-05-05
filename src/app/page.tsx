import React from 'react';

import Explore from './Explore';
import TrendingManga from './TrendingManga';
import LatestUpdated from './LatestUpdated';
import LayoutWrapper from '@/components/LayoutWrapper';

import { getManga } from '@/lib/manga.server';

const Home = async () => {
  const getTrendingNowMangas = async () => {
    const topTrendingMangas = getManga({
      includes: ['cover_art', 'author', 'artist'],
      order: {
        followedCount: 'desc',
      },
      contentRating: ['safe', 'suggestive'],
      limit: 10,
      hasAvailableChapters: true,
    });

    const result = await topTrendingMangas;

    return result.data;
  };

  const topTrending = await getTrendingNowMangas();

  return (
    <LayoutWrapper className="flex flex-col">
      <div className="flex h-fit flex-col justify-between xl:h-[80vh]">
        <h1 id="trending" className="mb-5 xl:mb-0">
          Top Trending
        </h1>
        <div className="relative flex h-fit items-center justify-center xl:h-[60vh]">
          <TrendingManga data={topTrending} />
        </div>
        <Explore />
      </div>
      <LatestUpdated />
    </LayoutWrapper>
  );
};

export default Home;
