import { type FC as ReactFC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { IModal } from './Modal.types';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Modal: ReactFC<IModal> = ({
  trigger,
  className,
  backdropClassName = '',
  children,
  title = null,
  description = null,
  closeIconClassName,
  onClose,
}) => {
  return (
    <>
      {trigger && (
        <div
          className={cn(
            'bg-background_50 fixed left-0 top-[68px] flex h-[calc(100vh-68px)] w-[100vw] items-center justify-center backdrop-blur-lg lg:top-[73px] lg:h-[calc(100vh-73px)]',
            backdropClassName,
          )}
        >
          <Card
            className={cn(
              'z-99 flex w-[90vw] flex-col border border-secondary_bg2 p-5 lg:w-[50%]',
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
              <X
                size={24}
                className={cn('absolute right-0 cursor-pointer', closeIconClassName)}
                onClick={() => onClose()}
              />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
