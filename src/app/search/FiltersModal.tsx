'use client';

import { memo, useMemo, type FC as ReactFC } from 'react';
import { FunnelX } from 'lucide-react';

import Modal from '@/components/Modal';
import Motion from '@/components/motion';
import TagFilterCardTemplate from './TagFilterCardTpl';

import { EFiltersAction, IFiltersModal } from './Search.types';
import { AnimatePresence } from 'motion/react';

const FiltersModal: ReactFC<IFiltersModal> = ({ filters, filterTypes, dispathFilterAction }) => {
  const isFiltersEmpty = useMemo(
    () => Object.keys(filters.include).length === 0,
    [filters.include],
  );

  return (
    <Modal
      trigger={filters.visible}
      modalTitle="Filters"
      className="border-none bg-transparent p-0"
      backdropClassName="z-10 bg-accent_tint"
      onClose={() => dispathFilterAction({ type: EFiltersAction.Hide })}
      closeIconClassName="bg-background rounded-xs"
    >
      <AnimatePresence mode="wait">
        {!isFiltersEmpty && (
          <Motion.Button
            type="submit"
            key="clearFilters"
            variant="secondary"
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
            onClick={() => dispathFilterAction({ type: EFiltersAction.Clear })}
            className="absolute -top-8 left-20 h-[24px] w-[24px] cursor-pointer border-none bg-background px-0 py-0"
          >
            <FunnelX size={12} />
          </Motion.Button>
        )}
      </AnimatePresence>
      <TagFilterCardTemplate
        title="Genre"
        className="-mt-6"
        tags={filterTypes.genres}
        filters={filters}
        dispathFilterAction={dispathFilterAction}
      />
      <TagFilterCardTemplate
        title="Theme"
        className="mt-5"
        tags={filterTypes.themes}
        filters={filters}
        dispathFilterAction={dispathFilterAction}
      />
      <TagFilterCardTemplate
        title="Format"
        className="mt-5"
        tags={filterTypes.formats}
        filters={filters}
        dispathFilterAction={dispathFilterAction}
      />
      <TagFilterCardTemplate
        title="Content"
        className="mt-5"
        tags={filterTypes.content}
        filters={filters}
        dispathFilterAction={dispathFilterAction}
      />
    </Modal>
  );
};

export default memo(FiltersModal);
