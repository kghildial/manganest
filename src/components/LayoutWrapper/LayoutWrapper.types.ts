import type { HTMLAttributes, ReactNode } from 'react';

export interface ILayoutWrapper extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
