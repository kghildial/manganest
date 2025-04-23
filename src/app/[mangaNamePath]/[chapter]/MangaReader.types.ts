import { IMangaChapter, IMangaFeed } from '@/types/manga.types';
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
  mangaTitle: string;
  currentChapter: number;
  totalCh: number;
  mangaId: string;
}

export interface IDneModalState {
  trigger: boolean;
  unavailChNum: number | null;
  nextChapter: IMangaFeed | null;
}

export interface IFindNearestChapter {
  targetChapter: number;
  offsetMultiplier?: number;
}
