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
  const carouselNode = useRef<HTMLDivElement>(null);
  const progressNode = useRef<HTMLDivElement>(null);
  const animFrameId = useRef(0);
  const timeoutId = useRef(0);

  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  const replayCarousel = () => autoplayRef.current.play();

  const handleMouseEnter = () => {
    const node = progressNode.current;
    if (!node) return;
    autoplayRef.current.stop();
    node.style.animationPlayState = 'paused';
  };

  const handleMouseLeave = () => {
    const node = progressNode.current;
    if (!node) return;
    replayCarousel();
    node.style.animationPlayState = 'running';
  };

  const clickToBlur = () => {
    console.log('Inslide clickToBlur!');
    carouselNode.current?.click();
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

    // Reset autplay once slide is changed manually
    api.on('select', () => {
      // replayCarousel();
      setActiveSlide(api.selectedScrollSnap());
    });

    replayCarousel();

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
    <CNCarousel
      ref={carouselNode}
      plugins={plugins}
      className="w-full"
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent
        onMouseEnter={pauseOnHover ? handleMouseEnter : () => {}}
        onMouseLeave={pauseOnHover ? handleMouseLeave : () => {}}
      >
        {data.map((entry, index) => (
          <CarouselItem key={index}>{template({ entry, index, activeSlide })}</CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <CarouselControls
          ref={progressNode}
          onClick={clickToBlur}
          className={controlsClassName}
          onMouseEnter={pauseOnControlsHover ? handleMouseEnter : () => {}}
          onMouseLeave={pauseOnControlsHover ? handleMouseLeave : () => {}}
        />
      )}
    </CNCarousel>
  );
};

export default Carousel;
