import { HTMLAttributes } from 'react';

export type ILoaderFull = HTMLAttributes<HTMLDivElement>;

export interface ILoaderLocal extends ILoaderFull {
  backdropClassName?: string;
}
