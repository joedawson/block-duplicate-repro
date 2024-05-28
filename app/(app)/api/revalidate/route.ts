import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { secret, collection, slug } = await request.json();

  if (
    !secret ||
    secret !== process.env.REVALIDATION_SECRET ||
    typeof collection !== 'string' ||
    (slug && typeof slug !== 'string')
  ) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (collection) {
    if (slug) {
      revalidateTag(`${collection}_${slug}`);
    }

    revalidateTag(collection);

    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({ revalidated: false, now: Date.now() });
}
