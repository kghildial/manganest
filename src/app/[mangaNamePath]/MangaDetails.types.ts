import type { ReactNode } from 'react';

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

export interface IMetaCardLayout {
  title: string;
  children: ReactNode;
}
