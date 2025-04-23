'use client';

import { useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import { IControls } from './MangaReader.types';
import { findInFeed, getValidChRef } from '@/lib/manga.server';

const Controls: ReactFC<IControls> = ({
  className,
  totalCh,
  mangaId,
  currentChapter,
  mangaTitle,
}) => {
  const router = useRouter();

  const [activeChapter, setActiveChapter] = useState(currentChapter);

  const changeChapter = async (chNum: number) => {
    const listings = await findInFeed({ mangaId, chNum, totalCh, pagination: 50 });

    if (listings.length === 0) {
      router.push('/404');
    }

    const {
      listing: { id },
    } = await getValidChRef(listings);

    router.push(`/${encodeURIComponent(mangaTitle)}/${id}?id=${mangaId}&ch=${chNum}`);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex justify-end gap-5 lg:justify-start">
        <Button variant="secondary" onClick={() => changeChapter(activeChapter - 1)}>
          Prev
        </Button>
        <Button onClick={() => changeChapter(activeChapter + 1)}>Next</Button>
      </div>

      <div className="mt-8 hidden flex-col gap-2 lg:flex">
        <p className="font-body font-medium">Move to Chapter:</p>
        <Select
          value={String(activeChapter)}
          onValueChange={chapter => {
            setActiveChapter(Number(chapter));
            changeChapter(Number(chapter));
          }}
        >
          <SelectTrigger className="h-[28px] w-32 gap-1 rounded-xs border-secondary_bg2 bg-secondary_bg2 py-0 pr-1 font-body [&_span]:text-xs">
            {activeChapter}
          </SelectTrigger>
          <SelectContent className="w-fit min-w-fit border-accent">
            {Array.from({ length: totalCh + 1 }).map((_, index) => (
              <SelectItem
                key={index}
                value={`${index}`}
                className={cn(
                  'px-3 py-3 font-body lg:py-1 [&_span]:text-xs',
                  activeChapter === index ? 'bg-accent_tint [&_span]:text-background' : '',
                )}
              >
                {index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Controls;
