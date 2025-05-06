'use client';

import { useContext, useEffect } from 'react';
import { LoaderContext } from '@/context/loader';

import Loader from '@/widgets/Loader';
import { usePathname } from 'next/navigation';

const LayoutLoader = () => {
  const pathName = usePathname();

  const { visible: isLoaderVisible, setVisibility } = useContext(LoaderContext);

  useEffect(() => {
    console.log(pathName);
    setVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return isLoaderVisible && <Loader.Full />;
};

export default LayoutLoader;
