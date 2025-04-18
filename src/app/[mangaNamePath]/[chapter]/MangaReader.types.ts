import { IMangaFeed } from '@/types/manga.types';
import type { HTMLAttributes } from 'react';

interface IParams {
  mangaNamePath: string;
  chapter: string;
}

interface ISearchParams {
  id: string;
  ch: string;
}

export interface IMangaReader {
  params: IParams;
  searchParams: ISearchParams;
}

export interface IControls extends HTMLAttributes<HTMLDivElement> {
  currentChapter: number;
  totalChapters: number;
}
