import getValueByPath from './getValueByPath';

export interface IFounderEntries<D = any> {
  path?: string;
  searchQuery?: string;
  data?: D[];
}

export default function founderByDataPath<D = any>({ path, searchQuery, data = [] }: IFounderEntries<D>): D[] {
  if (!path || !searchQuery || !data) return [];
  return data.filter(el => {
    const query = searchQuery.toLowerCase();
    const value = getValueByPath<string | number, D>({ path, data: el });
    if (!value) return false;
    console.log('founderByDataPathValue', value);

    if (typeof value === 'number') return !(searchQuery && !value.toString().toLowerCase().includes(query));

    if (typeof value === 'string') return !(searchQuery && !value.toLowerCase().includes(query));

    return true;
  });
}
