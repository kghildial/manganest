import { type FC as ReactFC } from 'react';

import { Clock } from 'lucide-react';

import { IChapterListing } from './MangaDetails.types';

const ChapterListing: ReactFC<IChapterListing> = ({ chapter, timestamp }) => (
  <div className="group mb-3 flex cursor-pointer items-center rounded-sm bg-secondary_bg1 px-5 py-3 hover:bg-accent_tint md:px-8 md:py-4">
    <p className="flex-1 font-body text-sm font-medium group-hover:text-background">
      Chapter {chapter}
    </p>
    <Clock size={18} className="text-foreground_tint_60 mr-2 group-hover:text-background" />
    <p className="text-foreground_tint_60 mr-2 font-body text-sm font-medium group-hover:text-background">
      {timestamp}
    </p>
  </div>
);

export default ChapterListing;
