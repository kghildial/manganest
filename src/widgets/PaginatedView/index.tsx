'use client';

import React, { memo, useEffect, useMemo, useState, type FC as ReactFC } from 'react';

import Pagination from '@/widgets/Pagination';
import PaginationContent from './PaginationContent';

import { cn } from '@/lib/utils';

import { IPagiantedView } from './PaginatedView.types';

const PagiantedView: ReactFC<IPagiantedView> = ({
  loading = true,
  className,
  initialData,
  resetPageKey,
  totalResults,
  paginationLimit,
  mangaFetchOptions,
  compactViewClassName,
}) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / paginationLimit);
  }, [totalResults, paginationLimit]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [resetPageKey]);

  return (
    <>
      <PaginationContent
        loading={loading}
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
        className={cn('absolute right-0 top-2 md:hidden', compactViewClassName)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default memo(PagiantedView);
