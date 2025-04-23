'use client';

import { type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';

import { IChapterDneModal } from './MangaReader.types';

const ChapterDneModal: ReactFC<IChapterDneModal> = ({ mangaId, mangaTitle, state, setState }) => {
  const router = useRouter();

  return (
    <Modal
      trigger={state.trigger}
      title={{ text: 'Uh-oh!' }}
      onClose={() => setState(prev => ({ ...prev, trigger: false }))}
    >
      <p className="font-body font-medium">Chapter {state.unavailChNum} does not exist!</p>
      <p className="font-body font-medium">
        The next available chapter is Chapter is #{state.nextChapter?.attributes.chapter}
      </p>
      <Button
        className="mt-5"
        onClick={() => {
          router.push(
            `/${encodeURIComponent(mangaTitle)}/${state.nextChapter?.id}?id=${mangaId}&ch=${state.nextChapter?.attributes.chapter}`,
          );
        }}
      >
        Read Chapter {state.nextChapter?.attributes.chapter}
      </Button>
    </Modal>
  );
};

export default ChapterDneModal;
