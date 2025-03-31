import LayoutWrapper from '@/components/LayoutWrapper';
import TrendingManga from './TrendingManga';

import { getMangas } from '@/lib/manga';
import { IManga } from '@/types/manga';

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
      createdAtSince: weekAgoISO,
    });

    const result = await trending24Hrs;

    return result.data;
  };

  const trending2Hrs: IManga[] = await getTrendingNowMangas();

  return (
    <div className="mt-14 flex justify-center">
      <LayoutWrapper className="flex flex-col">
        <h1>Trending</h1>
        <div className="relative flex h-[70vh] items-center justify-center">
          <TrendingManga data={trending2Hrs} />
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default Home;
