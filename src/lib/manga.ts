/**
 * Client utils for manga
 */

import type {
  IGetMangaChapterResponse,
  IGetMangaFeedParams,
  IGetMangaParams,
  IManga,
} from '@/types/manga.types';

export function createMangaQueryParams(params: IGetMangaParams | IGetMangaFeedParams) {
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

export function getMangaDetails(manga: IManga) {
  const coverArt = manga?.relationships?.find(rel => rel.type === 'cover_art');

  let title = manga?.attributes?.title?.en ?? null;
  if (!title) {
    title =
      manga?.attributes?.altTitles?.find(entry => entry.hasOwnProperty('en'))?.en ??
      manga?.attributes?.altTitles?.find(entry => entry.hasOwnProperty('ja'))?.ja ??
      null;
  }

  const description = manga?.attributes?.description?.en?.split('---')[0];

  const authors = manga?.relationships?.filter(rel => rel.type === 'author');

  const artists = manga?.relationships?.filter(rel => rel.type === 'artist');

  const tags = manga?.attributes?.tags;

  return { title, description, coverArt, authors, artists, tags };
}

export function isChapterDataValid({
  baseUrl,
  chapter: { hash, data: pageData, dataSaver: pageDataSaver },
}: IGetMangaChapterResponse) {
  return !baseUrl || baseUrl === '' || !hash || hash === '' || !pageData || pageData.length === 0;
}
