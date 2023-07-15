import { AppDispatch, useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import {
  createDirectoryItemThunk,
  CreateDirItemThunkSubmitData,
  DirThunkBaseReturnData,
  DirThunkBaseSubmitData,
  getAllDirectoryItemsThunk,
  updateDirectoryItemThunk,
  UpdateDirItemThunkSubmitData,
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
  changeArchiveStatus?: any;
  getAllByDirType: ServiceDispatcherAsync<DirThunkBaseSubmitData, DirThunkBaseReturnData<ItemDataType[]>>;
  create: ServiceDispatcherAsync<CreateDirItemThunkSubmitData<CreateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
  update: ServiceDispatcherAsync<UpdateDirItemThunkSubmitData<UpdateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
}

const useDirService = (): DirectoriesService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo(
    (): Omit<DirectoriesService, 'dispatch'> => ({
      getAllByDirType: async payload => dispatch(getAllDirectoryItemsThunk(defaultThunkPayload(payload))),
      create: async payload => dispatch(createDirectoryItemThunk(defaultThunkPayload(payload))),
      update: async payload => dispatch(updateDirectoryItemThunk(defaultThunkPayload(payload))),
    }),
    [dispatch]
  );
};

export default useDirService as typeof useDirService;
