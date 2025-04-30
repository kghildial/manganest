'use client';

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC as ReactFC,
} from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';

import Loader from '@/widgets/Loader';
import MangaCard from '@/widgets/MangaCard';
import Pagination from '@/widgets/Pagination';

import { cn, timeAgo } from '@/lib/utils';
import { getMangaDetails } from '@/lib/manga';

import { IGetMangaResponse } from '@/types/manga.types';
import { IPagiantedView } from './PaginatedView.types';

const PagiantedView: ReactFC<IPagiantedView> = ({
  className,
  initialData,
  totalResults,
  paginationLimit: serverPaginationLimit,
  mangaFetchOptions,
}) => {
  const router = useRouter();

  const totalPages = useMemo(() => {
    debugger;
    return Math.ceil(totalResults / serverPaginationLimit);
  }, [totalResults]);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);

  const onPageChange = useCallback(async (page: number) => {
    setIsLoading(true);
    const pageResp = await fetch('/api/manga', {
      method: 'POST',
      body: JSON.stringify({ ...mangaFetchOptions, offset: (page - 1) * serverPaginationLimit }),
      cache: 'force-cache',
    });
    const response: IGetMangaResponse = await pageResp.json();

    setData(response.data);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <div className={cn('mb-8 mt-0 flex flex-wrap justify-between gap-y-4 md:mt-8', className)}>
        <Suspense fallback={<Loader.Local />}>
          {!isLoading &&
            data.length > 0 &&
            data.map(entry => {
              const { mangaId, title, coverArt } = getMangaDetails(entry);

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
                    title !== null
                      ? router.push(`/${encodeURIComponent(title)}?id=${mangaId}`)
                      : router.push('/');
                  }}
                />
              );
            })}

          {data.length === 0 && <h1>Something went wrong!</h1>}
        </Suspense>
      </div>
      <AnimatePresence>
        {isLoading && <Loader.Local backdropClassName="bg-secondary_bg1 rounded-md h-[564px]" />}
      </AnimatePresence>
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
