'use client';

import { useEffect, useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid } from 'lucide-react';

import Modal from '@/components/Modal';
import ChapterDneModal from './ChapterDneModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { changeChapter } from '@/lib/manga';

import { IDneModalState, IMobileControlsPanel } from './MangaReader.types';
import MetaData from './MetaData';

const MobileControlsPanel: ReactFC<IMobileControlsPanel> = ({
  mangaId,
  mangaTitle,
  currentChapter,
  totalChapters,
  tags,
  authors,
  artists,
}) => {
  const router = useRouter();

  const [trigger, setTrigger] = useState(false);
  const [chapterDneModal, setChapterDneModal] = useState<IDneModalState>({
    trigger: false,
    unavailChNum: null,
    nextChapter: null,
  });

  // Close this modal if DNE modal is active
  useEffect(() => {
    if (chapterDneModal.trigger) {
      setTrigger(false);
    }
  }, [chapterDneModal.trigger]);

  return (
    <>
      <div className="flex gap-1 lg:hidden" onClick={() => setTrigger(true)}>
        <p className="font-heading">Menu</p>
        <LayoutGrid size={24} />
      </div>
      <Modal
        trigger={trigger}
        modalTitle="Details"
        className="border-none bg-transparent p-0"
        backdropClassName="bg-accent_tint"
        onClose={() => setTrigger(false)}
        closeIconClassName="bg-background rounded-xs"
      >
        <Card className="-mt-6 bg-background p-5">
          <CardHeader>
            <CardTitle className="font-heading text-4xl font-normal">{mangaTitle}</CardTitle>
            <CardDescription className="font-heading text-2xl/7">
              Chapter {currentChapter}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-5">
              <Button
                variant="secondary"
                onClick={() =>
                  changeChapter({
                    targetChapter: currentChapter - 1,
                    mangaId,
                    mangaTitle,
                    setChapterDneModal,
                    router,
                  })
                }
              >
                Prev
              </Button>
              <Button
                onClick={() =>
                  changeChapter({
                    targetChapter: currentChapter + 1,
                    mangaId,
                    mangaTitle,
                    setChapterDneModal,
                    router,
                  })
                }
              >
                Next
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <p className="font-body font-medium">Move to Chapter:</p>
              <Select
                value={String(currentChapter)}
                onValueChange={chapter => {
                  changeChapter({
                    targetChapter: Number(chapter),
                    mangaId,
                    mangaTitle,
                    setChapterDneModal,
                    router,
                  });
                }}
              >
                <SelectTrigger className="h-[28px] w-32 gap-1 rounded-xs border-secondary_bg1 bg-secondary_bg1 py-0 pr-1 font-body [&_span]:text-xs">
                  {currentChapter}
                </SelectTrigger>
                <SelectContent className="w-fit min-w-fit border-accent">
                  {Array.from({ length: totalChapters + 1 }).map((_, index) => (
                    <SelectItem
                      key={index}
                      value={`${index}`}
                      className={cn(
                        'px-3 py-3 font-body lg:py-1 [&_span]:text-xs',
                        currentChapter === index ? 'bg-accent_tint [&_span]:text-background' : '',
                      )}
                    >
                      {index}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <MetaData
          tags={tags}
          authors={authors}
          artists={artists}
          className="mt-5"
          metaLayoutClass="lg:w-full bg-background"
          tagClass="bg-secondary_bg1"
        />
      </Modal>

      <ChapterDneModal
        mangaId={mangaId}
        mangaTitle={mangaTitle}
        state={chapterDneModal}
        setState={setChapterDneModal}
      />
    </>
  );
};

export default MobileControlsPanel;
