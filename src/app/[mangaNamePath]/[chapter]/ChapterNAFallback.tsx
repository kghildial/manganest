import Link from 'next/link';
import Image from 'next/image';
import { type FC as ReactFC } from 'react';

import Motion from '@/components/motion';

import ImgNA from '@/assets/images/manganest_NA_img.png';

import { IChapterNAFallback } from './MangaReader.types';

const ChapterNAFallback: ReactFC<IChapterNAFallback> = ({ title }) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start">
      <Image
        src={ImgNA}
        width={300}
        height={300}
        alt="Manganest_404"
        className="w-[200px] md:mr-14 md:w-[300px]"
      />
      <div className="mt-10 flex flex-col items-center md:items-start">
        <h2 className="text-5xl">Uh-Oh!</h2>
        <p className="mt-3 font-heading text-2xl text-foreground_tint">
          This chapter is not avaialable!
        </p>
        <p className="mt-3 text-center font-body text-foreground_tint md:mt-7 md:text-start">
          You can try checking out the source for more options:
        </p>
        <Link
          href={`https://mangadex.org/titles?page=1&q=${title}&onlyAvailableChapters=false`}
          target="_blank"
          className="font-title font-medium text-accent"
        >
          <Motion.Button variant="secondary" className="mt-5">
            Search Mangadex
          </Motion.Button>
        </Link>
      </div>
    </div>
  );
};

export default ChapterNAFallback;
