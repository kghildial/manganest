import { HTMLAttributes, ReactNode } from 'react';

export interface IMetaCardLayout extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}
