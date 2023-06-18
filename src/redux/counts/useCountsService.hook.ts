import { useCountsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ServiceDispatcherAsync } from '../global.types';
import { ICountsState } from './counts.slice';
import { useMemo } from 'react';
import { ICount, ICountFormData } from './counts.types';
import { defaultThunkPayload } from '../../utils/fabrics';
import { createCountThunk, deleteCountThunk, getAllCountsThunk } from './counts.thunks';
import { AppQueryParams } from '../../api';

interface CountsServiceDispatchers {
  deleteById: ServiceDispatcherAsync<
    { _id: string },
    | Pick<ICount, '_id' | 'label'> & {
        deletedChildrens?: number;
      }
  >;
  getAll: ServiceDispatcherAsync<Pick<AppQueryParams, 'isArchived' | 'createTreeData'>, ICount[]>;
  create: ServiceDispatcherAsync<ICountFormData, ICount>;
  editById?: ServiceDispatcherAsync<{ _id: string; data: ICountFormData }, ICount>;
  getById?: ServiceDispatcherAsync<{ _id: string }, ICount>;
}

export interface CountsService extends CountsServiceDispatchers {
  dispatch: AppDispatch;
  state: ICountsState;
  findById: (_id: string) => ICount | undefined;
}

export const useCountsService = (): CountsService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useCountsSelector();

  const dispatchers = useMemo((): CountsServiceDispatchers => {
    return {
      getAll: async payload => dispatch(getAllCountsThunk(defaultThunkPayload(payload))),
      deleteById: async payload => dispatch(deleteCountThunk(defaultThunkPayload(payload))),
      create: async payload => dispatch(createCountThunk(defaultThunkPayload(payload))),
      // editById: async payload => dispatch(updateC(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    findById: id => state.counts.find(el => el._id === id),
    ...dispatchers,
  };
};

export default useCountsService;
