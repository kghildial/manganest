'use client';

import React, { useCallback, useState, type FC as ReactFC } from 'react';

import MangaCard from '@/widgets/MangaCard';
import Pagination from '@/widgets/Pagination';

import { IPagiantedView } from './LatestUpdated.types';
import { IGetMangaResponse, IManga } from '@/types/manga.types';

import { timeAgo } from '@/lib/utils';

const PagiantedView: ReactFC<IPagiantedView> = ({ initialData, totalResults }) => {
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
        limit: 15,
        offset: page - 1,
      }),
      cache: 'force-cache',
    });
    const response: IGetMangaResponse = await pageResp.json();

    setData(response.data);
  }, []);

  return (
    <>
      <div className="my-8 flex flex-wrap justify-between gap-y-4">
        {data.map(entry => {
          let title = entry?.attributes?.title?.en ?? null;

          if (!title) {
            title =
              entry?.attributes?.altTitles?.find(entry => entry.hasOwnProperty('en'))?.en ??
              entry?.attributes?.altTitles?.find(entry => entry.hasOwnProperty('ja'))?.ja ??
              'N/A';
          }

          const chapter = entry?.attributes?.lastChapter;
          const timestamp = entry?.attributes?.updatedAt;

          const coverArt = entry?.relationships?.find(rel => rel.type === 'cover_art');

          return (
            <MangaCard.Compact
              key={entry.id}
              id={entry.id}
              coverArtFileName={coverArt?.attributes?.fileName}
              className="w-full md:w-[calc(50%-5px)] lg:w-[calc(33%-5px)]"
              title={title}
              chapter={chapter}
              timestamp={!timestamp ? null : timeAgo(new Date(timestamp), new Date())}
            />
          );
        })}
      </div>
      <Pagination
        totalPages={Math.ceil(totalResults / 15)}
        className="mb-8 transition-all"
        onChange={onPageChange}
      />
    </>
  );
};

export default PagiantedView;
