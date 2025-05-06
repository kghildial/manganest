'use client';

import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import { LoaderContext } from '@/context/loader';

import { usePathname } from 'next/navigation';

const FullLoader = dynamic(() => import('@/widgets/Loader/Full'), { ssr: false });

const LayoutLoader = () => {
  const pathName = usePathname();

  const { visible: isLoaderVisible, setVisibility } = useContext(LoaderContext);

  useEffect(() => {
    setVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return isLoaderVisible && <FullLoader />;
};

export default LayoutLoader;
