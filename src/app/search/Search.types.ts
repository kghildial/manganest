import { IGetMangaResponse, IManga, IMangaTag } from '@/types/manga.types';
import { Dispatch, SetStateAction } from 'react';

export interface IFilters {
  visible: boolean;
  include: Record<string, string>;
  filtersChanged: boolean;
}

type TFilterType = Record<'genres' | 'themes' | 'formats' | 'content', IMangaTag[]>;

export interface IFiltersModal {
  filters: IFilters;
  dispathFilterAction: Dispatch<IFiltersAction>;
  filterTypes: TFilterType;
}

export interface ISearchBar {
  handleSubmit: (options: IHandleSubmit) => void;
  filterTypes: TFilterType;
}

export interface ISearchUI {
  intitialDisplay: IGetMangaResponse;
  paginationLimit: number;
  totalResults: number;
  filterTypes: TFilterType;
}

export interface ITagFilterCardTemplate {
  title: string;
  tags: IMangaTag[];
  className?: string;
  filters: IFilters;
  dispathFilterAction: Dispatch<IFiltersAction>;
}

export enum EFiltersAction {
  Show = 'SHOW',
  Hide = 'HIDE',
  Include = 'INCLUDE',
  Exclude = 'EXCLUDE',
  Clear = 'CLEAR',
  Reset = 'RESET',
}

export interface IFiltersAction {
  type: EFiltersAction;
  payload?: {
    id: string;
    name: string;
  };
}

export type TFiltersReducer = (draft: IFilters, action: IFiltersAction) => IFilters;

export interface ISearchStatus {
  results: IGetMangaResponse;
  resetPageKey: string;
  searchTerm: string;
  includedTags: string[] | never[];
}

export interface IHandleSubmit {
  searchTerm: string;
  filters: Record<string, string>;
}
