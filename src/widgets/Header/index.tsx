import React from 'react';
import { Search, Equal } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full justify-center bg-background pt-2 md:pt-3">
      <div className="flex w-full items-center justify-center border-b border-secondary_bg2_50 px-3 py-2.5 lg:max-w-md">
        <Search size={24} className="cursor-pointer" />
        <Link href="/" className="flex-1 text-center">
          <h1 className="text-4xl/10">Manganest</h1>
        </Link>
        <Equal size={24} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
