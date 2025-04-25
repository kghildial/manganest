'use client';

import { useEffect, useMemo, useState, type FC as ReactFC } from 'react';
import { AnimatePresence } from 'motion/react';
import { Grid2X2Plus } from 'lucide-react';

import Motion from '@/components/motion';
import { CardTitle, CardDescription } from '@/components/ui/card';
import MobileControlsPanel from './MobileControlsPanel';
import Controls from './Controls';

import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';

import { IMangaControlsBox } from './MangaReader.types';

const ControlsBox: ReactFC<IMangaControlsBox> = ({
  mangaTitle,
  mangaId,
  currentChNum,
  totalCh,
  tags,
  authors,
  artists,
}) => {
  const { isDesktop, isMobile, isTablet } = useResponsive();

  const [controlsState, setControlsState] = useState({ minimize: false, isScrollTop: true });

  const runAnimation = useMemo(
    () => !isDesktop && controlsState.minimize,
    [controlsState.minimize],
  );

  const midScrollMaximiseAnim = useMemo(
    () => !controlsState.isScrollTop && !controlsState.minimize,
    [controlsState.isScrollTop, controlsState.minimize],
  );

  const minimizeAnimVals = useMemo(
    () => ({ height: 36, width: 36, transition: { delay: 0.3 } }),
    [],
  );

  const maximizeAnimVals = useMemo(
    () => (midScrollMaximiseAnim ? { width: isTablet ? 'calc(95vw - 16px)' : '95vw' } : {}),
    [midScrollMaximiseAnim],
  );

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 143 && controlsState.minimize !== true) {
        setControlsState({ minimize: true, isScrollTop: false });
      }

      if (window.pageYOffset < 50) {
        setControlsState({ minimize: false, isScrollTop: true });
      }
    });

    () => window.removeEventListener('scroll', () => {});
  }, []);

  return (
    <Motion.Card
      animate={runAnimation ? minimizeAnimVals : maximizeAnimVals}
      className={cn(
        'relative ml-0 flex h-fit w-[95vw] flex-col items-start justify-between p-3 lg:px-9 lg:py-8',
        controlsState.minimize
          ? 'shadow-floating items-center justify-center border border-foreground p-0'
          : '',
        controlsState.minimize && isTablet ? 'ml-2' : '',
        midScrollMaximiseAnim && isTablet ? 'ml-2' : '',
        midScrollMaximiseAnim && isMobile ? 'border border-foreground' : '',
      )}
    >
      <AnimatePresence>
        {!runAnimation && (
          <>
            <Motion.CardHeader exit={{ opacity: 0 }} className="w-full flex-row justify-between">
              <div className="mb-3 flex flex-col pr-2">
                <CardTitle className="pr-6 font-heading text-2xl/7 font-medium lg:text-5xl lg:leading-[54px]">
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
                onMinimize={() => setControlsState(prev => ({ ...prev, minimize: true }))}
              />
            </Motion.CardContent>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {controlsState.minimize && (
          <Grid2X2Plus
            size={24}
            onClick={() => setControlsState(prev => ({ ...prev, minimize: false }))}
          />
        )}
      </AnimatePresence>
    </Motion.Card>
  );
};

export default ControlsBox;
