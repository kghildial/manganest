'use client';

import { useEffect, useMemo, useRef, useState, type FC as ReactFC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Grid2X2Plus } from 'lucide-react';

import Motion from '@/components/motion';
import { CardTitle, CardDescription } from '@/components/ui/card';
import MobileControlsPanel from './MobileControlsPanel';
import Controls from './Controls';

import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';

import { IMangaControlsBox } from './MangaReader.types';
import MetaCardLayout from '@/widgets/MetaCardLayout';
import Tag from '@/components/Tag';
import MetaData from './MetaData';

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
  const didUserMinimizeAtStart = useRef(false);

  const [controlsState, setControlsState] = useState({ minimize: false, isScrollTop: true });

  const runAnimation = useMemo(
    () => !isDesktop && controlsState.minimize,
    [controlsState.minimize],
  );

  const midScrollMaximiseAnim = useMemo(
    () => !isDesktop && !controlsState.isScrollTop && !controlsState.minimize,
    [controlsState.isScrollTop, controlsState.minimize],
  );

  const minimizeAnimVals = useMemo(
    () => ({ height: 36, width: 36, transition: { delay: 0.3 } }),
    [],
  );

  const maximizeAnimVals = useMemo(
    () =>
      midScrollMaximiseAnim
        ? { width: isTablet ? 'calc(95vw - 16px)' : '95vw', height: 'fit-content' }
        : { width: '95vw', height: 'fit-content' },
    [midScrollMaximiseAnim],
  );

  useEffect(() => {
    if (!isDesktop) {
      window.addEventListener('scroll', event => {
        if (window.pageYOffset >= 143 && controlsState.minimize !== true) {
          setControlsState({ minimize: true, isScrollTop: false });
        }

        if (window.pageYOffset < 50) {
          if (didUserMinimizeAtStart.current) return;
          setControlsState({ minimize: false, isScrollTop: true });
        }
      });

      () => window.removeEventListener('scroll', () => {});
    }
  }, []);

  return (
    <>
      <Motion.Card
        animate={runAnimation ? minimizeAnimVals : maximizeAnimVals}
        className={cn(
          'relative ml-0 flex h-fit w-full flex-col items-start justify-between p-3 lg:px-9 lg:py-8',
          runAnimation
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
                  onMinimize={() => {
                    if (window.scrollY < 50) {
                      didUserMinimizeAtStart.current = true;
                    }
                    setControlsState(prev => ({ ...prev, minimize: true }));
                  }}
                />
              </Motion.CardContent>
            </>
          )}
        </AnimatePresence>

        {runAnimation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
            <Grid2X2Plus
              size={24}
              onClick={() => setControlsState(prev => ({ ...prev, minimize: false }))}
            />
          </motion.div>
        )}
      </Motion.Card>

      <MetaData
        tags={tags}
        authors={authors}
        artists={artists}
        className="mt-5 hidden lg:flex"
        metaLayoutClass="lg:w-full"
        tagClass="bg-secondary_bg2"
      />
    </>
  );
};

export default ControlsBox;
