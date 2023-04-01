export interface IFounder {
  searchParam: string;
  searchQuery: string;
  data: any[];
}
export default function founder({ searchParam, searchQuery, data = [] }: IFounder) {
  return data.filter(el => {
    if (typeof el[searchParam] === 'number') {
      return !(searchQuery && !el[searchParam].toString().toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (typeof el[searchParam] === 'string') {
      return !(searchQuery && !el[searchParam].toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });
}
