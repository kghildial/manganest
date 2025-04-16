import { type FC as ReactFC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import LayoutWrapper from '@/components/LayoutWrapper';
import Tag from '@/components/Tag';
import MetaCardLayout from './MetaCardLayout';

import { getManga } from '@/lib/manga.server';
import { getMangaDetails } from '@/lib/manga';

import { IMangaDetails } from './MangaDetails.types';

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
            className="h-[350px] rounded-lg border-2 border-foreground transition-opacity ease-linear lg:h-[500px] lg:w-[350px]"
          />
          <div className="ml-8 flex flex-col">
            <h1 className="mb-3 font-title text-5xl leading-[54px]">{title}</h1>
            <p className="mb-5 font-body font-medium">{description}</p>
            <div className="mb-8 flex flex-wrap gap-x-5">
              <MetaCardLayout title="Authors">
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
              <MetaCardLayout title="Genres">
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
            <Button size="lg" className="w-fit py-4">
              Start Reading
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default MangaDetails;
