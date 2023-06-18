import { useCategoriesSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ICategoriesState } from './categoriesSlice';
import { ServiceDispatcher } from '../global.types';
import { useMemo } from 'react';
import { createCategoryThunk, getAllCategoriesThunk } from './categoriesThunks';
import { ICategory, ICategoryFormData } from './categories.types';
import { defaultThunkPayload } from '../../utils/fabrics';
import { AppQueryParams } from '../../api';

interface CategoriesServiceDispatchers {
  create: ServiceDispatcher<ICategoryFormData>;
  deleteById: ServiceDispatcher<{ _id: string }>;
  editById: ServiceDispatcher<{ _id: string; data: ICategoryFormData }>;
  getById: ServiceDispatcher<{ _id: string }>;
  getAll: ServiceDispatcher<Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined>;
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
      create: payload => dispatch(createCategoryThunk(defaultThunkPayload({ ...payload, logAll: true }))),
      deleteById: payload =>
        dispatch(() => {
          defaultThunkPayload(payload);
        }),
      editById: payload =>
        dispatch(() => {
          defaultThunkPayload(payload);
        }),
      getById: payload =>
        dispatch(() => {
          defaultThunkPayload(payload);
        }),
      getAll: payload => dispatch(getAllCategoriesThunk(defaultThunkPayload(payload))),
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
