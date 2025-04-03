import React from 'react';

import { Button } from '@/components/ui/button';

import { getManga } from '@/lib/manga';
import MangaCard from '@/widgets/MangaCard';
import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';

const Sandbox = () => {
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
      <Tag text="Action" />
    </div>
  );
};

export default Sandbox;
