'use-client';

import { memo, useEffect, useMemo, useState, type FC as ReactFC } from 'react';
import { useImmerReducer } from 'use-immer';
import { motion } from 'motion/react';
import { Dot, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

import Motion from '@/components/motion';
import { Input } from '@/components/ui/input';

import useResponsive from '@/hooks/useResponsive';

import { EFiltersAction, IFilters, ISearchBar } from './Search.types';
import FiltersModal from './FiltersModal';
import { filtersReducer } from './utils';

const SearchBar: ReactFC<ISearchBar> = ({ filterTypes, handleSubmit, searchParamTag }) => {
  const { isMobile } = useResponsive();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, dispatch] = useImmerReducer(filtersReducer, {
    include: {},
    visible: false,
    filtersChanged: false,
  });

  const isFiltersEmpty = useMemo(
    () => Object.keys(filters.include).length === 0,
    [filters.include],
  );

  useEffect(() => {
    if (searchParamTag) {
      dispatch({ type: EFiltersAction.Include, payload: searchParamTag });
    }
  }, []);

  // Search again when tags
  useEffect(() => {
    const { visible, filtersChanged } = filters;

    if (!visible && filtersChanged) {
      handleSubmit({ searchTerm, filters: filters.include });
    }
  }, [filters.visible]);

  return (
    <>
      <form
        className="flex justify-between"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit({ searchTerm, filters: filters.include });
        }}
      >
        <div className="flex flex-1 items-center border-b border-secondary_bg2 pb-1">
          <SearchIcon size={24} className="mr-4 text-secondary_bg2" />

          <Input
            type="text"
            name="query"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="border-none font-ui text-base font-medium"
          />
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative cursor-pointer overflow-hidden pr-2 pt-1"
            onClick={() => dispatch({ type: EFiltersAction.Show })}
          >
            <SlidersHorizontal size={24} className="text-foreground_tint" />
            {!isFiltersEmpty && (
              <Dot size={50} className="absolute left-[-5px] top-[-20px] text-accent" />
            )}
          </motion.div>
        </div>
        <Motion.Button
          type="submit"
          onClick={() => {
            handleSubmit({ searchTerm, filters: filters.include });
          }}
          className="ml-5 px-2 md:px-4"
        >
          {!isMobile ? 'Search' : <SearchIcon size={24} className="text-background" />}
        </Motion.Button>
      </form>
      {filters.visible && (
        <FiltersModal filters={filters} filterTypes={filterTypes} dispathFilterAction={dispatch} />
      )}
    </>
  );
};

export default memo(SearchBar);
