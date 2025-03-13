import React from 'react';

import { getMangas } from '@/lib/manga';

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
    <div>
      <h1>Homepage</h1>
      <p>Paragraph</p>
      <span>Span</span>
    </div>
  );
};

export default Homepage;
