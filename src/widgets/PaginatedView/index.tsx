'use client';

import React, { useEffect, useMemo, useState, type FC as ReactFC } from 'react';

import Pagination from '@/widgets/Pagination';

import { IPagiantedView } from './PaginatedView.types';
import PaginationContent from './PaginationContent';

const PagiantedView: ReactFC<IPagiantedView> = ({
  className,
  initialData,
  totalResults,
  paginationLimit,
  mangaFetchOptions,
  resetPageKey,
}) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / paginationLimit);
  }, [totalResults]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [resetPageKey]);

  return (
    <>
      <PaginationContent
        className={className}
        currentPage={currentPage}
        initialData={initialData}
        paginationLimit={paginationLimit}
        mangaFetchOptions={mangaFetchOptions}
      />

      <Pagination.Full
        totalPages={totalPages}
        className="mb-8 hidden transition-all md:flex"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Pagination.Compact
        totalPages={totalPages}
        className="absolute right-0 top-2 md:hidden"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PagiantedView;
