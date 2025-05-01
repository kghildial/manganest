import { type FC as ReactFC } from 'react';

import Tag from '@/components/Tag';
import MetaCardLayout from '@/widgets/MetaCardLayout';

import { IMetaData } from './MangaReader.types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MetaData: ReactFC<IMetaData> = ({
  tags,
  authors,
  artists,
  className,
  metaLayoutClass,
  tagClass,
}) => {
  return (
    <div className={cn('flex flex-col gap-y-5', className)}>
      <MetaCardLayout title="Genres" className={metaLayoutClass}>
        {tags?.map(
          tag =>
            tag?.attributes?.name?.en && (
              <Link key={tag.id} href={`/search?tag=${tag.id}`}>
                <Tag.Motion text={tag.attributes.name.en} className={tagClass} />
              </Link>
            ),
        )}
      </MetaCardLayout>

      <MetaCardLayout title="Authors" className={metaLayoutClass}>
        {authors?.map(
          author =>
            author?.attributes?.name && (
              <Tag.Static key={author.id} text={author.attributes.name} className={tagClass} />
            ),
        )}
      </MetaCardLayout>

      <MetaCardLayout title="Artists" className={metaLayoutClass}>
        {artists?.map(
          artist =>
            artist?.attributes?.name && (
              <Tag.Static key={artist.id} text={artist.attributes.name} className={tagClass} />
            ),
        )}
      </MetaCardLayout>
    </div>
  );
};

export default MetaData;
