import { useCategoriesSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ICategoriesState } from './categoriesSlice';
import { ServiceDispatcher } from '../global.types';
import { useMemo } from 'react';
import { getAllCategoriesThunk } from './categoriesThunks';

interface CategoriesServiceDispatchers {
  create: ServiceDispatcher;
  deleteById: ServiceDispatcher;
  editById: ServiceDispatcher;
  getById: ServiceDispatcher;
  getAll: () => void;
}

interface CategoriesService extends CategoriesServiceDispatchers {
  dispatch: AppDispatch;
  state: ICategoriesState;
}

const useCategoriesService = (): CategoriesService => {
  const dispatch = useAppDispatch();
  const state = useCategoriesSelector();

  const dispatchers = useMemo((): CategoriesServiceDispatchers => {
    return {
      create: payload => dispatch(() => {}),
      deleteById: payload => dispatch(() => {}),
      editById: payload => dispatch(() => {}),
      getById: payload => dispatch(() => {}),
      getAll: () => dispatch(getAllCategoriesThunk({})),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    ...dispatchers,
  };
};

export default useCategoriesService as typeof useCategoriesService;
