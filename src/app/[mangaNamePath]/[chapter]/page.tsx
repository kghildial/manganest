import { type FC as ReactFC } from 'react';
import Image from '@/components/Image';

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
import ChapterNAFallback from './ChapterNAFallback';

const MangaReader: ReactFC<IMangaReader> = async ({ params, searchParams }) => {
  const { mangaNamePath, chapter: chId } = await params;
  const { id: mangaId, ch: currentChNum } = await searchParams;
  const mangaTitle = decodeURIComponent(mangaNamePath);

  const manga = (
    await getManga({ title: mangaTitle, limit: 100, includes: ['artist', 'author'] })
  ).data.filter(entry => entry.id === mangaId)[0];

  const { tags, artists, authors } = getMangaDetails(manga);

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

  return (
    <LayoutWrapper className="flex flex-col">
      <div className="mb-5 flex flex-col">
        <div className="mt-32 w-full xl:mt-0 xl:w-[70%]">
          {pageData.length > 0 ? (
            pageData.map((page, index) => {
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
            })
          ) : (
            <ChapterNAFallback title={mangaTitle} />
          )}
        </div>
        <ControlsBox
          className="mt-5 xl:hidden"
          tags={tags}
          mangaId={mangaId}
          totalCh={totalCh}
          authors={authors}
          artists={artists}
          mangaTitle={mangaTitle}
          currentChNum={currentChNum}
        />
        <div className="4k:right-[12vw] fixed left-[2.5%] top-20 h-[85vh] w-[95vw] xl:left-auto xl:right-[calc((10vw)/2)] xl:top-[117px] xl:w-[25%] xl:overflow-scroll 2xl:right-[calc((100vw-1440px)/2)]">
          <ControlsBox
            tags={tags}
            minimizeOnScroll
            showMenuTriggerOnMob
            mangaId={mangaId}
            totalCh={totalCh}
            authors={authors}
            artists={artists}
            mangaTitle={mangaTitle}
            currentChNum={currentChNum}
          />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default MangaReader;
