import { type FC as ReactFC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import LayoutWrapper from '@/components/LayoutWrapper';

import { IMangaDetails } from './MangaDetails.types';
import { getManga } from '@/lib/manga';
import Tag from '@/components/Tag';
import MetaCardLayout from './MetaCardLayout';
import { Button } from '@/components/ui/button';

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

  const coverArt = manga?.relationships?.find(rel => rel.type === 'cover_art');

  let title = manga?.attributes?.title?.en ?? null;
  if (!title) {
    title = manga?.attributes?.altTitles?.find(entry => entry.hasOwnProperty('en'))?.en ?? null;
  }

  const description = manga?.attributes?.description?.en?.split('---')[0];

  return (
    <div className="mt-8 flex justify-center lg:mt-14">
      <LayoutWrapper className="flex flex-col">
        <div className="flex">
          <Image
            priority
            src={`https://uploads.mangadex.org/covers/${manga.id}/${coverArt?.attributes?.fileName}.512.jpg`}
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
                <Tag text="Someone" className="bg-secondary_bg2" />
              </MetaCardLayout>
              <MetaCardLayout title="Artists">
                <Tag text="Someone" className="bg-secondary_bg2" />
              </MetaCardLayout>
              <MetaCardLayout title="Genres">
                <Tag text="Action" className="bg-secondary_bg2" />
                <Tag text="Adventure" className="bg-secondary_bg2" />
                <Tag text="Drama" className="bg-secondary_bg2" />
                <Tag text="Fantasy" className="bg-secondary_bg2" />
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
