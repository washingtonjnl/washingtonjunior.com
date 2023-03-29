import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

export const getPageTable = async <T>(blogId: string): Promise<T[]> => {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${blogId}`).then(
    async res => await res.json(),
  );
};

export const getPageBlocks = async (
  pageId: string,
): Promise<ExtendedRecordMap> => {
  const notion = new NotionAPI();

  return await notion.getPage(pageId);
};

export const getDateStr = (date: Date | string): string => {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});
