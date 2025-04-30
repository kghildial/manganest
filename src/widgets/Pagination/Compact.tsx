import { type FC as ReactFC, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { IPagination } from './Pagination.types';

const CompactPagination: ReactFC<IPagination> = ({
  className,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn('space-between flex items-center gap-x-2', className)}>
      <ChevronLeft
        size={24}
        className={cn(
          'rounded-xs border border-accent_tint py-1 text-accent_tint',
          currentPage === 1 ? 'pointer-events-none opacity-50' : '',
        )}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <Select value={String(currentPage)} onValueChange={page => handlePageChange(Number(page))}>
        <SelectTrigger className="h-[28px] w-fit gap-1 rounded-xs border-accent_tint py-0 pr-1 [&_span]:text-xs">
          <SelectValue placeholder="1" />
        </SelectTrigger>
        <SelectContent className="w-32 border-accent">
          {(() => {
            return Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <SelectItem
                  key={pageNum}
                  value={`${pageNum}`}
                  className={cn(
                    'justify-center py-1 [&_span]:text-xs',
                    currentPage === pageNum ? 'bg-accent_tint [&_span]:text-background' : '',
                  )}
                >
                  {pageNum}
                </SelectItem>
              );
            });
          })()}
        </SelectContent>
      </Select>
      <ChevronRight
        size={24}
        className={cn(
          'rounded-xs border border-accent_tint py-1 text-accent_tint',
          currentPage === totalPages ? 'pointer-events-none opacity-50' : '',
        )}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </div>
  );
};

export default CompactPagination;
