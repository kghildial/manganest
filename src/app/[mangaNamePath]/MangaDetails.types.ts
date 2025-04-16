import type { ReactNode } from 'react';

import { IMangaFeed } from '@/types/manga.types';

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

export interface IMetaCardLayout extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

export interface IChapterListing extends React.HTMLAttributes<HTMLDivElement> {
  mangaId: string;
  initialList: IMangaFeed[];
}
