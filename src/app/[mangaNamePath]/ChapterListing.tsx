'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type FC as ReactFC } from 'react';

import { Clock } from 'lucide-react';

import { IChapterListing } from './MangaDetails.types';
import { timeAgo } from '@/lib/utils';
import { IGetMangaFeedResponse } from '@/types/manga.types';
import Loader from '@/widgets/Loader';

const ChapterListing: ReactFC<IChapterListing> = ({ mangaId, mangaTitle, initialList }) => {
  const router = useRouter();

  const [list, setList] = useState(initialList);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement | null>(null);

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    if (!loader.current || !hasMore) return;

    const observer = new IntersectionObserver(entry => {
      if (entry[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    observer.observe(loader.current);

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    // Skip first fetch since data is already available from server
    if (page !== 1) {
      const fetchMoreData = async () => {
        const nextFeed = await fetch('/api/feed', {
          method: 'POST',
          body: JSON.stringify({
            id: mangaId,
            limit: 20,
            offset: (page - 1) * 20,
            translatedLanguage: ['en'],
            order: {
              chapter: 'desc',
            },
          }),
          cache: 'force-cache',
        });

        const { data }: IGetMangaFeedResponse = await nextFeed.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setList(prev => [...prev, ...data]);
        }
      };

      fetchMoreData();
    }
  }, [page, mangaId]);

  return (
    <AnimatePresence>
      {list.map(({ id, attributes: { chapter, updatedAt } }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'tween' }}
          className="group mb-3 flex cursor-pointer items-center rounded-sm bg-secondary_bg1 px-5 py-3 hover:bg-accent_tint md:px-8 md:py-4"
          onClick={() => {
            router.push(`/${mangaTitle}/${id}?id=${mangaId}&ch=${chapter}`);
          }}
        >
          <p className="flex-1 font-body text-sm font-medium group-hover:text-background">
            Chapter {chapter}
          </p>
          <Clock size={18} className="mr-2 text-foreground_tint_60 group-hover:text-background" />
          <p className="mr-2 font-body text-sm font-medium text-foreground_tint_60 group-hover:text-background">
            {timeAgo(new Date(updatedAt), now)}
          </p>
        </motion.div>
      ))}
      {hasMore && <Loader.Local ref={loader} className="h-10 w-20" />}
    </AnimatePresence>
  );
};

export default ChapterListing;
