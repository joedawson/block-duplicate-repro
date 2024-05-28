import { Config } from '@/payload-types';
import { PaginatedDocs } from 'payload/database';
import { Where } from 'payload/types';

import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

type Collection = keyof Config['collections'];

export const getDocuments = async (collection: Collection, where: Where = {}) => {
  const payload = await getPayload({ config: configPromise });

  const docs: PaginatedDocs = await payload.find({
    collection,
    where
  });

  return docs?.docs || [];
}

/**
 * Get documents from a collection and cache the result using the collection name as a tag
 */
export const getCachedDocuments = (collection: Collection, where: Where = {}) =>
  unstable_cache(async() => getDocuments(collection, where), [collection], { tags: [collection] });