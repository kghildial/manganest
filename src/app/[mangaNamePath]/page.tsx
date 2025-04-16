import { type FC as ReactFC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import LayoutWrapper from '@/components/LayoutWrapper';
import Tag from '@/components/Tag';
import MetaCardLayout from './MetaCardLayout';
import ChapterListing from './ChapterListing';

import { getManga, getMangaFeed, getMangaStats } from '@/lib/manga.server';
import { getMangaDetails } from '@/lib/manga';

import { IMangaDetails } from './MangaDetails.types';
import { timeAgo } from '@/lib/utils';

const MangaDetails: ReactFC<IMangaDetails> = async ({ params, searchParams }) => {
  const { mangaNamePath } = await params;
  const { id } = await searchParams;
  const mangaName = mangaNamePath.split('-').join(' ');

  const searchResp = await getManga({
    includes: ['cover_art', 'author', 'artist'],
    limit: 100,
    title: mangaName,
  });

  const manga = searchResp.data.filter(entry => entry.id === id)[0];

  if (!manga) {
    notFound();
  }

  const { title, description, coverArt, authors, artists, tags } = await getMangaDetails(manga);

  const stats = (await getMangaStats(id)).statistics[id];

  const mangaFeed = (await getMangaFeed(id)).data;

  return (
    <div className="mt-8 flex justify-center lg:mt-14">
      <LayoutWrapper className="flex flex-col">
        <div className="flex">
          <Image
            priority
            src={`https://uploads.mangadex.org/covers/${id}/${coverArt?.attributes?.fileName}.512.jpg`}
            width="247"
            height="351"
            alt={!title ? 'N/A' : title}
            className="h-[285px] w-[200px] rounded-lg border-2 border-foreground transition-opacity ease-linear lg:h-[500px] lg:w-[350px]"
          />
          <div className="ml-2 flex flex-col md:ml-8">
            <h1 className="mb-3 hidden font-title text-5xl leading-[54px] md:block">{title}</h1>
            <div className="mb-2 flex items-center gap-x-2 md:mb-5 md:gap-x-10">
              <Tag
                className="w-fit gap-1 rounded-md md:px-4 md:py-1.5"
                text={
                  <>
                    <StarIcon size={24} className="text-accent" />
                    <p className="mt-1 text-xs font-medium md:text-base">
                      {Math.round(stats.rating.average * 10) / 10}
                    </p>
                  </>
                }
              />
              <Button size="lg" className="hidden w-fit py-4 md:flex">
                Start Reading
              </Button>
              <Button size="sm" className="flex w-fit py-4 md:hidden">
                Start Reading
              </Button>
            </div>
            <p className="mb-5 hidden font-body font-medium md:block">{description}</p>
            <div className="mb-3 flex flex-col flex-wrap gap-x-0 gap-y-2 md:mb-8 md:flex-row md:gap-x-5 md:gap-y-0">
              <MetaCardLayout title="Authors" className="">
                {authors?.map(
                  author =>
                    author?.attributes?.name && (
                      <Tag
                        key={author.id}
                        text={author.attributes.name}
                        className="bg-secondary_bg2"
                      />
                    ),
                )}
              </MetaCardLayout>
              <MetaCardLayout title="Artists">
                {artists?.map(
                  artist =>
                    artist?.attributes?.name && (
                      <Tag
                        key={artist.id}
                        text={artist.attributes.name}
                        className="bg-secondary_bg2"
                      />
                    ),
                )}
              </MetaCardLayout>
              <MetaCardLayout title="Genres" className="hidden md:block">
                {tags?.map(
                  tag =>
                    tag?.attributes?.name?.en && (
                      <Tag
                        key={tag.id}
                        text={tag.attributes.name.en}
                        className="bg-secondary_bg2"
                      />
                    ),
                )}
              </MetaCardLayout>
            </div>
          </div>
        </div>
        <h1 className="my-3 block font-title text-2xl/7 md:hidden">{title}</h1>
        <div className="mb-5 flex flex-wrap gap-1 md:hidden">
          {tags?.map(
            tag => tag?.attributes?.name?.en && <Tag key={tag.id} text={tag.attributes.name.en} />,
          )}
        </div>
        <p className="block font-body text-sm font-medium md:hidden">{description}</p>
        <div className="mt-12 flex flex-col md:mt-24">
          <h2 className="mb-5 md:mb-8">Chapters</h2>
          <div className="flex flex-col gap-2"></div>
          {mangaFeed.map(({ id, attributes: { chapter, updatedAt } }) => (
            <ChapterListing
              key={id}
              chapter={chapter}
              timestamp={timeAgo(new Date(updatedAt), new Date())}
            />
          ))}
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default MangaDetails;
