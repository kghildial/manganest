'use client';

import { createContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction, FC as ReactFC } from 'react';

export type TLoaderContext = {
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

interface ILoaderProvider {
  initial?: boolean;
  children: ReactNode;
}

export const LoaderContext = createContext<TLoaderContext>({
  visible: false,
  setVisibility: () => {},
});

export const LoaderProvider: ReactFC<ILoaderProvider> = ({ initial = false, children }) => {
  const [visible, setVisibility] = useState(initial);
  return (
    <LoaderContext.Provider value={{ visible, setVisibility }}>{children}</LoaderContext.Provider>
  );
};
