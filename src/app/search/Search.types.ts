import { IMangaTag } from '@/types/manga.types';
import { Dispatch, SetStateAction } from 'react';

export interface IFilters {
  visible: boolean;
}

export interface IFiltersModal {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  tags: IMangaTag[] | never[];
}

export interface ISearchBar {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export interface ISearchUI {
  tags: IMangaTag[] | never[];
}

export interface ITagFilterCardTemplate {
  title: string;
  tags: IMangaTag[];
  className?: string;
}
