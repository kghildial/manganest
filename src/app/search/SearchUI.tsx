'use client';

import { type FC as ReactFC, useCallback, useEffect, useMemo, useState } from 'react';

import SearchBar from './SearchBar';

import { IHandleSubmit, ISearchStatus, ISearchUI } from './Search.types';
import { IGetMangaParams, IGetMangaResponse, IManga } from '@/types/manga.types';
import PagiantedView from '@/widgets/PaginatedView';
import { getManga } from '@/lib/manga.server';

const SearchUI: ReactFC<ISearchUI> = ({
  intitialDisplay,
  paginationLimit,
  filterTypes,
  searchParamTag,
}) => {
  const [searchStatus, setSearchStatus] = useState<ISearchStatus>({
    results: intitialDisplay,
    searchTerm: '',
    resetPageKey: '',
    includedTags: searchParamTag ? [searchParamTag.id] : [],
  });

  const baseSearchPrompt: IGetMangaParams = useMemo(
    () => ({
      limit: paginationLimit,
      includes: ['cover_art', 'chapter', 'tag', 'author'],
      contentRating: ['safe', 'suggestive'],
      includedTagsMode: 'AND',
      includedTags: searchStatus.includedTags,
      order: {
        followedCount: 'desc',
      },
    }),
    [searchStatus.includedTags],
  );

  const handleSubmit = useCallback(({ searchTerm, filters }: IHandleSubmit) => {
    const getResults = async () => {
      const includedTags = Object.keys(filters);

      let prompt = { ...baseSearchPrompt, includedTags };

      if (searchTerm !== '') {
        prompt = { ...prompt, title: searchTerm };
      }

      const results = await getManga(prompt);

      // Generate new random key to trigger needed sideEffects down the chain
      const resetPageKey = Math.random().toString(36).slice(2);

      // Show top hundred entries
      if (results.total > 100) results.total = 100;

      setSearchStatus({ results, searchTerm, resetPageKey, includedTags });
    };

    getResults();
  }, []);

  return (
    <>
      <SearchBar
        filterTypes={filterTypes}
        handleSubmit={handleSubmit}
        searchParamTag={searchParamTag}
      />
      {/* Search Results */}
      <PagiantedView
        className="mt-8"
        resetPageKey={searchStatus.resetPageKey}
        initialData={searchStatus.results.data}
        paginationLimit={paginationLimit}
        totalResults={searchStatus.results.total}
        mangaFetchOptions={
          searchStatus.searchTerm !== ''
            ? { ...baseSearchPrompt, title: searchStatus.searchTerm }
            : baseSearchPrompt
        }
      />
    </>
  );
};

export default SearchUI;
