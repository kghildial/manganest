'use client';

import { useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import Modal from '@/components/Modal';

import { cn } from '@/lib/utils';
import { findInFeed, getMangaFeed, getValidChRef } from '@/lib/manga.server';

import { IControls, IDneModalState, IFindNearestChapter } from './MangaReader.types';

const Controls: ReactFC<IControls> = ({
  className,
  totalCh,
  mangaId,
  currentChapter,
  mangaTitle,
}) => {
  const router = useRouter();

  const [activeChapter, setActiveChapter] = useState(currentChapter);
  const [chapterDneModal, setChapterDneModal] = useState<IDneModalState>({
    trigger: false,
    unavailChNum: null,
    nextChapter: null,
  });

  const findNearestChapter = async ({
    targetChapter,
    offsetMultiplier = 0,
  }: IFindNearestChapter) => {
    const { data: chapters } = await getMangaFeed({
      id: mangaId,
      limit: 50,
      offset: 50 * offsetMultiplier,
      translatedLanguage: ['en'],
      order: { chapter: 'asc' },
    });

    const chaptersAhead = chapters.filter(
      chapter => Number(chapter.attributes.chapter) > targetChapter,
    );

    if (chaptersAhead.length === 0) {
      findNearestChapter({ targetChapter, offsetMultiplier: offsetMultiplier + 1 });
    }

    return chaptersAhead[0];
  };

  const changeChapter = async (chNum: number) => {
    const listings = await findInFeed({ mangaId, chNum, totalCh, pagination: 50 });

    if (listings.length === 0) {
      const nextChapter = await findNearestChapter({ targetChapter: chNum });

      setChapterDneModal({ trigger: true, nextChapter, unavailChNum: chNum });
    } else {
      const {
        listing: { id },
      } = await getValidChRef(listings);

      router.push(`/${encodeURIComponent(mangaTitle)}/${id}?id=${mangaId}&ch=${chNum}`);
    }
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
            // setActiveChapter(Number(chapter));
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

      <Modal
        trigger={chapterDneModal.trigger}
        title={{ text: 'Uh-oh!' }}
        onClose={() => setChapterDneModal(prev => ({ ...prev, trigger: false }))}
      >
        <p className="font-body font-medium">
          Chapter {chapterDneModal.unavailChNum} does not exist!
        </p>
        <p className="font-body font-medium">
          The next available chapter is Chapter is #
          {chapterDneModal.nextChapter?.attributes.chapter}
        </p>
        <Button
          className="mt-5"
          onClick={() => {
            router.push(
              `/${encodeURIComponent(mangaTitle)}/${chapterDneModal.nextChapter?.id}?id=${mangaId}&ch=${chapterDneModal.nextChapter?.attributes.chapter}`,
            );
          }}
        >
          Read Chapter {chapterDneModal.nextChapter?.attributes.chapter}
        </Button>
      </Modal>
    </div>
  );
};

export default Controls;
