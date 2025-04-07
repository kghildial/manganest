import type { HTMLAttributes } from 'react';

export interface IPagination extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  totalPages: number;
  onChange: (page: number) => void;
}
