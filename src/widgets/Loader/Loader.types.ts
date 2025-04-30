import { HTMLAttributes } from 'react';

export interface ILoaderFull extends HTMLAttributes<HTMLDivElement> {}

export interface ILoaderLocal extends ILoaderFull {
  backdropClassName?: string;
}
