import LayoutWrapper from '@/components/LayoutWrapper';
import SearchUI from './SearchUI';
import { IGetMangTagsResp } from '@/types/manga.types';

const Search = async () => {
  const { data: tags }: IGetMangTagsResp = await (
    await fetch(`${process.env.MANGADEX_BASE_API_URL}/manga/tag`)
  ).json();

  return (
    <LayoutWrapper>
      <h1 className="mb-8 lg:mb-14">Search Manga</h1>
      <SearchUI tags={tags} />
    </LayoutWrapper>
  );
};

export default Search;
