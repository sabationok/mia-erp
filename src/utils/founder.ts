import * as _ from 'lodash';

export interface IFounderEntries<D = any> {
  searchParam?: keyof D;
  cb?: (d: D) => boolean;
  searchQuery?: string;
  data?: D[];
}

export default function founder<D = any>({ searchParam, searchQuery, data = [], cb }: IFounderEntries<D>): D[] {
  if (!searchParam || !searchQuery || !data) return data;
  return cb
    ? _.filter(data, cb)
    : data.filter(el => {
        const query = searchQuery.toLowerCase();
        const value = _.get(el, searchParam);

        if (typeof value === 'number') return !(searchQuery && !value.toString().toLowerCase().includes(query));

        if (typeof value === 'string') return !(searchQuery && !value.toLowerCase().includes(query));

        return true;
      });
}
