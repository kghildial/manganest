import { IGetMangaResponse, IMangaTag } from '@/types/manga.types';
import { Dispatch } from 'react';

interface ISearchParams {
  tag: string;
}

export interface ISeach {
  searchParams: Promise<ISearchParams>;
}

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
  searchParamTag: TTag | null;
}

export interface ISearchUI {
  intitialDisplay: IGetMangaResponse;
  paginationLimit: number;
  totalResults: number;
  filterTypes: TFilterType;
  searchParamTag: TTag | null;
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

export type TTag = {
  id: string;
  name: string;
};

export interface IFiltersAction {
  type: EFiltersAction;
  payload?: string | TTag;
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
