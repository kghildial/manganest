import LayoutWrapper from '@/components/LayoutWrapper';

import TrendingMangaDetails from './TrendingManga/Details';

import { getMangas } from '@/lib/manga';
import { IManga } from '@/types/manga';

const Home = async () => {
  const getTrendingNowMangas = async () => {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const dayAgoISO = dayAgo.toISOString().split('.')[0];

    const trending24Hrs = getMangas({
      includes: ['cover_art', 'author', 'artist'],
      order: {
        followedCount: 'desc',
      },
      contentRating: ['safe', 'suggestive'],
      limit: 5,
      hasAvailableChapters: true,
      createdAtSince: dayAgoISO,
    });

    const result = await trending24Hrs;

    return result.data;
  };

  const trending2Hrs: IManga[] = await getTrendingNowMangas();

  return (
    <div className="flex justify-center">
      <LayoutWrapper className="flex">
        <div className="flex h-[80vh] w-[50%] items-center justify-center">
          Manga stacks come here
        </div>
        <div className="relative flex h-[80vh] w-[50%] items-center justify-center">
          <TrendingMangaDetails data={trending2Hrs} />
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default Home;
