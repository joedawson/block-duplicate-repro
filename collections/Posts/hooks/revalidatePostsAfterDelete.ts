import { CollectionAfterDeleteHook } from 'payload/types';

export const revalidatePostsAfterDelete: CollectionAfterDeleteHook = async ({
  req,
}) => {
  await fetch(`${process.env.REVALIDATION_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: process.env.REVALIDATION_SECRET,
      collection: 'posts',
    }),
  });
};
