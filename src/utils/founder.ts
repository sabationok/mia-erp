export interface IFounderEntries<D = any> {
  searchParam?: keyof D;
  searchQuery?: string;
  data?: D[];
}

export default function founder<D = any>({ searchParam, searchQuery, data = [] }: IFounderEntries<D>): D[] {
  if (!searchParam || !searchQuery || !data) return [];
  return data.filter(el => {
    const query = searchQuery.toLowerCase();
    const value = el[searchParam as keyof D] || el;

    if (typeof value === 'number') return !(searchQuery && !value.toString().toLowerCase().includes(query));

    if (typeof value === 'string') return !(searchQuery && !value.toLowerCase().includes(query));

    return true;
  });
}
