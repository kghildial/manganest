interface IParams {
  mangaNamePath: string;
  chapter: string;
}

interface ISearchParams {
  id: string;
}

export interface IMangaReader {
  params: IParams;
  searchParams: ISearchParams;
}
