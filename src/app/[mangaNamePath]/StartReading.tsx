'use client';

import { useContext, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import Motion from '@/components/motion';

import { IStartReading } from './MangaDetails.types';
import { LoaderContext } from '@/context/loader';

const StartReading: ReactFC<IStartReading> = ({ mangaTitle, firstChId, mangaId, firstChNum }) => {
  const router = useRouter();
  const { setVisibility: setFullScreenLoader } = useContext(LoaderContext);

  const handleStartReading = () => {
    setFullScreenLoader(true);
    router.push(`/${encodeURIComponent(mangaTitle)}/${firstChId}?id=${mangaId}&ch=${firstChNum}`);
  };
  return (
    <>
      <Motion.Button
        asChild
        size="xl"
        className="hidden w-fit py-4 md:flex"
        onClick={() => handleStartReading()}
      >
        Start Reading
      </Motion.Button>
      <Motion.Button
        asChild
        size="sm"
        className="flex w-full rounded-sm py-4 text-sm md:hidden"
        onClick={() => handleStartReading()}
      >
        Start Reading
      </Motion.Button>
    </>
  );
};

export default StartReading;
