import { FieldHook } from 'payload/types';
import { slugify } from '@/utils/slugify';

export const slugifyPost: FieldHook = ({ value, siblingData }) => {
  if (!value) {
    return slugify(siblingData.title);
  }

  return slugify(value);
};
