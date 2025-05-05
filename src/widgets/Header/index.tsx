import { Search as SearchIcon } from 'lucide-react';

import Motion from '@/components/motion';
import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full justify-center bg-background pt-2 md:pt-3">
      <div className="relative flex w-full items-center justify-center border-b border-secondary_bg2_50 px-3 py-2.5 xl:max-w-md">
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
        <Menu />
      </div>
    </div>
  );
};

export default Header;
