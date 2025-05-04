import Link from 'next/link';

const Footer = () => (
  <div className="flex w-screen justify-center bg-secondary_bg1 px-5 py-1">
    <p className="text-center font-body text-sm text-foreground_tint_60 xl:text-base">
      © 2025{' '}
      <Link
        href="https://in.linkedin.com/in/kghildial"
        target="_blank"
        className="text-foreground_tint_60 transition-colors hover:text-accent"
      >
        Kinshuk Ghildial
      </Link>
      . All rights reserved. <span className="hidden xl:inline">·</span> Powered by{' '}
      <Link
        href="https://mangadex.org"
        target="_blank"
        className="text-foreground_tint_60 transition-colors hover:text-accent"
      >
        MangaDex
      </Link>
    </p>
  </div>
);

export default Footer;
