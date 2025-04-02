'use client';

import { useState, useEffect } from 'react';

function useResponsive() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // Set the correct width after mounting
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return {
    isMobile: width !== null ? width < 768 : false, // Default to false during SSR
    isTablet: width !== null ? width >= 768 && width < 1024 : false,
    isDesktop: width !== null ? width >= 1024 : false,
  };
}

export default useResponsive;
