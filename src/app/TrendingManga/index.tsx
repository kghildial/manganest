'use client';

import React, { type FC as ReactFC } from 'react';

import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { ITrendingMangaDetails } from './TrendingManga.types';
import Image from 'next/image';

const TrendingManga: ReactFC<ITrendingMangaDetails> = ({ data }) => {
  return (
    <Carousel
      // fade
      controlsClassName="absolute bottom-0 right-0"
      template={(entry, index) => {
        const coverArt = entry.relationships.find(rel => rel.type === 'cover_art');

        return (
          <div className="flex justify-center">
            <div className="flex w-[50%] items-center justify-center">
              <Image
                src={`https://uploads.mangadex.org/covers/${entry.id}/${coverArt?.attributes?.fileName}.512.jpg`}
                width="400"
                height="569"
                alt={entry.attributes.title.en}
                className="rounded-lg border-2 border-foreground"
              />
            </div>
            <div className="flex w-[50%] flex-col">
              <h2 className="mb-5 font-title text-2xl/8">
                {index + 1}. {entry.attributes.title.en}
              </h2>
              <div className="mb-5 flex flex-wrap gap-3">
                {entry.attributes.tags.map(tag => (
                  <Tag key={tag.id} text={tag.attributes.name.en} />
                ))}
              </div>
              <p className="mb-5 font-body text-base">{entry.attributes.description.en}</p>
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
