import { ReactNode } from 'react';

export enum EPaginationEllipses {
  Start = 'start-ellipsis',
  End = 'end-ellipsis',
}

export type TPaginationPageNumber = number | EPaginationEllipses;

export interface IRouteTransitionWrapper {
  children: ReactNode;
}
