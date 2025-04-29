'use client';

import { type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import Motion from '@/components/motion';
import { Button } from '@/components/ui/button';

import { IStartReading } from './MangaDetails.types';

const StartReading: ReactFC<IStartReading> = ({ mangaTitle, firstChId, mangaId, firstChNum }) => {
  const router = useRouter();

  const handleStartReading = () => {
    router.push(`/${encodeURIComponent(mangaTitle)}/${firstChId}?id=${mangaId}&ch=${firstChNum}`);
  };
  return (
    <>
      <Motion.Button
        asChild
        size="lg"
        className="hidden w-fit py-4 md:flex"
        onClick={() => handleStartReading()}
      >
        Start Reading
      </Motion.Button>
      <Motion.Button
        asChild
        size="sm"
        className="flex w-fit rounded-sm py-4 md:hidden"
        onClick={() => handleStartReading()}
      >
        Start Reading
      </Motion.Button>
    </>
  );
};

export default StartReading;
