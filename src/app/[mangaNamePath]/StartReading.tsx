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
      <Button
        asChild
        size="lg"
        className="hidden w-fit py-4 md:flex"
        onClick={() => handleStartReading()}
      >
        <Motion.Button>Start Reading</Motion.Button>
      </Button>
      <Button
        asChild
        size="sm"
        className="flex w-fit rounded-sm py-4 md:hidden"
        onClick={() => handleStartReading()}
      >
        <Motion.Button>Start Reading</Motion.Button>
      </Button>
    </>
  );
};

export default StartReading;
