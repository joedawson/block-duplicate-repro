import { CollectionAfterChangeHook } from 'payload/types';

export const revalidatePosts: CollectionAfterChangeHook = async ({
  doc,
  req,
  previousDoc,
}) => {
  if (doc?._status !== 'published' && previousDoc?._status !== 'published') {
    return;
  }

  await fetch(`${process.env.REVALIDATION_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: process.env.REVALIDATION_SECRET,
      collection: 'posts',
      slug: doc?.slug,
    }),
  });
};
