import type { HTMLAttributes, ReactNode } from 'react';

export interface ITag extends HTMLAttributes<HTMLDivElement> {
  text: string | ReactNode | null;
  onClick?: () => void;
}
