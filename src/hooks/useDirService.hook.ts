import { AppDispatch, useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';

export interface DirectoriesService {
  dispatch: AppDispatch;

  deleteCount?: any;
  createCount?: any;
  getAllCounts?: any;
  getCountById?: any;

  createCategory?: any;
  deleteCategory?: any;
  getAllCategories?: any;
  getCategoryById?: any;
}

const useDirService = (): DirectoriesService => {
  const dispatch: AppDispatch = useAppDispatch();

  const service = useMemo(
    (): Omit<DirectoriesService, 'dispatch'> => ({
      // createCount: async payload => dispatch(() => ({})),
      // getAllCounts: async payload => dispatch(() => ({})),
      // deleteCount: async payload => dispatch(() => {}),
      // getCountById: async payload => dispatch(() => ({})),
      // createCategory: async payload => dispatch(() => ({})),
      // getAllCategories: async payload => dispatch(() => ({})),
      // deleteCategory: async payload => dispatch(() => ({})),
      // getCategoryById: async payload => dispatch(() => ({})),
    }),
    []
  );

  return { dispatch, ...service };
};

export default useDirService as typeof useDirService;
