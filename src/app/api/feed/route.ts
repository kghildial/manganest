import { NextResponse } from 'next/server';

import { IGetMangaFeedParams } from '@/types/manga.types';
import { getMangaFeed } from '@/lib/manga.server';

export async function POST(req: Request) {
  try {
    const payload: IGetMangaFeedParams = await req.json();

    const response = await getMangaFeed(payload);

    if (response.result === 'ok') {
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ error: 'Failed to fetch manga feed' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch manga feed' }, { status: 500 });
  }
}
