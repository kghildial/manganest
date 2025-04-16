'use client';

import React, { useCallback, useMemo, useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import MangaCard from '@/widgets/MangaCard';
import Pagination from '@/widgets/Pagination';

import { IPagiantedView } from './LatestUpdated.types';
import { IGetMangaResponse, IManga } from '@/types/manga.types';

import { timeAgo } from '@/lib/utils';
import { getMangaDetails } from '@/lib/manga';

const PagiantedView: ReactFC<IPagiantedView> = ({
  initialData,
  totalResults,
  paginationLimit: serverPaginationLimit,
}) => {
  const router = useRouter();

  const totalPages = useMemo(() => Math.ceil(totalResults / serverPaginationLimit), [totalResults]);

  const [data, setData] = useState(initialData);

  const onPageChange = useCallback(async (page: number) => {
    const pageResp = await fetch('/api/manga', {
      method: 'POST',
      body: JSON.stringify({
        includes: ['cover_art', 'artist', 'author', 'chapter', 'tag'],
        order: {
          updatedAt: 'desc',
        },
        contentRating: ['safe', 'suggestive'],
        hasAvailableChapters: true,
        limit: serverPaginationLimit,
        offset: (page - 1) * serverPaginationLimit,
      }),
      cache: 'force-cache',
    });
    const response: IGetMangaResponse = await pageResp.json();

    setData(response.data);
  }, []);

  return (
    <>
      <div className="mb-8 mt-0 flex flex-wrap justify-between gap-y-4 md:mt-8">
        {data.map(entry => {
          const { title, coverArt } = getMangaDetails(entry);

          const chapter = entry?.attributes?.lastChapter;
          const timestamp = entry?.attributes?.updatedAt;

          return (
            <MangaCard.Compact
              key={entry.id}
              id={entry.id}
              coverArtFileName={coverArt?.attributes?.fileName}
              className="w-full cursor-pointer md:w-[calc(50%-5px)] lg:w-[calc(33%-5px)]"
              title={title ?? 'N/A'}
              chapter={chapter}
              timestamp={!timestamp ? null : timeAgo(new Date(timestamp), new Date())}
              onClick={() => {
                router.push(`/${title?.split(' ').join('-').toLowerCase()}?id=${entry.id}`);
              }}
            />
          );
        })}
      </div>
      <Pagination.Full
        totalPages={totalPages}
        className="mb-8 hidden transition-all md:flex"
        onChange={onPageChange}
      />
      <Pagination.Compact
        totalPages={totalPages}
        className="absolute right-0 top-2 md:hidden"
        onChange={onPageChange}
      />
    </>
  );
};

export default PagiantedView;
