import { useCountsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ServiceDispatcher } from '../global.types';
import { ICountsState } from './counts.slice';
import { useMemo } from 'react';
import { getAllCountsThunk } from './counts.thunks';
import { ICategoryFormData } from '../categories/categories.types';
import { ICount } from './counts.types';

interface CountsServiceDispatchers {
  deleteById: ServiceDispatcher<{ _id: string }>;
  editById: ServiceDispatcher<{ _id: string; newData: ICategoryFormData }>;
  getAll: ServiceDispatcher;
  create: ServiceDispatcher<ICategoryFormData>;
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
      getAll: payload => dispatch(getAllCountsThunk(payload)),
      deleteById: payload => dispatch(getAllCountsThunk(payload)),
      create: payload => dispatch(getAllCountsThunk(payload)),
      editById: payload => dispatch(getAllCountsThunk(payload)),
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
