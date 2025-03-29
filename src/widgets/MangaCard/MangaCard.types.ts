import type { HTMLAttributes } from 'react';

export interface IMangaCard extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  chapter: number;
  timestamp: string;
}
