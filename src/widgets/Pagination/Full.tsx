'use client';

import { type FC as ReactFC, useMemo, useState } from 'react';
import { motion } from 'motion/react';

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

const Pagination: ReactFC<IPagination> = ({ totalPages, className, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  return (
    <CNPagination className={className}>
      <PaginationContent>
        <PaginationItem
          className={cn('group', currentPage === 1 ? 'opcaity-50 pointer-events-none' : '')}
        >
          <motion.button whileHover={{ scale: 1.1 }}>
            <PaginationPrevious
              className="cursor-pointer group-hover:[&_span]:text-accent_tint"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </motion.button>
        </PaginationItem>
        {visiblePages.map(page => {
          return page === EPaginationEllipses.Start || page === EPaginationEllipses.End ? (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <motion.button whileHover={{ scale: 1.1 }} key={page}>
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
            </motion.button>
          );
        })}
        <PaginationItem
          className={cn(
            'group',
            currentPage === totalPages ? 'opcaity-50 pointer-events-none' : '',
          )}
        >
          <motion.button whileHover={{ scale: 1.1 }}>
            <PaginationNext
              className="cursor-pointer group-hover:[&_span]:text-accent_tint"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            />
          </motion.button>
        </PaginationItem>
      </PaginationContent>
    </CNPagination>
  );
};

export default Pagination;
