'use client';

import { type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import MangaCard from '@/widgets/MangaCard';

import { getMangaDetails } from '@/lib/manga';
import { timeAgo } from '@/lib/utils';

import { IChapterListingFallback } from './MangaDetails.types';

const ChapterListingFallback: ReactFC<IChapterListingFallback> = ({
  mangaId,
  mangaSearchResults,
}) => {
  const router = useRouter();

  return (
    <div className="mb-8 flex w-full flex-col justify-center rounded-md">
      <h4 className="font-body font-medium">Uh-oh!</h4>
      <p className="font-body font-medium">No chapters available!</p>
      <p className="font-body font-medium">Maybe check out these similar manga:</p>
      <div className="mt-8 flex w-full flex-wrap justify-between gap-3">
        {mangaSearchResults.map(manga => {
          const {
            mangaId: listingId,
            coverArt,
            title,
            authors,
            updatedAt,
          } = getMangaDetails(manga);
          return (
            listingId !== mangaId && (
              <MangaCard.Compact
                key={listingId}
                className="w-full cursor-pointer bg-secondary_bg2 md:w-[48%] lg:w-[32%]"
                id={listingId}
                coverArtFileName={coverArt?.attributes?.fileName}
                timestamp={timeAgo(new Date(updatedAt as string), new Date())}
                title={title}
                authors={authors}
                onClick={() => {
                  title !== null
                    ? router.push(`/${encodeURIComponent(title)}?id=${listingId}`)
                    : router.push('/');
                }}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ChapterListingFallback;
