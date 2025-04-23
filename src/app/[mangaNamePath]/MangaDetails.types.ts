import type { HTMLAttributes, ReactNode } from 'react';

import { IManga, IMangaFeed } from '@/types/manga.types';

export interface IParams {
  mangaNamePath: string;
}

interface ISearchParams {
  id: string;
}

export interface IMangaDetails {
  params: IParams;
  searchParams: ISearchParams;
}

export interface IMetaCardLayout extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

export interface IChapterListing extends HTMLAttributes<HTMLDivElement> {
  mangaId: string;
  initialList: IMangaFeed[];
}

export interface IStartReading {
  mangaTitle: string;
  firstChId: string;
  mangaId: string;
  firstChNum: string;
}

export interface IChapterListingFallback {
  mangaId: string;
  mangaSearchResults: IManga[];
}
