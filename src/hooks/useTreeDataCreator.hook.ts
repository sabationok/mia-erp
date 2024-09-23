import { createTreeDataMapById, IBaseFields, TreeOptions } from '../utils/createTreeData';
import { FinCategoryEntity } from '../types/directories.types';
import { FinAccountEntity } from '../types/finances/fin-accounts.types';
import { useMemo, useState } from 'react';

export interface TreeDataCreatorState<T = any> {
  parentList: (T & IBaseFields<T>)[];
  treeData: TreeOptions<T>;
  loading: boolean;
  error: string | null;
}

export interface TreeDataCreatorOptions<T = FinCategoryEntity | FinAccountEntity> {
  dataList: (T & IBaseFields<T>)[];
  rootDataValidator?: (item: T) => boolean;
}

const useTreeDataCreator = <T = FinCategoryEntity | FinAccountEntity>({
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
