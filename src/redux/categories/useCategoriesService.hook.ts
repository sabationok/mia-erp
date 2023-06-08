import { useCategoriesSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ICategoriesState } from './categoriesSlice';
import { ServiceDispatcher } from '../global.types';
import { useMemo } from 'react';
import { getAllCategoriesThunk } from './categoriesThunks';
import { ICategory } from './categories.types';

interface CategoriesServiceDispatchers {
  create: ServiceDispatcher<Partial<ICategory>>;
  deleteById: ServiceDispatcher<{ _id: string }>;
  editById: ServiceDispatcher<{ _id: string; newData: Partial<ICategory> }>;
  getById: ServiceDispatcher<{ _id: string }>;
  getAll: () => void;
}

interface CategoriesService extends CategoriesServiceDispatchers {
  dispatch: AppDispatch;
  state: ICategoriesState;
  findById: (id?: string) => ICategory | undefined;
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
    findById: id => state.categories.find(el => el._id === id),
    ...dispatchers,
  };
};

export default useCategoriesService as typeof useCategoriesService;
