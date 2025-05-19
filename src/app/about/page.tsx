import Link from 'next/link';

import Image from '@/components/Image';
import LayoutWrapper from '@/components/LayoutWrapper';

import AboutImg from '@/assets/images/manganest_about.png';

const About = () => {
  return (
    <LayoutWrapper className="pb-14">
      <h1 className="mb-5">About Manganest</h1>
      <div className="mb-14 flex flex-col xl:mb-24 xl:flex-row">
        <Image
          src={AboutImg}
          alt="About Image"
          width={500}
          height={350}
          className="mb-12 xl:mr-5"
        />
        <div className="flex flex-col justify-center">
          <p className="font-body text-base font-medium">
            <span className="font-bold">Manganest </span>is a beautifully crafted manga reading
            platform powered by{' '}
            <Link
              href="https://mangadex.org"
              target="_blank"
              className="underline transition-colors hover:text-accent"
            >
              MangaDex
            </Link>
            . Designed and developed by{' '}
            <Link
              href="https://in.linkedin.com/in/kghildial"
              target="_blank"
              className="underline transition-colors hover:text-accent"
            >
              Kinshuk Ghildial
            </Link>
            , it aims to deliver a clean, focused, and ad-free reading experience that celebrates
            manga and the people who make it.
          </p>
          <p className="mt-5 font-body text-base font-medium">
            Whether you&apos;re into fast-paced action, slow-burn romance, or niche indie titles,
            Manganest helps you dive in—with zero distractions and a fluid, responsive UI.
          </p>
        </div>
      </div>

      <h2 className="mb-3 text-2xl">Why Manganest?</h2>
      <p className="font-body text-base font-medium">
        Most manga readers either feel bloated or out of date. Manganest solves that by offering:
      </p>
      <ul className="list-disc font-body text-base [&_li]:ml-5">
        <li>A minimal, modern design built from scratch</li>
        <li>Lightning-fast search and chapter reading</li>
        <li>Real-time content updates via the official MangaDex API</li>
        <li>A smooth experience across devices</li>
      </ul>
      <p className="mt-5 font-body text-base font-medium">
        This isn&apos;t a clone or a template. It&apos;s a hand-built product crafted with care,
        designed to scale, and developed to showcase what a modern manga reader{' '}
        <span className="italic">should</span> &nbsp;feel like.
      </p>

      <h2 className="mb-3 mt-14 text-2xl">Made with purpose:</h2>
      <p className="font-body text-base font-medium">
        Manganest is a full-stack project rooted in production-grade architecture and a quiet
        obsession with design. With a genuine love for clean, intuitive interfaces, it is designed &
        built with care - seeking to create not just usability, but a kind of flow that feels
        natural.
      </p>
      <p className="mt-3 font-body text-base font-medium">
        ~ Kinshuk Ghildial, (Creator, Manganest)
      </p>

      <h2 className="mb-3 mt-14 text-2xl">What&apos;s Coming Next?</h2>
      <p className="font-body text-base font-medium">
        In future updates, Manganest plans to support:
      </p>
      <ul className="mb-10 list-disc font-body text-base [&_li]:ml-5">
        <li>User login to save favorites and follow manga</li>
        <li>Personalized reading history</li>
        <li>Lightweight analytics to improve the experience</li>
        <li>Optional ad support to sustain the platform</li>
      </ul>

      <p className="font-body text-secondary_bg2">
        For legal and copyright information, view our full{' '}
        <Link
          href="/disclaimer"
          className="text-secondary_bg2 underline transition-colors hover:text-accent_tint"
        >
          disclaimer
        </Link>
        .
      </p>
    </LayoutWrapper>
  );
};

export default About;
