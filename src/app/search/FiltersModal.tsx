'use-client';

import { useEffect, type FC as ReactFC } from 'react';

import Modal from '@/components/Modal';

import { IFiltersModal } from './Search.types';

import Tag from '@/components/Tag';
import TagFilterCardTemplate from './TagFilterCardTpl';

const FiltersModal: ReactFC<IFiltersModal> = ({ tags, filters, setFilters }) => {
  return (
    <Modal
      trigger={filters.visible}
      modalTitle="Filters"
      className="border-none bg-transparent p-0"
      backdropClassName="bg-accent_tint"
      onClose={() => setFilters(prev => ({ ...prev, visible: false }))}
      closeIconClassName="bg-background rounded-xs"
    >
      <TagFilterCardTemplate
        title="Genre"
        className="-mt-6"
        tags={tags.filter(tag => tag.attributes?.group === 'genre')}
      />
      <TagFilterCardTemplate
        title="Theme"
        className="mt-5"
        tags={tags.filter(tag => tag.attributes?.group === 'theme')}
      />
      <TagFilterCardTemplate
        title="Format"
        className="mt-5"
        tags={tags.filter(tag => tag.attributes?.group === 'format')}
      />
      <TagFilterCardTemplate
        title="Content"
        className="mt-5"
        tags={tags.filter(tag => tag.attributes?.group === 'content')}
      />
    </Modal>
  );
};

export default FiltersModal;
