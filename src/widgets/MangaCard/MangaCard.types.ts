import type { HTMLAttributes } from 'react';

export interface IMangaCard extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  id: string;
  coverArtFileName: string | undefined;
  title: string | null;
  description?: string;
  chapter: string | undefined;
  timestamp: string | null;
}
