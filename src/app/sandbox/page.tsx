import React from 'react';

import { Button } from '@/components/ui/button';

import { getMangas } from '@/lib/manga';
import MangaCard from '@/widgets/MangaCard';
import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';

const Homepage = async () => {
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

  const trending2Hrs = await getTrendingNowMangas();

  return (
    <div className="flex flex-col items-center">
      <h1>Trending Now</h1>
      <Button>Read More</Button>
      <Button variant="secondary">Read More</Button>
      <Button variant="ghost">Read More</Button>
      <Button variant="disabled">Read More</Button>
      <MangaCard.Compact
        className="w-1/3"
        title="Solo Leveling"
        chapter={25}
        timestamp="30 minutes ago"
      />
      <Carousel />
      <Tag text="Action" />
    </div>
  );
};

export default Homepage;
