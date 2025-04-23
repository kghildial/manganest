import { type FC as ReactFC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import LayoutWrapper from '@/components/LayoutWrapper';

import {
  findInFeed,
  getLatestMangaChapter,
  getManga,
  getMangaChapter,
  getValidChRef,
} from '@/lib/manga.server';

import { IMangaReader } from './MangaReader.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMangaDetails, isChapterDataValid } from '@/lib/manga';
import Controls from './Controls';
import { LayoutGrid, Minimize2 } from 'lucide-react';

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
      totalCh,
      pagination: 50,
    });

    chapterData = (await getValidChRef(chRefsInFeed)).chapterData;
  }

  const {
    baseUrl,
    chapter: { hash, data: pageData, dataSaver: pageDataSaver },
  } = chapterData;

  const manga = (await getManga({ title: mangaTitle, limit: 100 })).data.filter(
    entry => entry.id === mangaId,
  )[0];

  const { title } = getMangaDetails(manga);

  return (
    <div className="mt-8 flex justify-center lg:mt-14">
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
            <Card className="relative flex w-full flex-col items-start justify-between p-3 lg:px-9 lg:py-8">
              <CardHeader className="w-full flex-row justify-between">
                <div className="mb-3 flex flex-col pr-2">
                  <CardTitle className="font-heading text-2xl/7 font-medium lg:text-5xl lg:leading-[54px]">
                    {title}
                  </CardTitle>
                  <CardDescription className="font-heading text-xl/6 text-foreground_tint_60 lg:text-2xl/7">
                    Chapter {currentChNum}
                  </CardDescription>
                </div>
                <LayoutGrid size={18} className="block min-w-[18px] lg:hidden" />
                <Minimize2
                  size={18}
                  className="absolute bottom-3 block text-foreground_tint_60 lg:hidden"
                />
              </CardHeader>

              <CardContent className="flex w-full gap-6">
                <Controls
                  mangaTitle={mangaTitle}
                  currentChapter={Number(currentChNum)}
                  totalCh={totalCh}
                  mangaId={mangaId}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default MangaReader;
