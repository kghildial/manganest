import { memo, useCallback, useEffect, useRef, type FC as ReactFC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { IModal } from './Modal.types';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Motion from '@/components/motion';
import { AnimatePresence, motion } from 'motion/react';

const Modal: ReactFC<IModal> = ({
  trigger,
  modalTitle = '',
  className,
  backdropClassName = '',
  scrollWrapperClassName = '',
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
  }, [trigger, scrollBlocker]);

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          ref={modalRef}
          className={cn(
            'fixed left-0 top-[68px] z-10 flex h-[calc(100vh-68px)] w-[100vw] items-start justify-center bg-background_50 pt-14 backdrop-blur-lg md:items-center xl:top-[73px] xl:h-[calc(100vh-73px)]',
            backdropClassName,
          )}
        >
          <div className={cn('relative h-[84%]', scrollWrapperClassName)}>
            <p className="absolute left-1 top-[-30px] font-heading text-[28px] font-light text-background">
              {modalTitle}
            </p>
            <Motion.Button
              whileHover={{ scale: 1.2 }}
              variant="secondary"
              className={cn(
                'bg-backgrund absolute -top-8 right-0 h-[24px] w-[24px] cursor-pointer border-none px-0 py-0',
                closeIconClassName,
              )}
              onClick={() => onClose()}
            >
              <X size={24} />
            </Motion.Button>
            <Card
              className={cn(
                'z-2 no-scrollbar flex h-full w-[90vw] flex-col overflow-y-scroll p-5 xl:w-full xl:max-w-[70vw]',
                className,
              )}
            >
              <CardHeader className="relative flex w-full flex-row justify-between">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Modal);
