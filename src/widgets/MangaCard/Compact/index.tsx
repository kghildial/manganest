import React from 'react';
import Image from 'next/image';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { IMangaCard } from '../MangaCard.types';

const Compact = React.forwardRef<HTMLDivElement, IMangaCard>(
  ({ className, title, description, chapter, timestamp, id, coverArtFileName }, ref) => {
    let filteredTitle = title;

    const titleWords = title.split(' ');
    if (titleWords.length > 10) {
      filteredTitle = titleWords.slice(0, 11).join(' ') + '...';
    }

    return (
      <Card ref={ref} className={cn('flex p-2.5', className)}>
        <Image
          src={`https://uploads.mangadex.org/covers/${id}/${coverArtFileName}.256.jpg`}
          alt={title}
          width={60}
          height={80}
          className="h-[80px] rounded-xs border border-foreground"
        />
        <div className="ml-2.5 flex flex-1 flex-col justify-between">
          <CardHeader className="">
            <CardTitle className="font-3.25 font-title text-sm/5">{filteredTitle}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardFooter className="flex justify-between font-ui">
            <p className="font-3.25 text-xs/4 font-medium">Chapter {chapter}</p>
            <p className="font-3.25 text-[0.625rem]/4 font-medium">{timestamp}</p>
          </CardFooter>
        </div>
      </Card>
    );
  },
);

export default Compact;
