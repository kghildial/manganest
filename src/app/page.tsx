import React from 'react';

import LayoutWrapper from '@/components/LayoutWrapper';
import TrendingManga from './TrendingManga';

import { getManga } from '@/lib/manga.server';
import { IManga } from '@/types/manga.types';
import { LucideChevronsDown } from 'lucide-react';
import LatestUpdated from './LatestUpdated';

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
    <div className="mt-8 flex justify-center lg:mt-14">
      <LayoutWrapper className="flex flex-col">
        <div className="flex h-fit flex-col justify-between lg:h-[85vh]">
          <h1 className="mb-5 lg:mb-0">Top Trending</h1>
          <div className="relative flex h-fit items-center justify-center lg:h-[60vh]">
            <TrendingManga data={topTrending} />
          </div>
          <div className="hidden animate-bounce cursor-pointer flex-col items-center lg:flex">
            <h6>Explore</h6>
            <LucideChevronsDown size={24} />
          </div>
        </div>
        <LatestUpdated />
      </LayoutWrapper>
    </div>
  );
};

export default Home;
