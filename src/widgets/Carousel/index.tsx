'use client';

import React, { useEffect, useState, useRef } from 'react';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';

import type { CarouselApi } from '@/components/ui/carousel';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel as CNCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Carousel = () => {
  const autoplayRef = useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: true, playOnInit: false }),
  );
  const progressNode = useRef<HTMLDivElement>(null);
  const animFrameId = useRef(0);
  const timeoutId = useRef(0);

  const [api, setApi] = useState<CarouselApi>();

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
    if (!api) {
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

  return (
    <CNCarousel
      plugins={[autoplayRef.current]}
      className="w-full max-w-xs"
      onMouseEnter={() => {
        const node = progressNode.current;
        if (!node) return;
        autoplayRef.current.stop();
        node.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        const node = progressNode.current;
        if (!node) return;
        autoplayRef.current.play();
        node.style.animationPlayState = 'running';
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="w-md relative flex h-1 bg-gray-400">
        <div ref={progressNode} className="left-0 top-0 h-1 w-0 bg-orange-400"></div>
      </div>
    </CNCarousel>
  );
};

export default Carousel;
