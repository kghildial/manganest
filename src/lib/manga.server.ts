'use server';

/**
 * Server utils for manga
 */

import { IGetMangaParams, IGetMangaResponse } from '@/types/manga.types';
import { createMangaQueryParams } from './manga';
import { notFound } from 'next/navigation';

// Server only function to fetch mangas in React server components
export async function getManga(params: IGetMangaParams): Promise<IGetMangaResponse> {
  if (!process.env.MANGADEX_BASE_API_URL) {
    throw new Error('MANGADEX_BASE_API_URL is not defined in the environment variables.');
  }

  try {
    const queryString = createMangaQueryParams(params);
    const url = `${process.env.MANGADEX_BASE_API_URL}/manga${queryString}`;

    const response = await fetch(url, {
      next: {
        revalidate: 1 * 60 * 60, // 1 hour
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch manga: ${response.status} ${response.statusText}`);
      notFound();
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching manga:', error);
    notFound();
  }
}
