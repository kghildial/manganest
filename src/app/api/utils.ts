'server only';

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export async function getDeviceTypeFromUA() {
  'use server';

  const headerList = await headers();
  const userAgent = headerList.get('user-agent') ?? '';
  const deviceType = UAParser(userAgent).device.type;

  return {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType !== 'mobile' && deviceType !== 'tablet',
  };
}
