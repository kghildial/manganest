import React from 'react';
import { Search, Equal } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full items-center justify-center border-b border-secondary_bg2_50 px-5 py-2.5 lg:max-w-md">
        <Search size={24} className="cursor-pointer" />
        <h1 className="flex-1 text-center text-4xl/10">Manganest</h1>
        <Equal size={24} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
