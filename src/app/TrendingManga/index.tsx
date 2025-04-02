'use client';

import React, { type FC as ReactFC } from 'react';
import Image from 'next/image';

import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';
import { Button } from '@/components/ui/button';

import { ITrendingMangaDetails } from './TrendingManga.types';

import { cn } from '@/lib/utils';

const TrendingManga: ReactFC<ITrendingMangaDetails> = ({ data }) => {
  return (
    <Carousel
      controlsClassName="absolute lg:bottom-0 lg:top-auto top-[-55px] right-0 lg:w-[200px] w-[150px]"
      template={({ entry, index, activeSlide }) => {
        const coverArt = entry.relationships.find(rel => rel.type === 'cover_art');
        let title = entry.attributes.title.en;
        if (!title) {
          title = entry.attributes.altTitles.find(entry => entry.hasOwnProperty('en'))!.en;
        }
        const description = entry.attributes.description.en;
        const descriptionWords = description.split(' ');

        const isNextSlide =
          index === activeSlide + 1 || (activeSlide === data.length - 1 && index === 0);

        return (
          <div className="flex flex-col justify-center lg:flex-row">
            <div className="flex items-center lg:w-[30%]">
              <Image
                priority
                src={`https://uploads.mangadex.org/covers/${entry.id}/${coverArt?.attributes?.fileName}.512.jpg`}
                width="247"
                height="351"
                alt={title}
                className={cn(
                  'lh:h-[569px] transition-translate h-[350px] rounded-lg border-2 border-foreground ease-linear lg:w-[400px]',
                  isNextSlide ? '-translate-x-24 opacity-50' : '',
                )}
              />
            </div>
            <div className="mt-5 flex flex-col lg:ml-10 lg:mt-0 lg:w-[70%]">
              <h2 className="mb-5 font-title text-2xl/8">
                {index + 1}. {title}
              </h2>
              <div className="mb-5 flex flex-wrap gap-3">
                {entry.attributes.tags.map(tag => (
                  <Tag key={tag.id} text={tag.attributes.name.en} />
                ))}
              </div>
              <p className="mb-5 font-body text-base">
                {descriptionWords.length > 50
                  ? `${descriptionWords.slice(0, 51).join(' ')}...`
                  : description}
              </p>
              <Button className="w-fit" onClick={() => {}}>
                Read{entry.attributes.description.hasOwnProperty('en') ? ' More' : ''}
              </Button>
            </div>
          </div>
        );
      }}
      data={data}
    />
  );
};

export default TrendingManga;
