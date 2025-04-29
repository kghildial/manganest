import { type FC as ReactFC } from 'react';
import Image from 'next/image';

import LayoutWrapper from '@/components/LayoutWrapper';

import {
  findInFeed,
  getLatestMangaChapter,
  getManga,
  getMangaChapter,
  getValidChRef,
} from '@/lib/manga.server';
import { getMangaDetails, isChapterDataValid } from '@/lib/manga';

import { IMangaReader } from './MangaReader.types';
import ControlsBox from './ControlsBox';

const MangaReader: ReactFC<IMangaReader> = async ({ params, searchParams }) => {
  const { mangaNamePath, chapter: chId } = await params;
  const { id: mangaId, ch: currentChNum } = await searchParams;
  const mangaTitle = decodeURIComponent(mangaNamePath);

  // Get the total chapters in this manga
  const totalCh = Number((await getLatestMangaChapter(mangaId)).attributes.chapter);

  let chapterData = await getMangaChapter(chId);

  if (isChapterDataValid(chapterData)) {
    const chRefsInFeed = await findInFeed({
      mangaId,
      chNum: Number(currentChNum),
      pagination: 50,
    });

    chapterData = (await getValidChRef(chRefsInFeed)).chapterData;
  }

  const {
    baseUrl,
    chapter: { hash, data: pageData, dataSaver: pageDataSaver },
  } = chapterData;

  const manga = (
    await getManga({ title: mangaTitle, limit: 100, includes: ['artist', 'author'] })
  ).data.filter(entry => entry.id === mangaId)[0];

  const { title, tags, artists, authors } = getMangaDetails(manga);

  return (
    <LayoutWrapper className="flex flex-col">
      <div className="flex">
        <div className="mt-32 w-full lg:mt-0 lg:w-[70%]">
          {pageData.map((page, index) => {
            const highResUrl = `${baseUrl}/data/${hash}/${page}`;
            const lowResUrl = `${baseUrl}/data/${hash}/${pageDataSaver[index]}`;

            return (
              <Image
                unoptimized
                key={`${hash}_${page}`}
                src={highResUrl}
                placeholder="blur"
                blurDataURL={lowResUrl}
                alt={page}
                width={1000}
                height={700}
                className="w-full rounded-md"
              />
            );
          })}
        </div>
        <div className="fixed left-[2.5%] top-20 w-[95vw] lg:left-auto lg:right-[calc((100vw-1440px)/2)] lg:top-[117px] lg:w-[25%]">
          <ControlsBox
            mangaId={mangaId}
            mangaTitle={mangaTitle}
            currentChNum={currentChNum}
            totalCh={totalCh}
            tags={tags}
            authors={authors}
            artists={artists}
          />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default MangaReader;
