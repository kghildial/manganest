'use-client';

import { type FC as ReactFC } from 'react';
import { motion, scale } from 'motion/react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Motion from '@/components/motion';
import { Input } from '@/components/ui/input';
import { ISearchBar } from './Search.types';

const SearchBar: ReactFC<ISearchBar> = ({ searchTerm, setSearchTerm, setFilters }) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-1 items-center border-b border-secondary_bg2 pb-1">
        <SearchIcon size={24} className="mr-4 text-secondary_bg2" />
        <Input
          type="text"
          name="query"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="border-none font-ui text-base font-medium"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, visible: true }))}
              >
                <SlidersHorizontal size={24} className="text-foreground_tint" />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="bg-secondary_bg1">
              <p className="font-ui text-sm text-foreground_tint">Show Filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Motion.Button onClick={() => {}} className="ml-5 hidden md:flex">
        Search
      </Motion.Button>
      <Motion.Button onClick={() => {}} className="ml-5 flex px-2 md:hidden">
        <SearchIcon size={24} className="text-background" />
      </Motion.Button>
    </div>
  );
};

export default SearchBar;
