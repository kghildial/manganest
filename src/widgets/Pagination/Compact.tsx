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

const CompactPagination: ReactFC<IPagination> = ({ totalPages, onChange, className }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
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
            const rangeStart = Math.max(currentPage - 3, 1);
            const rangeEnd = Math.min(currentPage + 3, totalPages);
            return Array.from({ length: rangeEnd - rangeStart + 1 }).map((_, index) => {
              const pageNum = rangeStart + index;
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
          <div className="px-2 py-1">
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder="Jump to page"
              className="w-full rounded-xs border px-2 py-1 text-xs"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const value = Number(e.currentTarget.value);
                  if (!isNaN(value) && value >= 1 && value <= totalPages) {
                    handlePageChange(value);
                  }
                }
              }}
            />
          </div>
          {(() => {
            const rangeStart = Math.max(currentPage - 3, 1);
            const rangeEnd = Math.min(currentPage + 3, totalPages);
            return (
              rangeEnd < totalPages && (
                <SelectItem
                  key={totalPages}
                  value={`${totalPages}`}
                  className={cn(
                    'justify-center py-1 [&_span]:text-xs',
                    currentPage === totalPages ? 'bg-accent_tint [&_span]:text-background' : '',
                  )}
                >
                  {totalPages}
                </SelectItem>
              )
            );
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
