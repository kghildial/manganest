import { type FC as ReactFC } from 'react';
import SearchUI from './SearchUI';
import LayoutWrapper from '@/components/LayoutWrapper';

import { getManga } from '@/lib/manga.server';
import { getDeviceTypeFromUA } from '../api/utils';

import { IGetMangTagsResp } from '@/types/manga.types';
import { ISeach } from './Search.types';
const Search: ReactFC<ISeach> = async ({ searchParams }) => {
  const { tag: searchParamTagId } = await searchParams;

  const { data: tags }: IGetMangTagsResp = await (
    await fetch(`${process.env.MANGADEX_BASE_API_URL}/manga/tag`)
  ).json();

  const searchParamTagName =
    tags.find(({ id }) => id === searchParamTagId)?.attributes?.name?.en ?? '';

  const genres = tags.filter(tag => tag.attributes?.group === 'genre');
  const themes = tags.filter(tag => tag.attributes?.group === 'theme');
  const formats = tags.filter(tag => tag.attributes?.group === 'format');
  const content = tags.filter(tag => tag.attributes?.group === 'content');

  const { isMobile, isTablet } = await getDeviceTypeFromUA();
  const paginationLimit = isMobile ? 10 : isTablet ? 14 : 15;

  const intitialDisplay = await getManga({
    limit: paginationLimit,
    offset: 0,
    includes: ['cover_art', 'chapter', 'tag', 'author'],
    contentRating: ['safe', 'suggestive'],
    includedTagsMode: 'AND',
    includedTags: searchParamTagId ? [searchParamTagId] : [],
    order: {
      followedCount: 'desc',
    },
  });

  // On purpose manipulation to keep data set at top 100 results for the view
  intitialDisplay.total = 100;

  return (
    <LayoutWrapper className="relative">
      <h1 className="mb-8 xl:mb-14">Search Manga</h1>
      <SearchUI
        intitialDisplay={intitialDisplay}
        paginationLimit={paginationLimit}
        totalResults={100}
        filterTypes={{ genres, themes, formats, content }}
        searchParamTag={
          searchParamTagId
            ? {
                id: searchParamTagId,
                name: searchParamTagName,
              }
            : null
        }
      />
    </LayoutWrapper>
  );
};

export default Search;
