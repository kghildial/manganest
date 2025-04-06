import type { HTMLAttributes } from 'react';

export interface IMangaCard extends HTMLAttributes<HTMLDivElement> {
  id: string;
  coverArtFileName: string | undefined;
  title: string;
  description?: string;
  chapter: string;
  timestamp: string;
}
