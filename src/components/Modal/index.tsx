import { memo, useCallback, useEffect, useRef, type FC as ReactFC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { IModal } from './Modal.types';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Modal: ReactFC<IModal> = ({
  trigger,
  modalTitle = '',
  className,
  backdropClassName = '',
  children,
  title = null,
  description = null,
  closeIconClassName,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const scrollBlocker = useCallback((e: TouchEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    const allowedElements = document.querySelectorAll('[data-allow-scroll-in-lock]');
    const insideAllowed = Array.from(allowedElements).some(
      el => el === target || el.contains(target),
    );

    if (insideAllowed) {
      return;
    }

    if (!modalRef.current?.contains(target)) {
      e.preventDefault();
    }
  }, []);

  // Enable scroll locking for all except modal
  useEffect(() => {
    if (trigger) {
      document.body.style.overflow = 'hidden';
      document.body.addEventListener('touchmove', scrollBlocker, { passive: false });
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeEventListener('touchmove', scrollBlocker);
    };
  }, [trigger]);

  return (
    <>
      {trigger && (
        <div
          ref={modalRef}
          className={cn(
            'bg-background_50 fixed left-0 top-[68px] flex h-[calc(100vh-68px)] w-[100vw] items-start justify-center pt-14 backdrop-blur-lg md:items-center lg:top-[73px] lg:h-[calc(100vh-73px)]',
            backdropClassName,
          )}
        >
          <div className="relative h-[84%]">
            <p className="absolute -top-6 left-1 font-heading text-body text-background">
              {modalTitle}
            </p>
            <X
              size={24}
              className={cn('absolute -top-8 right-0 cursor-pointer', closeIconClassName)}
              onClick={() => onClose()}
            />
            <Card
              className={cn(
                'z-2 flex h-full w-[90vw] flex-col overflow-y-scroll p-5 lg:w-[50%]',
                className,
              )}
            >
              <CardHeader className="relative mb-5 flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  {title && (
                    <CardTitle>
                      <h2 className={title?.className}>{title.text}</h2>
                    </CardTitle>
                  )}
                  {description && (
                    <CardDescription>
                      <p className={description?.className}>{description.text}</p>
                    </CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent>{children}</CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Modal);
