import { ServiceDispatcher } from '../global.types';
import { ICompany } from './companies.types';
import { AppDispatch, RootState } from '../store.store';

interface CompaniesService {
  dispatch: AppDispatch;
  state: RootState;
  create: ServiceDispatcher<Partial<ICompany>>;
  update: ServiceDispatcher<Partial<ICompany>>;
}

const useCompaniesService = () => {};

export default useCompaniesService as typeof useCompaniesService;
