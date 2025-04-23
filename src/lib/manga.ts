/**
 * Client utils for manga
 */

import type {
  IFindNearestChapter,
  IGetMangaChapterResponse,
  IGetMangaFeedParams,
  IGetMangaParams,
  IManga,
} from '@/types/manga.types';
import { getMangaFeed } from './manga.server';

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

  const lastChapter = manga?.attributes?.lastChapter;

  const updatedAt = manga?.attributes?.updatedAt;

  return {
    mangaId: manga.id,
    title,
    description,
    coverArt,
    authors,
    artists,
    tags,
    lastChapter,
    updatedAt,
  };
}

export function isChapterDataValid({
  baseUrl,
  chapter: { hash, data: pageData, dataSaver: pageDataSaver },
}: IGetMangaChapterResponse) {
  return !baseUrl || baseUrl === '' || !hash || hash === '' || !pageData || pageData.length === 0;
}

// Recursive call to find nearest valid chapter if current chapter is not available
export const findNearestChapter = async ({
  mangaId,
  targetChapter,
  offsetMultiplier = 0,
}: IFindNearestChapter) => {
  const { data: chapters } = await getMangaFeed({
    id: mangaId,
    limit: 50,
    offset: 50 * offsetMultiplier,
    translatedLanguage: ['en'],
    order: { chapter: 'asc' },
  });

  const chaptersAhead = chapters.filter(
    chapter => Number(chapter.attributes.chapter) > targetChapter,
  );

  if (chaptersAhead.length === 0) {
    findNearestChapter({ mangaId, targetChapter, offsetMultiplier: offsetMultiplier + 1 });
  }

  return chaptersAhead[0];
};
