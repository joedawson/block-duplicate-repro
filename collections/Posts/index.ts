import type { CollectionConfig } from 'payload/types';

import { slugifyPost } from './hooks/slugifyPost';
import { revalidatePosts } from './hooks/revalidatePosts';
import { revalidatePostsAfterDelete } from './hooks/revalidatePostsAfterDelete';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          labels: {
            singular: 'Text',
            plural: 'Text',
          },
          fields: [
            {
              name: 'content',
              label: 'Content',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          slug: 'media',
          labels: {
            singular: 'Media',
            plural: 'Media',
          },
          fields: [
            {
              name: 'media',
              label: 'Media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              admin: {
                description: 'Override the media caption (optional)',
              },
            },
          ],
        },
        {
          slug: 'post',
          labels: {
            singular: 'Post',
            plural: 'Posts',
          },
          fields: [
            {
              name: 'post',
              label: 'Post',
              type: 'relationship',
              relationTo: 'posts',
            },
          ],
        },
        {
          slug: 'quote',
          labels: {
            singular: 'Quote',
            plural: 'Quotes',
          },
          fields: [
            {
              name: 'quote',
              label: 'Quote',
              type: 'text',
              required: true,
            },
            {
              name: 'attribution',
              label: 'Attribution',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePosts],
    afterDelete: [revalidatePostsAfterDelete],
  },
};
