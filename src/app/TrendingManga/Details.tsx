'use client';

import React, { type FC as ReactFC } from 'react';

import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { ITrendingMangaDetails } from './TrendingManga.types';

const TrendingMangaDetails: ReactFC<ITrendingMangaDetails> = ({ data }) => {
  return (
    <Carousel
      controlsClassName="absolute bottom-0 right-0"
      template={(entry, index) => {
        return (
          <div className="flex flex-col">
            <h2 className="mb-5 font-title text-2xl/8">
              {index + 1}. {entry.attributes.title.en}
            </h2>
            <div className="mb-5 flex gap-3">
              {entry.attributes.tags.map(tag => (
                <Tag key={tag.id} text={tag.attributes.name.en} />
              ))}
            </div>
            <p className="mb-5 font-body text-base">{entry.attributes.description.en}</p>
            <Button className="w-fit" onClick={() => {}}>
              Read{entry.attributes.description.hasOwnProperty('en') ? ' More' : ''}
            </Button>
          </div>
        );
      }}
      data={data}
    />
  );
};

export default TrendingMangaDetails;
