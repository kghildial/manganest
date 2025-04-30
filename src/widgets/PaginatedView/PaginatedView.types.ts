import { IGetMangaParams, IManga } from '@/types/manga.types';
import { HTMLAttributes } from 'react';

export interface IPagiantedView extends HTMLAttributes<HTMLDivElement> {
  initialData: IManga[];
  totalResults: number;
  paginationLimit: number;
  mangaFetchOptions: IGetMangaParams;
  resetPageKey?: unknown;
}

export interface IPaginationContent extends HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  initialData: IManga[];
  paginationLimit: number;
  mangaFetchOptions: IGetMangaParams;
}
