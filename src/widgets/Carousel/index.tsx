'use client';

import React, { useEffect, useState, useRef, type FC as ReactFC } from 'react';
import type { CreatePluginType } from 'embla-carousel';
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay';
import Fade, { type FadeType } from 'embla-carousel-fade';

import type { CarouselApi } from '@/components/ui/carousel';
import { ICarousel } from './Carousel.types';

import { Carousel as CNCarousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CarouselControls from './CarouselControls';

const Carousel: ReactFC<ICarousel> = ({
  template,
  data,
  fade = false,
  showControls = true,
  pauseOnHover = false,
  pauseOnControlsHover = true,
  controlsClassName,
}) => {
  const autoplayRef = useRef<AutoplayType>(
    Autoplay({ delay: 4000, stopOnInteraction: true, playOnInit: false }),
  );
  const fadeRef = useRef<FadeType>(Fade());
  const progressNode = useRef<HTMLDivElement>(null);
  const animFrameId = useRef(0);
  const timeoutId = useRef(0);

  const [api, setApi] = useState<CarouselApi>();

  const handleMouseEnter = () => {
    const node = progressNode.current;
    if (!node) return;
    autoplayRef.current.stop();
    node.style.animationPlayState = 'paused';
  };

  const handleMouseLeave = () => {
    const node = progressNode.current;
    if (!node) return;
    autoplayRef.current.play();
    node.style.animationPlayState = 'running';
  };

  const startProgress = (timeUntilNext: number | null) => {
    const node = progressNode.current;

    if (!node) return;
    if (timeUntilNext === null) return;

    node.classList.remove('progress_bar');

    animFrameId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.classList.add('progress_bar');
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });
  };

  // Carousel API listeners go here
  useEffect(() => {
    if (!api || !autoplayRef) {
      return;
    }

    api.on('autoplay:timerset', () => {
      startProgress(autoplayRef.current.timeUntilNext());
    });
    api.on('autoplay:timerstopped', () => {});

    autoplayRef.current.play();

    () => {
      window.cancelAnimationFrame(animFrameId.current);
      window.clearTimeout(timeoutId.current);
    };
  }, [api]);

  const plugins: Array<AutoplayType | FadeType> = [autoplayRef.current];

  if (fade) {
    plugins.push(fadeRef.current);
  }

  return (
    <CNCarousel plugins={plugins} className="w-full" setApi={setApi}>
      <CarouselContent
        onMouseEnter={pauseOnHover ? handleMouseEnter : () => {}}
        onMouseLeave={pauseOnHover ? handleMouseLeave : () => {}}
      >
        {data.map((entry, index) => (
          <CarouselItem key={index}>{template(entry, index)}</CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <CarouselControls
          ref={progressNode}
          className={controlsClassName}
          onMouseEnter={pauseOnControlsHover ? handleMouseEnter : () => {}}
          onMouseLeave={pauseOnControlsHover ? handleMouseLeave : () => {}}
        />
      )}
    </CNCarousel>
  );
};

export default Carousel;
