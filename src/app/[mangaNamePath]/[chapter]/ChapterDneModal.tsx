'use client';

import { useContext, useEffect, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal';
import Motion from '@/components/motion';

import { LoaderContext } from '@/context/loader';

import { IChapterDneModal } from './MangaReader.types';

const ChapterDneModal: ReactFC<IChapterDneModal> = ({ mangaId, mangaTitle, state, setState }) => {
  const router = useRouter();
  const { visible: isFulllScreenLoaderVisible, setVisibility: setFullScreenLoader } =
    useContext(LoaderContext);

  useEffect(() => {
    if (state.trigger && isFulllScreenLoaderVisible) setFullScreenLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.trigger]);

  return (
    <Modal
      trigger={state.trigger}
      title={{ text: 'Uh-oh!' }}
      onClose={() => setState(prev => ({ ...prev, trigger: false }))}
      className="mb-20 h-fit border border-foreground"
    >
      <p className="font-body font-medium">Chapter {state.unavailChNum} does not exist!</p>
      <p className="font-body font-medium">
        The next available chapter is Chapter is #{state.nextChapter?.attributes.chapter}
      </p>
      <Motion.Button
        asChild
        className="mt-5"
        onClick={() => {
          const redirectionPath = `/${encodeURIComponent(mangaTitle)}/${state.nextChapter?.id}?id=${mangaId}&ch=${state.nextChapter?.attributes.chapter}`;
          const currentFullPath = window.location.pathname + window.location.search;

          if (currentFullPath !== redirectionPath) {
            router.push(redirectionPath);
          } else {
            setState(prev => ({ ...prev, trigger: false }));
          }
        }}
      >
        Read Chapter {state.nextChapter?.attributes.chapter}
      </Motion.Button>
    </Modal>
  );
};

export default ChapterDneModal;
