'use client';

import { useEffect, useMemo, useState, type FC as ReactFC } from 'react';
import { AnimatePresence } from 'motion/react';

import Motion from '@/components/motion';
import { CardTitle, CardDescription } from '@/components/ui/card';
import MobileControlsPanel from './MobileControlsPanel';
import Controls from './Controls';

import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';

import { IMangaControlsBox } from './MangaReader.types';
import { Grid2X2Plus, InspectionPanel, Maximize2 } from 'lucide-react';

const ControlsBox: ReactFC<IMangaControlsBox> = ({
  mangaTitle,
  mangaId,
  currentChNum,
  totalCh,
  tags,
  authors,
  artists,
}) => {
  const { isDesktop } = useResponsive();

  const [minimize, setMinimize] = useState(false);

  const runAnimation = useMemo(() => !isDesktop && minimize, [minimize]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log('inside event listener', window.pageYOffset);
      if (window.pageYOffset >= 143 && minimize !== true) {
        setMinimize(true);
      }

      if (window.pageYOffset < 50) {
        console.log('inside second if');
        setMinimize(false);
      }
    });

    () => window.removeEventListener('scroll', () => {});
  }, []);

  const minimizeAnimVals = useMemo(
    () => ({ height: 36, width: 36, transition: { delay: 0.3 } }),
    [],
  );

  return (
    <Motion.Card
      animate={runAnimation ? minimizeAnimVals : {}}
      className={cn(
        'relative flex h-fit w-full flex-col items-start justify-between p-3 lg:px-9 lg:py-8',
        minimize ? 'shadow-floating items-center justify-center border border-foreground p-0' : '',
      )}
    >
      <AnimatePresence>
        {!runAnimation && (
          <>
            <Motion.CardHeader exit={{ opacity: 0 }} className="w-full flex-row justify-between">
              <div className="mb-3 flex flex-col pr-2">
                <CardTitle className="font-heading text-2xl/7 font-medium lg:text-5xl lg:leading-[54px]">
                  {mangaTitle}
                </CardTitle>
                <CardDescription className="font-heading text-xl/6 text-foreground_tint_60 lg:text-2xl/7">
                  Chapter {currentChNum}
                </CardDescription>
              </div>
              <MobileControlsPanel
                mangaId={mangaId}
                mangaTitle={mangaTitle}
                totalChapters={totalCh}
                currentChapter={Number(currentChNum)}
                tags={tags}
                authors={authors}
                artists={artists}
              />
            </Motion.CardHeader>
            <Motion.CardContent exit={{ opacity: 0 }} className="flex w-full gap-6">
              <Controls
                mangaTitle={mangaTitle}
                currentChapter={Number(currentChNum)}
                totalCh={totalCh}
                mangaId={mangaId}
                onMinimize={() => setMinimize(true)}
              />
            </Motion.CardContent>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {minimize && <Grid2X2Plus size={24} onClick={() => setMinimize(false)} />}
      </AnimatePresence>
    </Motion.Card>
  );
};

export default ControlsBox;
