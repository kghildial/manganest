'use client';

import React, { useEffect, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';
import Image from '@/components/Image';

import Carousel from '@/widgets/Carousel';
import Tag from '@/components/Tag';
import Motion from '@/components/motion';

import { ITrendingMangaDetails } from './TrendingManga.types';

import { cn, scrollToElement } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';
import { getMangaDetails } from '@/lib/manga';

const TrendingManga: ReactFC<ITrendingMangaDetails> = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (window.location.hash !== '') {
        const el = document.querySelector(window.location.hash);

        if (el) {
          scrollToElement(el);
        }
      }
    }, 300);

    const clearHashTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      window.location.hash = '';
      window.scrollTo({ top: scrollY });
    }, 1000);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(clearHashTimeout);
    };
  }, []);

  return (
    <Carousel
      showOnlyProgress={isMobile}
      controlsClassName="absolute xl:bottom-0 xl:top-auto top-[-55px] right-0 xl:w-[200px] w-[calc(100%-165px)] md:w-[150px]"
      template={({ entry, index, activeSlide }) => {
        const { mangaId, coverArt, title, tags, description } = getMangaDetails(entry);

        const descriptionWords = !description ? [] : description.split(' ');

        const isNextSlide =
          index === activeSlide + 1 || (activeSlide === data.length - 1 && index === 0);

        let descWordLimit = 100;
        if (isMobile) descWordLimit = 30;
        else if (isTablet) descWordLimit = 50;

        return (
          <div className="flex flex-col justify-center overflow-visible md:flex-row xl:px-5 xl:py-9">
            <div className="flex items-center md:w-[35%] xl:w-[30%]">
              <Image
                priority
                src={`https://uploads.mangadex.org/covers/${entry.id}/${coverArt?.attributes?.fileName}.512.jpg`}
                width="247"
                height="351"
                alt={title ?? 'N/A'}
                className={cn(
                  'h-[350px] cursor-pointer rounded-lg border-2 border-foreground transition-opacity ease-linear xl:h-[500px] xl:w-[350px]',
                  isMobile && isNextSlide
                    ? '-translate-x-24 opacity-50 xl:translate-x-0 xl:opacity-100'
                    : 'opacity-100',
                )}
                onClick={() => {
                  if (title !== null) {
                    router.push(`/${encodeURIComponent(title)}?id=${mangaId}`);
                  } else {
                    router.push('/');
                  }
                }}
              />
            </div>
            <div className="mt-5 flex flex-col md:w-[65%] xl:ml-10 xl:mt-0 xl:w-[70%]">
              <h2 className="mb-5 font-title text-2xl/8">
                {index + 1}. {title}
              </h2>
              {tags && (
                <>
                  <div className="mb-5 flex flex-wrap gap-3 xl:hidden">
                    {(tags.length > 5 ? tags.slice(0, 6) : tags).map(tag => (
                      <Tag.Motion
                        key={tag.id}
                        text={tag?.attributes?.name?.en ?? null}
                        onClick={() => {
                          router.push(`/search?tag=${tag.id}`);
                        }}
                      />
                    ))}
                    {isMobile && tags.length > 5 && (
                      <Tag.Motion
                        key="..."
                        text="..."
                        onClick={() => {
                          router.push(`/${title}?id=${mangaId}`);
                        }}
                      />
                    )}
                  </div>
                  <div className="mb-5 hidden flex-wrap gap-3 xl:flex">
                    {tags.map(tag => (
                      <Tag.Motion
                        key={tag.id}
                        text={tag?.attributes?.name?.en ?? null}
                        onClick={() => {
                          router.push(`/search?tag=${tag.id}`);
                        }}
                      />
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
                  if (title !== null) {
                    router.push(`/${encodeURIComponent(title)}?id=${mangaId}`);
                  } else {
                    router.push('/');
                  }
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
