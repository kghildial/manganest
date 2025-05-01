import SearchUI from './SearchUI';
import LayoutWrapper from '@/components/LayoutWrapper';

import { getManga } from '@/lib/manga.server';
import { getDeviceTypeFromUA } from '../api/utils';

import { IGetMangTagsResp } from '@/types/manga.types';
const Search = async () => {
  const { data: tags }: IGetMangTagsResp = await (
    await fetch(`${process.env.MANGADEX_BASE_API_URL}/manga/tag`)
  ).json();

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
    includedTags: [],
    order: {
      followedCount: 'desc',
    },
  });

  // On purpose manipulation to keep data set at top 100 results for the view
  intitialDisplay.total = 100;

  return (
    <LayoutWrapper className="relative">
      <h1 className="mb-8 lg:mb-14">Search Manga</h1>
      <SearchUI
        intitialDisplay={intitialDisplay}
        paginationLimit={paginationLimit}
        totalResults={100}
        filterTypes={{ genres, themes, formats, content }}
      />
    </LayoutWrapper>
  );
};

export default Search;
