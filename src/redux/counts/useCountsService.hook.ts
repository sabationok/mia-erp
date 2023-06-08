import { useCountsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ServiceDispatcher } from '../global.types';
import { ICountsState } from './counts.slice';
import { useMemo } from 'react';
import { getAllCountsThunk } from './counts.thunks';
import { ICount } from './counts.types';
import { defaultThunkPayload } from '../../utils/fabrics';
import { CountFormData } from '../../components/Directories/DirCounts/FormCreateCount';

interface CountsServiceDispatchers {
  deleteById: ServiceDispatcher<{ _id: string }>;
  editById: ServiceDispatcher<{ _id: string; newData: CountFormData }>;
  getAll: ServiceDispatcher;
  create: ServiceDispatcher<CountFormData>;
}

export interface CountsService extends CountsServiceDispatchers {
  dispatch: AppDispatch;
  state: ICountsState;
  getById: (_id: string) => ICount | undefined;
}

export const useCountsService = (): CountsService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useCountsSelector();

  const dispatchers = useMemo((): CountsServiceDispatchers => {
    return {
      getAll: payload => dispatch(getAllCountsThunk(defaultThunkPayload(payload))),
      deleteById: payload => dispatch(getAllCountsThunk(defaultThunkPayload(payload))),
      create: payload => dispatch(getAllCountsThunk(defaultThunkPayload(payload))),
      editById: payload => dispatch(getAllCountsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    getById: id => state.counts.find(el => el._id === id),
    ...dispatchers,
  };
};

export default useCountsService;
