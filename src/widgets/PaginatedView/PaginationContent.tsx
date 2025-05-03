import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState, type FC as ReactFC } from 'react';

import MangaCard from '../MangaCard';
import Loader from '@/widgets/Loader';

import { cn, timeAgo } from '@/lib/utils';
import { getMangaDetails } from '@/lib/manga';

import { IGetMangaResponse } from '@/types/manga.types';
import { IPaginationContent } from './PaginatedView.types';
import { AnimatePresence } from 'motion/react';

const PaginationContent: ReactFC<IPaginationContent> = ({
  loading,
  currentPage,
  initialData,
  className,
  mangaFetchOptions,
  paginationLimit,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(loading);
  const [data, setData] = useState(initialData);

  const onPageChange = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const pageResp = await fetch('/api/manga', {
        method: 'POST',
        body: JSON.stringify({ ...mangaFetchOptions, offset: (page - 1) * paginationLimit }),
        cache: 'force-cache',
      });
      const response: IGetMangaResponse = await pageResp.json();

      setData(response.data);
    },
    [mangaFetchOptions, paginationLimit],
  );

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100); // 100ms delay ensures loader fades in even with cached data

    return () => clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className={cn('mb-8 mt-0 h-[564px] md:mt-8 md:h-[912px] xl:h-[564px]', className)}>
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap justify-between gap-y-4"
          >
            {data.length > 0 &&
              data.map(manga => {
                const { mangaId, title, coverArt, authors, updatedAt } = getMangaDetails(manga);
                const timeStamp = timeAgo(new Date(updatedAt), new Date()) ?? null;

                return (
                  <MangaCard.Compact
                    key={mangaId}
                    id={mangaId}
                    coverArtFileName={coverArt?.attributes?.fileName}
                    className="w-full cursor-pointer md:w-[calc(50%-5px)] xl:w-[calc(33%-5px)]"
                    title={title ?? 'N/A'}
                    timestamp={timeStamp}
                    authors={authors}
                    onClick={() => {
                      title !== null
                        ? router.push(`/${encodeURIComponent(title)}?id=${mangaId}`)
                        : router.push('/');
                    }}
                  />
                );
              })}
          </motion.div>
        ) : (
          <Loader.Local backdropClassName="bg-secondary_bg1 rounded-md h-full" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(PaginationContent);
