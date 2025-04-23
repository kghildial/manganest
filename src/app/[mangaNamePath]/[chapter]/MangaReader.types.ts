import { IMangaFeed } from '@/types/manga.types';
import { useRouter } from 'next/navigation';
import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';

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

export interface IMobileControlsModal {
  mangaId: string;
  currentChapter: number;
  mangaTitle: string;
}

export interface IChangeChapter {
  mangaId: string;
  mangaTitle: string;
  targetChapter: number;
  setChapterDneModal: Dispatch<SetStateAction<IDneModalState>>;
  router: ReturnType<typeof useRouter>;
}
