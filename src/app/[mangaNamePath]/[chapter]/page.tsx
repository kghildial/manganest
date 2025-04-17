import { type FC as ReactFC } from 'react';

import { getMangaChapter } from '@/lib/manga.server';

import { IMangaReader } from './MangaReader.types';
import Image from 'next/image';

const MangaReader: ReactFC<IMangaReader> = async ({ params, searchParams }) => {
  const { chapter: chId } = await params;
  const { id: mangaID } = await searchParams;

  const {
    baseUrl,
    chapter: { hash, data: chapterData },
  } = await getMangaChapter(chId);

  return (
    <div className="flex flex-col">
      {chapterData.map(page => (
        <Image
          key={`${hash}_${page}`}
          src={`${baseUrl}/data/${hash}/${page}`}
          alt={page}
          width={300}
          height={700}
        />
      ))}
    </div>
  );
};

export default MangaReader;
