import { type FC as ReactFC } from 'react';

import Tag from '@/components/Tag';
import Modal from '@/components/Modal';
import MetaCardLayout from '@/widgets/MetaCardLayout';

import { IFullDetailsModal } from './MangaDetails.types';

const FullDetailsModal: ReactFC<IFullDetailsModal> = ({
  showModal,
  setShowModal,
  title,
  description,
  authors,
  artists,
}) => (
  <Modal
    trigger={showModal}
    modalTitle="Details"
    className="mb-0 border-none bg-transparent p-0"
    backdropClassName="z-10 bg-accent_tint"
    onClose={() => setShowModal(false)}
    closeIconClassName="bg-background rounded-xs"
  >
    <MetaCardLayout
      title={title}
      className="bg-background py-3"
      titleClassName="font-heading text-3xl xl:text-4xl font-normal"
    >
      <div className="no-scrollbar h-fit max-h-[300px] overflow-y-scroll">
        <div className="no-scrollbar h-full overflow-y-scroll">
          <p className="font-body text-sm">{description}</p>
        </div>
      </div>
    </MetaCardLayout>
    <MetaCardLayout
      title="Authors"
      className="mt-5 bg-background py-3 md:w-full"
      titleClassName="font-heading text-3xl xl:text-4xl font-normal"
    >
      {authors?.map(
        author =>
          author?.attributes?.name && (
            <Tag.Static
              key={author.id}
              text={author.attributes.name}
              className="bg-secondary_bg1"
            />
          ),
      )}
    </MetaCardLayout>
    <MetaCardLayout
      title="Artists"
      className="mt-5 bg-background py-3 md:w-full"
      titleClassName="font-heading text-3xl xl:text-4xl font-normal"
    >
      {artists?.map(
        author =>
          author?.attributes?.name && (
            <Tag.Static
              key={author.id}
              text={author.attributes.name}
              className="bg-secondary_bg1"
            />
          ),
      )}
    </MetaCardLayout>
  </Modal>
);

export default FullDetailsModal;
