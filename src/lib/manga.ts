'server-only';

/**
 * This file contains APIs that fetch the manga & chapter data from the server
 */

import type { IGetMangaParams, IManga } from '@/types/manga';

function createMangaQueryParams(params: IGetMangaParams) {
  let parsedQueryString = '?';

  Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(subValue => {
        parsedQueryString += `${key}[]=${subValue}&`;
      });
    } else if (typeof value === 'object') {
      Object.entries(value).map(([subKey, subValue]) => {
        parsedQueryString += `${key}[${subKey}]=${subValue}&`;
      });
    } else {
      parsedQueryString += `${key}=${value}&`;
    }
  });

  // Slice -1 done to remove the trailing `&`
  return parsedQueryString.slice(0, -1);
}

// Server only function to fetch mangas in React server components
export async function getMangas(params: IGetMangaParams) {
  'use server';

  const queryString = createMangaQueryParams(params);
  const url = `${process.env.MANGADEX_BASE_API_URL}/manga${queryString}`;

  const response = await fetch(url, {
    next: {
      revalidate: 1 * 60 * 60, // 1 hour
    },
  });

  return response.json();
}
