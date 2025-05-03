'use client';

import { useEffect, useMemo, useRef, useState, type FC as ReactFC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Grid2X2Plus } from 'lucide-react';

import Motion from '@/components/motion';
import { CardTitle, CardDescription } from '@/components/ui/card';
import MobileControlsPanel from './MobileControlsPanel';
import Controls from './Controls';
import MetaData from './MetaData';

import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';

import { IMangaControlsBox } from './MangaReader.types';

const ControlsBox: ReactFC<IMangaControlsBox> = ({
  tags,
  authors,
  artists,
  mangaId,
  totalCh,
  className,
  mangaTitle,
  currentChNum,
  minimizeOnScroll = false,
  showMenuTriggerOnMob = false,
}) => {
  const { isDesktop, isMobile, isTablet } = useResponsive();

  const didUserMinimizeAtStart = useRef(false);

  const [controlsState, setControlsState] = useState({ minimize: false, isScrollTop: true });
  const [mobCtrlsTrigger, setMobCtrlsTrigger] = useState(false);

  const runAnimation = useMemo(
    () => !isDesktop && controlsState.minimize,
    [controlsState.minimize],
  );

  const midScrollMaximiseAnim = useMemo(
    () => !isDesktop && !controlsState.isScrollTop && !controlsState.minimize,
    [controlsState.isScrollTop, controlsState.minimize],
  );

  const minimizeAnimVals = useMemo(
    () => ({ maxHeight: 36, width: 36, transition: { delay: 0.3 } }),
    [],
  );

  const maximizeAnimVals = useMemo(
    () =>
      midScrollMaximiseAnim
        ? {
            width: isTablet ? 'calc(95vw - 16px)' : '95vw',
            maxHeight: 600,
          }
        : { width: '100%', maxHeight: 600 },
    [midScrollMaximiseAnim],
  );

  useEffect(() => {
    if (!isDesktop && minimizeOnScroll) {
      const scrollHandler = (e: Event) => {
        if (mobCtrlsTrigger) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }

        if (window.pageYOffset >= 143 && !controlsState.minimize) {
          setControlsState({ minimize: true, isScrollTop: false });
        }

        if (window.pageYOffset < 50) {
          if (didUserMinimizeAtStart.current) return;
          setControlsState({ minimize: false, isScrollTop: true });
        } else {
          didUserMinimizeAtStart.current = false;
        }
      };

      window.addEventListener('scroll', scrollHandler, { passive: false });

      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [mobCtrlsTrigger, controlsState.minimize, isDesktop]);

  return (
    <div className={className}>
      <Motion.Card
        animate={runAnimation ? minimizeAnimVals : maximizeAnimVals}
        className={cn(
          'relative ml-0 flex w-full flex-col items-start justify-between p-3 xl:px-9 xl:py-8',
          runAnimation
            ? 'items-center justify-center border border-foreground bg-accent_tint shadow-floating'
            : '',
          runAnimation && isTablet ? 'ml-2' : '',
          midScrollMaximiseAnim && isTablet ? 'ml-2' : '',
          midScrollMaximiseAnim && isMobile ? 'border border-foreground' : '',
        )}
      >
        <AnimatePresence mode="wait">
          {!runAnimation && (
            <>
              <Motion.CardHeader exit={{ opacity: 0 }} className="w-full flex-row justify-between">
                <div className="mb-3 flex flex-col pr-2">
                  <CardTitle className="pr-6 font-heading text-2xl/7 font-medium xl:text-5xl xl:leading-[54px]">
                    {mangaTitle}
                  </CardTitle>
                  <CardDescription className="font-heading text-xl/6 text-foreground_tint_60 xl:text-2xl/7">
                    Chapter {currentChNum}
                  </CardDescription>
                </div>
                {showMenuTriggerOnMob && (
                  <MobileControlsPanel
                    trigger={mobCtrlsTrigger}
                    setTrigger={setMobCtrlsTrigger}
                    tags={tags}
                    authors={authors}
                    artists={artists}
                    mangaId={mangaId}
                    mangaTitle={mangaTitle}
                    totalChapters={totalCh}
                    currentChapter={Number(currentChNum)}
                  />
                )}
              </Motion.CardHeader>
              <Motion.CardContent exit={{ opacity: 0 }} className="flex w-full gap-6">
                <Controls
                  showMinimize={!isDesktop && minimizeOnScroll}
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
              size={40}
              className="rounded-md border border-foreground p-2"
              onClick={() => setControlsState(prev => ({ ...prev, minimize: false }))}
            />
          </motion.div>
        )}
      </Motion.Card>

      <MetaData
        tags={tags}
        authors={authors}
        artists={artists}
        className="mt-5 hidden xl:flex"
        metaLayoutClass="xl:w-full"
        tagClass="bg-secondary_bg2"
      />
    </div>
  );
};

export default ControlsBox;
