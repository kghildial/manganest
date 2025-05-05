'server only';

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export async function getDeviceTypeFromUA() {
  'use server';

  const headerList = await headers();
  const userAgent = headerList.get('user-agent') ?? '';
  const { device } = UAParser(userAgent);

  return {
    isMobile: device.type === 'mobile',
    isTablet: device.type === 'tablet',
    isDesktop: device.type !== 'mobile' && device.type !== 'tablet',
  };
}
