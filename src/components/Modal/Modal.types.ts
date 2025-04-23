import type { HTMLAttributes, ReactNode } from 'react';

export interface IModal extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  backdropClassName?: string;
  trigger: boolean;
  children: ReactNode;
  title?: {
    text: string;
    className?: string;
  } | null;
  description?: {
    text: string;
    className?: string;
  } | null;
  onClose: () => void;
}
