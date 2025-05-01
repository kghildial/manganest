import { TMangaRelationship } from '@/types/manga.types';
import type { HTMLAttributes } from 'react';

export interface IMangaCard extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  id: string;
  coverArtFileName: string | undefined;
  title: string | null;
  description?: string;
  authors: TMangaRelationship[] | null;
  timestamp: string | null;
}
