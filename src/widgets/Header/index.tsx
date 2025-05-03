import { Search as SearchIcon, Equal } from 'lucide-react';

import Motion from '@/components/motion';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full justify-center bg-background pt-2 md:pt-3">
      <div className="flex w-full items-center justify-center border-b border-secondary_bg2_50 px-3 py-2.5 xl:max-w-md">
        <Motion.Link
          href="/search"
          className="cursor-pointer pr-3"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <SearchIcon size={24} />
        </Motion.Link>
        <Logo />
        <Equal size={36} className="cursor-pointer pl-3" />
      </div>
    </div>
  );
};

export default Header;
