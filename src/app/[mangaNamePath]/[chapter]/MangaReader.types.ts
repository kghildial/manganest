import { IMangaFeed, IMangaTag, TMangaRelationship } from '@/types/manga.types';
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
  onMinimize: () => void;
  showMinimize: boolean;
}

export interface IDneModalState {
  trigger: boolean;
  unavailChNum: number | null;
  nextChapter: IMangaFeed | null;
}

export interface IMobileControlsPanel {
  mangaId: string;
  currentChapter: number;
  totalChapters: number;
  mangaTitle: string;
  tags: IMangaTag[] | null;
  authors: TMangaRelationship[] | null;
  artists: TMangaRelationship[] | null;
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface IChangeChapter {
  mangaId: string;
  mangaTitle: string;
  targetChapter: number;
  setChapterDneModal: Dispatch<SetStateAction<IDneModalState>>;
  router: ReturnType<typeof useRouter>;
}

export interface IChapterDneModal {
  mangaId: string;
  mangaTitle: string;
  state: IDneModalState;
  setState: Dispatch<SetStateAction<IDneModalState>>;
}

export interface IMangaControlsBox extends HTMLAttributes<HTMLDivElement> {
  mangaId: string;
  totalCh: number;
  mangaTitle: string;
  currentChNum: string;
  tags: IMangaTag[] | null;
  minimizeOnScroll?: boolean;
  showMenuTriggerOnMob?: boolean;
  authors: TMangaRelationship[] | null;
  artists: TMangaRelationship[] | null;
}

export interface IMetaData extends HTMLAttributes<HTMLDivElement> {
  tags: IMangaTag[] | null;
  authors: TMangaRelationship[] | null;
  artists: TMangaRelationship[] | null;
  metaLayoutClass: string;
  tagClass: string;
}

export interface IChapterNAFallback {
  title: string;
}
