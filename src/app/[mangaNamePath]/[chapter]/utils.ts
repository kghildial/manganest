import { findNearestChapter } from '@/lib/manga';
import { findInFeed, getValidChRef } from '@/lib/manga.server';
import { IChangeChapter } from './MangaReader.types';

export const changeChapter = async ({
  router,
  mangaId,
  mangaTitle,
  targetChapter,
  setChapterDneModal,
}: IChangeChapter) => {
  const listings = await findInFeed({ mangaId, chNum: targetChapter, pagination: 50 });

  if (listings.length === 0) {
    const nextChapter = await findNearestChapter({ mangaId, targetChapter: targetChapter });

    setChapterDneModal({ trigger: true, nextChapter, unavailChNum: targetChapter });
  } else {
    const {
      listing: { id },
    } = await getValidChRef(listings);

    router.push(`/${encodeURIComponent(mangaTitle)}/${id}?id=${mangaId}&ch=${targetChapter}`);
  }
};
