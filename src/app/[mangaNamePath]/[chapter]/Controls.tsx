'use client';

import { useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import Modal from '@/components/Modal';

import { cn } from '@/lib/utils';
import { findInFeed, getMangaFeed, getValidChRef } from '@/lib/manga.server';

import { IControls, IDneModalState } from './MangaReader.types';
import { changeChapter } from './utils';
import ChapterDneModal from './ChapterDneModal';

const Controls: ReactFC<IControls> = ({
  className,
  totalCh,
  mangaId,
  currentChapter,
  mangaTitle,
}) => {
  const router = useRouter();

  const [chapterDneModal, setChapterDneModal] = useState<IDneModalState>({
    trigger: false,
    unavailChNum: null,
    nextChapter: null,
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex justify-end gap-5 lg:justify-start">
        <Button
          variant="secondary"
          onClick={() =>
            changeChapter({
              targetChapter: currentChapter - 1,
              mangaId,
              mangaTitle,
              setChapterDneModal,
              router,
            })
          }
        >
          Prev
        </Button>
        <Button
          onClick={() =>
            changeChapter({
              targetChapter: currentChapter + 1,
              mangaId,
              mangaTitle,
              setChapterDneModal,
              router,
            })
          }
        >
          Next
        </Button>
      </div>

      <div className="mt-8 hidden flex-col gap-2 lg:flex">
        <p className="font-body font-medium">Move to Chapter:</p>
        <Select
          value={String(currentChapter)}
          onValueChange={chapter => {
            changeChapter({
              targetChapter: Number(chapter),
              mangaId,
              mangaTitle,
              setChapterDneModal,
              router,
            });
          }}
        >
          <SelectTrigger className="h-[28px] w-32 gap-1 rounded-xs border-secondary_bg2 bg-secondary_bg2 py-0 pr-1 font-body [&_span]:text-xs">
            {currentChapter}
          </SelectTrigger>
          <SelectContent className="w-fit min-w-fit border-accent">
            {Array.from({ length: totalCh + 1 }).map((_, index) => (
              <SelectItem
                key={index}
                value={`${index}`}
                className={cn(
                  'px-3 py-3 font-body lg:py-1 [&_span]:text-xs',
                  currentChapter === index ? 'bg-accent_tint [&_span]:text-background' : '',
                )}
              >
                {index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ChapterDneModal
        mangaId={mangaId}
        mangaTitle={mangaTitle}
        state={chapterDneModal}
        setState={setChapterDneModal}
      />
    </div>
  );
};

export default Controls;
