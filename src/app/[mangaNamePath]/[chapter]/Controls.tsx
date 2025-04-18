'use client';

import { useEffect, useState, type FC as ReactFC } from 'react';

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

const Controls: ReactFC<IControls> = ({ currentChapter, totalChapters, className }) => {
  const [activeChapter, setActiveChapter] = useState(currentChapter);

  useEffect(() => {
    console.log(activeChapter);
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex justify-end gap-5 md:justify-start">
        <Button variant="secondary">Prev</Button>
        <Button>Next</Button>
      </div>

      <div className="mt-8 hidden flex-col gap-2 md:flex">
        <p className="font-body font-medium">Move to Chapter:</p>
        <Select
          value={String(activeChapter)}
          onValueChange={chapter => setActiveChapter(Number(chapter))}
        >
          <SelectTrigger className="h-[28px] w-32 gap-1 rounded-xs border-secondary_bg2 bg-secondary_bg2 py-0 pr-1 font-body [&_span]:text-xs">
            {activeChapter}
          </SelectTrigger>
          <SelectContent className="w-fit min-w-fit border-accent">
            {Array.from({ length: totalChapters + 1 }).map((_, index) => (
              <SelectItem
                key={index}
                value={`${index}`}
                className={cn(
                  'px-3 py-3 font-body md:py-1 [&_span]:text-xs',
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
