import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface IPagination extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
