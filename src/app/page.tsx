import React from 'react';

import LayoutWrapper from '@/components/LayoutWrapper';
import TrendingManga from './TrendingManga';

import { getMangas } from '@/lib/manga';
import { IManga } from '@/types/manga';
import { LucideChevronsDown } from 'lucide-react';

const Home = async () => {
  const getTrendingNowMangas = async () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAgoISO = weekAgo.toISOString().split('.')[0];

    const trending24Hrs = getMangas({
      includes: ['cover_art', 'author', 'artist'],
      order: {
        followedCount: 'desc',
      },
      contentRating: ['safe', 'suggestive'],
      limit: 5,
      hasAvailableChapters: true,
      // createdAtSince: weekAgoISO,
    });

    const result = await trending24Hrs;

    return result.data;
  };

  const trending2Hrs: IManga[] = await getTrendingNowMangas();

  return (
    <div className="mt-8 flex justify-center lg:mt-14">
      <LayoutWrapper className="flex flex-col justify-between lg:h-[85vh]">
        <h1 className="mb-5 lg:mb-0">Top Trending</h1>
        <div className="relative flex items-center justify-center lg:h-[60vh]">
          <TrendingManga data={trending2Hrs} />
        </div>
        <div className="hidden animate-bounce cursor-pointer flex-col items-center lg:flex">
          <h6>Explore</h6>
          <LucideChevronsDown size={24} />
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default Home;
