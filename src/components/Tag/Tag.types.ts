import type { HTMLAttributes } from 'react';

export interface ITag extends HTMLAttributes<HTMLDivElement> {
  text: string;
}
