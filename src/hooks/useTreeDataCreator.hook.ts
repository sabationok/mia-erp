import { createTreeDataMapById, IBaseFields, TreeOptions } from '../utils/createTreeData';
import { ITrCategory } from '../types/directories.types';
import { ICount } from '../redux/directories/counts.types';
import { useMemo, useState } from 'react';

export interface TreeDataCreatorState<T = any> {
  parentList: (T & IBaseFields<T>)[];
  treeData: TreeOptions<T>;
  loading: boolean;
  error: string | null;
}

export interface TreeDataCreatorOptions<T = ITrCategory | ICount> {
  dataList: (T & IBaseFields<T>)[];
  rootDataValidator?: (item: T) => boolean;
}

const useTreeDataCreator = <T = ITrCategory | ICount>({
  dataList,
  rootDataValidator,
}: TreeDataCreatorOptions<T>): TreeDataCreatorState<T> => {
  const [state, setState] = useState<TreeDataCreatorState<T>>({
    parentList: [],
    treeData: {},
    loading: false,
    error: null,
  });

  useMemo(
    () =>
      setState(prev => ({
        ...prev,
        parentList: dataList.filter(el => {
          if (rootDataValidator) {
            return rootDataValidator(el);
          }
          return !el.parent;
        }),
      })),
    [rootDataValidator, dataList]
  );

  useMemo(() => {
    createTreeDataMapById<T>(dataList, {
      onSuccess: data => {
        setState(prev => ({ ...prev, treeData: data }));
      },
      onError: error => setState(prev => ({ ...prev, error })),
      onLoading: loading => setState(prev => ({ ...prev, loading })),
    });
  }, [dataList]);

  return state;
};

export default useTreeDataCreator;
