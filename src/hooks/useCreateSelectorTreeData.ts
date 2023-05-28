import { createTreeDataMapById, IBaseFields, TreeOptions } from '../utils/createTreeData';
import { ICategory } from '../redux/categories/categories.types';
import { ICount } from '../redux/counts/counts.types';
import { useMemo, useState } from 'react';

export interface UseSelectorState<T = any> {
  parentList: (T & IBaseFields<T>)[];
  treeData: TreeOptions<T>;
  loading: boolean;
  error: string | null;
}

const useCreateSelectorTreeData = <T = ICategory | ICount>(dataList: (T & IBaseFields<T>)[]): UseSelectorState<T> => {
  const [state, setState] = useState<UseSelectorState<T>>({
    parentList: [],
    treeData: {},
    loading: false,
    error: null,
  });
  useMemo(() => {
    createTreeDataMapById(dataList, {
      onSuccess: data => setState(prev => ({ ...prev, treeData: data })),
      onError: error => setState(prev => ({ ...prev, error })),
      onLoading: loading => setState(prev => ({ ...prev, loading })),
    });
  }, [dataList]);
  useMemo(() => setState(prev => ({ ...prev, parentList: dataList.filter(el => !el.owner) })), [dataList]);

  return state;
};

export default useCreateSelectorTreeData;
