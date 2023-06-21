import { AppDispatch, useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { getAllDirectoryItemsThunk } from '../redux/directories/directories.thunk';
import { defaultThunkPayload } from '../utils/fabrics';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IBaseDirItem } from '../components/Directories/dir.types';
import { AppQueryParams } from '../api';

export interface DirectoriesService {
  dispatch: AppDispatch;

  deleteCount?: any;
  createCount?: any;
  getAllCounts?: any;
  getCountById?: any;

  createCategory?: any;
  deleteCategory?: any;
  getAllCategories?: any;
  getCategoryById?: any;

  getAllByDirType: ServiceDispatcherAsync<
    {
      dirType?: ApiDirType;
      params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined;
    },
    { ditType?: ApiDirType; data: IBaseDirItem[] }
  >;
}

const useDirService = (): DirectoriesService => {
  const dispatch: AppDispatch = useAppDispatch();

  const service = useMemo(
    (): Omit<DirectoriesService, 'dispatch'> => ({
      getAllByDirType: async payload => dispatch(getAllDirectoryItemsThunk(defaultThunkPayload(payload))),
      // createCount: async payload => dispatch(() => ({})),
      // getAllCounts: async payload => dispatch(() => ({})),
      // deleteCount: async payload => dispatch(() => {}),
      // getCountById: async payload => dispatch(() => ({})),
      // createCategory: async payload => dispatch(() => ({})),
      // getAllCategories: async payload => dispatch(() => ({})),
      // deleteCategory: async payload => dispatch(() => ({})),
      // getCategoryById: async payload => dispatch(() => ({})),
    }),
    [dispatch]
  );

  return { dispatch, ...service };
};

export default useDirService as typeof useDirService;
