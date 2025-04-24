'use client';

import { useEffect, useState, type FC as ReactFC } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid } from 'lucide-react';

import Tag from '@/components/Tag';
import Modal from '@/components/Modal';
import ChapterDneModal from './ChapterDneModal';
import { Button } from '@/components/ui/button';
import MetaCardLayout from '@/widgets/MetaCardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { changeChapter } from '@/lib/manga';

import { IDneModalState, IMobileControlsPanel } from './MangaReader.types';

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
      <LayoutGrid
        size={18}
        className="block min-w-[18px] lg:hidden"
        onClick={() => setTrigger(true)}
      />
      <Modal
        trigger={trigger}
        className="border-none bg-transparent p-0"
        backdropClassName="bg-accent_tint"
        onClose={() => setTrigger(false)}
        closeIconClassName="-top-9 bg-background rounded-xs"
      >
        <Card className="relative -mt-6 bg-background p-5">
          <CardHeader>
            <p className="absolute -top-6 left-1 font-heading text-body text-background">Details</p>
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

        <MetaCardLayout title="Genres" className="mt-5 bg-background">
          {tags?.map(
            tag =>
              tag?.attributes?.name?.en && (
                <Tag key={tag.id} text={tag.attributes.name.en} className="bg-secondary_bg1" />
              ),
          )}
        </MetaCardLayout>

        <MetaCardLayout title="Authors" className="mt-5 bg-background">
          {authors?.map(
            author =>
              author?.attributes?.name && (
                <Tag key={author.id} text={author.attributes.name} className="bg-secondary_bg1" />
              ),
          )}
        </MetaCardLayout>

        <MetaCardLayout title="Artists" className="mt-5 bg-background">
          {artists?.map(
            artist =>
              artist?.attributes?.name && (
                <Tag key={artist.id} text={artist.attributes.name} className="bg-secondary_bg1" />
              ),
          )}
        </MetaCardLayout>
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
