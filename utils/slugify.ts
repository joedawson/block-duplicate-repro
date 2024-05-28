export const slugify = (text: string) => {
  return text
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase();
};