import { getManga } from '@/lib/manga';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const response = await getManga(payload);

    if (response.result === 'ok') {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ error: 'Failed to fetch manga' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mangas' }, { status: 500 });
  }
}
