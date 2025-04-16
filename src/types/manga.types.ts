type TMangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';

type TMangaContentRating = 'safe' | 'suggestive' | 'erotica' | 'pornographic';

type TMangaDemographic = 'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none';

type TRelationshipType =
  | 'manga'
  | 'chapter'
  | 'cover_art'
  | 'author'
  | 'artist'
  | 'scanlation_group'
  | 'tag'
  | 'user'
  | 'custom_list';

type TDescription =
  | ({
      en?: string;
    } & { [key: string]: string })
  | Record<string, never>;

type TMangaTagAttributes = {
  name?: {
    en?: string;
  } & { [key: string]: string };
  description?: TDescription;
  group?: string;
  version?: number;
};

type TMangaTagRelationship = {
  [key: string]: string | Record<string, string> | undefined;
  id?: string;
};

type TBiography =
  | {
      [key: string]: string | undefined;
      en?: string;
    }
  | Record<string, never>;

type TMangaRelatiohsipAttributes = {
  fileName?: string;
  name?: string;
  imageUrl?: string | null;
  biography?: TBiography;
  twitter?: string | null;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
} & {
  [key: string]: string;
};

type TMangaRelationship = {
  id?: string;
  type?: TRelationshipType;
  attributes?: TMangaRelatiohsipAttributes;
} & { [key: string]: string };

interface IMangaTag {
  id?: string;
  type?: 'tag';
  attributes?: TMangaTagAttributes;
  relationships?: TMangaTagRelationship[] | never[];
}

interface IMangaAttributes {
  title?: {
    en?: string;
  };
  altTitles?: Record<string, string>[] | [];
  description?: TDescription;
  isLocked?: boolean;
  links?: Record<string, string>;
  originalLanguage?: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: TMangaDemographic;
  status?: TMangaStatus;
  year?: number;
  contentRating?: TMangaContentRating;
  tags?: IMangaTag[];
  state?: string;
  chapterNumbersResetOnNewVolume?: boolean;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  availableTranslatedLanguages?: string[];
  latestUploadedChapter?: string;
}

export interface IManga {
  id: string;
  type: 'manga';
  attributes?: IMangaAttributes;
  relationships?: TMangaRelationship[] | never[];
}

export interface IGetMangaParams {
  includes?: TRelationshipType[];
  order?: Record<string, string>;
  contentRating?: TMangaContentRating[];
  hasAvailableChapters?: boolean;
  limit?: number;
  offset?: number;
  createdAtSince?: string;
  updatedAtSince?: string;
  title?: string;
}

export interface IGetMangaResponse {
  result: 'ok' | 'error';
  response: 'collection' | 'entity';
  data: IManga[];
  limit: number;
  offset: number;
  total: number;
}

export interface IGetMangaStatsResponse {
  result: 'ok' | 'error';
  statistics: {
    [key: string]: {
      comments: {
        threadId: number;
        repliedCount: number;
      };
      rating: {
        [key: string]: Record<string, number> | number;
        average: number;
      };
      follows: number;
    };
  };
}
