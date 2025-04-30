'use client';

import { type FC as ReactFC, useEffect, useMemo, useState } from 'react';

import SearchBar from './SearchBar';
import FiltersModal from './FiltersModal';

import { IFilters, ISearchUI } from './Search.types';
import { IGetMangaParams, IGetMangaResponse, IManga } from '@/types/manga.types';
import PagiantedView from '@/widgets/PaginatedView';
import { getManga } from '@/lib/manga.server';

const SearchUI: ReactFC<ISearchUI> = ({ tags, intitialDisplay, paginationLimit, totalResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IGetMangaResponse>(intitialDisplay);
  const [filters, setFilters] = useState<IFilters>({ visible: false });

  const baseSearchPrompt: IGetMangaParams = useMemo(
    () => ({
      limit: paginationLimit,
      includes: ['cover_art', 'chapter', 'tag'],
      contentRating: ['safe', 'suggestive'],
      includedTagsMode: 'AND',
      includedTags: [],
      order: {
        followedCount: 'desc',
      },
    }),
    [],
  );

  const handleSubmit = (title: string) => {
    const getResults = async () => {
      const results = await getManga({ ...baseSearchPrompt, title });

      setSearchResults(results);
    };

    getResults();
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilters={setFilters}
        handleSubmit={handleSubmit}
      />
      {/* Search Results */}
      <PagiantedView
        className="mt-8"
        resetPageKey={searchTerm}
        initialData={searchResults.data}
        paginationLimit={paginationLimit}
        totalResults={searchResults.total}
        mangaFetchOptions={
          searchTerm !== '' ? { ...baseSearchPrompt, title: searchTerm } : baseSearchPrompt
        }
      />
      <FiltersModal filters={filters} setFilters={setFilters} tags={tags} />
    </>
  );
};

export default SearchUI;
