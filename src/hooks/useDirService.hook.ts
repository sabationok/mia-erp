import { AppDispatch, useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import {
  createDirectoryItemThunk,
  DirThunkBaseReturnData,
  DirThunkBaseSubmitData,
  DirThunkCreateItemSubmitData,
  DirThunkUpdateItemSubmitData,
  getAllDirectoryItemsThunk,
  updateDirectoryItemThunk,
} from '../redux/directories/directories.thunk';
import { defaultThunkPayload } from '../utils/fabrics';
import { IBaseDirItem } from '../components/Directories/dir.types';
import { ApiDirType } from '../redux/APP_CONFIGS';

export interface DirectoriesService<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = IBaseDirItem<ItemType, DirType>
> {
  dispatch: AppDispatch;

  changeArchiveStatus?: any;
  getAllByDirType: ServiceDispatcherAsync<DirThunkBaseSubmitData, DirThunkBaseReturnData<ItemDataType[]>>;
  create: ServiceDispatcherAsync<DirThunkCreateItemSubmitData<CreateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
  update: ServiceDispatcherAsync<DirThunkUpdateItemSubmitData<UpdateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
}

const useDirService = (): DirectoriesService => {
  const dispatch: AppDispatch = useAppDispatch();

  const dispatchers = useMemo(
    (): Omit<DirectoriesService, 'dispatch'> => ({
      getAllByDirType: async payload => dispatch(getAllDirectoryItemsThunk(defaultThunkPayload(payload))),
      create: async payload => dispatch(createDirectoryItemThunk(defaultThunkPayload(payload))),
      update: async payload => dispatch(updateDirectoryItemThunk(defaultThunkPayload(payload))),
    }),
    [dispatch]
  );

  return { dispatch, ...dispatchers };
};

export default useDirService as typeof useDirService;
