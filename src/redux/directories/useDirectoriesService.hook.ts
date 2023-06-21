import { AppDispatch, RootState, useAppDispatch } from 'redux/store.store';
import { ServiceDispatcher, ServiceDispatcherAsync } from '../global.types';
import { useMemo } from 'react';

import { defaultThunkPayload } from '../../utils/fabrics';
import { AppQueryParams } from '../../api';

import { getAllDirectoryItemsThunk } from './directories.thunk';
import { ApiDirType } from '../APP_CONFIGS';
import { useSelector } from 'react-redux';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { IDirectoriesState } from './directories.slice';

interface DirectoriesServiceDispatchers {
  create?: ServiceDispatcherAsync<any, IBaseDirItem>;
  deleteById?: ServiceDispatcherAsync<
    { _id: string },
    | (Pick<IBaseDirItem, '_id' | 'label'> & {
        deletedChildren?: number;
      })
    | undefined
  >;
  editById?: ServiceDispatcher<{ _id: string; data: any }, IBaseDirItem | undefined>;
  getById?: ServiceDispatcher<{ _id: string }, IBaseDirItem | undefined>;
  getAllByDirType: ServiceDispatcherAsync<
    {
      dirType?: ApiDirType;
      params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined;
    },
    { ditType?: ApiDirType; data: IBaseDirItem[] }
  >;
}

interface DirectoriesService extends DirectoriesServiceDispatchers {
  dispatch: AppDispatch;
}

export const useDirectoriesSelector = <T = any, DT extends ApiDirType = any>(dirType: DT) => {
  const state = useSelector((state: RootState) => state.directories);

  return { directory: state.directories[dirType] } as {
    directory: IBaseDirItem<T, typeof dirType>[];
    error: IDirectoriesState['error'];
    isLoading: IDirectoriesState['isLoading'];
  };
};

const useDirectoriesService = (): DirectoriesService => {
  const dispatch = useAppDispatch();

  const dispatchers = useMemo((): DirectoriesServiceDispatchers => {
    return {
      getAllByDirType: async payload => dispatch(getAllDirectoryItemsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,

    ...dispatchers,
  };
};

export default useDirectoriesService as typeof useDirectoriesService;
