import { type FC as ReactFC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { IModal } from './Modal.types';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Modal: ReactFC<IModal> = ({
  trigger,
  className,
  children,
  title = null,
  description = null,
  onClose,
}) => {
  return (
    <>
      {trigger && (
        <div className="bg-background_50 fixed left-0 top-[68px] flex h-[calc(100vh-68px)] w-[100vw] items-center justify-center backdrop-blur-lg lg:top-[73px] lg:h-[calc(100vh-73px)]">
          <Card
            className={cn(
              'z-99 mb-20 flex w-[90vw] flex-col border border-secondary_bg2 p-5 lg:w-[50%]',
              className,
            )}
          >
            <CardHeader className="mb-5 flex w-full flex-row justify-between">
              <div className="flex flex-col">
                {title && (
                  <CardTitle className={cn('', title?.className)}>
                    <h2>{title.text}</h2>
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className={description?.className}>
                    {description.text}
                  </CardDescription>
                )}
              </div>
              <X size={24} className="cursor-pointer" onClick={() => onClose()} />
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
