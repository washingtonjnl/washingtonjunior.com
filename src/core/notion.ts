import { MapImageUrl } from 'react-notion';

export const toNotionImageUrl: MapImageUrl = (url, block): string => {
  const imageUrl = new URL(
    url.startsWith('https://www.notion.so')
      ? url
      : `https://www.notion.so${
          url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
        }`,
  );

  if (block != null) {
    const table =
      block.value.parent_table === 'space' ? 'block' : block.value.parent_table;
    imageUrl.searchParams.set('table', table);
    imageUrl.searchParams.set('id', block.value.id);
    imageUrl.searchParams.set('cache', 'v2');
  }

  return imageUrl.toString();
};
