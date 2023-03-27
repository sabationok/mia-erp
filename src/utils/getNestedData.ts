interface Params<D extends Record<string, any>, N extends Record<string, any>> {
  dataKey?: keyof D;
  nestedDataKey?: keyof N;
  defaultValue?: string;
  def?: string;
  data: D;
}

const getNestedData = <D extends Record<string, any>, N extends Record<string, any>>(args: Params<D, N>) => {
  if (!args?.data || !args?.dataKey) return null as null;
  const { data, dataKey, nestedDataKey, def } = args;

  if (data && dataKey && data[dataKey]) {
    if (typeof data[dataKey] === 'string' || typeof data[dataKey] === 'number') {
      return data[dataKey];
    }

    if (nestedDataKey && data[dataKey][nestedDataKey]) {
      if (typeof data[dataKey][nestedDataKey] === 'object') {
        return def;
      }

      return data[dataKey][nestedDataKey];
    }
    if (nestedDataKey && !data[dataKey][nestedDataKey]) {
      return def;
    }
  }
  return null;

  // return (
  //   nestedDataKey && data[dataKey] && data[dataKey][nestedDataKey]
  //     ? data[dataKey][nestedDataKey]
  //     : data[dataKey]
  //     ? data[dataKey]
  //     : defaultValue || null
  // ) as string | D[keyof D] | D[keyof D][keyof N] | null;
};

export default getNestedData;
