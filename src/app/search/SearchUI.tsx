'use client';

import { type FC as ReactFC, useState } from 'react';

import SearchBar from './SearchBar';
import FiltersModal from './FiltersModal';

import { IFilters, ISearchUI } from './Search.types';

const SearchUI: ReactFC<ISearchUI> = ({ tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<IFilters>({ visible: false });

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilters={setFilters} />
      <FiltersModal filters={filters} setFilters={setFilters} tags={tags} />
    </>
  );
};

export default SearchUI;
