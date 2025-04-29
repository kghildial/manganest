import LayoutWrapper from '@/components/LayoutWrapper';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <LayoutWrapper>
      <div className="flex justify-between">
        <div className="flex flex-1 items-center border-b border-secondary_bg2 pb-1">
          <SearchIcon size={24} className="mr-4 text-secondary_bg2" />
          <Input
            type="text"
            name="query"
            placeholder="Search"
            className="border-none font-ui text-base"
          />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Search;
