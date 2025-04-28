'use client';

import { type FC as ReactFC, useMemo, useState } from 'react';

import {
  Pagination as CNPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination';

import { cn, getVisiblePages } from '@/lib/utils';
import { IPagination } from './Pagination.types';
import { EPaginationEllipses } from '@/types/utils.types';
import Motion from '@/components/motion';

const Pagination: ReactFC<IPagination> = ({ totalPages, className, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const visiblePages = useMemo(() => getVisiblePages(currentPage, totalPages), [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  return (
    <CNPagination className={className}>
      <PaginationContent>
        <PaginationItem className="group">
          <Motion.Button whileHover={{ scale: 1.1 }}>
            <PaginationPrevious
              className="cursor-pointer group-hover:[&_span]:text-accent_tint"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </Motion.Button>
        </PaginationItem>
        {visiblePages.map(page => {
          return page === EPaginationEllipses.Start || page === EPaginationEllipses.End ? (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <Motion.Button whileHover={{ scale: 1.1 }} key={page}>
              <PaginationItem>
                <PaginationLink
                  onClick={event => {
                    handlePageChange(page);
                  }}
                  className={cn(
                    'w-fit cursor-pointer px-3 py-1 font-heading',
                    page === currentPage
                      ? 'border-accent_tint bg-accent_tint text-background hover:text-background'
                      : '',
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            </Motion.Button>
          );
        })}
        <PaginationItem className="group">
          <Motion.Button whileHover={{ scale: 1.1 }}>
            <PaginationNext
              className="cursor-pointer group-hover:[&_span]:text-accent_tint"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            />
          </Motion.Button>
        </PaginationItem>
      </PaginationContent>
    </CNPagination>
  );
};

export default Pagination;
