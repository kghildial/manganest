'use server';

/**
 * Server utils for manga
 */

import {
  IFindInFeedParams,
  IGetMangaChapterResponse,
  IGetMangaFeedParams,
  IGetMangaFeedResponse,
  IGetMangaParams,
  IGetMangaResponse,
  IGetMangaStatsResponse,
  IMangaFeed,
} from '@/types/manga.types';
import { createMangaQueryParams } from './manga';
import { notFound } from 'next/navigation';

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

export async function getMangaStats(id: string): Promise<IGetMangaStatsResponse> {
  if (!process.env.MANGADEX_BASE_API_URL) {
    throw new Error('MANGADEX_BASE_API_URL is not defined in the environment variables.');
  }

  try {
    const url = `${process.env.MANGADEX_BASE_API_URL}/statistics/manga/${id}`;

    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      console.error(`Failed to fetch manga stats: ${response.status} ${response.statusText}`);
      notFound();
    }

    return response.json();
  } catch (err) {
    console.error('Error fetching manga stats:', err);
    throw new Error('Failed to fetch manga stats!');
  }
}

export async function getMangaFeed({
  id,
  limit,
  offset,
  translatedLanguage,
  order,
}: IGetMangaFeedParams): Promise<IGetMangaFeedResponse> {
  if (!process.env.MANGADEX_BASE_API_URL) {
    throw new Error('MANGADEX_BASE_API_URL is not defined in the environment variables.');
  }

  try {
    const queryString = createMangaQueryParams({ limit, offset, translatedLanguage, order });

    const url = `${process.env.MANGADEX_BASE_API_URL}/manga/${id}/feed${queryString}`;

    const response = await fetch(url, { next: { revalidate: 1 * 60 * 60 } });

    if (!response.ok) {
      console.error(`Failed to fetch manga chapters: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch manga chapters!');
    }

    return response.json();
  } catch (err) {
    console.error('Error fetching manga chapters:', err);
    throw new Error('Failed to fetch manga chapters!');
  }
}

export async function getMangaChapter(id: string): Promise<IGetMangaChapterResponse> {
  try {
    if (!process.env.MANGADEX_BASE_API_URL) {
      throw new Error('MANGADEX_BASE_API_URL is not defined in the environment variables.');
    }

    const url = `${process.env.MANGADEX_BASE_API_URL}/at-home/server/${id}`;

    const response = await fetch(url, { next: { revalidate: 15 * 60 } }); // revalidate every 15 mins

    if (!response.ok) {
      console.error(`Failed to fetch manga chapter: ${response.status} ${response.statusText}`);
      notFound();
    }

    return response.json();
  } catch (err) {
    console.error('Error fetching manga chapter:', err);
    notFound();
  }
}

export async function getLatestMangaChapter(id: string) {
  const response = await getMangaFeed({
    id,
    translatedLanguage: ['en'],
    order: { chapter: 'desc' },
    limit: 1,
    offset: 0,
  });

  return response.data[0];
}

// Finds reference(s) of a chapter (by chapter number) in a manga's chapter feed
export async function findInFeed({
  mangaId,
  chNum,
  pagination = 20,
  pgnMultiplier = 0,
}: IFindInFeedParams) {
  const feedSet = (
    await getMangaFeed({
      id: mangaId,
      limit: pagination,
      offset: pagination * pgnMultiplier,
      translatedLanguage: ['en'],
      order: { chapter: 'asc' },
    })
  ).data;

  if (feedSet.length === 0) {
    return [];
  }

  let results = feedSet.filter(({ attributes: { chapter } }) => chapter === String(chNum));

  // If no results then search some more on next set
  if (results.length === 0) {
    results = await findInFeed({
      mangaId,
      chNum,
      pagination: 50,
      pgnMultiplier: pgnMultiplier + 1,
    });
  }

  return results;
}

// Will return an entry in the mangaFeed which has non empty hash and chapter data
export async function getValidChRef(feedList: IMangaFeed[]) {
  let output = { chapterData: await getMangaChapter(feedList[0].id), listing: feedList[0] };

  const {
    chapterData: {
      baseUrl,
      chapter: { hash, data },
    },
  } = output;

  if (!baseUrl || baseUrl === '' || !hash || hash === '' || !data || data.length === 0) {
    const newFeedList = feedList.slice(1, feedList.length);
    output = await getValidChRef(newFeedList);
  }

  return output;
}
