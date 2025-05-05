'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useCleanUrlHash = () => {
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.location.hash) {
        history.replaceState(null, '', pathname);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);
};

export default useCleanUrlHash;
