import { type FC as ReactFC } from 'react';
import Image from '@/components/Image';
import { notFound } from 'next/navigation';
import { StarIcon } from 'lucide-react';

import Tag from '@/components/Tag';
import LayoutWrapper from '@/components/LayoutWrapper';
import MetaCardLayout from '@/widgets/MetaCardLayout';
import ChapterListing from './ChapterListing';
import StartReading from './StartReading';
import ChapterListingFallback from './ChapterListingFallback';

import { getManga, getMangaFeed, getMangaStats } from '@/lib/manga.server';
import { getMangaDetails } from '@/lib/manga';

import { IMangaDetails } from './MangaDetails.types';
import Link from 'next/link';
import CreatorData from './CreatorData';
import MobDesc from './MobileDesc';

const MangaDetails: ReactFC<IMangaDetails> = async ({ params, searchParams }) => {
  const { mangaNamePath } = await params;
  const { id: mangaId } = await searchParams;
  let isChaptersDataAvail = true;
  const mangaTitle = decodeURIComponent(mangaNamePath);

  const searchResp = await getManga({
    includes: ['cover_art', 'author', 'artist'],
    limit: 100,
    title: mangaTitle,
  });

  const manga = searchResp.data.filter(entry => entry.id === mangaId)[0];

  if (!manga) {
    notFound();
  }

  const { title, description, coverArt, authors, artists, tags } = await getMangaDetails(manga);

  const stats = (await getMangaStats(mangaId)).statistics[mangaId];

  const mangaFeed = (
    await getMangaFeed({
      id: mangaId,
      limit: 20,
      offset: 0,
      translatedLanguage: ['en'],
      order: {
        chapter: 'desc',
      },
    })
  ).data;

  if (mangaFeed.length === 0) {
    isChaptersDataAvail = false;
  }

  const {
    id: firstChId,
    attributes: { chapter: firstChNum },
  } = (
    await getMangaFeed({
      id: mangaId,
      limit: 1,
      offset: 0,
      translatedLanguage: ['en'],
      order: {
        chapter: 'asc',
      },
    })
  ).data[0] ?? { id: null, attributes: { chapter: null } };

  return (
    <LayoutWrapper className="flex flex-col">
      <div className="flex">
        <Image
          priority
          src={`https://uploads.mangadex.org/covers/${mangaId}/${coverArt?.attributes?.fileName}.512.jpg`}
          width="247"
          height="351"
          alt={!title ? 'N/A' : title}
          className="h-[285px] w-[200px] rounded-lg border-2 border-foreground transition-opacity ease-linear xl:h-[500px] xl:w-[350px]"
        />
        <div className="ml-2 flex flex-col md:ml-8">
          <h1 className="mb-3 hidden font-title text-5xl leading-[54px] md:block">{title}</h1>
          <div className="mb-2 flex flex-col gap-x-2 sm:flex-row sm:items-center md:mb-5 md:gap-x-10">
            <Tag.Static
              className="mb-2 w-fit gap-1 rounded-sm py-2 sm:mb-0 md:rounded-md md:px-4 md:py-1.5"
              text={
                <>
                  <StarIcon size={24} className="hidden text-accent md:block" />
                  <StarIcon size={18} className="text-accent md:hidden" />
                  <p className="mt-1 text-xs font-medium md:text-base">
                    {Math.round(stats.rating.average * 10) / 10}
                  </p>
                </>
              }
            />
            {firstChId && firstChNum && (
              <StartReading
                mangaTitle={mangaTitle}
                firstChId={firstChId}
                mangaId={mangaId}
                firstChNum={firstChNum}
              />
            )}
          </div>

          <div className="mb-3 flex flex-col flex-wrap gap-x-0 gap-y-2 md:mb-8 md:flex-row md:gap-x-5 md:gap-y-3">
            <MetaCardLayout title="Genres" className="hidden md:block">
              {tags?.map(
                tag =>
                  tag?.attributes?.name?.en && (
                    <Link key={tag.id} href={`/search?tag=${tag.id}`}>
                      <Tag.Motion text={tag.attributes.name.en} className="bg-secondary_bg2" />
                    </Link>
                  ),
              )}
            </MetaCardLayout>
            <CreatorData
              title={mangaTitle}
              description={description ?? ''}
              authors={authors}
              artists={artists}
            />
          </div>
        </div>
      </div>
      <h1 className="my-3 mt-5 block font-title text-2xl/7 sm:mt-12 md:hidden">{title}</h1>
      <div className="mb-5 flex flex-wrap gap-1 md:hidden">
        {tags?.map(
          tag =>
            tag?.attributes?.name?.en && (
              <Link key={tag.id} href={`/search?tag=${tag.id}`}>
                <Tag.Motion key={tag.id} text={tag.attributes.name.en} />
              </Link>
            ),
        )}
      </div>
      <MobDesc
        title={title ?? 'N/A'}
        description={description ?? ''}
        authors={authors}
        artists={artists}
      />
      <div className="mt-5 flex flex-col md:mt-24">
        <h2 className="mb-5 md:mb-8">Chapters</h2>
        <div className="flex flex-col gap-2"></div>
        {isChaptersDataAvail ? (
          <ChapterListing mangaId={mangaId} initialList={mangaFeed} mangaTitle={mangaTitle} />
        ) : (
          <ChapterListingFallback mangaId={mangaId} mangaSearchResults={searchResp.data} />
        )}
      </div>
    </LayoutWrapper>
  );
};

export default MangaDetails;
