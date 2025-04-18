import { type FC as ReactFC } from 'react';
import Image from 'next/image';

import LayoutWrapper from '@/components/LayoutWrapper';

import { getLatestMangaChapter, getManga, getMangaChapter, getMangaFeed } from '@/lib/manga.server';

import { IMangaReader } from './MangaReader.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMangaDetails } from '@/lib/manga';
import { Button } from '@/components/ui/button';
import Controls from './Controls';
import { LayoutGrid } from 'lucide-react';

const MangaReader: ReactFC<IMangaReader> = async ({ params, searchParams }) => {
  const { mangaNamePath, chapter: chId } = await params;
  const { id: mangaId, ch: currentChNum } = await searchParams;

  const {
    baseUrl,
    chapter: { hash, data: chapterData },
  } = await getMangaChapter(chId);

  const manga = (await getManga({ title: mangaNamePath, limit: 100 })).data.filter(
    entry => entry.id === mangaId,
  )[0];

  // TODO: This is an API call to fetch possible alternative servers for multiple uploaded chapters
  // Getting all possible Ids (of various sources) of this chapter from the feed
  // const { data: feedData } = await getMangaFeed({
  //   id: mangaId,
  //   translatedLanguage: ['en'],
  //   order: { chapter: 'asc' },
  //   limit: 10,
  //   offset: Number(currentChNum),
  // });

  // Get the total chapters in this manga
  const totalChapters = Number((await getLatestMangaChapter(mangaId)).attributes.chapter);

  const { title } = getMangaDetails(manga);

  return (
    <div className="mt-8 flex justify-center lg:mt-14">
      <LayoutWrapper className="flex flex-col">
        <div className="flex">
          <div className="mt-32 w-full md:mt-0 md:w-[70%]">
            {chapterData.map(page => (
              <Image
                key={`${hash}_${page}`}
                src={`${baseUrl}/data/${hash}/${page}`}
                alt={page}
                width={1000}
                height={700}
                className="w-full rounded-md"
              />
            ))}
          </div>
          <div className="fixed left-[10px] top-20 w-[95vw] md:left-auto md:right-[calc((100vw-1440px)/2)] md:top-[117px] md:w-[25%]">
            <Card className="flex w-full flex-col items-start justify-between p-3 md:px-9 md:py-8">
              <CardHeader className="w-full flex-row justify-between">
                <div className="mb-3 flex flex-col">
                  <CardTitle className="font-heading text-2xl/7 font-medium md:text-5xl md:leading-[54px]">
                    {title}
                  </CardTitle>
                  <CardDescription className="font-heading text-xl/6 text-foreground_tint_60 md:text-2xl/7">
                    Chapter {currentChNum}
                  </CardDescription>
                </div>
                <LayoutGrid size={18} className="block md:hidden" />
              </CardHeader>

              <CardContent className="flex w-full gap-6">
                <Controls currentChapter={Number(currentChNum)} totalChapters={totalChapters} />
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default MangaReader;
