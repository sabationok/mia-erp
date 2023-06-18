import { useCategoriesSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ICategoriesState } from './categoriesSlice';
import { ServiceDispatcher, ServiceDispatcherAsync } from '../global.types';
import { useMemo } from 'react';
import { createCategoryThunk, deleteCategoryThunk, getAllCategoriesThunk } from './categoriesThunks';
import { ICategory, ICategoryFormData } from './categories.types';
import { defaultThunkPayload } from '../../utils/fabrics';
import { AppQueryParams } from '../../api';

interface CategoriesServiceDispatchers {
  create: ServiceDispatcherAsync<ICategoryFormData, ICategory>;
  deleteById: ServiceDispatcherAsync<
    { _id: string },
    | (Pick<ICategory, '_id' | 'label'> & {
        deletedChildrens?: number;
      })
    | undefined
  >;
  editById: ServiceDispatcher<{ _id: string; data: ICategoryFormData }, ICategory | undefined>;
  getById: ServiceDispatcher<{ _id: string }, ICategory | undefined>;
  getAll: ServiceDispatcherAsync<
    Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined,
    ICategory[] | undefined
  >;
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
      create: async payload => dispatch(createCategoryThunk(defaultThunkPayload({ ...payload, logAll: true }))),
      deleteById: async payload => dispatch(deleteCategoryThunk(defaultThunkPayload(payload))),
      editById: async payload =>
        dispatch(() => {
          defaultThunkPayload(payload);
        }),
      getById: async payload =>
        dispatch(() => {
          defaultThunkPayload(payload);
        }),
      getAll: async payload => dispatch(getAllCategoriesThunk(defaultThunkPayload(payload))),
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
