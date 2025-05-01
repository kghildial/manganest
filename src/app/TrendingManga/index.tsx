'use client';

import React, { type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';
import Image from '@/components/Image';

import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';
import { Button } from '@/components/ui/button';
import Motion from '@/components/motion';

import { ITrendingMangaDetails } from './TrendingManga.types';

import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';
import { getMangaDetails } from '@/lib/manga';

const TrendingManga: ReactFC<ITrendingMangaDetails> = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();

  return (
    <Carousel
      showOnlyProgress={isMobile}
      controlsClassName="absolute lg:bottom-0 lg:top-auto top-[-55px] right-0 lg:w-[200px] w-[calc(100%-160px)] md:w-[150px]"
      template={({ entry, index, activeSlide }) => {
        const { mangaId, coverArt, title, tags, description } = getMangaDetails(entry);

        const descriptionWords = !description ? [] : description.split(' ');

        const isNextSlide =
          index === activeSlide + 1 || (activeSlide === data.length - 1 && index === 0);

        let descWordLimit = 100;
        if (isMobile) descWordLimit = 30;
        else if (isTablet) descWordLimit = 50;

        return (
          <div className="flex flex-col justify-center md:flex-row">
            <div className="flex items-center md:w-[35%] lg:w-[30%]">
              <Image
                priority
                src={`https://uploads.mangadex.org/covers/${entry.id}/${coverArt?.attributes?.fileName}.512.jpg`}
                width="247"
                height="351"
                alt={title ?? 'N/A'}
                className={cn(
                  'h-[350px] cursor-pointer rounded-lg border-2 border-foreground transition-opacity ease-linear lg:h-[500px] lg:w-[350px]',
                  isMobile && isNextSlide
                    ? '-translate-x-24 opacity-50 lg:translate-x-0 lg:opacity-100'
                    : 'opacity-100',
                )}
                onClick={() => {
                  title !== null
                    ? router.push(`/${encodeURIComponent(title)}?id=${mangaId}`)
                    : router.push('/');
                }}
              />
            </div>
            <div className="mt-5 flex flex-col md:w-[65%] lg:ml-10 lg:mt-0 lg:w-[70%]">
              <h2 className="mb-5 font-title text-2xl/8">
                {index + 1}. {title}
              </h2>
              {tags && (
                <>
                  <div className="mb-5 flex flex-wrap gap-3 lg:hidden">
                    {(tags.length > 5 ? tags.slice(0, 6) : tags).map(tag => (
                      <Tag.Static key={tag.id} text={tag?.attributes?.name?.en ?? null} />
                    ))}
                    {isMobile && tags.length > 5 && <Tag.Static key="..." text="..." />}
                  </div>
                  <div className="mb-5 hidden flex-wrap gap-3 lg:flex">
                    {tags.map(tag => (
                      <Tag.Static key={tag.id} text={tag?.attributes?.name?.en ?? null} />
                    ))}
                  </div>
                </>
              )}
              <p className="mb-5 font-body text-base">
                {descriptionWords.length > descWordLimit
                  ? `${descriptionWords.slice(0, descWordLimit + 1).join(' ')}...`
                  : description}
              </p>
              <Motion.Button
                asChild
                className="w-fit"
                onClick={() => {
                  title !== null
                    ? router.push(`/${encodeURIComponent(title)}?id=${mangaId}`)
                    : router.push('/');
                }}
              >
                Read{entry?.attributes?.description?.hasOwnProperty('en') ? ' More' : ''}
              </Motion.Button>
            </div>
          </div>
        );
      }}
      data={data}
    />
  );
};

export default TrendingManga;
