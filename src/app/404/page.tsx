import Link from 'next/link';
import Image from 'next/image';

import Motion from '@/components/motion';

import Img404 from '@/assets/images/manganest_404.png';

export default function NotFound() {
  return (
    <div className="-md:translate-x-14 flex h-[calc(100vh-30px)] w-full flex-col items-center justify-center md:flex-row">
      <Image
        src={Img404}
        width={575}
        height={568}
        alt="Manganest_404"
        className="w-[300px] md:mr-14 md:w-[568px]"
      />
      <div className="mt-7 flex flex-col items-center md:mt-0 md:items-start">
        <h2 className="text-5xl text-foreground_tint">Not Found!</h2>
        <p className="mt-3 font-heading text-2xl text-foreground_tint">This page does not exist!</p>
        <p className="mt-3 text-center font-body text-foreground_tint md:mt-7 md:text-start">
          Trying to find a manga?
        </p>
        <Link href="/search" className="font-title font-medium text-accent">
          <Motion.Button variant="secondary" className="mt-5">
            Go to Search
          </Motion.Button>
        </Link>
      </div>
    </div>
  );
}
