import { AppDispatch, useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { OnlyUUID, ServiceDispatcherAsync } from '../redux/global.types';
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
  getAllByDirType: ServiceDispatcherAsync<DirThunkBaseSubmitData, DirThunkBaseReturnData<ItemDataType[]>>;
  create: ServiceDispatcherAsync<CreateDirItemThunkSubmitData<CreateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
  update: ServiceDispatcherAsync<UpdateDirItemThunkSubmitData<UpdateDTO>, DirThunkBaseReturnData<ItemDataType[]>>;
  delete?: ServiceDispatcherAsync<OnlyUUID, DirThunkBaseReturnData<ItemDataType[]>>;
  changeDisabledStatus: ServiceDispatcherAsync<
    UpdateDirItemThunkSubmitData<UpdateDTO>,
    DirThunkBaseReturnData<ItemDataType[]>
  >;
  changeArchiveStatus: ServiceDispatcherAsync<
    UpdateDirItemThunkSubmitData<UpdateDTO>,
    DirThunkBaseReturnData<ItemDataType[]>
  >;
}

const useDirService = (): DirectoriesService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo(
    (): DirectoriesService => ({
      getAllByDirType: args => dispatch(getAllDirectoryItemsThunk(defaultThunkPayload(args))),
      create: args => dispatch(createDirectoryItemThunk(defaultThunkPayload(args))),
      update: args => dispatch(updateDirectoryItemThunk(defaultThunkPayload(args))),
      changeDisabledStatus: args => dispatch(updateDirectoryItemThunk(defaultThunkPayload(args))),
      changeArchiveStatus: args => dispatch(updateDirectoryItemThunk(defaultThunkPayload(args))),
    }),
    [dispatch]
  );
};

export default useDirService as typeof useDirService;
