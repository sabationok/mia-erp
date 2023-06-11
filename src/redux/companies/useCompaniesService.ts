import { ApiCaller } from '../global.types';
import { ICompany } from './companies.types';
import { AppDispatch, RootState, useAppDispatch } from '../store.store';

export interface CompaniesService {
  dispatch: AppDispatch;
  state?: RootState;
  create?: ApiCaller<Partial<ICompany>>;
  update?: ApiCaller<Partial<ICompany>>;
}

const useCompaniesService = (): CompaniesService => {
  const dispatch: AppDispatch = useAppDispatch();

  return { dispatch };
};

export default useCompaniesService as typeof useCompaniesService;
